# PartyPosterGen Product Specification

## 1. Product goal

PartyPosterGen is a rapid poster-generation tool for parties, raves, club nights, DJ events and nightlife promotion. It should let a non-designer produce a credible poster in minutes without forcing them through a complex design application.

The default workflow is:

1. choose a template/style
2. optionally enter event details
3. optionally upload one or more images
4. optionally position/resize those images
5. click Generate
6. review one or more variants
7. download one or more poster sizes

No event-information field is mandatory.

## 2. Target users

- independent rave promoters
- club promoters
- DJs promoting their own events
- small event crews
- house-party organizers
- student-event organizers
- underground collectives
- venues that need quick event artwork

## 3. Supported event types

The template and field system should work for:

- techno, house, trance, hard house, DnB, jungle, dubstep and general rave nights
- warehouse parties
- afterhours/afterparties
- nightclub nights
- beach and summer parties
- festival afterparties
- open-decks nights
- themed parties
- birthday and private parties
- retro/90s/Y2K nights

## 4. Event data model

Every field is optional.

### 4.1 Core event fields

- event title
- subtitle / tagline
- date
- day of week
- start time
- end time
- venue name
- address
- city / area / neighborhood
- main DJ / headliner
- additional lineup
- genres / vibe tags
- ticket price
- presale price
- door price
- ticket URL
- RSVP URL
- age restriction
- dress code
- organizer / promoter
- social handles
- website
- QR-code target URL
- special note

### 4.2 Nightlife-specific optional fields

- secret location
- location TBA
- room/stage name
- MC / host
- visuals by
- sound system / sound by
- collective / label
- limited capacity
- early bird
- free before time
- guestlist note
- sunrise / afterhours note
- theme / costume note

### 4.3 Lineup entries

The tool should support both:

- one freeform multiline lineup field
- structured artist entries

Structured entry fields:

- artist/stage name
- headliner toggle
- short descriptor/tagline
- optional uploaded artist image
- optional social/link URL

## 5. Missing-field behavior

The generator must adapt layouts around missing content.

Examples:

- no venue → venue block disappears
- no lineup → title/date area can grow
- no subtitle → spacing closes automatically
- no ticket URL → no CTA or QR block
- no images → template relies on generated/stock background and type
- no event title → other content still renders without a blank title box

No final export may contain placeholder text such as `EVENT TITLE`, `DJ NAME`, or empty outlined boxes unless the user explicitly enables a placeholder/debug mode.

## 6. Basic mode

Basic mode is the default and should expose only the controls most people need:

- template/style
- event text fields
- lineup
- image uploads
- simple image positioning
- color preset
- Generate
- variant selector
- output size
- Download

The user should not need to understand layers, typography systems, alignment grids or print production to obtain a usable result.

## 7. Advanced mode

Advanced mode is optional and may expose:

- font selection from curated groups
- per-block font override
- font size adjustment
- text alignment
- palette overrides
- overlay intensity
- image layer ordering
- manual text-block position adjustments within safe bounds
- section show/hide toggles
- compact / normal / spacious density
- background treatment
- grain / blur / posterize / duotone controls
- image rotation within limited sensible ranges

Advanced mode should still remain bounded. It must not evolve into an unrestricted desktop-publishing canvas.

## 8. Image handling

Users may upload:

- DJ/artist portraits
- logos
- venue photographs
- sponsor logos
- event artwork
- transparent PNG graphics
- background photographs

Required interactions:

- drag
- resize
- crop
- fit/fill
- reposition focal point
- rotate slightly
- move forward/backward in simple layer order
- reset to template position

Templates may define image zones, but advanced mode can allow a user image to move beyond the suggested zone as long as it remains inside the poster canvas.

## 9. Quick image treatments

Provide one-click treatments useful for rave/party flyers:

- none
- grayscale
- high contrast
- duotone
- blur
- darken for text readability
- grain
- posterize
- soft glow
- color wash

Treatments should be non-destructive in editor state.

## 10. Template-first generation

Clicking Generate should produce a finished composition from current data and assets.

Generation should:

- prioritize event title, date/time, location and lineup when present
- maintain visual hierarchy
- maintain readable contrast
- resize/collapse content regions based on actual content
- avoid overlapping important text
- adapt to chosen output ratio
- keep uploaded images visible according to user positioning
- omit empty data sections

## 11. Poster variants

Generate may produce:

- one primary variant by default
- up to three alternates on request

Alternate generation may change:

- text arrangement within template rules
- accent color
- crop treatment
- background treatment
- secondary graphic arrangement

It must not unexpectedly discard user content or reset manually positioned images.

## 12. Regeneration controls

Support:

- regenerate layout
- regenerate color treatment
- regenerate background treatment
- generate additional variants

Regeneration should preserve entered event data.

## 13. QR code

If a URL is supplied, optionally generate a QR code for:

- tickets
- RSVP
- event page
- map/location
- social page

QR code should be removable and movable in advanced mode.

## 14. Text helpers

Keep text assistance lightweight and deterministic.

Useful options:

- uppercase title toggle
- date-format presets
- lineup separator styles
- automatic `DOORS` / `START` labels
- currency/price formatting
- CTA presets such as `TICKETS`, `RSVP`, `FREE ENTRY`, `LIMITED CAPACITY`, `LOCATION TBA`

No generative copy system is required for V1.

## 15. Privacy

Normal operation must be client-side.

- user images stay local
- event details stay local
- poster rendering happens locally
- no account required
- no server upload required

If telemetry is ever added, no event names, addresses, artist names, uploaded image data, ticket links or generated poster content may be included in analytics.

## 16. Save/reopen

V1 may store working state locally using IndexedDB/local storage.

At minimum, support:

- reset/new poster
- preserve current session across refresh where practical

A later version may export/import a project JSON file.

## 17. Non-goals

PartyPosterGen is not:

- a word processor
- a desktop publishing application
- a Photoshop replacement
- a full Canva replacement
- a generic business flyer application
- a collaborative cloud design suite
- a multi-page brochure maker

## 18. V1 scope

V1 must include:

- template picker
- all-optional event fields
- lineup support
- image upload
- drag/resize/crop image placement
- simple image treatments
- live preview
- basic mode
- advanced mode
- curated fonts
- palette presets
- smart content collapse/reflow
- generated and licensed stock background packs
- QR code support
- poster variants
- PNG/JPG/PDF export
- print and social output sizes
- batch multi-size download
- Circuit Drift Labs branding/link

## 19. V2 candidates

- project JSON import/export
- animated story/video flyer export
- AI-generated background prompt integration
- sticker packs
- bleed/crop marks
- multilingual date formatting
- venue map mini-block
- caption/social-post helper
- reusable promoter brand kits

## 20. Success criteria

A first-time user should be able to open PartyPosterGen, choose a visual style, enter only the information they care about, optionally add images, generate a credible nightlife flyer, make minor adjustments, and download social and/or print versions without reading documentation.
