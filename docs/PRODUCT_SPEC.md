# SmartPortfolio v1.0.0 — Product Specification

## Product goal
SmartPortfolio is a generic Portfolio CMS that can be sold to HR professionals, developers, designers, doctors, teachers, consultants, freelancers, executives, photographers, marketers, trainers, entrepreneurs, and other professionals.

Product branding is `SmartPortfolio`. Website/client branding is fully dynamic.

## Public website
Provide a premium responsive public website with configurable navigation and sections.

Default section types:
- Hero
- About
- Experience
- Education
- Skills
- Certifications/Training
- Projects/Portfolio
- Services
- Achievements/Awards
- Testimonials
- Clients/Organizations
- Posts
- Gallery/Media
- Resume/CV
- Contact
- Custom Section

Admin can enable/disable, rename, reorder, change subtitle, layout, icon, and presentation settings for sections.

## Site identity
Admin can change:
- website name/title
- owner name
- profession/designation/company
- short intro/full bio
- profile/cover image
- logo/favicon
- email/phone/WhatsApp/address/location
- domain
- footer/copyright/developer credit
- social links
- resume/CV

## Menu manager
CRUD menu items with:
- label
- internal page/section
- custom/external URL
- icon
- order
- new-tab option
- active status

## Portfolio modules
Full Admin CRUD + public display for:

### Experience
Organization, designation, department, type, dates, current flag, location, responsibilities, achievements, logo, URL, order, active.

### Education
Degree, subject, institute, result, dates/years, description, logo, URL, order, active.

### Skills
Dynamic categories; name, level, percentage, icon, description, display style, order, active.

### Certifications/Training
Title, organization, issue/expiry, credential ID/URL, description, image/PDF, order, active.

### Projects/Portfolio
Category, title, slug, thumbnail, gallery, excerpt, details, client, date, technologies/tags, demo/external/video URLs, featured, order, active.

### Services
Title, slug, icon/image, short/full description, optional price, CTA, order, active.

### Achievements
Title, organization, date, description, image/certificate, URL, order, active.

### Testimonials
Person, designation, organization, photo, rating, testimonial, order, active.

### Clients
Name, logo, URL, description, order, active.

## Blog / Post CMS
Owner can publish any content: article, career advice, job circular, news, announcement, event, training, professional update, personal update, photo post, or general content.

Post fields:
- title
- slug
- excerpt
- rich content
- featured image
- gallery
- category
- tags
- author
- publish date
- status: Draft/Published/Archived
- featured
- SEO title/description/keywords

Public features:
- `/posts`
- `/posts/:slug`
- category/tag filtering
- search
- pagination
- featured/latest/related posts
- social sharing

Use a stable React-compatible rich-text editor and sanitize stored/rendered HTML.

## Dynamic pages
Admin can create unlimited custom pages:
- title
- slug
- subtitle
- banner
- rich content
- status
- menu visibility/order
- SEO fields

Use a safe route such as `/page/:slug`.

## Custom section builder
Allow admin to create generic homepage sections without source changes.

Support:
- title/subtitle
- rich text
- image/icon
- CTA
- cards/items
- layout style
- background/presentation
- order
- active

## Media library
Manage JPG/JPEG/PNG/WEBP and PDF; SVG only if handled safely.

Support upload, preview, search, reuse, copy path, delete when safe, file metadata, unique Linux-safe filenames, validation, and max-size limits.

## Resume/CV
Upload/replace/remove/activate CV and configurable download button text. Multiple versions are optional if cleanly implemented.

## Contact
Public form: name, email, phone, subject, message.

Store in MySQL. Admin inbox supports list, detail, search/filter, read/unread, mark read, delete.

## Admin
Required:
- login/logout
- protected routes
- change password
- dashboard summary
- responsive sidebar/topbar
- Super Admin/Admin roles
- admin user architecture
- quick actions
- recent posts/messages

## Appearance builder
Admin controls:
- primary/secondary/accent
- background/surface
- heading/body/link
- navbar/footer
- button/border
- light/dark/system
- heading/body font
- base sizing/weights
- boxed/full width
- container width
- sticky navbar
- hero layout
- spacing
- card/button radius
- card/footer style
- animation level

Provide at least these presets:
- Corporate Blue
- Executive Navy
- Modern Green
- Elegant Purple
- Premium Dark
- Minimal Light
- Developer Dark
- Creative Portfolio

Use CSS variables so changes apply without source edits.

## SEO
Admin-configurable:
- site/meta title
- description
- keywords
- canonical domain
- OG image
- analytics ID
- indexing toggle

Implement dynamic metadata, Open Graph, Twitter card data, semantic HTML, `robots.txt`, and `sitemap.xml`.

## First deployment
Domain: `https://touhidhr.com`

Seed editable demo data appropriate for an HR/Admin professional, but keep all demo content database-driven.

The username may default to `touhidhr`. Initial password must be supplied through secure environment/setup input, hashed with bcrypt, and never committed.
