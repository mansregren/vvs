import Link from "next/link";
import {
  CERTIFICATIONS,
  BRAND_PARTNERS,
  SERVICES_CATALOG,
} from "@/lib/catalogs";
import { ColorPicker } from "@/components/admin/ColorPicker";
import { ContactsEditor } from "@/components/admin/ContactsEditor";
import {
  updateMySite,
  uploadLogo,
  uploadHeroImage,
  uploadGalleryImage,
  removeGalleryImage,
  addReview,
  removeReview,
  duplicateSite,
  signOut,
} from "@/app/admin/actions";

interface EditorSite {
  id: string;
  slug: string;
  name: string;
  city: string;
  primary_color: string;
  phone: string;
  address: string;
  email: string | null;
  hero_tagline: string | null;
  tagline_secondary: string | null;
  about_text: string | null;
  cta_text: string | null;
  service_area: string | null;
  opening_hours: string | null;
  google_maps_embed: string | null;
  jour_phone: string | null;
  jour_text: string | null;
  guarantee_text: string | null;
  facebook_url: string | null;
  facebook_page_url: string | null;
  instagram_url: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  domain: string | null;
  years_in_business: number | null;
  has_jour: boolean | null;
  rot_avdrag: boolean | null;
  offers_free_quote: boolean | null;
  facebook_enabled: boolean | null;
  instagram_enabled: boolean | null;
  services: unknown;
  certifications: unknown;
  brand_partners: unknown;
  instagram_post_urls: unknown;
  gallery_images: unknown;
  contacts: unknown;
}

interface ReviewRow {
  id: string;
  customer_name: string;
  rating: number;
  text: string;
}

