# PartyPosterGen

**PartyPosterGen by Circuit Drift Labs** is a fast, template-first rave, DJ, hip-hop and party poster generator.

Live site: https://djshellshoxxx.github.io/PartyPosterGen/

Circuit Drift Labs: https://djshellshoxxx.github.io/circuitdriftlabs/

## What it does

PartyPosterGen is designed for making a usable flyer quickly rather than recreating Canva, Illustrator or a word processor.

Current browser build includes:

- 16 nightlife/party template families including rave, techno, trance, hip-hop, turntablism and synth-hardware styles
- all event fields optional
- title, tagline, date, time, venue, city, lineup, ticket price, age restriction, organizer, notes and ticket/RSVP URL
- uploaded local image placement, dragging and scaling
- 27 built-in procedural background styles including lasers, tunnel, speaker wall, vinyl, turntables, synth hardware, urban/graffiti, boombox, warehouse, starfield, Xerox/hardcore, acid blobs, oscilloscope waves, equalizer, circuitry, cyber grid, vortex, halftone, glitch, cassette, drum machine, layered rave flyers and Memphis geometry
- deterministic procedural rendering so download/email rerenders match the current poster variation
- 33 built-in clip-art and event-symbol choices, including multiple stickers, instrument art, alcohol and cocktail icons, no-smoking/no-drug/no-drink-driving symbols, ticket, ID, venue and security symbols
- curated Pexels stock backgrounds with procedural fallback
- multiple color palettes
- advanced font choices
- multiple simultaneous transparent effects with opacity controls, including lens flares, spotlights, confetti, glitter, scanlines, haze, lightning, storm clouds, circuits, foam, fire, lava, waves, stars, snow, rain, webs, crystals, money and four fractal treatments
- multiple uploaded image layers with individual position, scale, rotation, opacity and optional white outline
- reorderable text, image, clip-art, notice and effect layers with the background fixed behind them
- solid or gradient backgrounds and one-click color inversion
- optional independent text and background colors, opacity, font size, bold, italic, underline and strike-through for each event field
- overlay/grain controls
- layout density controls
- editable promoter notice stickers for age policies, BYOB, door checks, ticketing, dress code, re-entry, coat check, payment and event rules
- QR code generation for ticket/RSVP URLs
- print and social output presets
- PNG/JPG download
- browser Print / Save as PDF workflow
- visible **Email Poster** action with premade invite, promo, venue, community and minimal messages
- optional self-hosted SMTP mail service in `server/`
- editable project save/load using `.partyposter.json`, including poster settings and uploaded image data

No field is mandatory. Empty fields collapse out of the composition.

## Output sizes

Included presets cover Instagram portrait, square, Story 9:16, high-resolution web poster, 5×7, Letter, 11×17, A5, A4 and A3.

## Saving editable projects

Use **Save Project** in the Output panel to download a versioned `.partyposter.json` file. It preserves event fields, template/style selections, palette, procedural variation, typography, image position/scale, output settings and the uploaded image itself. Use **Load Project** to reopen that editable state later.

Project files are JSON and are validated before being applied. Unsupported project versions are rejected rather than silently misread.

## Emailing posters

GitHub Pages cannot securely contain SMTP credentials, so PartyPosterGen separates the browser composer from the mail-delivery service.

The Output panel includes an **Email Poster** button. It attaches the currently rendered poster as PNG and offers premade message templates. The included `server/` service sends the message through SMTP.

The mail server includes:

- bearer-token authentication
- allowed-origin restriction
- rate limiting
- configurable maximum recipients per send
- configurable maximum attachment size
- server-side SMTP credentials only
- Dockerfile for simple deployment

Set up the service:

```bash
cd server
cp .env.example .env
# fill in SMTP and access-key values
npm install
npm start
```

Environment variables are documented in `server/.env.example`. Point the browser email panel at the HTTPS URL where you deploy the mailer. Do not put SMTP passwords in the GitHub Pages JavaScript.

## Licensed stock backgrounds

The app includes optional remote stock backgrounds from Pexels. Pexels states that its photos can be used for free, modified, and used in print marketing material such as flyers. Attribution is not required under the Pexels license but is retained here for provenance.

Current curated sources include nightlife, turntable, synthesizer/studio and urban/graffiti imagery. The generated/procedural backgrounds are original browser-rendered graphics and remain available if a stock image cannot load.

Pexels license: https://www.pexels.com/license/

## QR code library

QR rendering uses the MIT-licensed `qrcodejs` project. The poster editor itself does not require a backend.

## Privacy

Uploaded images and event data remain in the browser. They are sent off-device only when the user explicitly uses the email feature, in which case the rendered poster and entered email message are sent to the configured PartyPosterGen mail service for delivery.

## Development

The application is static HTML/CSS/JavaScript, plus an optional Node mail service.

```bash
node tests/poster-core.test.mjs
node tests/project-and-render.test.mjs
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
