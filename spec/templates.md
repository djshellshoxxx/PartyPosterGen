# PartyPosterGen Template System Specification

## 1. Template role

Templates are the core of PartyPosterGen. They should encode strong poster-design decisions so users do not have to manually design layouts.

Each template defines:

- poster composition
- text hierarchy
- supported image zones
- background treatment
- default fonts
- fallback fonts
- default palette(s)
- accent graphics
- layout rules for missing data
- safe-area rules
- responsive rules for different export aspect ratios
- maximum recommended text quantities

Templates must accept incomplete event data without leaving gaps or placeholders.

## 2. Template data contract

Each template should have a machine-readable definition with at least:

- `id`
- `name`
- `description`
- `tags`
- `thumbnail`
- `supportedRatios`
- `defaultPalette`
- `alternatePalettes`
- `headingFont`
- `bodyFont`
- `backgroundStrategy`
- `zones`
- `layoutRules`
- `effects`
- `credits` where third-party assets are used

## 3. Content zones

Standard semantic zones may include:

- title
- subtitle
- date/time
- location
- headliner
- lineup
- details
- price
- CTA
- QR
- promoter
- social
- hero image
- secondary image(s)
- sponsor/logo strip

Templates do not need to render every zone.

## 4. Layout adaptation rules

Each template must specify how it reacts when content is absent or unusually long.

Examples:

- missing lineup → title/image zone expands
- missing hero image → background artwork fills visual role
- long lineup → reduce lineup size to defined minimum, then move into multi-column or condensed layout
- long venue/address → wrap within location zone rather than overlap other content
- missing QR → CTA zone recenters or collapses

Text should never automatically shrink below a template-defined readability floor merely to force all content onto the poster. If content exceeds safe bounds, show a clear `content is crowded` warning and suggest a better template/layout.

## 5. Launch template families

V1 should include at least twelve visually distinct template families.

### 5.1 Neon Rave

- dark base
- cyan/magenta/electric-blue accent options
- controlled glow
- high-contrast title
- suitable for club/EDM/rave events

### 5.2 Warehouse Techno

- black/gray/white industrial base
- distressed or concrete texture
- condensed bold typography
- sparse composition
- strong date/location treatment

### 5.3 Psychedelic Acid

- saturated contrasting palette
- warped geometric/swirled background elements
- large experimental title treatment
- legibility preserved for event facts

### 5.4 Y2K / Trance

- chrome-inspired or metallic-looking 2D accents
- futuristic curves/grids
- late-90s/early-2000s visual vocabulary
- cool blues/silvers/purples

### 5.5 Minimal Club

- restrained palette
- large clean type
- whitespace/negative space
- one strong accent
- print-friendly

### 5.6 Retro 90s Rave

- loud geometric color blocks
- photocopy/rave-culture influence
- playful type hierarchy
- optional smiley/star/abstract motifs that are original or properly licensed

### 5.7 Beach / Summer Party

- warm gradient or photographic background
- sunset/tropical palette options
- open/airy type arrangement

### 5.8 Luxury Nightclub

- near-black base
- gold/silver/cream accent options
- elegant headline typography
- strong VIP/ticket information area

### 5.9 Street / Grunge

- photocopy/zine treatment
- torn-paper/halftone-style original textures
- black/white plus one accent color
- irregular but controlled image zones

### 5.10 Photo-Driven DJ Flyer

- one dominant uploaded or stock hero image
- readability overlays
- artist/headliner emphasized
- lineup and event data secondary

### 5.11 Collage / Zine

- multiple image zones
- tape/sticker/cutout visual elements
- layered but bounded composition
- user images remain easy to reposition

### 5.12 Blank Quick Layout

- no decorative assumptions
- clean hierarchy
- neutral type and palette
- maximum compatibility with user-provided artwork

## 6. Ratio adaptation

Templates should adapt to the primary output families:

- square
- 4:5 portrait
- 9:16 story
- traditional flyer portrait
- A-series print portrait
- 11x17 portrait

A template may define separate layout variants for major ratio families rather than attempting arbitrary scaling.

## 7. Variant generation

Each template should support deterministic variation knobs such as:

- palette variant
- image crop variant
- title alignment variant
- accent graphic arrangement
- background intensity

Generation should be reproducible when using the same template state/seed if a seed system is implemented.

## 8. Typography rules

Each template defines:

- title font
- lineup/body font
- minimum title size
- minimum body size
- line-height range
- tracking range
- maximum title lines before alternate layout is preferred

Advanced-mode overrides may replace fonts but should retain size and safe-area constraints unless the user explicitly overrides them.

## 9. Template thumbnails

Every template ships with generated preview thumbnails using fictitious event content. Do not use real artist identities or copyrighted event branding in default preview data.

Suggested fictitious examples:

- CIRCUIT//NIGHT
- STATIC BLOOM
- AFTERHOURS 404
- SIGNAL DRIFT

## 10. Template QA

Every launch template must be checked with:

- no fields populated
- title only
- title + date
- full common event data
- no images
- one hero image
- several artist images
- long lineup
- long venue/address
- QR enabled/disabled
- every supported output ratio

No template ships if any standard QA case produces unreadable overlap or clipped essential content.
