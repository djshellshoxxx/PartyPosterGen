import assert from 'node:assert/strict';
import {createSeededRandom} from '../render-random.js';
import {createProjectDocument,validateProjectDocument,PROJECT_FILE_VERSION} from '../project-state.js';

const a=createSeededRandom(42),b=createSeededRandom(42),c=createSeededRandom(43);
const seqA=Array.from({length:6},()=>a());
const seqB=Array.from({length:6},()=>b());
const seqC=Array.from({length:6},()=>c());
assert.deepEqual(seqA,seqB,'same seed must reproduce the same render sequence');
assert.notDeepEqual(seqA,seqC,'different seeds should produce a different render sequence');
assert.ok(seqA.every(v=>v>=0&&v<1));

const doc=createProjectDocument({title:'STATIC BLOOM',template:'neon',palette:2,variation:7,imageX:.4,imageY:.6,imageScale:1.2},{preset:'story',format:'png'},'data:image/png;base64,AAAA');
assert.equal(doc.version,PROJECT_FILE_VERSION);
assert.equal(doc.state.title,'STATIC BLOOM');
assert.equal(doc.output.preset,'story');
assert.equal(doc.imageDataUrl,'data:image/png;base64,AAAA');
assert.equal(validateProjectDocument(doc).ok,true);
assert.equal(validateProjectDocument({version:999,state:{},output:{}}).ok,false);
assert.equal(validateProjectDocument(null).ok,false);
console.log('PartyPosterGen project/render tests: PASS');
