# SmartPortfolio — Build, Test & Release Checklist

## Required implementation
- [ ] React/TypeScript/Vite client
- [ ] Node/Express/TypeScript API
- [ ] MySQL schema and real persistence
- [ ] Admin authentication and roles
- [ ] Dashboard
- [ ] Website/profile settings
- [ ] Menu manager
- [ ] Section manager
- [ ] About
- [ ] Experience
- [ ] Education
- [ ] Skills/categories
- [ ] Certifications/training
- [ ] Projects/categories/gallery
- [ ] Services
- [ ] Achievements
- [ ] Testimonials
- [ ] Clients
- [ ] Blog/posts/categories/tags
- [ ] Rich text with sanitization
- [ ] Custom pages
- [ ] Custom sections
- [ ] Media library
- [ ] Resume/CV
- [ ] Contact form/inbox
- [ ] Social links
- [ ] Theme presets
- [ ] Color/font/layout settings
- [ ] Light/Dark/System
- [ ] SEO settings
- [ ] sitemap/robots
- [ ] Responsive public/Admin UI
- [ ] Hostinger production configuration
- [ ] Documentation
- [ ] Release ZIP

## Functional tests
Authentication:
- [ ] valid login
- [ ] invalid login
- [ ] protected routes
- [ ] logout
- [ ] change password
- [ ] role protection

CRUD:
- [ ] profile/settings
- [ ] experience
- [ ] education
- [ ] skills
- [ ] certifications
- [ ] projects
- [ ] services
- [ ] achievements
- [ ] testimonials
- [ ] clients

Posts:
- [ ] create/edit/delete
- [ ] draft/publish/archive
- [ ] categories/tags
- [ ] search/pagination
- [ ] post details
- [ ] related/featured posts

Media:
- [ ] image upload
- [ ] PDF upload
- [ ] validation
- [ ] preview/reuse/delete
- [ ] CV download

Customization:
- [ ] theme preset
- [ ] custom colors
- [ ] fonts
- [ ] layout
- [ ] dark/light/system
- [ ] menu reorder/visibility
- [ ] section reorder/visibility
- [ ] custom page
- [ ] custom section

Contact:
- [ ] submit
- [ ] stored in MySQL
- [ ] inbox
- [ ] read/unread
- [ ] delete
- [ ] rate limiting

Production:
- [ ] frontend build passes
- [ ] backend build passes
- [ ] no known TypeScript build errors
- [ ] schema imports
- [ ] `/api/*` works
- [ ] SPA refresh works
- [ ] `/admin/*` refresh works
- [ ] `/posts/:slug` refresh works
- [ ] uploaded media works
- [ ] production errors do not leak stack/secrets
- [ ] Hostinger guide matches final structure

## Documentation
Create/update:
- `README.md`
- `RELEASE-NOTES.md`
- `deployment/HOSTINGER.md`
- `docs/ADMIN-GUIDE.md`
- `docs/API.md`
- `docs/DATABASE.md`
- `docs/SELLING-GUIDE.md`

## Commercial release
Final file:

`release/SmartPortfolio-v1.0.0.zip`

Exclude:
- `.git`
- `.env`
- `node_modules`
- logs
- coverage
- caches
- IDE folders
- temp files
- real credentials

Include source, schema, docs, `.env.example`, lockfiles/package files, and all files needed for installation/build.

## Final Codex report
Return a concise matrix:

```text
SMARTPORTFOLIO V1.0.0 COMPLETE

Frontend: PASS/FAIL
Backend: PASS/FAIL
MySQL: PASS/FAIL
Admin/Auth: PASS/FAIL
Portfolio CRUD: PASS/FAIL
Blog: PASS/FAIL
Media/CV: PASS/FAIL
Theme Builder: PASS/FAIL
Custom Pages/Sections: PASS/FAIL
SEO: PASS/FAIL
Production Build: PASS/FAIL
Hostinger Docs: PASS/FAIL
Release ZIP: PASS/FAIL
```

Also report:
- local frontend URL
- local backend URL
- admin URL
- database name
- exact run/build commands
- release ZIP path
- Hostinger guide path
- any remaining non-blocking limitations
