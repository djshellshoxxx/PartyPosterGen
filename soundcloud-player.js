// PartyPosterGen by Circuit Drift Labs.
import {SOUNDCLOUD_TRACKS} from './soundcloud-tracks.js';

const VOLUME = 35;
const WIDGET_API = 'https://w.soundcloud.com/player/api.js';
const EXCLUDED = ['https://soundcloud.com/djshoxx/pocketlol'];
const SECOND_TRACK_TAGS = /\b(underground|rave|party|hardhouse|hard house|trance)\b/i;

const normalize = url => String(url).trim().split(/[?#]/)[0].replace(/\/+$/, '').toLowerCase();
const POOL = [...new Set(SOUNDCLOUD_TRACKS.filter(Boolean).map(normalize))].filter(url => !EXCLUDED.includes(url));
const label = url => url.replace(/^https?:\/\/soundcloud\.com\//, '');
const embedUrl = url => `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true&visual=false&show_comments=false&hide_related=true`;

// Cryptographic randomness, so the order is not predictable from the page load time.
const randomIndex = n => {const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n};
const shuffled = list => {const a = [...list]; for (let i = a.length - 1; i > 0; i--) {const j = randomIndex(i + 1); [a[i], a[j]] = [a[j], a[i]]} return a};

function loadWidgetApi() {
 if (window.SC?.Widget) return Promise.resolve();
 return new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = WIDGET_API;
  script.onload = resolve;
  script.onerror = () => reject(new Error('SoundCloud widget API failed to load'));
  document.head.appendChild(script);
 });
}

export async function initSoundcloudPlayer() {
 const frame = document.querySelector('#scFrame'), button = document.querySelector('#scShuffle'), status = document.querySelector('#scStatus');
 if (!frame || !button || !status) return;
 if (!POOL.length) {
  status.textContent = 'No tracks loaded yet. Add track URLs to soundcloud-tracks.js.';
  button.disabled = true;
  return;
 }

 let widget, order = shuffled(POOL), secondPlayed = false;
 try {
  await loadWidgetApi();
 } catch (error) {
  status.textContent = error.message;
  return;
 }

 const setStatus = text => {status.textContent = text};

 // Look through the remaining tracks until one has a matching tag, then play it.
 const findSecondTrack = () => {
  const next = order.shift();
  if (!next) {
   setStatus('First track finished. No underground, rave, party, hardhouse or trance track found.');
   return;
  }
  widget.load(next, {auto_play: false, callback: () => widget.getCurrentSound(sound => {
   if (sound && SECOND_TRACK_TAGS.test(sound.tag_list || '')) {
    widget.setVolume(VOLUME);
    widget.play();
    setStatus(`Now playing: ${label(next)}`);
   } else {
    findSecondTrack();
   }
  })});
 };

 const onFinish = () => {
  if (secondPlayed) return;
  secondPlayed = true;
  setStatus('First track finished. Looking for a matching second track...');
  findSecondTrack();
 };

 const first = order.shift();
 frame.src = embedUrl(first);
 widget = SC.Widget(frame);
 widget.bind(SC.Widget.Events.READY, () => {
  widget.setVolume(VOLUME);
  widget.play();
  setStatus(`Now playing: ${label(first)}`);
 });
 widget.bind(SC.Widget.Events.FINISH, onFinish);

 // Browsers block autoplay with sound until the visitor interacts. Start on the first click if so.
 document.addEventListener('pointerdown', () => widget.isPaused(paused => {
  if (paused) widget.play();
 }), {once: true});

 button.onclick = () => {
  if (!order.length) order = shuffled(POOL);
  secondPlayed = false;
  const url = order.shift();
  widget.load(url, {auto_play: true, visual: false, show_comments: false, callback: () => {
   widget.setVolume(VOLUME);
   widget.play();
   setStatus(`Now playing: ${label(url)}`);
  }});
 };
}
