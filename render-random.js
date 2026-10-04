export function createSeededRandom(seed=1){
  let x=(Number(seed)||1)>>>0;
  return()=>{
    x+=0x6d2b79f5;
    let t=x;
    t=Math.imul(t^(t>>>15),t|1);
    t^=t+Math.imul(t^(t>>>7),t|61);
    return((t^(t>>>14))>>>0)/4294967296;
  };
}
