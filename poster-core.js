// PartyPosterGen™
// Copyright © 2026 Sheldon Davidson.
// Licensed under the MIT License. See LICENSE.
// SPDX-License-Identifier: MIT

export const PRESETS={
  instagram:{label:'Instagram 4:5',w:1080,h:1350,group:'social'},
  square:{label:'Square',w:1080,h:1080,group:'social'},
  story:{label:'Story 9:16',w:1080,h:1920,group:'social'},
  web:{label:'High-res web',w:1600,h:2000,group:'social'},
  fiveBySeven:{label:'5 × 7 in',w:1500,h:2100,group:'print'},
  letter:{label:'8.5 × 11 in',w:2550,h:3300,group:'print'},
  elevenBySeventeen:{label:'11 × 17 in',w:3300,h:5100,group:'print'},
  a5:{label:'A5',w:1748,h:2480,group:'print'},
  a4:{label:'A4',w:2480,h:3508,group:'print'},
  a3:{label:'A3',w:3508,h:4961,group:'print'}
};
export const TEMPLATES=[
  {id:'neon',name:'Neon Rave',tags:['neon','rave'],titleFont:'Impact',bodyFont:'Arial'},
  {id:'warehouse',name:'Warehouse Techno',tags:['industrial','minimal'],titleFont:'Arial Black',bodyFont:'Arial'},
  {id:'acid',name:'Psychedelic Acid',tags:['psychedelic','acid'],titleFont:'Impact',bodyFont:'Trebuchet MS'},
  {id:'y2k',name:'Y2K / Trance',tags:['y2k','trance'],titleFont:'Arial Black',bodyFont:'Verdana'},
  {id:'minimal',name:'Minimal Club',tags:['minimal','print'],titleFont:'Helvetica',bodyFont:'Arial'},
  {id:'retro',name:'Retro 90s Rave',tags:['90s','retro'],titleFont:'Impact',bodyFont:'Arial'},
  {id:'summer',name:'Beach / Summer',tags:['summer','bright'],titleFont:'Trebuchet MS',bodyFont:'Arial'},
  {id:'luxury',name:'Luxury Nightclub',tags:['luxury','dark'],titleFont:'Georgia',bodyFont:'Georgia'},
  {id:'grunge',name:'Street / Grunge',tags:['grunge','zine'],titleFont:'Impact',bodyFont:'Courier New'},
  {id:'photo',name:'Photo-driven DJ',tags:['photo','dj'],titleFont:'Arial Black',bodyFont:'Arial'},
  {id:'collage',name:'Collage / Zine',tags:['collage','zine'],titleFont:'Arial Black',bodyFont:'Courier New'},
  {id:'hiphop',name:'Urban Hip-Hop',tags:['hip-hop','urban'],titleFont:'Impact',bodyFont:'Arial Black'},
  {id:'turntablist',name:'Turntablism',tags:['vinyl','dj','hip-hop'],titleFont:'Arial Black',bodyFont:'Arial'},
  {id:'synthwave',name:'Synth Hardware',tags:['synth','electronic'],titleFont:'Arial Black',bodyFont:'Courier New'},
  {id:'hardcore',name:'Hardcore Xerox',tags:['hardcore','rave','photocopy'],titleFont:'Impact',bodyFont:'Courier New'},
  {id:'blank',name:'Blank Quick Layout',tags:['clean','neutral'],titleFont:'Arial Black',bodyFont:'Arial'}
];
export const BACKGROUND_STYLES=[
  {id:'waves',label:'Rave waves'},{id:'laser',label:'Laser fan'},{id:'tunnel',label:'Infinite tunnel'},
  {id:'speakers',label:'Speaker wall'},{id:'vinyl',label:'Giant vinyl'},{id:'turntable',label:'Turntables + mixer'},
  {id:'synth',label:'Synth panel + keys'},{id:'urban',label:'Urban skyline / graffiti'},{id:'boombox',label:'Boombox'},
  {id:'checker',label:'Checker rave'},{id:'chrome',label:'Chrome rings'},{id:'sunset',label:'Retro sunset'},
  {id:'warehouse',label:'Warehouse grid'},{id:'starfield',label:'Starfield'},{id:'xerox',label:'Xerox / hardcore'},
  {id:'acidblobs',label:'Acid liquid blobs'},{id:'oscilloscope',label:'Oscilloscope waves'},{id:'equalizer',label:'Equalizer wall'},
  {id:'circuitry',label:'Techno circuitry'},{id:'cybergrid',label:'Cyber perspective grid'},{id:'vortex',label:'Spiral vortex'},
  {id:'halftone',label:'Halftone dots'},{id:'glitch',label:'Digital glitch blocks'},{id:'cassette',label:'Cassette deck'},
  {id:'drummachine',label:'Drum machine sequencer'},{id:'flyers',label:'Layered rave flyers'},{id:'memphis',label:'Memphis geometry'},
  {id:'mirrorball',label:'Mirrorball spotlights'},{id:'strobe',label:'Strobe light bars'},{id:'confetti',label:'Confetti burst'},
  {id:'starburst',label:'Starburst rays'},{id:'kaleidoscope',label:'Kaleidoscope'},{id:'zigzag',label:'Zigzag stripes'},
  {id:'rings',label:'Hypnotic rings'},{id:'plasma',label:'Plasma field'},{id:'searchlights',label:'Searchlight beams'},
  {id:'bubbles',label:'Lava bubbles'}
];
export const SYSTEM_FONTS=['Impact','Arial Black','Arial','Helvetica','Georgia','Trebuchet MS','Courier New','Verdana'];
export const BUNDLED_FONTS=[
  {family:'Monoton',file:'Monoton-Regular.ttf'},{family:'Bungee',file:'Bungee-Regular.ttf'},{family:'Orbitron',file:'Orbitron-Variable.ttf'},
  {family:'Anton',file:'Anton-Regular.ttf'},{family:'Bebas Neue',file:'BebasNeue-Regular.ttf'},{family:'Righteous',file:'Righteous-Regular.ttf'},
  {family:'Audiowide',file:'Audiowide-Regular.ttf'},{family:'Russo One',file:'RussoOne-Regular.ttf'},{family:'Pacifico',file:'Pacifico-Regular.ttf'},
  {family:'Bangers',file:'Bangers-Regular.ttf'}
];
export function safeFilename(value='party-poster'){const s=String(value).normalize('NFKD').replace(/[^\w\- ]+/g,'').trim().replace(/\s+/g,'-').toLowerCase();return s||'party-poster'}
export function splitLineup(value=''){return String(value).split(/\n|,|•|\//).map(s=>s.trim()).filter(Boolean)}
export function present(value){return String(value??'').trim().length>0}
export function compactDetails(state={}){return [state.date,state.time,state.venue,state.city,state.price,state.age].filter(present)}
export function preset(id){return PRESETS[id]||PRESETS.instagram}
export function template(id){return TEMPLATES.find(t=>t.id===id)||TEMPLATES[0]}
export function aspect(id){const p=preset(id);return p.w/p.h}
export function fontSizeForText(text,base,min=18,maxChars=28){const n=String(text||'').length;if(n<=maxChars)return base;return Math.max(min,base*(maxChars/n)**.62)}
