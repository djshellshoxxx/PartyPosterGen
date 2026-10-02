# PartyPosterGen Testing Specification

## Unit tests

Cover poster-state normalization, optional-field collapse, date/time formatting, template lookup, ratio preset lookup, safe filename generation, QR input validation, palette selection and layout helpers.

## Template matrix

Every launch template must render without uncaught errors for:

- no event fields
- title only
- title/date/location
- full event details
- long title
- long venue/address
- 1, 5, 10 and 20 lineup names
- no image
- one uploaded hero image
- QR enabled/disabled
- square, 4:5, 9:16, A4-like and 11x17-like ratios

Essential text must not overlap the canvas edge or disappear behind another text block.

## Interaction tests

Verify:

- uploaded image can be selected, dragged and scaled
- deleting an image leaves the poster usable
- changing templates preserves entered event content
- changing output ratio recomposes rather than stretches the poster
- blank fields never produce visible placeholders
- basic/advanced mode retains state
- reset clears project state only after explicit action

## Export tests

For each primary ratio:

- PNG dimensions are exact
- JPG dimensions are exact
- PDF page contains a poster image at expected aspect ratio
- QR remains readable at practical output size
- output filename is safe when event title contains punctuation/unicode
- high-resolution export rerenders source state rather than scaling preview pixels

## Asset tests

- every bundled stock/generated asset has an entry in the asset manifest
- every manifest entry points to a real asset or approved external licensed source
- font licenses are present for bundled fonts
- no template depends on an unavailable remote asset without a fallback

## Performance

Test with several 12–24 MP phone photos. Preview should use downscaled representations and remain interactive. Export may use the original image where practical but should fail gracefully on browser memory limits.

## Security

- user-entered text renders as text, not HTML
- uploaded SVG is rejected or sanitized/rasterized before rendering
- malformed images do not execute content or wipe project state

## Accessibility

- template choices and controls are keyboard reachable
- all form inputs have labels
- basic editor does not rely on color alone
- reduced-motion preference is respected
