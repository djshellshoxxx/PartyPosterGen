# Architecture and Design Rationale

Sources: README ("What it does", "Emailing posters", "Licensed stock backgrounds"), `spec/`, the file layout.

- **Template-first.** The tool exists to make a usable flyer quickly, not to replace a general design program (README).
- **Deterministic rendering.** Procedural backgrounds render the same way on each run, so a download or email matches the poster on screen (README).
- **Mail separated from the static site.** GitHub Pages cannot hold SMTP credentials, so sending goes through a separate Node service that has bearer-token auth, origin checks and rate limits (README).
- **Pure core modules.** `poster-core.js`, `project-state.js`, `render-random.js` and `mailer-url.js` are separate from the UI in `app.js` and `app-v2.js`, and they are what the tests exercise. *(inferred from file names and the test imports.)*
- **Licensed assets.** Fonts ship with OFL notices in `fonts/licenses/`; stock images are attributed per the Pexels licence (README, `THIRD_PARTY_NOTICES.md`).
