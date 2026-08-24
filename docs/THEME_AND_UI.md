# SmartPortfolio — Theme & UI Reference

## Primary admin-theme reference
Use this repository as the primary visual/admin-shell reference:

`https://github.com/HasanMahmudDev/adminHMDtheme`

Important:
- Inspect the repository before implementing the Admin UI.
- Reuse/adapt its visual language, layout ideas, spacing, sidebar/topbar patterns, form/table/card styling, and responsive behavior where technically appropriate.
- Do not blindly copy obsolete dependencies or code that conflicts with React/TypeScript/Vite.
- Keep SmartPortfolio maintainable and production-ready.
- Preserve any license/attribution requirements found in the reference repository.
- Do not hard-code client branding from the reference theme.

If the GitHub repository is private, use the authenticated GitHub access available in the Codex environment or a local copy if present. If it is still inaccessible, continue with a polished HMD-inspired professional admin design rather than blocking the entire project, and clearly report the access limitation.

## Admin UI direction
The Admin Panel should feel like a polished commercial CMS:
- collapsible left sidebar
- clean topbar
- responsive mobile drawer
- dashboard stat cards
- reusable table/list toolbar
- consistent CRUD forms
- filter/search controls
- modal or page-based forms where appropriate
- toast notifications
- confirm-delete dialog
- breadcrumbs/page titles
- loading/empty/error states
- accessible contrast and focus states

Avoid a generic tutorial dashboard appearance.

## Public website direction
The public portfolio should be modern, premium, fast, and profession-neutral.

Use:
- strong hero area
- clean typography
- consistent section spacing
- high-quality card layouts
- timeline variants for experience/education
- flexible project/post cards
- elegant mobile layout
- subtle animation only
- no excessive motion

The public theme does not need to look identical to the Admin theme. It should share design quality and configurable brand tokens.

## Dynamic design tokens
Admin settings should populate CSS variables such as:
```css
--primary-color
--secondary-color
--accent-color
--background-color
--surface-color
--heading-color
--text-color
--link-color
--navbar-bg
--navbar-text
--footer-bg
--footer-text
--button-color
--border-color
--body-font
--heading-font
--container-width
--card-radius
--button-radius
--section-spacing
```

Apply changes without code edits.

## Theme presets
Include:
1. Corporate Blue
2. Executive Navy
3. Modern Green
4. Elegant Purple
5. Premium Dark
6. Minimal Light
7. Developer Dark
8. Creative Portfolio

Preset values live in application configuration/database seed and remain editable.

## User choice
Support:
- Light
- Dark
- System

Admin controls the default. Visitors can override locally.

## Commercial requirement
A buyer must be able to turn the same source into a visually different portfolio through Admin settings:
- colors
- fonts
- logo/favicon
- layout
- navbar
- hero
- section order
- section visibility
- card style
- footer
- dark/light mode

No client-specific theme name should be embedded in reusable components.
