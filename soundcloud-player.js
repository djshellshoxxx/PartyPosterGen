// PartyPosterGen by Circuit Drift Labs.
import {SOUNDCLOUD_TRACKS} from './soundcloud-tracks.js';

const embedUrl=url=>`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true&hide_related=true&show_comments=false&show_user=true&visual=false`;

export function initSoundcloudPlayer(){
 const frame=document.querySelector('#scFrame'),button=document.querySelector('#scShuffle'),status=document.querySelector('#scStatus');
 if(!frame||!button||!status)return;
 const tracks=[...new Set(SOUNDCLOUD_TRACKS.filter(Boolean))];
 let last=-1;
 const setStatus=text=>{status.textContent=text};
 if(!tracks.length){setStatus('No tracks loaded yet. Add track URLs to soundcloud-tracks.js.');button.disabled=true;return}
 setStatus(`${tracks.length} tracks ready. Press shuffle.`);
 button.onclick=()=>{
  let i;
  do{i=Math.floor(Math.random()*tracks.length)}while(tracks.length>1&&i===last);
  last=i;
  frame.src=embedUrl(tracks[i]);
  setStatus(`Now playing: ${tracks[i].replace(/^https?:\/\/soundcloud\.com\//,'')}`);
 };
}
