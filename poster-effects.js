function hexToRgba(hex,alpha=1){const v=String(hex||'#ffffff').replace('#','');const n=parseInt(v.length===3?v.split('').map(x=>x+x).join(''):v,16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`}
function lineDash(ctx,style,w){ctx.setLineDash(style==='dashed'?[w*2,w*1.4]:style==='dotted'?[w*.25,w*1.2]:[])}

export function renderBackgroundBase(ctx,canvas,state){
 const w=canvas.width,h=canvas.height,mode=state.backgroundBaseMode||'art';
 if(mode==='art')return false;
 if(mode==='solid'){ctx.fillStyle=state.backgroundColor1||'#07070b';ctx.fillRect(0,0,w,h)}
 else{const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,state.backgroundColor1||'#07070b');g.addColorStop(1,state.backgroundColor2||'#ff2fb2');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
 return true;
}

export function renderPattern(ctx,canvas,state,random){
 const type=state.backgroundPattern||'none';if(type==='none')return;
 const w=canvas.width,h=canvas.height,scale=Math.max(.1,Number(state.backgroundPatternScale)||1),step=Math.max(12,w*.045*scale),alpha=Math.max(0,Math.min(1,Number(state.backgroundPatternOpacity)||.18)),color=hexToRgba(state.backgroundPatternColor||'#ffffff',alpha);
 ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=Math.max(1,w*.0025);
 if(type==='stripes'){for(let x=-h;x<w+h;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x-h,h);ctx.stroke()}}
 else if(type==='dots'){for(let y=step/2;y<h;y+=step)for(let x=step/2;x<w;x+=step){ctx.beginPath();ctx.arc(x,y,step*.12,0,Math.PI*2);ctx.fill()}}
 else if(type==='checker'){for(let y=0;y<h;y+=step)for(let x=0;x<w;x+=step)if(((x/step+y/step)|0)%2===0)ctx.fillRect(x,y,step,step)}
 else if(type==='grid'){for(let x=0;x<w;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}}
 else if(type==='zigzag'){for(let y=step;y<h;y+=step){ctx.beginPath();for(let x=0;x<=w;x+=step/2){const yy=y+(((x/(step/2))|0)%2?step*.22:-step*.22);x===0?ctx.moveTo(x,yy):ctx.lineTo(x,yy)}ctx.stroke()}}
 else if(type==='halftone'){for(let y=0;y<h;y+=step)for(let x=0;x<w;x+=step){const d=Math.hypot(x-w*.6,y-h*.4)/Math.hypot(w,h),r=step*(.04+.28*(1-Math.min(1,d)));ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}}
 else if(type==='noise'){for(let i=0;i<Math.floor(w*h/5000);i++)ctx.fillRect(random()*w,random()*h,Math.max(1,w*.003*random()),Math.max(1,w*.003*random()))}
 else if(type==='topography'){for(let ring=0;ring<18;ring++){ctx.beginPath();for(let a=0;a<=Math.PI*2+.05;a+=.12){const rad=(ring+2)*step*.28*(1+.08*Math.sin(a*5+ring)),x=w*.5+Math.cos(a)*rad,y=h*.5+Math.sin(a)*rad*.72;a===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.stroke()}}
 else if(type==='hex'){const r=step*.42,dx=r*1.5,dy=Math.sqrt(3)*r;for(let row=-1,y=0;y<h+dy;row++,y+=dy){for(let x=(row%2?0:dx*.5);x<w+dx;x+=dx){ctx.beginPath();for(let i=0;i<6;i++){const a=Math.PI/3*i,px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();ctx.stroke()}}}
 else if(type==='sunburst'){ctx.save();ctx.translate(w*.5,h*.5);for(let i=0;i<32;i+=2){ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,Math.hypot(w,h),i*Math.PI/16,(i+1)*Math.PI/16);ctx.closePath();ctx.fill()}ctx.restore()}
 else if(type==='barcode'){for(let x=0;x<w;){const bw=step*(.08+random()*.32);ctx.fillRect(x,0,bw,h);x+=bw+step*(.08+random()*.2)}}
 else if(type==='bubbles'){for(let i=0;i<55;i++){ctx.beginPath();ctx.arc(random()*w,random()*h,step*(.12+random()*.65),0,Math.PI*2);ctx.stroke()}}
 ctx.restore();
}

export function renderWash(ctx,canvas,state){
 const type=state.backgroundWashType||'none';if(type==='none')return;
 const w=canvas.width,h=canvas.height,a=Math.max(0,Math.min(1,Number(state.backgroundWashOpacity)||.25)),c1=hexToRgba(state.backgroundWashColor1||'#ff2fb2',a),c2=hexToRgba(state.backgroundWashColor2||'#6ef2ff',a),c3=hexToRgba(state.backgroundWashColor3||'#6d5cff',a);
 let g;
 if(type==='radial')g=ctx.createRadialGradient(w*.5,h*.45,0,w*.5,h*.45,Math.max(w,h)*.75);
 else if(type==='vertical')g=ctx.createLinearGradient(0,0,0,h);
 else if(type==='horizontal')g=ctx.createLinearGradient(0,0,w,0);
 else if(type==='diagonal'||type==='three')g=ctx.createLinearGradient(0,h,w,0);
 else g=ctx.createLinearGradient(0,0,w,h);
 g.addColorStop(0,c1);if(type==='three')g.addColorStop(.5,c3);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
}

export function renderBackgroundEffect(ctx,canvas,state,random){
 const type=state.backgroundEffect||'none';if(type==='none')return;
 const w=canvas.width,h=canvas.height,a=Math.max(0,Math.min(1,Number(state.backgroundEffectOpacity)||.35)),intensity=Math.max(0,Math.min(1,Number(state.backgroundEffectIntensity)||.45)),color=hexToRgba(state.backgroundEffectColor||'#d8eaff',a);
 ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;
 if(type==='rain'){ctx.lineWidth=Math.max(1,w*.0018);for(let i=0;i<80+Math.floor(intensity*220);i++){const x=random()*w,y=random()*h,len=h*(.012+random()*.045);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-w*.018,y+len);ctx.stroke()}}
 else if(type==='mist'||type==='fog'||type==='haze'){const n=type==='fog'?28:type==='mist'?18:10;for(let i=0;i<n+Math.floor(intensity*24);i++){const x=random()*w,y=random()*h,r=Math.min(w,h)*(.08+random()*(type==='fog'?.3:.18));const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,hexToRgba(state.backgroundEffectColor||'#d8eaff',a*(.18+intensity*.25)));g.addColorStop(1,hexToRgba(state.backgroundEffectColor||'#d8eaff',0));ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)}}
 else if(type==='lightleak'){for(let i=0;i<4+Math.floor(intensity*6);i++){const x=random()*w,y=random()*h,r=Math.max(w,h)*(.12+random()*.32);const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,hexToRgba(i%2?state.backgroundEffectColor||'#ff8a55':'#ff2fb2',a*.7));g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}}
 else if(type==='vignette'){const g=ctx.createRadialGradient(w*.5,h*.5,Math.min(w,h)*.22,w*.5,h*.5,Math.max(w,h)*.72);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${Math.min(.9,a*(.8+intensity))})`);ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
 ctx.restore();
}

