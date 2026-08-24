import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import type { RowDataPacket } from "mysql2/promise";
import { env } from "./config/env.js";
import { db } from "./config/db.js";
import { authRouter } from "./routes/auth.js";
import { crudRouter } from "./routes/crud.js";
import { settingsRouter } from "./routes/settings.js";
import { postsRouter } from "./routes/posts.js";
import { mediaRouter } from "./routes/media.js";
import { contactRouter } from "./routes/contact.js";
import { requireAuth } from "./middleware/auth.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { ok } from "./utils/http.js";
export const app = express();
const origins = env.CORS_ORIGINS.split(",").map((x) => x.trim());
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: (o, cb) =>
      !o || origins.includes(o)
        ? cb(null, true)
        : cb(new Error("Origin not allowed")),
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.resolve(env.UPLOAD_DIR), {
    dotfiles: "deny",
    fallthrough: false,
    maxAge: env.NODE_ENV === "production" ? "7d" : 0,
  }),
);
app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    ok(res, { version: "1.0.0", database: "connected" });
  } catch {
    res
      .status(503)
      .json({ success: false, message: "Database unavailable", errors: [] });
  }
});
app.use(
  "/api/auth/login",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(
  "/api/contact",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use("/api/auth", authRouter);
app.use("/api", settingsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/media", mediaRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin/messages", contactRouter);
app.get("/api/public/site", async (req, res, next) => {
  try {
    const single = async (t: string) => {
      const [r] = await db.query<RowDataPacket[]>(
        `SELECT * FROM \`${t}\` ORDER BY id LIMIT 1`,
      );
      return r[0] || {};
    };
    const many = async (t: string) => {
      const [r] = await db.query<RowDataPacket[]>(
        `SELECT * FROM \`${t}\` WHERE active=1 ORDER BY COALESCE(display_order,0),id`,
      );
      return r;
    };
    const [
      profile,
      settings,
      theme,
      layout,
      seo,
      about,
      menus,
      sections,
      experiences,
      educations,
      skills,
      certifications,
      projects,
      services,
      achievements,
      testimonials,
      clients,
      socialLinks,
      customSections,
      resumes,
    ] = await Promise.all([
      single("profiles"),
      single("website_settings"),
      single("theme_settings"),
      single("layout_settings"),
      single("seo_settings"),
      single("about"),
      many("menus"),
      many("sections"),
      many("experiences"),
      many("educations"),
      many("skills"),
      many("certifications"),
      many("projects"),
      many("services"),
      many("achievements"),
      many("testimonials"),
      many("clients"),
      many("social_links"),
      many("custom_sections"),
      many("resumes"),
    ]);
    ok(res, {
      profile,
      settings,
      theme,
      layout,
      seo,
      about,
      menus,
      sections,
      experiences,
      educations,
      skills,
      certifications,
      projects,
      services,
      achievements,
      testimonials,
      clients,
      socialLinks,
      customSections,
      resumes,
    });
  } catch (e) {
    next(e);
  }
});
app.get("/api/dashboard", requireAuth, async (req, res, next) => {
  try {
    const names = ["projects", "posts", "contact_messages", "media"];
    const data: Record<string, number> = {};
    for (const name of names) {
      const [r] = await db.query<RowDataPacket[]>(
        `SELECT COUNT(*) total FROM \`${name}\``,
      );
      data[name] = Number(r[0]?.total || 0);
    }
    const [recentPosts] = await db.query<RowDataPacket[]>(
      "SELECT id,title,status,updated_at FROM posts ORDER BY updated_at DESC LIMIT 5",
    );
    const [recentMessages] = await db.query<RowDataPacket[]>(
      "SELECT id,name,subject,is_read,created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5",
    );
    ok(res, { counts: data, recentPosts, recentMessages });
  } catch (e) {
    next(e);
  }
});
app.use("/api", crudRouter);
app.get("/robots.txt", async (req, res) => {
  const [r] = await db
    .query<RowDataPacket[]>("SELECT indexing_enabled FROM seo_settings LIMIT 1")
    .catch(() => [[]] as never);
  res
    .type("text/plain")
    .send(
      r[0]?.indexing_enabled === 0
        ? "User-agent: *\nDisallow: /"
        : "User-agent: *\nAllow: /\nDisallow: /admin",
    );
});
app.get("/sitemap.xml", async (req, res) => {
  const [posts] = await db.query<RowDataPacket[]>(
    "SELECT slug,updated_at FROM posts WHERE status='published'",
  );
  const [pages] = await db.query<RowDataPacket[]>(
    "SELECT slug,updated_at FROM custom_pages WHERE status='published'",
  );
  const base = env.APP_URL.replace(/\/$/, "");
  const urls = [
    "",
    "/posts",
    ...posts.map((p) => `/posts/${p.slug}`),
    ...pages.map((p) => `/page/${p.slug}`),
  ];
  res
    .type("application/xml")
    .send(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${base}${u}</loc></url>`).join("")}</urlset>`,
    );
});
if (env.NODE_ENV === "production") {
  const client = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");
  app.use(express.static(client, { index: false }));
  app.get(
    /^(?!\/api(?:\/|$)|\/uploads(?:\/|$)|\/sitemap\.xml$|\/robots\.txt$).*/,
    (_, res, next) =>
      fs.existsSync(path.join(client, "index.html"))
        ? res.sendFile(path.join(client, "index.html"))
        : next(),
  );
}
app.use(notFound);
app.use(errorHandler);
