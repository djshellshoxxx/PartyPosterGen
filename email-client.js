const $=s=>document.querySelector(s);

export const EMAIL_TEMPLATES={
  invite:{name:'Party invite',subject:'You’re invited: {title}',body:'You’re invited to {title}!\n\n{dateTime}\n{venueLine}\n{lineupLine}\n\n{extra}\n\nFlyer attached. {urlLine}'},
  promo:{name:'DJ / artist promo',subject:'Event flyer: {title}',body:'Here’s the flyer for {title}.\n\n{dateTime}\n{venueLine}\n{lineupLine}\n\nPlease feel free to share it with anyone who would be interested.\n\n{urlLine}'},
  venue:{name:'Venue / industry',subject:'Promo materials — {title}',body:'Hi,\n\nAttached is the current promotional flyer for {title}.\n\n{dateTime}\n{venueLine}\n{lineupLine}\n\n{extra}\n\n{urlLine}\n\nThanks.'},
  community:{name:'Friends & community',subject:'Come out to {title}',body:'Hey!\n\nWe’re putting on {title} and wanted to send you the flyer.\n\n{dateTime}\n{venueLine}\n{lineupLine}\n\nHope to see you there.\n\n{urlLine}'},
  minimal:{name:'Minimal',subject:'{title}',body:'{title}\n{dateTime}\n{venueLine}\n{urlLine}\n\nFlyer attached.'}
};

function cleanParts(parts,join=' · '){return parts.map(v=>String(v||'').trim()).filter(Boolean).join(join)}
function vars(state){return {
  title:state.title||'Party / event',
  dateTime:cleanParts([state.date,state.time]),
  venueLine:cleanParts([state.venue,state.city]),
  lineupLine:state.lineup?`Lineup: ${String(state.lineup).split(/\n|,/).map(s=>s.trim()).filter(Boolean).join(' · ')}`:'',
  extra:state.extra||'',
  urlLine:state.url?`Details / tickets: ${state.url}`:''
}}
function fill(tpl,state){const v=vars(state);return String(tpl).replace(/\{(\w+)\}/g,(_,k)=>v[k]??'').replace(/\n{3,}/g,'\n\n').trim()}
function dataUrlToBase64(dataUrl){return dataUrl.split(',')[1]||''}

export function initEmailPoster({getState,getCanvas,getFilename}){
  const panel=$('#emailPanel'),open=$('#emailPoster'),close=$('#emailClose'),template=$('#emailTemplate'),subject=$('#emailSubject'),body=$('#emailBody'),to=$('#emailTo'),endpoint=$('#emailEndpoint'),token=$('#emailToken'),send=$('#emailSend'),status=$('#emailStatus');
  if(!panel||!open)return;
  template.innerHTML=Object.entries(EMAIL_TEMPLATES).map(([id,t])=>`<option value="${id}">${t.name}</option>`).join('');
  endpoint.value=localStorage.getItem('partypostergen-mailer-url')||'';
  function applyTemplate(){const s=getState(),t=EMAIL_TEMPLATES[template.value]||EMAIL_TEMPLATES.invite;subject.value=fill(t.subject,s);body.value=fill(t.body,s)}
  open.onclick=()=>{panel.hidden=false;applyTemplate();status.textContent=''};
  close.onclick=()=>panel.hidden=true;
  template.onchange=applyTemplate;
  send.onclick=async()=>{
    const url=endpoint.value.trim().replace(/\/$/,'');
    if(!url){status.textContent='Enter the URL of your PartyPosterGen mail server.';return}
    if(!to.value.trim()){status.textContent='Enter at least one recipient.';return}
    localStorage.setItem('partypostergen-mailer-url',url);
    send.disabled=true;status.textContent='Preparing poster…';
    try{
      const canvas=getCanvas();
      const png=canvas.toDataURL('image/png');
      const payload={to:to.value,subject:subject.value.trim(),text:body.value,attachment:{filename:`${getFilename()}.png`,mime:'image/png',base64:dataUrlToBase64(png)}};
      status.textContent='Sending…';
      const res=await fetch(`${url}/api/send-poster`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token.value}`},body:JSON.stringify(payload)});
      const out=await res.json().catch(()=>({}));
      if(!res.ok)throw new Error(out.error||`Mailer returned ${res.status}`);
      status.textContent=`Sent to ${out.accepted||'recipient'}.`;
    }catch(e){status.textContent=`Could not send: ${e.message}`}
    finally{send.disabled=false}
  };
}
