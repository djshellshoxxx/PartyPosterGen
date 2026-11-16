# Developer Guide

## Tests

```sh
node --test tests/*.test.mjs     # 7 pass on this snapshot across 4 files
```

## Static site

HTML, CSS and JavaScript, no build step. Serve the folder with `python -m http.server`. CI: `.github/workflows/static.yml`.

## Mail service (optional)

```sh
cd server
cp .env.example .env     # fill in SMTP and access-key values
npm install
npm start
```

The service uses bearer-token authentication, an allowed-origin restriction, rate limiting, a maximum recipient count and a
maximum attachment size, and keeps SMTP credentials server-side. A Dockerfile is included. Never put SMTP passwords in
the Pages JavaScript.

## Specs

Read `spec/INDEX.md` first, then the spec for the area you change.
