// PartyPosterGen by Circuit Drift Labs.
// Track URLs from the DJ Shell Shox SoundCloud profiles. The shuffle player picks one at random.
// To fill: open a profile /tracks page, scroll to the bottom, paste this into the browser console:
// (()=>{const u=[...new Set([...document.querySelectorAll("a.soundTitle__title")].map(a=>a.href.split("?")[0]))];copy(u.map(x=>`  "${x}",`).join("\n"));console.log(u.length+" tracks copied")})();
// Then paste the copied lines between the brackets below. Repeat for each profile.
export const SOUNDCLOUD_TRACKS=[
];
