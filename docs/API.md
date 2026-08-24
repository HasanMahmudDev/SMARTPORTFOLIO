# SmartPortfolio REST API

Responses use `{ success, message, data }`; errors also include `errors`. Mutations require an authenticated JWT cookie or Bearer token.

- Auth: `POST /api/auth/login|refresh|logout|change-password`, `GET /api/auth/me`
- Public: `GET /api/public/site`, `GET /api/posts`, `GET /api/posts/:slug`, `POST /api/contact`
- Singleton GET/authenticated PUT: `/api/profile|settings|theme|layout|seo|about`
- CRUD list/create and detail/update/delete: experiences, educations, skills, certifications, projects, services, achievements, testimonials, clients, menus, sections, pages, custom-sections, social-links, project-categories, post-categories, tags
- Publishing: `POST /api/posts`, `PUT|DELETE /api/posts/:id`
- Media: `GET|POST /api/media`, `DELETE /api/media/:id`
- Inbox: `GET /api/admin/messages`, `PATCH /api/admin/messages/:id/read`, `DELETE /api/admin/messages/:id`
- System: `GET /api/dashboard`, `/api/health`, `/robots.txt`, `/sitemap.xml`

Login/contact are rate-limited. Rich content is sanitized, uploads are MIME/size validated, and queries are parameterized.

