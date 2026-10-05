import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHistory,normalizeQrState,normalizeBorderState,normalizeBackgroundFxState,normalizeTearoffState,BACKGROUND_PATTERNS,BACKGROUND_EFFECTS,BORDER_STYLES} from '../editor-features.js';

const history=createHistory({value:0},3);
history.push({value:1});
history.push({value:2});
assert.deepEqual(history.undo(),{value:1});
assert.deepEqual(history.undo(),{value:0});
assert.deepEqual(history.redo(),{value:1});
history.push({value:9});
assert.equal(history.canRedo(),false,'new changes after undo must clear redo history');

const qr=normalizeQrState({enabled:true,text:'hello',x:2,y:-1,size:2});
assert.equal(qr.enabled,true);
assert.equal(qr.text,'hello');
assert.equal(qr.x,1);
assert.equal(qr.y,0);
assert.equal(qr.size,1);

const border=normalizeBorderState({style:'double',color:'#ff00aa',width:999,inset:-5,opacity:2});
assert.equal(border.style,'double');
assert.equal(border.width,120);
assert.equal(border.inset,0);
assert.equal(border.opacity,1);

const fx=normalizeBackgroundFxState({effect:'fog',intensity:3,opacity:-1,washType:'radial',washColor1:'#112233',washColor2:'#445566',pattern:'dots',patternScale:0});
assert.equal(fx.effect,'fog');
assert.equal(fx.intensity,1);
assert.equal(fx.opacity,0);
assert.equal(fx.patternScale,.1);

const tear=normalizeTearoffState({enabled:true,text:'CALL 604-555-0119',alternateText:'example.com',count:99,height:.9,orientation:'vertical',lineStyle:'dashed'});
assert.equal(tear.enabled,true);
assert.equal(tear.count,20);
assert.equal(tear.height,.35);
assert.equal(tear.orientation,'vertical');
assert.equal(tear.lineStyle,'dashed');

for(const value of ['topography','hex','sunburst','barcode','bubbles']) assert.ok(BACKGROUND_PATTERNS.includes(value),`missing pattern ${value}`);
for(const value of ['rain','mist','fog','haze','lightleak','vignette']) assert.ok(BACKGROUND_EFFECTS.includes(value),`missing effect ${value}`);
for(const value of ['double','neon','grunge','luxury','tape']) assert.ok(BORDER_STYLES.includes(value),`missing border ${value}`);

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
for(const id of ['undo','redo','backgroundUpload','backgroundFit','backgroundX','backgroundY','backgroundScale','backgroundBaseMode','backgroundPattern','backgroundEffect','backgroundWashType','borderStyle','qrEnabled','qrText','qrSize','qrX','qrY','tearoffEnabled','tearoffText','tearoffAltText','tearoffCount','tearoffHeight','tearoffOrientation','tearoffLineStyle','backgroundColor1','backgroundColor2','backgroundEffectColor','backgroundWashColor1','backgroundWashColor2','backgroundWashColor3','borderColor','borderWidth','borderInset','qrLabel','qrBacking','tearoffLabel','tearoffShowCutMarks']){
  assert.match(html,new RegExp(`id=["']${id}["']`),`missing editor control #${id}`);
}
const app=fs.readFileSync(new URL('../app-v2.js',import.meta.url),'utf8');
assert.doesNotMatch(app,/\$\('\[data-field\]'\)\.forEach/,'data-field binding must use querySelectorAll');
assert.doesNotMatch(app,/\$\('\.bg'\)\.forEach/,'background button binding must use querySelectorAll');
console.log('PartyPosterGen editor feature tests: PASS');
