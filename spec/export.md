# PartyPosterGen Export Specification

## 1. Export goals

A generated poster should be downloadable immediately in common social and print sizes without forcing the user to manually resize the design.

Export must preserve:

- typography hierarchy
- user image positioning/crop
- template composition
- QR readability
- safe margins
- color treatment

## 2. Social presets

V1 should include:

- 1080x1080 square
- 1080x1350 portrait / 4:5
- 1080x1920 story / 9:16
- 1200x1500 general portrait
- 1600x2000 high-resolution web poster

Each preset should map to an explicitly tested template ratio/layout rather than naive stretching.

## 3. Print presets

V1 should include:

- 5x7 in
- 7x9 in
- 8.5x11 in
- 11x17 in
- A5
- A4
- A3

Default print exports should target a high-resolution raster equivalent suitable for practical printing.

Where PDF vector/text preservation is feasible, prefer it.

## 4. Custom size

Advanced mode may allow:

- custom pixel width/height
- custom print width/height and units
- aspect-ratio lock

Warn when requested output is likely to exceed practical browser memory limits.

## 5. Export formats

Required:

### PNG
- lossless
- supports transparency where template permits
- preferred for social graphics with sharp type

### JPG
- adjustable quality
- flatten transparency against poster background
- preferred for smaller file size

### PDF
- print-oriented single-page PDF
- preserve dimensions accurately
- embed or outline fonts as required by implementation/license constraints

## 6. Batch export

User can choose:

- Download This Size
- Download Selected Sizes
- Download All Social Sizes
- Download All Print Sizes

When several files are selected, provide a ZIP where practical.

Suggested file naming:

`<sanitized-event-title>_<size>_<variant>.<ext>`

Fallback if no title:

`partypostergen_<size>_<variant>.<ext>`

## 7. Render quality

Preview resolution may be lower than export resolution, but final export must rerender from the source poster state rather than upscaling a low-resolution preview bitmap.

## 8. Ratio-specific layout

When exporting to a different ratio, the renderer must invoke the template's ratio-specific layout rules.

Do not stretch/compress a completed raster poster to fit another ratio.

User image focal points should be preserved as closely as possible during ratio adaptation.

## 9. QR code

Export-time QR code should be rendered as vector or sufficiently high-resolution raster.

Test QR readability at common screen and print sizes.

If the QR code becomes too small for the selected output, warn the user or automatically apply the template-defined minimum size.

## 10. Print safety

Advanced print options may include:

- safe margin overlay
- optional bleed
- optional crop marks in later release

V1 print presets must at least keep essential text away from trim edges.

## 11. Color handling

Browser output will normally be RGB/sRGB.

Do not claim CMYK/professional prepress output unless true color-management support is implemented and tested.

The UI should describe PDFs as print-ready for common consumer/local print workflows, not as guaranteed commercial-press CMYK files.

## 12. Progress and cancellation

Large batch exports should show progress.

The user should be able to cancel before all sizes are rendered.

A failed size should not discard successfully rendered files.

## 13. Export testing

For every primary template:

- export all social presets
- export at least A4 and 11x17
- inspect no clipped text
- inspect no stretched imagery
- verify image crop/focal point
- verify QR readability when enabled
- verify transparent PNG where supported
- verify JPG output dimensions
- verify PDF page dimensions

Automated tests should verify pixel dimensions, filename generation, optional-section omission, and nonzero output payloads.