export function renderBorder(ctx,canvas,state,random){
 const style=state.borderStyle||'none';if(style==='none')return;
 const w=canvas.width,h=canvas.height,base=Math.max(1,Number(state.borderWidth)||18),inset=Math.max(0,Number(state.borderInset)||20),a=Math.max(0,Math.min(1,Number(state.borderOpacity)||1)),color=hexToRgba(state.borderColor||'#ffffff',a);
 ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=style==='thin'?Math.max(2,base*.35):style==='thick'?base*1.7:base;lineDash(ctx,style,base);
 const x=inset,y=inset,rw=w-inset*2,rh=h-inset*2;
 if(style==='double'){ctx.strokeRect(x,y,rw,rh);const d=base*1.3;ctx.strokeRect(x+d,y+d,rw-d*2,rh-d*2)}
 else if(style==='rounded'){const rad=Math.min(80,base*3);ctx.beginPath();ctx.roundRect(x,y,rw,rh,rad);ctx.stroke()}
 else if(style==='neon'){ctx.shadowColor=state.borderColor||'#ffffff';ctx.shadowBlur=base*2.5;ctx.strokeRect(x,y,rw,rh);ctx.shadowBlur=base*.7;ctx.strokeRect(x+base,y+base,rw-base*2,rh-base*2)}
 else if(style==='grunge'){for(let i=0;i<18;i++){ctx.globalAlpha=a*(.3+random()*.7);ctx.lineWidth=Math.max(1,base*(.25+random()));const d=random()*base*2;ctx.strokeRect(x+d,y+d,rw-d*2,rh-d*2)}}
 else if(style==='luxury'){ctx.strokeRect(x,y,rw,rh);const d=base*1.8;ctx.strokeRect(x+d,y+d,rw-d*2,rh-d*2);for(const [cx,cy] of [[x,y],[x+rw,y],[x,y+rh],[x+rw,y+rh]]){ctx.beginPath();ctx.arc(cx,cy,base*1.3,0,Math.PI*2);ctx.stroke()}}
 else if(style==='tape'){const tw=w*.16,th=base*2.6;for(const [tx,ty,rot] of [[w*.08,h*.05,-.12],[w*.78,h*.05,.1],[w*.08,h*.91,.08],[w*.78,h*.91,-.1]]){ctx.save();ctx.translate(tx,ty);ctx.rotate(rot);ctx.fillRect(0,0,tw,th);ctx.restore()}}
 else ctx.strokeRect(x,y,rw,rh);
 ctx.restore();
}

