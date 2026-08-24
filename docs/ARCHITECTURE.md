# SmartPortfolio — Architecture & Hostinger Rules

## Stack
Frontend:
- React
- TypeScript
- Vite
- React Router
- Bootstrap 5
- Axios
- React Hook Form

Backend:
- Node.js
- Express
- TypeScript
- REST API
- JWT authentication
- bcrypt
- Multer
- Helmet
- CORS
- rate limiting
- validation
- HTML sanitization

Database:
- MySQL

Target hosting:
- Hostinger Node.js/Web App hosting
- single domain when practical
- no IIS dependency
- no Docker dependency
- no Redis requirement
- no SQL Server/PostgreSQL/MongoDB/Firebase

## Preferred repository layout
```text
SMARTPORTFOLIO/
├── client/
├── server/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
├── deployment/
│   └── HOSTINGER.md
├── release/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── RELEASE-NOTES.md
```

## Production routing
Target:
```text
https://touhidhr.com/
https://touhidhr.com/posts
https://touhidhr.com/admin
https://touhidhr.com/api/*
```

In production, Express may serve the React `dist` output.

Rules:
- `/api/*` must never fall through to SPA routing.
- uploaded/static files must not be intercepted by SPA fallback.
- React Router refresh must work on public and admin routes.
- use relative/configurable Linux-safe upload paths.

## Database
Create a practical relational schema covering at least:
- admin_users
- profiles
- website_settings
- theme_settings
- layout_settings
- menus
- sections
- custom_pages
- custom_sections
- custom_section_items
- about
- experiences
- educations
- skill_categories
- skills
- certifications
- project_categories
- projects
- project_images
- services
- achievements
- testimonials
- clients
- post_categories
- posts
- tags
- post_tag_mapping
- post_images
- media
- resumes
- social_links
- contact_messages
- seo_settings

Use primary/foreign keys, useful indexes, unique slugs where needed, timestamps, status/active fields, and display order.

Keep `database/schema.sql` importable on common Hostinger MySQL versions. Keep `seed.sql` free of plaintext production passwords.

## API
Use consistent REST routes under `/api`.

Examples:
- `/api/auth/*`
- `/api/profile`
- `/api/settings`
- `/api/theme`
- `/api/layout`
- `/api/menus`
- `/api/sections`
- `/api/experiences`
- `/api/educations`
- `/api/skills`
- `/api/certifications`
- `/api/projects`
- `/api/services`
- `/api/achievements`
- `/api/testimonials`
- `/api/clients`
- `/api/posts`
- `/api/categories`
- `/api/tags`
- `/api/pages`
- `/api/custom-sections`
- `/api/media`
- `/api/resumes`
- `/api/social-links`
- `/api/contact`
- `/api/admin/messages`
- `/api/seo`

Standard success shape:
```json
{"success":true,"message":"Operation completed successfully","data":{}}
```

Standard validation/error shape:
```json
{"success":false,"message":"Validation failed","errors":[]}
```

Use correct HTTP methods/status codes.

## Authentication/security
Required:
- bcrypt password hashing
- access token + sensible refresh/session strategy
- protected Admin APIs/routes
- role checks
- Helmet
- configurable CORS
- login/contact rate limits
- input validation
- parameterized queries or safe ORM/query builder
- XSS/rich-content sanitization
- secure upload validation
- random filenames
- production-safe error handling
- no password hash in API responses
- no secrets in Git

## Environment
Create `.env.example`, never real `.env`.

Suggested keys:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=smartportfolio
DB_USER=
DB_PASSWORD=
JWT_SECRET=
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=7d
ADMIN_USERNAME=touhidhr
ADMIN_PASSWORD=
ADMIN_EMAIL=
APP_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
UPLOAD_MAX_SIZE_MB=5
```

For production configure:
`https://touhidhr.com` and `https://www.touhidhr.com`.

## Root scripts
Where practical provide:
- `npm run install:all`
- `npm run dev`
- `npm run build`
- `npm start`

Document exact commands in README.

## Hostinger deployment guide
Create `deployment/HOSTINGER.md` covering:
1. MySQL DB/user creation
2. DB host/credentials
3. schema import
4. secure first-admin setup
5. file upload
6. Node.js application configuration
7. supported Node version
8. environment variables
9. dependency install
10. React build
11. production start
12. domain/www mapping
13. SSL
14. API/admin tests
15. media/CV/post/contact tests
16. SPA refresh tests
17. logs and common troubleshooting
