# SmartPortfolio — Codex Master Instructions

## Workspace
Work only in this existing Git repository:

`D:\04_PinTechHasan\01_Projects\ProjectsIdea\SMARTPORTFOLIO`

Do not initialize another repository and do not create a nested `SmartPortfolio/SmartPortfolio` project. Inspect `git status`, current branch, and existing files first. Preserve unrelated user work.

If appropriate, create/reuse branch:

`feature/smartportfolio-v1`

## Mission
Build **SmartPortfolio v1.0.0**, a production-ready, reusable, commercially sellable Portfolio CMS.

First deployment: `https://touhidhr.com`

The application must not be hard-coded for Touhid or HR. A buyer must be able to change identity, profession, pages, menus, sections, posts, media, CV, colors, fonts, layout, SEO, contact details, social links, and most visible content from the Admin Panel without editing source code.

## Required reading order
Read these files before implementation:

1. `docs/PRODUCT_SPEC.md`
2. `docs/ARCHITECTURE.md`
3. `docs/THEME_AND_UI.md`
4. `docs/RELEASE_CHECKLIST.md`

These files are the source of truth. Do not repeatedly ask the user for details already defined there.

## Execution mode
Complete the project end-to-end in one run. Do not stop for phase approval.

Internally execute:

1. Foundation
2. Authentication/Admin
3. Website settings/menu/sections
4. Portfolio CRUD
5. Projects/services/achievements/testimonials/clients
6. Blog/Post CMS
7. Media/CV/contact inbox
8. Theme/color/font/layout builder
9. Dynamic pages/custom sections/SEO
10. Public UI polish/responsive/accessibility
11. Security/production/Hostinger
12. Testing/docs/release ZIP

After each internal phase: build, fix errors, continue.

Only stop for a truly blocking issue that cannot be resolved from the repository, docs, environment, or safe defaults.

## Quality rules
- TypeScript strict enough to prevent obvious runtime mistakes.
- Reusable components/services; avoid duplicated CRUD code.
- No secrets in Git.
- No plaintext passwords in SQL or source.
- No Windows-only runtime paths.
- No fake APIs or placeholder CRUD in the final result.
- No TODOs for core requested features.
- Use real MySQL persistence.
- Public and Admin UI must be responsive.
- Use loading, empty, validation, success, error, and delete-confirmation states.
- Prefer maintainable production code over tutorial code.

## First deployment admin
Default username can be `touhidhr`.

Initial password must come from environment/setup input and be bcrypt-hashed before database storage. Do not commit the real password.

## Final output
Create:

`release/SmartPortfolio-v1.0.0.zip`

Exclude:
- `.git`
- `.env`
- `node_modules`
- logs
- temp/cache files
- IDE folders
- real secrets

Before finishing, run all available frontend/backend builds and relevant tests, fix failures, and report:

- frontend build
- backend build
- MySQL/schema status
- admin/auth status
- CRUD status
- blog status
- media/CV status
- theme builder status
- SEO/custom page status
- production/Hostinger readiness
- exact local run commands
- final ZIP path

Start now by reading all referenced Markdown files and inspecting the repository.