export function renderTearOffs(ctx,canvas,state){
 if(!state.tearoffEnabled)return;
 const w=canvas.width,h=canvas.height,count=Math.max(2,Math.min(20,Math.round(Number(state.tearoffCount)||8))),height=h*Math.max(.07,Math.min(.35,Number(state.tearoffHeight)||.16)),top=h-height,tabW=w/count,bg=state.tearoffBackground||'#ffffff',fg=state.tearoffTextColor||'#111111',border=state.tearoffBorderColor||'#222222';
 ctx.save();ctx.globalAlpha=.98;ctx.fillStyle=bg;ctx.fillRect(0,top,w,height);ctx.strokeStyle=border;ctx.lineWidth=Math.max(1,w*.0015);lineDash(ctx,state.tearoffLineStyle||'dashed',Math.max(2,w*.0025));ctx.beginPath();ctx.moveTo(0,top);ctx.lineTo(w,top);ctx.stroke();
 for(let i=0;i<=count;i++){const x=i*tabW;ctx.beginPath();ctx.moveTo(x,top);ctx.lineTo(x,h);ctx.stroke()}
 if(state.tearoffShowCutMarks!==false){ctx.setLineDash([]);ctx.fillStyle=border;for(let i=1;i<count;i++){const x=i*tabW;ctx.fillRect(x-w*.004,top-w*.006,w*.008,w*.012)}}
 ctx.fillStyle=fg;ctx.textAlign='center';ctx.textBaseline='middle';const label=String(state.tearoffLabel||'');if(label){ctx.font=`700 ${Math.max(10,w*.015)}px Arial`;ctx.fillText(label,w*.5,top+height*.08)}
 const text=String(state.tearoffText||''),alt=String(state.tearoffAltText||'');for(let i=0;i<count;i++){const cx=i*tabW+tabW/2,cy=top+height*.55,body=i%2&&alt?alt:text;if(!body)continue;ctx.save();ctx.translate(cx,cy);const o=state.tearoffOrientation||'vertical';if(o==='vertical')ctx.rotate(-Math.PI/2);else if(o==='vertical-reverse')ctx.rotate(Math.PI/2);ctx.font=`700 ${Math.max(10,Math.min(tabW*.22,height*.09))}px Arial`;ctx.fillText(body,0,0);ctx.restore()}
 ctx.restore();
}
