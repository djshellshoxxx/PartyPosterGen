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
  {id:'blank',name:'Blank Quick Layout',tags:['clean','neutral'],titleFont:'Arial Black',bodyFont:'Arial'}
];
export function safeFilename(value='party-poster'){const s=String(value).normalize('NFKD').replace(/[^\w\- ]+/g,'').trim().replace(/\s+/g,'-').toLowerCase();return s||'party-poster'}
export function splitLineup(value=''){return String(value).split(/\n|,|•|\//).map(s=>s.trim()).filter(Boolean)}
export function present(value){return String(value??'').trim().length>0}
export function compactDetails(state={}){return [state.date,state.time,state.venue,state.city,state.price,state.age].filter(present)}
export function preset(id){return PRESETS[id]||PRESETS.instagram}
export function template(id){return TEMPLATES.find(t=>t.id===id)||TEMPLATES[0]}
export function aspect(id){const p=preset(id);return p.w/p.h}
export function fontSizeForText(text,base,min=18,maxChars=28){const n=String(text||'').length;if(n<=maxChars)return base;return Math.max(min,base*(maxChars/n)**.62)}
