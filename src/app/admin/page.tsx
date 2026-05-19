import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { updateMySite, uploadLogo, signOut } from "./actions";

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
      <main className="max-w-xl mx-auto px-6 py-20 space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Inget konto kopplat
        </h1>
        <p className="text-[var(--muted)]">
          Din användare är inloggad men inte kopplad till någon firma.
          Kontakta supporten så löser vi det.
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

  const servicesText = Array.isArray(site.services)
    ? (site.services as string[]).join("\n")
    : "";

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <header className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="text-sm uppercase tracking-widest text-[var(--muted)] mb-1">
            Admin
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="text-[var(--muted)] mt-1">
            Inloggad som {user.email} ·{" "}
            <Link
              href={`/${site.slug}`}
              className="underline underline-offset-4"
            >
              Förhandsgranska →
            </Link>
          </p>
        </div>
        <form action={signOut}>
          <button type="submit" className="btn-ghost">
            Logga ut
          </button>
        </form>
      </header>

      {/* Logga */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Logga</h2>
        <div className="flex items-center gap-6">
          {site.logo_url ? (
            <img
              src={site.logo_url}
              alt="Logga"
              className="h-16 w-auto border border-[var(--border)] rounded p-2 bg-white"
            />
          ) : (
            <div className="h-16 w-32 border border-dashed border-[var(--border)] rounded text-sm text-[var(--muted)] grid place-items-center">
              Ingen logga än
            </div>
          )}
          <form action={uploadLogo} className="flex items-center gap-3">
            <input
              type="file"
              name="logo"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              required
              className="text-sm"
            />
            <button type="submit" className="btn-primary text-sm">
              Ladda upp
            </button>
          </form>
        </div>
        <p className="text-xs text-[var(--muted)]">
          PNG, JPG, WEBP eller SVG. Max 2 MB.
        </p>
      </section>

      {/* Innehåll */}
      <form action={updateMySite} className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Grundinfo</h2>
          <Field label="Firmanamn" name="name" defaultValue={site.name} />
          <Field label="Ort" name="city" defaultValue={site.city} />
          <Field
            label="Primärfärg (hex)"
            name="primary_color"
            defaultValue={site.primary_color}
            type="text"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Hero-text</h2>
          <Textarea
            label="Beskrivande mening överst på sidan"
            name="hero_tagline"
            defaultValue={site.hero_tagline ?? ""}
            rows={3}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Om oss</h2>
          <Textarea
            label=""
            name="about_text"
            defaultValue={site.about_text ?? ""}
            rows={6}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Tjänster</h2>
          <Textarea
            label="En tjänst per rad"
            name="services"
            defaultValue={servicesText}
            rows={6}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Kontakt</h2>
          <Field label="Telefon" name="phone" defaultValue={site.phone} />
          <Field label="Adress" name="address" defaultValue={site.address} />
          <Field
            label="E-post (valfritt)"
            name="email"
            defaultValue={site.email ?? ""}
            type="email"
          />
          <Textarea
            label="Öppettider (fritt text)"
            name="opening_hours"
            defaultValue={site.opening_hours ?? ""}
            rows={2}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Sociala medier</h2>

          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="facebook_enabled"
                defaultChecked={site.facebook_enabled}
              />
              <span className="font-medium">Visa Facebook</span>
            </label>
            <Field
              label=""
              name="facebook_url"
              defaultValue={site.facebook_url ?? ""}
              placeholder="https://www.facebook.com/dittforetag"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="instagram_enabled"
                defaultChecked={site.instagram_enabled}
              />
              <span className="font-medium">Visa Instagram</span>
            </label>
            <Field
              label=""
              name="instagram_url"
              defaultValue={site.instagram_url ?? ""}
              placeholder="https://www.instagram.com/dittforetag"
            />
          </div>
        </section>

        <div className="sticky bottom-4 bg-white/95 backdrop-blur border border-[var(--border)] rounded-2xl p-4 flex items-center justify-end gap-3 shadow-sm">
          <button type="submit" className="btn-primary">
            Spara ändringar
          </button>
        </div>
      </form>
    </main>
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
  defaultValue?: string;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
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
        className="w-full rounded-lg border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--accent)] resize-y"
      />
    </label>
  );
}
