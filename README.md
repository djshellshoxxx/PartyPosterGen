# PartyPosterGen

**PartyPosterGen by Circuit Drift Labs** is a fast, template-first rave, DJ and party poster generator that runs entirely in the browser.

Live site: https://djshellshoxxx.github.io/PartyPosterGen/

Circuit Drift Labs: https://circuitdriftlabs.djshellshoxxx.github.io/

## What it does

PartyPosterGen is designed for making a usable flyer quickly rather than recreating Canva, Illustrator or a word processor.

Current V1 includes:

- 12 nightlife/party poster template families
- all event fields optional
- title, tagline, date, time, venue, city, lineup, ticket price, age restriction, organizer, notes and ticket/RSVP URL
- uploaded local images
- direct image dragging on the poster
- image scaling
- generated procedural backgrounds
- curated Pexels stock backgrounds with procedural fallback
- multiple color palettes
- advanced font choices
- overlay/grain controls
- layout density controls
- QR code generation for ticket/RSVP URLs
- print and social output presets
- PNG/JPG download
- browser Print / Save as PDF workflow
- output rerendered at the selected preset resolution

No field is mandatory. Empty fields collapse out of the composition.

## Output sizes

Included presets cover Instagram portrait, square, Story 9:16, high-resolution web poster, 5×7, Letter, 11×17, A5, A4 and A3.

## Licensed stock backgrounds

The app includes optional remote stock backgrounds from Pexels. Pexels states that its photos can be used for free, modified, and used in print marketing material such as flyers. Attribution is not required under the Pexels license but is retained here for provenance.

Current curated sources:

- Daniel Nouri — Colored Lights in the Club: https://www.pexels.com/photo/colored-lights-in-the-club-8448565/
- Maor Attias — People Dancing in Nightclub: https://www.pexels.com/photo/people-dancing-in-nightclub-5192299/
- Caleb Oquendo — People on Party in Club: https://www.pexels.com/photo/people-on-party-in-club-10024815/
- Pexels license: https://www.pexels.com/license/

The generated/procedural backgrounds are original browser-rendered graphics and remain available if a stock image cannot load.

## QR code library

QR rendering uses the MIT-licensed `qrcodejs` project by David Shim via jsDelivr/GitHub. The rest of the app does not require a backend.

## Privacy

Uploaded images and event data remain in the browser. PartyPosterGen does not upload project contents to Circuit Drift Labs.

## Development

The application is static HTML/CSS/JavaScript.

```bash
node tests/poster-core.test.mjs
```

## Specification

See `spec/` for the product, GUI, template, licensing, export, architecture and testing specifications.

## Related Circuit Drift Labs tools

- TrackStats: https://djshellshoxxx.github.io/trackstats/
- Transposition Calculator: https://djshellshoxxx.github.io/TranspositionCalc/
- MIDItest: https://djshellshoxxx.github.io/Miditest/
- LoudnessBatch: https://djshellshoxxx.github.io/loudnessbatch/

Experiments:

- Binaural Web Beats: https://djshellshoxxx.github.io/binerualwebeats/
- BabbleForge: https://djshellshoxxx.github.io/babbleforge/
