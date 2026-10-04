export const PROJECT_FILE_VERSION=1;

const ALLOWED_OUTPUT_FORMATS=new Set(['png','jpg']);

export function createProjectDocument(state={},output={},imageDataUrl=''){
  const cleanState={...state};
  delete cleanState.image;
  delete cleanState.stockImages;
  return{
    app:'PartyPosterGen',
    version:PROJECT_FILE_VERSION,
    savedAt:new Date().toISOString(),
    state:cleanState,
    output:{preset:String(output.preset||'instagram'),format:ALLOWED_OUTPUT_FORMATS.has(output.format)?output.format:'png'},
    imageDataUrl:typeof imageDataUrl==='string'?imageDataUrl:''
  };
}

export function validateProjectDocument(doc){
  if(!doc||typeof doc!=='object')return{ok:false,error:'Project file is not valid JSON.'};
  if(doc.app!=='PartyPosterGen')return{ok:false,error:'This is not a PartyPosterGen project file.'};
  if(doc.version!==PROJECT_FILE_VERSION)return{ok:false,error:`Unsupported project file version: ${doc.version??'unknown'}.`};
  if(!doc.state||typeof doc.state!=='object'||Array.isArray(doc.state))return{ok:false,error:'Project state is missing or invalid.'};
  if(!doc.output||typeof doc.output!=='object'||Array.isArray(doc.output))return{ok:false,error:'Project output settings are missing or invalid.'};
  if(doc.imageDataUrl&&typeof doc.imageDataUrl!=='string')return{ok:false,error:'Project image data is invalid.'};
  return{ok:true};
}
