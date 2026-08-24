import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api, getData } from "../api";
import type { Row } from "../types";
const fields: Record<string, [string, string, string?][]> = {
  profile: [
    ["owner_name", "Owner name"],
    ["profession", "Profession / designation"],
    ["company", "Company"],
    ["short_intro", "Short introduction", "textarea"],
    ["full_bio", "Full biography", "textarea"],
    ["profile_image", "Profile image path"],
    ["cover_image", "Cover image path"],
    ["email", "Email", "email"],
    ["phone", "Phone"],
    ["whatsapp", "WhatsApp"],
    ["address", "Address"],
    ["location", "Location"],
  ],
  settings: [
    ["site_title", "Website title"],
    ["site_tagline", "Tagline"],
    ["logo", "Logo path"],
    ["favicon", "Favicon path"],
    ["domain", "Domain"],
    ["footer_text", "Footer text", "textarea"],
    ["copyright_text", "Copyright"],
    ["developer_credit", "Developer credit"],
    ["resume_button_text", "CV button text"],
  ],
  theme: [
    ["preset", "Preset"],
    ["mode", "Default mode"],
    ["primary_color", "Primary color", "color"],
    ["secondary_color", "Secondary color", "color"],
    ["accent_color", "Accent color", "color"],
    ["background_color", "Background color", "color"],
    ["surface_color", "Surface color", "color"],
    ["heading_color", "Heading color", "color"],
    ["text_color", "Body text color", "color"],
    ["link_color", "Link color", "color"],
    ["navbar_bg", "Navbar background", "color"],
    ["navbar_text", "Navbar text", "color"],
    ["footer_bg", "Footer background", "color"],
    ["footer_text", "Footer text", "color"],
    ["button_color", "Button color", "color"],
    ["border_color", "Border color", "color"],
    ["body_font", "Body font"],
    ["heading_font", "Heading font"],
  ],
  layout: [
    ["width_mode", "Width mode"],
    ["container_width", "Container width", "number"],
    ["sticky_navbar", "Sticky navbar", "checkbox"],
    ["hero_layout", "Hero layout"],
    ["section_spacing", "Section spacing", "number"],
    ["card_radius", "Card radius", "number"],
    ["button_radius", "Button radius", "number"],
    ["card_style", "Card style"],
    ["footer_style", "Footer style"],
    ["animation_level", "Animation level"],
  ],
  seo: [
    ["meta_title", "Meta title"],
    ["meta_description", "Meta description", "textarea"],
    ["keywords", "Keywords"],
    ["canonical_domain", "Canonical domain"],
    ["og_image", "Open Graph image"],
    ["analytics_id", "Analytics ID"],
    ["indexing_enabled", "Allow indexing", "checkbox"],
  ],
};
const names: Record<string, string> = {
  profile: "Profile & identity",
  settings: "Website settings",
  theme: "Theme builder",
  layout: "Layout builder",
  seo: "Search & social SEO",
};
export default function SettingsEditor() {
  const { kind = "profile" } = useParams(),
    [data, setData] = useState<Row>({ id: 0 }),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getData<Row>(`/${kind}`)
      .then(setData)
      .finally(() => setLoading(false));
  }, [kind]);
  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget));
    (fields[kind] || [])
      .filter((x) => x[2] === "checkbox")
      .forEach(
        (x) =>
          (raw[x[0]] = (
            e.currentTarget.elements.namedItem(x[0]) as HTMLInputElement
          ).checked
            ? "1"
            : "0"),
      );
    try {
      const r = await api.put(`/${kind}`, raw);
      setData(r.data.data);
      toast.success("Settings saved and available to the public site");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Could not save settings");
    }
  };
  return (
    <>
      <div className="page-title">
        <div>
          <span>DESIGN & SETTINGS</span>
          <h1>{names[kind]}</h1>
          <p>
            Update visible content and presentation without changing source
            code.
          </p>
        </div>
      </div>
      <form key={`${kind}-${data.preset || "default"}`} className="admin-card settings-form" onSubmit={save}>
        {loading ? (
          <div className="empty-state">Loading settings…</div>
        ) : (
          <>
            <div className="editor-grid">
              {(fields[kind] || []).map(([name, label, type]) => (
                <label className={type === "textarea" ? "wide" : ""} key={name}>
                  {type === "checkbox" ? (
                    <>
                      <input
                        name={name}
                        type="checkbox"
                        defaultChecked={Boolean(data[name])}
                      />
                      <span>{label}</span>
                    </>
                  ) : (
                    <>
                      <span>{label}</span>
                      {type === "textarea" ? (
                        <textarea
                          name={name}
                          defaultValue={data[name] || ""}
                          rows={5}
                        />
                      ) : (
                        <input
                          name={name}
                          type={type || "text"}
                          defaultValue={data[name] ?? ""}
                        />
                      )}
                    </>
                  )}
                </label>
              ))}
            </div>
            {kind === "theme" && <PresetPicker data={data} setData={setData} />}
            <footer>
              <a href="/" target="_blank">
                Preview public site
              </a>
              <button className="admin-primary">Save settings</button>
            </footer>
          </>
        )}
      </form>
    </>
  );
}
function PresetPicker({
  data,
  setData,
}: {
  data: Row;
  setData: (x: Row) => void;
}) {
  const presets: Record<string, Partial<Row>> = {
    "Corporate Blue": { primary_color: "#2563eb", secondary_color: "#0f172a", accent_color: "#14b8a6", background_color: "#f8fafc", surface_color: "#ffffff" },
    "Executive Navy": { primary_color: "#1d4ed8", secondary_color: "#07152e", accent_color: "#0ea5a4", background_color: "#f5f7fb", surface_color: "#ffffff" },
    "Modern Green": { primary_color: "#059669", secondary_color: "#064e3b", accent_color: "#f59e0b", background_color: "#f6fbf8", surface_color: "#ffffff" },
    "Elegant Purple": { primary_color: "#7c3aed", secondary_color: "#2e1065", accent_color: "#db2777", background_color: "#faf7ff", surface_color: "#ffffff" },
    "Premium Dark": { primary_color: "#d4a853", secondary_color: "#05070b", accent_color: "#e5c477", background_color: "#090d14", surface_color: "#121824", heading_color: "#f8fafc", text_color: "#cbd5e1" },
    "Minimal Light": { primary_color: "#18181b", secondary_color: "#27272a", accent_color: "#71717a", background_color: "#fafafa", surface_color: "#ffffff" },
    "Developer Dark": { primary_color: "#22c55e", secondary_color: "#020617", accent_color: "#38bdf8", background_color: "#090e1a", surface_color: "#111827", heading_color: "#f8fafc", text_color: "#cbd5e1" },
    "Creative Portfolio": { primary_color: "#f43f5e", secondary_color: "#312e81", accent_color: "#f59e0b", background_color: "#fff7ed", surface_color: "#ffffff" },
  };
  return (
    <div className="preset-panel">
      <h3>Included presets</h3>
      <div>
        {Object.keys(presets).map((x) => (
          <button
            type="button"
            className={data.preset === x ? "selected" : ""}
            key={x}
            onClick={() => setData({ ...data, ...presets[x], preset: x })}
          >
            {x}
          </button>
        ))}
      </div>
      <small>
        Choose a starting point, then refine every color and font above.
      </small>
    </div>
  );
}
