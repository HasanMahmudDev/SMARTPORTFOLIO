# SmartPortfolio v1.0.0

SmartPortfolio is a reusable, database-driven portfolio CMS for professionals in any field. It combines a premium responsive public website with an HMD-inspired administration workspace, real MySQL persistence, secure publishing, media management, contact inbox, design controls, and SEO.

## Requirements and setup

Use Node.js 20+, npm 10+, and MySQL 8-compatible hosting. Copy `.env.example` to `.env`, create the `smartportfolio` database, import `database/schema.sql` followed by `database/seed.sql`, set a strong `ADMIN_PASSWORD`, then run:

```bash
npm run install:all
npm run setup:admin
npm run dev
```

Frontend: `http://localhost:5173`  
API: `http://localhost:3000/api`  
Admin: `http://localhost:5173/admin`

For production run `npm run build` and `npm start` with `NODE_ENV=production`. Express serves the compiled client while protecting API/upload/system routes from SPA fallback. See `deployment/HOSTINGER.md`.

Major modules include identity/navigation/sections; all specified portfolio record types; posts with workflow/search/pagination; custom pages/sections; media/CV; contact inbox; eight theme presets and layout controls; dynamic SEO; and security with JWT cookies, bcrypt, Helmet, CORS, validation, and rate limiting.

All default content is editable demonstration data. No real password or secret is included.