export function SiteEditor({
  site,
  reviews,
  userEmail,
  platformAdmin,
  siteId,
}: {
  site: EditorSite;
  reviews: ReviewRow[];
  userEmail: string;
  platformAdmin: boolean;
  /** Sätts när en platform-admin redigerar en specifik sajt via /admin/sajt/[id]. */
  siteId?: string;
}) {
  const editingOther = Boolean(siteId);
  const gallery: string[] = Array.isArray(site.gallery_images)
    ? (site.gallery_images as string[])
    : [];
  const activeCerts: string[] = Array.isArray(site.certifications)
    ? (site.certifications as string[])
    : [];
  const activeBrands: string[] = Array.isArray(site.brand_partners)
    ? (site.brand_partners as string[])
    : [];
  const igPosts: string[] = Array.isArray(site.instagram_post_urls)
    ? (site.instagram_post_urls as string[])
    : [];
  const services: string[] = Array.isArray(site.services)
    ? (site.services as string[])
    : [];

  return (
    <main className="container-x py-10 space-y-10 max-w-5xl">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="eyebrow mb-1">
            {editingOther ? "Plattform-admin · Redigerar kund" : "Admin · VVS-sidor"}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {site.name}
          </h1>
          <p className="text-[var(--muted)] mt-1 text-sm">
            {userEmail} ·{" "}
            <Link
              href={`/${site.slug}`}
              className="underline underline-offset-4"
              target="_blank"
            >
              Förhandsgranska ↗
            </Link>
            {(editingOther || platformAdmin) && (
              <>
                {" · "}
                <Link
                  href="/admin/oversikt"
                  className="underline underline-offset-4"
                >
                  {editingOther ? "← Översikt" : "Plattform-admin →"}
                </Link>
              </>
            )}
          </p>
        </div>
        <form action={signOut}>
          <button type="submit" className="btn-ghost btn-sm">
            Logga ut
          </button>
        </form>
      </header>

      <nav className="flex gap-1 overflow-x-auto -mx-2 px-2 text-sm font-medium border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/95 backdrop-blur z-10">
        <TabLink id="grund">Grund</TabLink>
        <TabLink id="hero">Hero & om</TabLink>
        <TabLink id="tjanster">Tjänster</TabLink>
        <TabLink id="jour">Jour & avtal</TabLink>
        <TabLink id="certifikat">Certifikat</TabLink>
        <TabLink id="partners">Märken</TabLink>
        <TabLink id="bilder">Bilder</TabLink>
        <TabLink id="galleri">Galleri</TabLink>
        <TabLink id="omdomen">Omdömen</TabLink>
        <TabLink id="kontakt">Kontakt</TabLink>
        <TabLink id="sociala">Sociala</TabLink>
        <TabLink id="domain">Domän</TabLink>
        <TabLink id="duplicera">Duplicera</TabLink>
      </nav>

      <form action={updateMySite} className="space-y-12">
        <SiteIdInput siteId={siteId} />
        <Section id="grund" title="Grundinfo" desc="Namn, ort och varumärkesfärg.">
          <Field label="Firmanamn" name="name" defaultValue={site.name} />
          <Field label="Ort" name="city" defaultValue={site.city} />
          <ColorPicker name="primary_color" initial={site.primary_color} />
        </Section>

        <Section id="hero" title="Hero & om" desc="Texterna högst upp + om-sektionen.">
          <Textarea
            label="Hero-rubrik"
            name="hero_tagline"
            defaultValue={site.hero_tagline ?? ""}
            rows={2}
          />
          <Textarea
            label="Underrubrik"
            name="tagline_secondary"
            defaultValue={site.tagline_secondary ?? ""}
            rows={2}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Knapp-text"
              name="cta_text"
              defaultValue={site.cta_text ?? ""}
              placeholder="t.ex. Ring för fri offert"
            />
            <Field
              label="År i branschen"
              name="years_in_business"
              type="number"
              defaultValue={site.years_in_business ?? ""}
              placeholder="t.ex. 20"
            />
          </div>
          <Field
            label="Område vi servar"
            name="service_area"
            defaultValue={site.service_area ?? ""}
            placeholder="t.ex. Värnamo med omnejd"
          />
          <Textarea
            label="Om oss"
            name="about_text"
            defaultValue={site.about_text ?? ""}
            rows={6}
          />
        </Section>

        <Section
          id="tjanster"
          title="Tjänster"
          desc="Bocka i de tjänster ni erbjuder. Lägg till egna längst ner om något saknas."
        >
          <ServiceCheckboxes activeServices={services} />
          <Textarea
            label="Egna tjänster (en per rad, lägg till om något saknas i listan ovan)"
            name="services_custom"
            defaultValue={services
              .filter((s) => !SERVICES_CATALOG.find((o) => o.key === s))
              .join("\n")}
            rows={3}
            placeholder="t.ex. Specialiserade installationer"
          />
        </Section>

        <Section
          id="jour"
          title="Jour & avtal"
          desc="Akutservice, ROT-avdrag, garanti och offert."
        >
          <div className="card space-y-3 bg-[var(--warm)]">
            <Toggle
              name="has_jour"
              checked={site.has_jour ?? false}
              label="Vi har jour (akutservice)"
            />
            <Field
              label="Jour-nummer (om annat än vanliga numret)"
              name="jour_phone"
              defaultValue={site.jour_phone ?? ""}
              placeholder="t.ex. +46 70 000 00 00"
            />
            <Field
              label="Jour-beskrivning"
              name="jour_text"
              defaultValue={site.jour_text ?? ""}
              placeholder="t.ex. Akutservice dygnet runt vid läckor och stopp"
            />
          </div>
          <div className="card space-y-3">
            <Toggle
              name="rot_avdrag"
              checked={site.rot_avdrag ?? false}
              label="Vi erbjuder ROT-avdrag"
            />
            <Toggle
              name="offers_free_quote"
              checked={site.offers_free_quote ?? true}
              label="Vi ger kostnadsfri offert"
            />
            <Field
              label="Garanti-text (visas i en egen ruta)"
              name="guarantee_text"
              defaultValue={site.guarantee_text ?? ""}
              placeholder="t.ex. 5 års garanti på arbeten enligt branschstandard"
            />
          </div>
        </Section>

        <Section
          id="certifikat"
          title="Certifikat & branschmedlemskap"
          desc="Bocka i de som gäller för er firma. Visas i en egen sektion på sajten."
        >
          <fieldset className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((c) => (
              <label
                key={c.key}
                className="card flex items-start gap-3 cursor-pointer hover:shadow-sm transition-shadow"
              >
                <input
                  type="checkbox"
                  name="certifications"
                  value={c.key}
                  defaultChecked={activeCerts.includes(c.key)}
                  className="mt-1 w-4 h-4"
                />
                <div className="min-w-0">
                  <div className="font-medium">{c.short}</div>
                  <div className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
                    {c.description}
                  </div>
                </div>
              </label>
            ))}
          </fieldset>
        </Section>

        <Section
          id="partners"
          title="Märken vi installerar"
          desc="Vilka produkter ni jobbar med — visas som en logo-vägg på sajten."
        >
          <fieldset className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BRAND_PARTNERS.map((b) => (
              <label
                key={b.key}
                className="card flex items-center gap-3 cursor-pointer hover:shadow-sm transition-shadow"
              >
                <input
                  type="checkbox"
                  name="brand_partners"
                  value={b.key}
                  defaultChecked={activeBrands.includes(b.key)}
                  className="w-4 h-4"
                />
                <div>
                  <div className="font-semibold" style={{ color: b.color }}>
                    {b.label}
                  </div>
                  <div className="text-xs text-[var(--muted)]">{b.category}</div>
                </div>
              </label>
            ))}
          </fieldset>
        </Section>

        <Section
          id="kontakt"
          title="Kontakt & karta"
          desc="Huvudnumret visas i Hero-knappen. Lägg till fler kontakter om ni vill visa olika personer."
        >
          <Field label="Huvudtelefon" name="phone" defaultValue={site.phone} />
          <div className="pt-2">
            <span className="text-sm font-medium block mb-3">
              Fler kontaktpersoner
            </span>
            <ContactsEditor
              name="contacts_json"
              initial={
                Array.isArray(site.contacts)
                  ? (site.contacts as { name: string; phone: string; role?: string }[])
                  : []
              }
            />
          </div>
          <Field label="Adress" name="address" defaultValue={site.address} />
          <Field
            label="E-post (valfritt)"
            name="email"
            type="email"
            defaultValue={site.email ?? ""}
          />
          <Textarea
            label="Öppettider"
            name="opening_hours"
            defaultValue={site.opening_hours ?? ""}
            rows={2}
          />
          <Textarea
            label="Google Maps embed (hela <iframe>-snippet ELLER bara src-URL)"
            name="google_maps_embed"
            defaultValue={site.google_maps_embed ?? ""}
            rows={3}
            placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
          />
        </Section>

        <Section
          id="sociala"
          title="Sociala medier"
          desc="Facebook-Page-Plugin och Instagram-posts visas som riktiga inbäddningar."
        >
          <div className="space-y-3">
            <div className="font-medium">Facebook</div>
            <Toggle
              name="facebook_enabled"
              checked={site.facebook_enabled ?? false}
              label="Visa Facebook-länk i header/footer"
            />
            <Field
              label="Facebook-profil-URL (för länk)"
              name="facebook_url"
              defaultValue={site.facebook_url ?? ""}
              placeholder="https://www.facebook.com/dittforetag"
            />
            <Field
              label="Facebook-Page-URL (för inbäddat flöde)"
              name="facebook_page_url"
              defaultValue={site.facebook_page_url ?? ""}
              placeholder="https://www.facebook.com/DinFacebookPage"
            />
          </div>

          <div className="space-y-3 pt-6 border-t border-[var(--border)]">
            <div className="font-medium">Instagram</div>
            <Toggle
              name="instagram_enabled"
              checked={site.instagram_enabled ?? false}
              label="Visa Instagram-länk i header/footer"
            />
            <Field
              label="Instagram-profil-URL"
              name="instagram_url"
              defaultValue={site.instagram_url ?? ""}
              placeholder="https://www.instagram.com/dittforetag"
            />
            <Textarea
              label="URL:er till enskilda Instagram-posts (en per rad, max 12)"
              name="instagram_post_urls"
              defaultValue={igPosts.join("\n")}
              rows={4}
              placeholder="https://www.instagram.com/p/POST_ID/"
            />
            <p className="text-xs text-[var(--muted)]">
              Klistra in länkar till specifika inlägg från Instagram så bäddas
              de in som riktiga inläggsförhandsvisningar på sajten.
            </p>
          </div>
        </Section>

        <Section
          id="domain"
          title="Egen domän"
          desc="När din domäns DNS pekar mot Vercel — skriv in domänen så servar plattformen sajten på den. Lämna tomt för bara slug-route."
        >
          <Field
            label="Domän (utan https://)"
            name="domain"
            defaultValue={site.domain ?? ""}
            placeholder="t.ex. mittforetag.se"
          />
        </Section>

        <div className="sticky bottom-4 bg-[var(--surface)]/95 backdrop-blur border border-[var(--border)] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md">
          <div className="text-sm text-[var(--muted)]">Sparar alla fält ovan.</div>
          <button type="submit" className="btn-primary">
            Spara ändringar
          </button>
        </div>
      </form>

      <Section
        id="bilder"
        title="Logga & hero-bild"
        desc="Loggan visas i header/footer. Hero-bilden är bakgrunden på sajtens första sektion."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <ImageUploader
            label="Logga (PNG/SVG)"
            currentUrl={site.logo_url}
            action={uploadLogo}
            fieldName="logo"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            aspect="aspect-[3/1] bg-white"
            objectFit="object-contain"
            siteId={siteId}
          />
          <ImageUploader
            label="Hero-bild (1600×900 rekommenderas)"
            currentUrl={site.hero_image_url}
            action={uploadHeroImage}
            fieldName="image"
            accept="image/png,image/jpeg,image/webp"
            aspect="aspect-[16/9]"
            objectFit="object-cover"
            siteId={siteId}
          />
        </div>
      </Section>

      <Section
        id="galleri"
        title="Galleri"
        desc="Bilder från tidigare jobb. Hover över en bild för att ta bort."
      >
        <form action={uploadGalleryImage} className="flex items-center gap-3 mb-6">
          <SiteIdInput siteId={siteId} />
          <input
            type="file"
            name="image"
            accept="image/png,image/jpeg,image/webp"
            required
            className="text-sm"
          />
          <button type="submit" className="btn-primary btn-sm">
            Lägg till bild
          </button>
        </form>
        {gallery.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Inga bilder än.</p>
        ) : (
          <div className="gallery-grid">
            {gallery.map((url) => (
              <form
                key={url}
                action={removeGalleryImage}
                className="gallery-item relative group"
              >
                <SiteIdInput siteId={siteId} />
                <input type="hidden" name="url" value={url} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" />
                <button
                  type="submit"
                  className="absolute inset-0 grid place-items-center bg-black/60 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Ta bort
                </button>
              </form>
            ))}
          </div>
        )}
      </Section>

      <Section
        id="omdomen"
        title="Omdömen"
        desc="Visas i en egen sektion på sajten med ★-rating."
      >
        <form action={addReview} className="card space-y-3 mb-6 bg-[var(--warm)]">
          <SiteIdInput siteId={siteId} />
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Kundens namn"
              name="customer_name"
              placeholder="t.ex. Anna Andersson"
            />
            <label className="block">
              <span className="text-sm font-medium block mb-1">Betyg (1-5)</span>
              <select name="rating" defaultValue="5" className="input">
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★ (4)</option>
                <option value="3">★★★ (3)</option>
                <option value="2">★★ (2)</option>
                <option value="1">★ (1)</option>
              </select>
            </label>
          </div>
          <Textarea
            label="Omdöme"
            name="text"
            rows={3}
            placeholder="Vad sa kunden?"
          />
          <div className="flex justify-end">
            <button type="submit" className="btn-primary btn-sm">
              Lägg till
            </button>
          </div>
        </form>

        {reviews.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Inga omdömen än.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="card flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium">{r.customer_name}</span>
                    <span className="star-on text-sm">{"★".repeat(r.rating)}</span>
                  </div>
                  <p className="text-sm text-[var(--foreground)]/90">{r.text}</p>
                </div>
                <form action={removeReview} className="shrink-0">
                  <SiteIdInput siteId={siteId} />
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="text-sm text-red-600 hover:underline underline-offset-4"
                  >
                    Ta bort
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section
        id="duplicera"
        title="Duplicera sajten"
        desc="Kopia med ny slug och nytt namn. Bra som mall för en ny kund."
      >
        <form action={duplicateSite} className="card space-y-3 bg-[var(--warm)]">
          <SiteIdInput siteId={siteId} />
          <Field
            label="Nytt firmanamn"
            name="new_name"
            placeholder="t.ex. Norra VVS AB"
          />
          <Field
            label="Ny slug (a-z, 0-9, bindestreck)"
            name="new_slug"
            placeholder="t.ex. norra-vvs"
          />
          <div className="flex justify-end">
            <button type="submit" className="btn-primary btn-sm">
              Skapa kopia
            </button>
          </div>
        </form>
      </Section>
    </main>
  );
}

