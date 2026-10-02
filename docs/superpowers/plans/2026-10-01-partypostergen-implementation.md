# PartyPosterGen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a fast static GitHub Pages rave/party poster generator with template-first composition, optional event fields, user image placement and multi-size downloads.

**Architecture:** A canvas renderer owns poster composition. `poster-core.js` contains pure state/layout helpers; `app.js` manages optional event fields, templates, uploaded images, drag/scale editing, procedural/stock backgrounds, QR generation and exports. Templates are deterministic data/style functions rather than arbitrary document editing.

**Tech Stack:** HTML, CSS, ES modules, Canvas 2D, File API, localStorage, GitHub Pages.

**Spec:** `spec/INDEX.md`, `spec/spec.md`, `spec/gui.md`, `spec/templates.md`, `spec/assets-and-licensing.md`, `spec/export.md`, `spec/build.md`, `spec/testing.md`

## Global Constraints
- No event field is required.
- Blank fields collapse cleanly.
- Basic mode stays simple; advanced controls remain bounded.
- User images remain local.
- Output ratios recompose the template rather than stretching a raster.
- Stock assets require recorded Pexels/Pixabay-compatible licensing/provenance.

## Review Focus
- Empty poster state still renders cleanly.
- Long lineups stay readable without leaving the canvas.
- User image dragging remains correct under preview scaling.
- Ratio changes preserve image focal placement.
- Export dimensions and filenames are deterministic.

---

### Task 1: Poster model/layout core
Create `poster-core.js` and tests for optional content normalization, export presets, template metadata and filenames.

### Task 2: Canvas editor
Create static editor UI, twelve templates, procedural backgrounds, optional fields and live preview.

### Task 3: Image/advanced tools
Add local image upload, drag/scale, overlay/effect controls, font choices, palette controls and QR block.

### Task 4: Export/assets/ecosystem
Add PNG/JPG/PDF-compatible print workflow, social/print presets, licensed stock choices with provenance, README, Circuit Drift Labs integration and Pages CI.

### Task 5: Verification
Run core tests/syntax checks and manually exercise empty/full/long-lineup states in multiple ratios.
