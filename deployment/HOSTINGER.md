# Hostinger Deployment — SmartPortfolio v1.0.0

Target: `https://touhidhr.com` on Hostinger Node.js/Web App hosting.

## Database

In hPanel **Databases → Management**, create a MySQL database/user, grant all privileges, and record the exact prefixed database name, username, password, host, and port. In phpMyAdmin import `database/schema.sql`, then `database/seed.sql`. The seed has editable demo content and no admin password.

## Application

Extract the release in the Node application directory using File Manager, Git, SFTP, or SSH. Do not upload `.env` or `node_modules`. Ensure the application user can write to `uploads`.

Configure Node.js 20 or newer:

- Root: extracted SmartPortfolio directory
- Build: `npm install && npm run build`
- Start: `npm start`
- Entry file if requested: `server/dist/index.js`
- Port: Hostinger-provided `PORT`

## Environment

Set these in hPanel, never in Git:

```env
NODE_ENV=production
PORT=<provided-port>
DB_HOST=<mysql-host>
DB_PORT=3306
DB_NAME=<prefixed-name>
DB_USER=<prefixed-user>
DB_PASSWORD=<strong-password>
JWT_SECRET=<32+-character-random-secret>
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=<different-32+-character-random-secret>
JWT_REFRESH_EXPIRES_IN=7d
ADMIN_USERNAME=touhidhr
ADMIN_PASSWORD=<temporary-strong-first-password>
ADMIN_EMAIL=<admin-email>
APP_URL=https://touhidhr.com
CORS_ORIGINS=https://touhidhr.com,https://www.touhidhr.com
UPLOAD_DIR=uploads
UPLOAD_MAX_SIZE_MB=5
```

Run `npm run setup:admin`. It refuses passwords shorter than 10 characters and stores only a bcrypt hash. Remove `ADMIN_PASSWORD` from the persistent environment after provisioning if it is not needed again.

## Domain, SSL, and launch

Map `touhidhr.com` and `www.touhidhr.com` to the Node app, select one canonical host in Admin SEO, redirect the other, enable SSL, then force HTTPS. Express must own the site; do not point the domain directly at `client/dist`.

Verify `/api/health`, `/`, `/posts`, `/posts/<slug>`, and `/admin`, including direct refreshes. Confirm invalid `/api/*` routes return JSON. Test valid/invalid login, logout, protected routes, one CRUD cycle, post draft/publish/archive/search/detail, JPG/WEBP/PDF upload, CV download, contact submission/inbox/read/delete, theme/layout changes, a custom page/section, `/robots.txt`, `/sitemap.xml`, and upload persistence after restart.

## Troubleshooting and operations

- Database errors: recheck prefixed names, host, password, and grants; Hostinger DB host may not be `localhost`.
- 502/stopped app: inspect logs, confirm build success and `server/dist/index.js`, and use Hostinger's port.
- Login failure: rerun setup with a temporary `ADMIN_PASSWORD` and inspect `admin_users`.
- Refresh 404: domain must route to Express so SPA fallback runs.
- Upload failure: verify writable directory, MIME type, and size.
- CORS: list the exact HTTPS origins without paths.
- Stale assets: rebuild, restart, and clear Hostinger/browser caches.

Back up MySQL and `uploads` together before upgrades. Never overwrite production environment values with release files.

