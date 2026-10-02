import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import crypto from 'node:crypto';

const app=express();
const PORT=Number(process.env.PORT||8787);
const ALLOWED_ORIGIN=process.env.ALLOWED_ORIGIN||'https://djshellshoxxx.github.io';
const ACCESS_TOKEN=process.env.MAILER_ACCESS_TOKEN||'';
const MAX_RECIPIENTS=Math.max(1,Math.min(10,Number(process.env.MAX_RECIPIENTS||5)));
const MAX_ATTACHMENT_BYTES=Math.max(256000,Number(process.env.MAX_ATTACHMENT_BYTES||8_000_000));

app.set('trust proxy',1);
app.use(cors({origin(origin,cb){if(!origin||origin===ALLOWED_ORIGIN)return cb(null,true);cb(new Error('Origin not allowed'))},methods:['GET','POST'],allowedHeaders:['Content-Type','Authorization']}));
app.use(express.json({limit:'12mb'}));
app.use(rateLimit({windowMs:15*60*1000,limit:20,standardHeaders:'draft-8',legacyHeaders:false}));

function safeEqual(a,b){const aa=Buffer.from(String(a)),bb=Buffer.from(String(b));return aa.length===bb.length&&crypto.timingSafeEqual(aa,bb)}
function authenticate(req,res,next){if(!ACCESS_TOKEN)return res.status(503).json({error:'MAILER_ACCESS_TOKEN is not configured'});const token=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');if(!safeEqual(token,ACCESS_TOKEN))return res.status(401).json({error:'Invalid mailer access key'});next()}
function parseRecipients(value){return String(value||'').split(/[;,\n]+/).map(s=>s.trim()).filter(Boolean)}
function looksLikeEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}

const transporter=nodemailer.createTransport({
  host:process.env.SMTP_HOST,
  port:Number(process.env.SMTP_PORT||587),
  secure:String(process.env.SMTP_SECURE||'false').toLowerCase()==='true',
  auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}:undefined,
  requireTLS:String(process.env.SMTP_REQUIRE_TLS||'true').toLowerCase()==='true'
});

app.get('/health',(_req,res)=>res.json({ok:true,service:'partypostergen-mailer'}));
app.post('/api/send-poster',authenticate,async(req,res)=>{
  try{
    const recipients=parseRecipients(req.body?.to);
    if(!recipients.length)return res.status(400).json({error:'At least one recipient is required'});
    if(recipients.length>MAX_RECIPIENTS)return res.status(400).json({error:`Maximum ${MAX_RECIPIENTS} recipients per send`});
    if(recipients.some(v=>!looksLikeEmail(v)))return res.status(400).json({error:'One or more recipient addresses are invalid'});
    const subject=String(req.body?.subject||'Party flyer').trim().slice(0,180);
    const text=String(req.body?.text||'').slice(0,20_000);
    const attachment=req.body?.attachment||{};
    if(!attachment.base64)return res.status(400).json({error:'Poster attachment is required'});
    const bytes=Buffer.from(String(attachment.base64),'base64');
    if(bytes.length>MAX_ATTACHMENT_BYTES)return res.status(413).json({error:`Poster exceeds ${Math.round(MAX_ATTACHMENT_BYTES/1_000_000)} MB attachment limit`});
    const from=process.env.MAIL_FROM;
    if(!from)return res.status(503).json({error:'MAIL_FROM is not configured'});
    const info=await transporter.sendMail({
      from,
      to:recipients,
      replyTo:process.env.MAIL_REPLY_TO||undefined,
      subject,
      text,
      attachments:[{filename:String(attachment.filename||'party-poster.png').replace(/[^a-z0-9._-]/gi,'_'),content:bytes,contentType:attachment.mime==='image/jpeg'?'image/jpeg':'image/png'}]
    });
    res.json({ok:true,accepted:info.accepted?.length||recipients.length,messageId:info.messageId});
  }catch(e){console.error(e);res.status(500).json({error:'Mail delivery failed'})}
});

app.use((err,_req,res,_next)=>{console.error(err);res.status(400).json({error:err.message||'Request rejected'})});
app.listen(PORT,()=>console.log(`PartyPosterGen mailer listening on ${PORT}`));