/* ---------- helpers ---------- */

function SiteIdInput({ siteId }: { siteId?: string }) {
  if (!siteId) return null;
  return <input type="hidden" name="site_id" value={siteId} />;
}

function TabLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a
      href={`#${id}`}
      className="px-3 py-2 rounded-lg hover:bg-[var(--warm)] whitespace-nowrap text-[var(--muted)] hover:text-[var(--foreground)]"
    >
      {children}
    </a>
  );
}

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-5 scroll-mt-24">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {desc && (
          <p className="text-sm text-[var(--muted)] mt-1 max-w-2xl">{desc}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      {label && <span className="text-sm font-medium block mb-1">{label}</span>}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="input"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      {label && <span className="text-sm font-medium block mb-1">{label}</span>}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
        className="input resize-y"
      />
    </label>
  );
}

function Toggle({
  name,
  checked,
  label,
}: {
  name: string;
  checked: boolean;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked}
        className="w-4 h-4"
      />
      <span className="font-medium">{label}</span>
    </label>
  );
}

function ServiceCheckboxes({ activeServices }: { activeServices: string[] }) {
  const categories = Array.from(new Set(SERVICES_CATALOG.map((s) => s.category)));
  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat}>
          <div className="eyebrow mb-3" style={{ color: "var(--accent)" }}>
            {cat}
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {SERVICES_CATALOG.filter((s) => s.category === cat).map((s) => (
              <label
                key={s.key}
                className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--warm)] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  name="service_keys"
                  value={s.key}
                  defaultChecked={activeServices.includes(s.key)}
                  className="mt-1 w-4 h-4 shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-medium leading-tight">{s.label}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">
                    {s.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageUploader({
  label,
  currentUrl,
  action,
  fieldName,
  accept,
  aspect,
  objectFit,
  siteId,
}: {
  label: string;
  currentUrl: string | null;
  action: (formData: FormData) => Promise<void>;
  fieldName: string;
  accept: string;
  aspect: string;
  objectFit: string;
  siteId?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{label}</div>
      <div
        className={`${aspect} rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--warm)]`}
      >
        {currentUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentUrl} alt="" className={`w-full h-full ${objectFit}`} />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm text-[var(--muted)]">
            Ingen bild än
          </div>
        )}
      </div>
      <form action={action} className="flex items-center gap-3">
        {siteId ? (
          <input type="hidden" name="site_id" value={siteId} />
        ) : null}
        <input
          type="file"
          name={fieldName}
          accept={accept}
          required
          className="text-sm"
        />
        <button type="submit" className="btn-ghost btn-sm">
          Ladda upp
        </button>
      </form>
    </div>
  );
}
