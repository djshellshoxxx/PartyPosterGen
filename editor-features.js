const clamp=(v,min,max)=>Math.max(min,Math.min(max,Number(v)));
const copy=v=>JSON.parse(JSON.stringify(v));
const BORDER_STYLES=new Set(['none','thin','double','thick','rounded','dashed','dotted','neon','grunge','luxury','tape']);
const EFFECTS=new Set(['none','rain','mist','fog','haze','lightleak','vignette']);
const WASH_TYPES=new Set(['none','linear','radial','diagonal','vertical','horizontal']);
const PATTERNS=new Set(['none','stripes','dots','checker','grid','zigzag','halftone','noise']);

export function createHistory(initialState={},limit=75){
 let past=[copy(initialState)],future=[];
 return{
  push(next){past.push(copy(next));if(past.length>Math.max(2,limit))past.shift();future=[];return copy(next)},
  undo(){if(past.length<=1)return copy(past[0]);future.unshift(past.pop());return copy(past[past.length-1])},
  redo(){if(!future.length)return copy(past[past.length-1]);const next=future.shift();past.push(copy(next));return copy(next)},
  canUndo(){return past.length>1},canRedo(){return future.length>0},
  reset(next={}){past=[copy(next)];future=[]}
 };
}
export function normalizeQrState(value={}){return{enabled:Boolean(value.enabled),text:String(value.text||''),x:clamp(value.x??.78,0,1),y:clamp(value.y??.78,0,1),size:clamp(value.size??.14,.04,1),backing:value.backing!==false,label:String(value.label||'')}}
export function normalizeBorderState(value={}){return{style:BORDER_STYLES.has(value.style)?value.style:'none',color:/^#[0-9a-f]{6}$/i.test(value.color||'')?value.color:'#ffffff',width:clamp(value.width??18,1,120),inset:clamp(value.inset??20,0,220),opacity:clamp(value.opacity??1,0,1)}}
export function normalizeBackgroundFxState(value={}){return{effect:EFFECTS.has(value.effect)?value.effect:'none',intensity:clamp(value.intensity??.45,0,1),opacity:clamp(value.opacity??.35,0,1),washType:WASH_TYPES.has(value.washType)?value.washType:'none',washColor1:/^#[0-9a-f]{6}$/i.test(value.washColor1||'')?value.washColor1:'#ff2fb2',washColor2:/^#[0-9a-f]{6}$/i.test(value.washColor2||'')?value.washColor2:'#6ef2ff',washOpacity:clamp(value.washOpacity??.25,0,1),pattern:PATTERNS.has(value.pattern)?value.pattern:'none',patternColor:/^#[0-9a-f]{6}$/i.test(value.patternColor||'')?value.patternColor:'#ffffff',patternOpacity:clamp(value.patternOpacity??.18,0,1),patternScale:clamp(value.patternScale??1,.1,4),baseMode:['art','solid','gradient'].includes(value.baseMode)?value.baseMode:'art',baseColor1:/^#[0-9a-f]{6}$/i.test(value.baseColor1||'')?value.baseColor1:'#07070b',baseColor2:/^#[0-9a-f]{6}$/i.test(value.baseColor2||'')?value.baseColor2:'#ff2fb2'}}
export function normalizeTearoffState(value={}){return{enabled:Boolean(value.enabled),text:String(value.text||''),alternateText:String(value.alternateText||''),count:Math.round(clamp(value.count??8,2,20)),height:clamp(value.height??.16,.07,.35),orientation:['vertical','horizontal'].includes(value.orientation)?value.orientation:'vertical',lineStyle:['solid','dashed','dotted'].includes(value.lineStyle)?value.lineStyle:'dashed',color:/^#[0-9a-f]{6}$/i.test(value.color||'')?value.color:'#ffffff',background:/^#[0-9a-f]{6}$/i.test(value.background||'')?value.background:'#ffffff',textColor:/^#[0-9a-f]{6}$/i.test(value.textColor||'')?value.textColor:'#111111',opacity:clamp(value.opacity??.96,0,1)}}
