# SmartPortfolio Database

Import `database/schema.sql`, then optional `database/seed.sql`. The MySQL/InnoDB schema uses utf8mb4, foreign keys, unique slugs, state/visibility flags, display ordering, timestamps, and publishing/contact indexes. It covers administration, identity/settings, navigation/layout, every portfolio record, galleries, publishing taxonomy, custom pages/sections, media/CV, social links, and contact inbox.

The seed never creates an administrator. `npm run setup:admin` stores an environment-supplied password only as a bcrypt hash. Back up and restore MySQL and `uploads` together.

