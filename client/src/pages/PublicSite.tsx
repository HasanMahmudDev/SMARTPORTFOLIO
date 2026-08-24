import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { api, getData } from "../api";
import type { SiteData } from "../types";
import PublicLayout from "../components/PublicLayout";
import Section from "../components/Section";
const safe = (x?: string) => ({ __html: DOMPurify.sanitize(x || "") });
const setMeta = (name: string, content?: string, property = false) => {
  if (!content) return;
  const key = property ? "property" : "name";
  let node = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`);
  if (!node) { node = document.createElement("meta"); node.setAttribute(key, name); document.head.appendChild(node); }
  node.content = content;
};
export default function PublicSite() {
  const [data, setData] = useState<SiteData | null>(null),
    [error, setError] = useState(""),
    [sent, setSent] = useState(false);
  useEffect(() => {
    getData<SiteData>("/public/site")
      .then((d) => {
        setData(d);
        const t = d.theme,
          l = d.layout;
        Object.entries({
          "--primary-color": t.primary_color,
          "--secondary-color": t.secondary_color,
          "--accent-color": t.accent_color,
          "--background-color": t.background_color,
          "--surface-color": t.surface_color,
          "--heading-color": t.heading_color,
          "--text-color": t.text_color,
          "--link-color": t.link_color,
          "--navbar-bg": t.navbar_bg,
          "--navbar-text": t.navbar_text,
          "--footer-bg": t.footer_bg,
          "--footer-text": t.footer_text,
          "--button-color": t.button_color,
          "--border-color": t.border_color,
          "--body-font": t.body_font,
          "--heading-font": t.heading_font,
          "--container-width": `${l.container_width || 1180}px`,
          "--card-radius": `${l.card_radius || 18}px`,
          "--button-radius": `${l.button_radius || 10}px`,
          "--section-spacing": `${l.section_spacing || 96}px`,
        }).forEach(
          ([k, v]) =>
            v && document.documentElement.style.setProperty(k, String(v)),
        );
        document.title = d.seo.meta_title || d.settings.site_title;
        setMeta("description", d.seo.meta_description);
        setMeta("keywords", d.seo.keywords);
        setMeta("og:title", d.seo.meta_title || d.settings.site_title, true);
        setMeta("og:description", d.seo.meta_description, true);
        setMeta("og:image", d.seo.og_image, true);
        setMeta("twitter:card", d.seo.og_image ? "summary_large_image" : "summary");
        setMeta("twitter:title", d.seo.meta_title || d.settings.site_title);
        setMeta("twitter:description", d.seo.meta_description);
      })
      .catch(() => setError("The portfolio is temporarily unavailable."));
  }, []);
  if (error) return <div className="app-loader">{error}</div>;
  if (!data) return <div className="app-loader">Loading portfolio…</div>;
  const p = data.profile,
    s = data.settings;
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    await api.post("/contact", Object.fromEntries(new FormData(form)));
    form.reset();
    setSent(true);
  };
  return (
    <PublicLayout settings={s} menus={data.menus}>
      <main>
        <section id="home" className="hero">
          <div className="site-container hero-grid">
            <div>
              <span className="eyebrow">
                {s.site_tagline || "Professional portfolio"}
              </span>
              <h1>{p.owner_name}</h1>
              <h2>
                {p.profession}
                {p.company ? ` · ${p.company}` : ""}
              </h2>
              <p>{p.short_intro}</p>
              <div className="hero-actions">
                <a className="btn-brand" href="#contact">
                  Start a conversation
                </a>
                <Link className="btn-quiet" to="/posts">
                  Read insights
                </Link>
                {data.resumes[0] && (
                  <a className="btn-quiet" href={data.resumes[0].file_path} download>
                    {data.resumes[0].button_text || s.resume_button_text || "Download CV"}
                  </a>
                )}
              </div>
            </div>
            <div className="hero-visual">
              {p.profile_image ? (
                <img src={p.profile_image} alt={p.owner_name} />
              ) : (
                <div className="monogram">
                  {String(p.owner_name || "SP")
                    .split(" ")
                    .map((x: string) => x[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
              <span>{p.location}</span>
            </div>
          </div>
        </section>
        <Section
          id="about"
          title={data.about.title || "About"}
          subtitle={data.about.subtitle}
        >
          <div className="about-grid">
            <div
              className="rich"
              dangerouslySetInnerHTML={safe(data.about.content || p.full_bio)}
            />
            <div className="fact-panel">
              <span>Focus</span>
              <strong>{p.profession}</strong>
              <span>Based in</span>
              <strong>{p.location}</strong>
              <span>Contact</span>
              <strong>{p.email}</strong>
            </div>
          </div>
        </Section>
        {data.experiences.length > 0 && (
          <Section
            id="experience"
            title="Experience"
            subtitle="Roles and impact"
          >
            <div className="timeline">
              {data.experiences.map((x) => (
                <article key={x.id}>
                  <time>
                    {String(x.start_date || "").slice(0, 4)} —{" "}
                    {x.current_flag
                      ? "Present"
                      : String(x.end_date || "").slice(0, 4)}
                  </time>
                  <h3>{x.designation}</h3>
                  <strong>{x.organization}</strong>
                  <div dangerouslySetInnerHTML={safe(x.responsibilities)} />
                </article>
              ))}
            </div>
          </Section>
        )}
        {data.skills.length > 0 && (
          <Section id="skills" title="Capabilities" subtitle="Core strengths">
            <div className="skill-grid">
              {data.skills.map((x) => (
                <article className="skill-card" key={x.id}>
                  <div>
                    <h3>{x.name}</h3>
                    <span>{x.level}</span>
                  </div>
                  <div className="skill-track">
                    <i style={{ width: `${x.percentage}%` }} />
                  </div>
                  <p>{x.description}</p>
                </article>
              ))}
            </div>
          </Section>
        )}
        {data.services.length > 0 && (
          <Section
            id="services"
            title="Services"
            subtitle="How I can help"
            className="tinted"
          >
            <div className="cards-3">
              {data.services.map((x) => (
                <article className="public-card" key={x.id}>
                  <i className={`bi ${x.icon || "bi-stars"}`} />
                  <h3>{x.title}</h3>
                  <p>{x.short_description}</p>
                  <a href={x.cta_url || "#contact"}>
                    {x.cta_label || "Learn more"} <span>→</span>
                  </a>
                </article>
              ))}
            </div>
          </Section>
        )}
        {data.projects.length > 0 && (
          <Section
            id="projects"
            title="Selected work"
            subtitle="Programs and initiatives"
          >
            <div className="project-grid">
              {data.projects.map((x) => (
                <article className="project-card" key={x.id}>
                  {x.thumbnail && <img src={x.thumbnail} alt="" />}
                  <div>
                    <small>{x.client}</small>
                    <h3>{x.title}</h3>
                    <p>{x.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        )}
        {data.testimonials.length > 0 && (
          <Section
            id="testimonials"
            title="Trusted collaboration"
            subtitle="Words from colleagues"
            className="dark-band"
          >
            <div className="cards-3">
              {data.testimonials.map((x) => (
                <blockquote key={x.id}>
                  <div>{"★".repeat(Number(x.rating) || 5)}</div>
                  <p>“{x.testimonial}”</p>
                  <footer>
                    <strong>{x.person_name}</strong>
                    <span>
                      {x.designation}, {x.organization}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </Section>
        )}
        <Section
          id="contact"
          title="Let’s work together"
          subtitle="Start a conversation"
        >
          <div className="contact-grid">
            <div>
              <h3>Have a project or professional opportunity?</h3>
              <p>Share a few details and I’ll get back to you.</p>
              <p>
                <b>{p.email}</b>
                <br />
                {p.phone}
                <br />
                {p.location}
              </p>
              <div className="socials">
                {data.socialLinks.map((x) => (
                  <a key={x.id} href={x.url} aria-label={x.label}>
                    <i className={`bi ${x.icon}`} />
                  </a>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <input name="name" placeholder="Your name" required />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="form-row">
                <input name="phone" placeholder="Phone (optional)" />
                <input name="subject" placeholder="Subject" required />
              </div>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your message"
                required
              />
              <button className="btn-brand" type="submit">
                Send message
              </button>
              {sent && (
                <p className="success-note">
                  Thank you — your message has been received.
                </p>
              )}
            </form>
          </div>
        </Section>
      </main>
    </PublicLayout>
  );
}
