# PartyPosterGen GUI Specification

## 1. UX goal

The editor should feel like a purpose-built poster generator, not a generic design application.

A new user should understand the primary workflow immediately:

`Choose style -> Add details -> Add images -> Generate -> Download`

## 2. Desktop layout

Recommended three-column editor:

### Left: Event content

- event title
- subtitle/tagline
- date/time
- location
- lineup
- ticket/RSVP information
- optional details
- QR target
- image uploads

### Center: Live poster preview

- rendered poster canvas
- direct image dragging/resizing
- selected-object handles only when needed
- zoom control
- fit-to-window
- variant tabs/thumbnails

### Right: Style and output

- template picker
- palette presets
- background picker
- Generate / Regenerate
- output size
- export format
- Download

## 3. Top bar

Keep compact:

- PartyPosterGen logo/name
- Circuit Drift Labs link/mark
- New
- Reset
- Undo / Redo where feasible
- Basic / Advanced mode toggle
- Download

Do not crowd the top bar with every editing command.

## 4. Basic mode

Basic mode should show only:

- template/style
- event data
- lineup
- image uploads
- simple palette choice
- generate controls
- export controls

The live preview may allow direct manipulation of uploaded images, but text should mostly remain template-controlled.

## 5. Advanced mode

Advanced mode opens additional grouped controls rather than replacing the basic editor.

Groups:

### Typography
- heading font
- body/lineup font
- size adjustment
- text alignment
- uppercase toggle
- letter spacing within conservative bounds

### Layout
- density: compact / normal / spacious
- selected block position nudges
- show/hide section
- image/text layer order within constrained rules

### Color
- accent color
- secondary accent
- background tint
- overlay opacity
- text-color override with contrast warning

### Image effects
- grayscale
- contrast
- duotone
- posterize
- blur
- grain
- glow

## 6. Field interaction

Every form field is optional.

The UI must never show validation errors merely because a field is empty.

Only validate format when the user actually supplies a value where validity matters, for example:

- malformed URL
- impossible custom dimensions
- unsupported uploaded file type

## 7. Lineup editor

Provide two modes:

### Quick lineup
Multiline text area.

### Structured lineup
Repeatable artist rows with:

- name
- headliner toggle
- optional descriptor
- optional image
- optional link
- drag reorder

Switching from structured to quick must not silently destroy data; warn or preserve it.

## 8. Template picker

Use visual thumbnails rather than a text-only dropdown.

Filters/tags may include:

- neon
- industrial
- psychedelic
- minimal
- retro
- Y2K
- luxury
- grunge
- photo-heavy
- print-friendly

A user can preview a template without losing entered event data.

## 9. Background picker

Tabs:

- Included
- Generated/Abstract
- Stock
- My Upload

Each asset should show a small source/license indicator where relevant.

## 10. Image manipulation

Selecting a user image on the canvas reveals minimal handles:

- resize corners
- rotate handle
- drag body
- crop/focal-point control

Context controls:

- Fit
- Fill
- Forward
- Backward
- Reset
- Remove

Avoid Photoshop-like toolbars.

## 11. Smart snapping

Use light snapping to:

- poster edges
- center lines
- template image zones
- safe margins

Snapping should help but never trap the user.

## 12. Live preview

Preview must update quickly when event text changes.

For expensive effects, allow slight deferred rendering but keep typing responsive.

Display safe-area overlay only when requested or when preparing print output.

## 13. Generate action

Primary CTA: `Generate Poster`

After initial generation, change/add actions:

- Regenerate Layout
- Try Another Color
- Generate 3 Variations

The user should always understand whether an action changes layout, color, or background.

## 14. Variant browser

Display generated alternatives as small thumbnails beneath or beside the main preview.

User can:

- select variant
- duplicate variant
- delete variant
- regenerate from selected variant

## 15. Export panel

Simple presets first.

Tabs/groups:

- Social
- Print
- Custom

Each preset shows dimensions and aspect ratio.

Buttons:

- Download This Size
- Download Selected Sizes
- Download All Social
- Download All Print

## 16. Mobile behavior

Mobile support should prioritize quick generation over precision editing.

Use step/tab navigation:

1. Style
2. Details
3. Images
4. Preview
5. Download

Advanced free positioning can be limited on very small screens if necessary, but image crop/focal point and template selection must remain usable.

## 17. Accessibility

- visible focus indicators
- keyboard-operable form and template selection
- labels for every field/control
- no color-only status messages
- contrast warnings in advanced color overrides
- reduced motion support
- screen-reader labels for template thumbnails

## 18. Error handling

Errors should be local and actionable.

Examples:

- `This image format is not supported. Try PNG, JPG, WebP or SVG.`
- `This file is too large to render reliably in your browser.`
- `The ticket URL does not look valid, but you can keep it as plain text.`

Never wipe the current poster because one asset fails.
