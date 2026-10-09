import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../app-v2.js',import.meta.url),'utf8');
const start=source.indexOf('function drawSymbol('),end=source.indexOf('\nfunction wrapText',start);
assert(start>=0&&end>start,'layer renderers found');
let operations=0;
const gradient={addColorStop(){}};
const ctx=new Proxy({globalAlpha:1,measureText(t){return {width:String(t).length*12}},createRadialGradient(){return gradient},createLinearGradient(){return gradient},roundRect(){}}, {get(target,key){if(key in target)return target[key];return (...args)=>{operations++;}},set(target,key,value){target[key]=value;return true}});
const canvas={width:1080,height:1350};
const palettes=[['#07070b','#ff2fb2','#6ef2ff','#ffffff']];
const EFFECTS=['lens-flare','spotlights','confetti','glitter','scanlines','haze','lightning','storm-clouds','circuits','foam','fire','lava','waves','stars','snow','rain','spiderweb','cobwebs','crystals','money','fractal-spiral','fractal-tree','fractal-triangle','fractal-julia'];
const state={palette:0,cliparts:[],notices:[],images:[],effects:[],effectSettings:{},bodyFont:'Arial'};
const random=()=>.5;
const sandbox={ctx,canvas,palettes,state,random,Math,Image:function(){}};
vm.runInNewContext(`${source.slice(start,end)}\nglobalThis.drawSymbol=drawSymbol;globalThis.drawClipart=drawClipart;globalThis.drawNoticeSticker=drawNoticeSticker;globalThis.drawImageLayer=drawImageLayer;globalThis.drawEffects=drawEffects;`,sandbox);
const cliparts=['smiley','speaker','vinyl','turntable','synth','mic','headphones','spray','lightning','starburst','cassette','equalizer','crown','palm','sparkles','disco','flower','star','boombox','bottle','cocktail','no-smoking','no-drugs','no-drink-driving','id-card','ticket','location','clock','coat-check','cash','dj','security','trophy'];
for(const type of cliparts){const before=operations;sandbox.drawClipart({type,x:.75,y:.65,opacity:1});assert(operations>before,`${type} rendered`)}
for(const type of cliparts){const before=operations;sandbox.drawSymbol(type,400,450,30,palettes[0]);assert(operations>before,`${type} symbol rendered`)}
for(const id of EFFECTS){const before=operations;state.effects=[id];sandbox.drawEffects(id);assert(operations>before,`${id} effect rendered`)}
const before=operations;sandbox.drawNoticeSticker({text:'Searches will be done at the door',symbol:'security',x:.5,y:.5,opacity:.8});assert(operations>before,'notice sticker rendered');
sandbox.drawImageLayer({image:{width:640,height:480},x:.5,y:.5,scale:1,rotation:30,opacity:.8,outline:true});
console.log(`PartyPosterGen decoration tests: PASS (${cliparts.length} clip art, ${EFFECTS.length} effects, symbols, notice and image layers)`);
