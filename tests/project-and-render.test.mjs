import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
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

const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
assert.match(html,/id="emailPoster"/,'email action must be visible in the editor GUI');
assert.match(html,/id="saveProject"/,'save project action must be visible in the editor GUI');
assert.match(html,/id="loadProject"/,'load project action must be visible in the editor GUI');
assert.match(html,/id="projectFile"/,'project loader input must exist');
console.log('PartyPosterGen project/render tests: PASS');
