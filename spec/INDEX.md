# PartyPosterGen Specification Index

Date: 2026-10-01
Repository: `djshellshoxxx/PartyPosterGen`
Brand: Circuit Drift Labs
Primary brand site: `https://circuitdriftlabs.djshellshoxxx.github.io`

## Purpose

PartyPosterGen is a fast, browser-based poster and flyer generator for raves, club nights, DJ events, parties, warehouse events, afterparties, and similar nightlife events.

The product must be template-first and quick to use. It is deliberately not a word processor, desktop-publishing suite, Photoshop replacement, or general-purpose Canva clone.

A user should be able to choose a style, enter as much or as little event information as they want, optionally upload and position images, press Generate, and download polished poster variants in print and social-media sizes.

## Read order

1. `spec.md` — product requirements, workflows, fields, scope and behavior
2. `gui.md` — editor layout, simple/advanced modes and interactions
3. `templates.md` — template system and launch template families
4. `assets-and-licensing.md` — stock/generated assets, fonts and rights requirements
5. `export.md` — rendering, output sizes, image/PDF downloads and batch export
6. `build.md` — technical architecture, storage, privacy and GitHub Pages deployment
7. `testing.md` — functional, visual, export, accessibility and performance tests

## Binding product principles

1. No event-information field is required.
2. Missing fields collapse cleanly; generated posters never contain empty placeholders.
3. The default path is template-driven and simple.
4. Advanced controls are optional and visually separated from the quick workflow.
5. User-uploaded images remain local to the browser during normal use.
6. Final poster output must remain editable until download.
7. The app must produce useful results without requiring design knowledge.
8. Templates must preserve strong hierarchy and readable contrast automatically.
9. Bundled third-party assets must have documented licenses compatible with the intended use.
10. PartyPosterGen must be deployable as a static GitHub Pages application.

## Research basis

The specification was informed by common rave/nightlife flyer conventions and current event-design tools. Eventbrite guidance emphasizes event name, date/time, venue/location, ticket price and a clear call to action, while lineup information, organizer details, links and images are also common. Adobe Express and Canva demonstrate the value of template-first workflows, uploaded imagery, stock content, drag/drop customization, font choice and multiple output sizes.

Reference sources:

- Eventbrite event flyer guidance: https://www.eventbrite.com/blog/how-to-design-an-event-flyer-ds00/
- Eventbrite lineup guidance: https://www.eventbrite.com/help/en-us/articles/269831/add-a-lineup-to-your-event/
- Adobe Express party flyer maker: https://www.adobe.com/express/create/flyer/party
- Canva party flyer templates: https://www.canva.com/flyers/templates/party/
- Pexels license: https://www.pexels.com/license/
- Pixabay content license summary: https://pixabay.com/service/license-summary/

## Circuit Drift Labs integration

PartyPosterGen must include a small, unobtrusive Circuit Drift Labs identity and a direct link to:

`https://circuitdriftlabs.djshellshoxxx.github.io`

Once deployed, it should be linked from the main Circuit Drift Labs tools dropdown in the most appropriate creative/promotional-tools position.
