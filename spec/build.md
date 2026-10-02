# PartyPosterGen Build and Architecture Specification

## 1. Deployment target

Primary deployment target: GitHub Pages from `djshellshoxxx/PartyPosterGen`.

The app must work correctly from a repository subpath and must not assume `/` as the web root.

## 2. Architecture

PartyPosterGen should be a static client-side application with no required backend.

Recommended layers:

1. application state
2. template definitions
3. layout engine
4. asset manager
5. editor/preview renderer
6. image manipulation layer
7. QR generator
8. export renderer
9. local persistence

## 3. Technology direction

A lightweight modern browser stack is preferred. Suitable options include:

- TypeScript + Vite
- React/Preact/Svelte or similarly lightweight component framework
- Canvas/SVG/HTML hybrid rendering

The implementation should prioritize reliable high-resolution output over framework preference.

## 4. Poster document model

The application should maintain a serializable poster-state object containing:

- schema version
- selected template
- selected variant
- output ratio/size
- all event fields
- structured lineup entries
- uploaded asset references
- image crop/position/scale/rotation
- palette
- typography overrides
- background choice/treatment
- section visibility
- QR settings
- advanced adjustments

This object should be sufficient to rerender the poster at arbitrary supported output resolutions.

## 5. Rendering strategy

Do not make final downloads by screenshotting the low-resolution browser preview.

The renderer should use the same logical scene/layout data for:

- editor preview
- high-resolution raster export
- PDF export

Canvas, SVG, DOM-to-canvas, or a hybrid approach is acceptable as long as text/images render consistently and final output quality meets the export spec.

## 6. Template engine

Template definitions should be data-driven rather than hard-coded separately throughout UI components.

A template module should expose:

- metadata
- supported ratio families
- default style tokens
- semantic content zones
- layout calculation function/rules
- background configuration
- image zone definitions

This enables adding templates without rewriting the editor.

## 7. Layout engine

Layout calculation takes:

- template
- output ratio
- populated content
- font metrics
- user overrides

and returns positioned scene objects.

It must handle optional fields deterministically and reflow cleanly when values are blank.

## 8. Image loading and manipulation

User-selected images should be loaded through browser File APIs and Object URLs or equivalent local mechanisms.

Normal use must not upload files to a server.

Store image edit state separately from original image data:

- x/y
- scale
- crop/focal point
- rotation
- layer
- effects

Use browser-friendly maximum dimensions for interactive preview while retaining access to original source pixels for final export where feasible.

## 9. Local persistence

Use IndexedDB for poster state and user asset blobs where practical.

Support:

- autosave current project locally
- new/reset project
- clear local project data

Future project-file import/export should use a versioned schema.

## 10. Background asset storage

Bundled stock and generated backgrounds should be optimized for web delivery.

Use responsive preview thumbnails and load full background assets only when selected/exported.

Do not make runtime calls to Pexels/Pixabay APIs merely to populate stock choices in V1. Curate approved assets into the repository and record them in the asset manifest.

## 11. Fonts

Bundle approved open-license fonts locally so exports do not depend on remote font CDNs.

Fonts required by the selected template should be loaded before final rendering.

The export action must wait for font readiness or fail clearly rather than silently substitute fonts.

## 12. QR generation

Generate QR codes locally in the browser using a permissively licensed library or original implementation.

No third-party URL shortening or QR service should be required.

## 13. Offline behavior

A PWA/offline mode is optional for V1 but desirable later.

At minimum, once the app and selected bundled assets are loaded, poster editing should not require network calls.

## 14. Security

User-entered text must be treated as data, never injected as executable HTML.

SVG uploads require special care:

- sanitize SVG before rendering, or
- rasterize safely before inclusion

Do not execute scripts or external references embedded in user-uploaded SVGs.

Reject or safely handle malformed image files.

## 15. Performance targets

On a modern desktop browser:

- common form changes should update preview within 100 ms where practical
- image drag should remain visually responsive
- initial Generate should complete quickly for bundled assets
- high-resolution export may take longer but should show progress

Large original photos should be downsampled for preview to prevent unnecessary memory use.

## 16. Browser targets

Primary:

- current Chrome/Chromium
- current Edge
- current Firefox
- current Safari

Feature-detect APIs rather than browser-sniffing where possible.

## 17. Suggested repository structure

```text
PartyPosterGen/
  index.html
  src/
    app/
    editor/
    templates/
    layout/
    renderer/
    export/
    assets/
    storage/
    qr/
    types/
  public/
    backgrounds/
    template-thumbs/
    fonts/
  assets/
    manifest.json
  licenses/
  spec/
  tests/
  .github/workflows/
  README.md
  THIRD_PARTY_NOTICES.md
```

## 18. CI

GitHub Actions should verify:

- dependency install
- lint/type check
- unit tests
- build
- template schema validation
- asset manifest completeness
- automated render tests

Pages workflow should deploy the production static build on changes to the release branch/main once tests pass.

## 19. Circuit Drift Labs integration

Include a small Circuit Drift Labs mark/link in the editor chrome and About page, not inside generated posters unless the user explicitly chooses a branding element.

PartyPosterGen should be added to the Circuit Drift Labs tools dropdown after deployment.

## 20. README requirements

README should include:

- purpose
- live Pages URL
- screenshots once available
- privacy/local-processing statement
- supported export sizes/formats
- asset/license policy
- development/build instructions
- Circuit Drift Labs link
