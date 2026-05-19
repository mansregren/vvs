import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getReviewsForSite } from "@/lib/site";
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
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: link } = await supabase
    .from("site_users")
    .select("site_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!link) {
    return (
      <main className="container-x py-20 space-y-4 max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Inget konto kopplat
        </h1>
        <p className="text-[var(--muted)]">
          Din användare är inloggad men inte kopplad till någon firma.
        </p>
        <form action={signOut}>
          <button type="submit" className="btn-ghost">
            Logga ut
          </button>
        </form>
      </main>
    );
  }

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", link.site_id)
    .single();
  if (!site) redirect("/admin/login");

  const reviews = await getReviewsForSite(site.id);
  const servicesText = Array.isArray(site.services)
    ? (site.services as string[]).join("\n")
    : "";
  const gallery: string[] = Array.isArray(site.gallery_images)
    ? (site.gallery_images as string[])
    : [];

  return (
    <main className="container-x py-10 space-y-10 max-w-5xl">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="eyebrow mb-1">Admin · VVS-sidor</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {site.name}
          </h1>
          <p className="text-[var(--muted)] mt-1 text-sm">
            {user.email} ·{" "}
            <Link
              href={`/${site.slug}`}
              className="underline underline-offset-4"
              target="_blank"
            >
              Förhandsgranska sajten ↗
            </Link>
          </p>
        </div>
        <form action={signOut}>
          <button type="submit" className="btn-ghost btn-sm">
            Logga ut
          </button>
        </form>
      </header>

      {/* Tab-nav */}
      <nav className="flex gap-1 overflow-x-auto -mx-2 px-2 text-sm font-medium border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/95 backdrop-blur z-10">
        <TabLink id="grund">Grundinfo</TabLink>
        <TabLink id="hero">Hero & om</TabLink>
        <TabLink id="tjanster">Tjänster</TabLink>
        <TabLink id="galleri">Galleri</TabLink>
        <TabLink id="omdomen">Omdömen</TabLink>
        <TabLink id="kontakt">Kontakt & karta</TabLink>
        <TabLink id="sociala">Sociala medier</TabLink>
        <TabLink id="domain">Domän</TabLink>
        <TabLink id="duplicera">Duplicera</TabLink>
      </nav>

      <form action={updateMySite} className="space-y-12">
        {/* Grundinfo */}
        <Section id="grund" title="Grundinfo" desc="Namn, ort och varumärkesfärg.">
          <Field label="Firmanamn" name="name" defaultValue={site.name} />
          <Field label="Ort" name="city" defaultValue={site.city} />
          <Field
            label="Primärfärg (hex, t.ex. #0a4f8f)"
            name="primary_color"
            defaultValue={site.primary_color}
          />
        </Section>

        {/* Hero & om */}
        <Section id="hero" title="Hero & om oss" desc="Texterna högst upp på sajten + om-sektionen.">
          <Textarea
            label="Hero-rubrik (huvudtexten överst)"
            name="hero_tagline"
            defaultValue={site.hero_tagline ?? ""}
            rows={2}
          />
          <Textarea
            label="Underrubrik (en mening under)"
            name="tagline_secondary"
            defaultValue={site.tagline_secondary ?? ""}
            rows={2}
          />
          <Field
            label="Knapp-text (default: 'Ring {nummer}')"
            name="cta_text"
            defaultValue={site.cta_text ?? ""}
            placeholder="t.ex. Ring för fri offert"
          />
          <Field
            label="Område vi servar (kort)"
            name="service_area"
            defaultValue={site.service_area ?? ""}
            placeholder="t.ex. Värnamo med omnejd"
          />
          <Field
            label="År i branschen"
            name="years_in_business"
            type="number"
            defaultValue={site.years_in_business ?? ""}
            placeholder="t.ex. 20"
          />
          <Textarea
            label="Om oss"
            name="about_text"
            defaultValue={site.about_text ?? ""}
            rows={6}
          />
        </Section>

        {/* Tjänster */}
        <Section
          id="tjanster"
          title="Tjänster"
          desc="En tjänst per rad. Använd '—' för att lägga till beskrivning, t.ex. 'Värmepumpar — installation och service'."
        >
          <Textarea
            label=""
            name="services"
            defaultValue={servicesText}
            rows={8}
          />
        </Section>

        {/* Kontakt + map */}
        <Section
          id="kontakt"
          title="Kontakt & karta"
          desc="Visas i kontakt-sektionen och i Hero-knappen."
        >
          <Field label="Telefon" name="phone" defaultValue={site.phone} />
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
            label="Google Maps embed (klistra in hela <iframe>-koden ELLER bara src-URL)"
            name="google_maps_embed"
            defaultValue={site.google_maps_embed ?? ""}
            rows={3}
            placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
          />
        </Section>

        {/* Sociala medier */}
        <Section
          id="sociala"
          title="Sociala medier"
          desc="Visas i footer + dedikerad sektion på sajten."
        >
          <Toggle
            name="facebook_enabled"
            checked={site.facebook_enabled}
            label="Visa Facebook-länk"
          />
          <Field
            label=""
            name="facebook_url"
            defaultValue={site.facebook_url ?? ""}
            placeholder="https://www.facebook.com/dittforetag"
          />
          <Toggle
            name="instagram_enabled"
            checked={site.instagram_enabled}
            label="Visa Instagram-länk"
          />
          <Field
            label=""
            name="instagram_url"
            defaultValue={site.instagram_url ?? ""}
            placeholder="https://www.instagram.com/dittforetag"
          />
        </Section>

        {/* Domain */}
        <Section
          id="domain"
          title="Egen domän"
          desc="När du har pekat din domäns DNS mot Vercel — skriv in domänen här så servar plattformen din sajt på den. Lämna tomt för bara slug-route."
        >
          <Field
            label="Domän"
            name="domain"
            defaultValue={site.domain ?? ""}
            placeholder="t.ex. mittforetag.se"
          />
        </Section>

        {/* Sticky save */}
        <div className="sticky bottom-4 bg-[var(--surface)]/95 backdrop-blur border border-[var(--border)] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="text-sm text-[var(--muted)]">
            Sparar alla fält ovan.
          </div>
          <button type="submit" className="btn-primary">
            Spara ändringar
          </button>
        </div>
      </form>

      {/* Logo + hero image — egna formulär */}
      <Section
        id="bilder"
        title="Logga & hero-bild"
        desc="Loggan visas i header och footer. Hero-bilden är bakgrunden på den första sektionen."
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
          />
          <ImageUploader
            label="Hero-bild"
            currentUrl={site.hero_image_url}
            action={uploadHeroImage}
            fieldName="image"
            accept="image/png,image/jpeg,image/webp"
            aspect="aspect-[16/9]"
            objectFit="object-cover"
          />
        </div>
      </Section>

      {/* Galleri */}
      <Section
        id="galleri"
        title="Galleri"
        desc="Bilder från tidigare jobb. Klicka en bild för att ta bort den."
      >
        <form action={uploadGalleryImage} className="flex items-center gap-3 mb-6">
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

      {/* Omdömen */}
      <Section
        id="omdomen"
        title="Omdömen"
        desc="Lägg till kundomdömen som visas i en egen sektion på sajten."
      >
        <form
          action={addReview}
          className="card space-y-3 mb-6 bg-[var(--warm)]"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Field
              label="Kundens namn"
              name="customer_name"
              placeholder="t.ex. Anna Andersson"
            />
            <label className="block">
              <span className="text-sm font-medium block mb-1">
                Betyg (1-5)
              </span>
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
                  <p className="text-sm text-[var(--foreground)]/90">
                    {r.text}
                  </p>
                </div>
                <form action={removeReview} className="shrink-0">
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

      {/* Duplicera */}
      <Section
        id="duplicera"
        title="Duplicera sajten"
        desc="Skapa en kopia av denna firma (samma innehåll, ny slug och nytt namn). Du blir ägare av kopian också. Kan användas som mall för en ny kund."
      >
        <form
          action={duplicateSite}
          className="card space-y-3 bg-[var(--warm)]"
        >
          <Field
            label="Nytt firmanamn"
            name="new_name"
            placeholder="t.ex. Norra VVS AB"
          />
          <Field
            label="Ny slug (bara a-z, 0-9, bindestreck)"
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

function TabLink({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
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
      {label && (
        <span className="text-sm font-medium block mb-1">{label}</span>
      )}
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
      {label && (
        <span className="text-sm font-medium block mb-1">{label}</span>
      )}
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

function ImageUploader({
  label,
  currentUrl,
  action,
  fieldName,
  accept,
  aspect,
  objectFit,
}: {
  label: string;
  currentUrl: string | null;
  action: (formData: FormData) => Promise<void>;
  fieldName: string;
  accept: string;
  aspect: string;
  objectFit: string;
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{label}</div>
      <div className={`${aspect} rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--warm)]`}>
        {currentUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentUrl}
            alt=""
            className={`w-full h-full ${objectFit}`}
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm text-[var(--muted)]">
            Ingen bild än
          </div>
        )}
      </div>
      <form action={action} className="flex items-center gap-3">
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
