# PartyPosterGen Assets and Licensing Specification

## 1. Goal

PartyPosterGen may bundle stock backgrounds, generated/original backgrounds, fonts, icons and decorative elements. Every bundled asset must have clear provenance and a license compatible with use inside generated promotional posters.

Do not rely on assumed "free image" status.

## 2. Approved asset categories

### 2.1 Original assets

Preferred wherever possible.

Examples:

- gradients
- vector grids
- geometric rave patterns
- halftone textures
- abstract wave forms
- original sticker shapes
- grain/noise overlays
- line art

Keep source files in the repository when practical.

### 2.2 Generated assets

Generated backgrounds may be included if the generation system permits commercial use and redistribution in the intended form.

For each generated asset, record:

- generator/tool
- date created
- prompt or source description where useful
- applicable usage terms/version at creation time
- whether the image was further edited

Generated backgrounds should avoid recognizable copyrighted characters, logos, artist likenesses or brand trade dress.

### 2.3 Pexels assets

Pexels states that its photos/videos are free to use, may be modified, and can be used in print marketing such as flyers. Its restrictions include not reselling unaltered copies, not implying endorsement and not redistributing them as stock.

Reference: https://www.pexels.com/license/

If bundled, use curated images as components/backgrounds inside templates rather than presenting a stock-photo browser that redistributes originals.

### 2.4 Pixabay assets

Pixabay states that content may be used for free, without required attribution, and may be modified/adapted subject to prohibited uses.

Reference: https://pixabay.com/service/license-summary/

As with Pexels, bundle only curated assets that have been intentionally selected and integrated into PartyPosterGen templates/background options.

## 3. Unsplash

Do not automatically bundle Unsplash assets merely because they appear free to use. Review the current Unsplash license and redistribution restrictions before inclusion.

If used later, record exact asset/source/license information and confirm that bundling inside a template/background pack is permitted.

## 4. Asset manifest

Maintain a machine-readable asset manifest, for example `assets/manifest.json`, containing:

- asset id
- local filename
- type: original / generated / pexels / pixabay / other
- creator/source
- source URL where applicable
- license name
- license URL
- attribution text if required
- date retrieved/generated
- notes/restrictions

The build should fail or warn if a bundled third-party asset lacks manifest provenance.

## 5. Stock selection criteria

Curated stock backgrounds should favor imagery that works behind typography:

- abstract nightclub lighting
- haze/smoke
- lasers
- anonymous crowd silhouettes
- city/night textures
- architecture
- abstract color/light
- beach/sunset scenes

Avoid imagery with prominent recognizable people unless there is a clear reason and the use complies with license/model-release limitations.

Avoid logos, copyrighted artwork, recognizable commercial packaging and branded venue signage where practical.

## 6. Generated background pack

V1 should include original/generated backgrounds in categories such as:

- neon gradient fields
- dark blue/black techno grids
- chrome-inspired abstract shapes
- starfields
- psychedelic swirls
- liquid/organic forms
- halftone photocopy textures
- torn-paper textures
- geometric rave forms
- laser/light abstractions
- grain/noise overlays

These backgrounds should be visually useful at multiple crop ratios.

## 7. Fonts

Use open-license fonts suitable for local bundling and poster exports.

Preferred source: Google Fonts/OFL families or similarly permissive licenses.

Curate a small useful set rather than exposing hundreds of fonts.

Suggested style groups:

- condensed/industrial
- geometric/futuristic
- grotesk/bold club
- serif/elegant nightlife
- retro/Y2K
- playful/display
- neutral sans

For every font family, include license text or required notice in the repository.

## 8. Icons and QR

Use original icons, permissively licensed icon libraries, or simple CSS/SVG primitives.

Record library/license information in `THIRD_PARTY_NOTICES.md` where required.

QR-code libraries must be compatible with client-side static distribution.

## 9. User uploads

User-supplied content is not bundled with the project.

The interface should state briefly:

`Only use images, logos and artwork you have permission to use.`

The app should not attempt to determine copyright ownership.

## 10. Credits UI

Credits should not clutter generated posters.

Provide an `About / Asset Credits` page listing bundled third-party asset sources and licenses.

If a particular asset legally requires visible attribution in output, either:

- include the required attribution in a tasteful export-safe way, or
- do not bundle that asset for general poster generation.

Prefer assets that do not impose output-level attribution requirements.

## 11. No copyrighted poster copying

Templates may learn from broad visual traditions such as warehouse techno, Y2K trance, grunge photocopy, psychedelic rave and nightclub luxury, but must not recreate a specific copyrighted poster, event identity, artist campaign or brand design.

## 12. Review requirement

Before release, perform an asset-license audit confirming:

- every bundled third-party image has provenance
- every font has license documentation
- generated assets have recorded source/terms
- no unlicensed logos or celebrity/artist imagery are bundled
- no source asset is redistributed in a way prohibited by its license
