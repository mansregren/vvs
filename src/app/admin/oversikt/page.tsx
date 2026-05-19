import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isPlatformAdmin, listSiteStats, getCertAssets } from "@/lib/site";
import { CERTIFICATIONS, BRAND_PARTNERS } from "@/lib/catalogs";
import {
  createSiteAndOwner,
  uploadCertAsset,
  removeCertAsset,
  signOutPlatform,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function PlatformOverview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login?next=/admin/oversikt");

  const platformAdmin = await isPlatformAdmin(user.id);
  if (!platformAdmin) {
    return (
      <main className="container-x py-20 max-w-xl space-y-4">
        <div className="eyebrow">Plattform-admin</div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Inte behörig
        </h1>
        <p className="text-[var(--muted)]">
          Din användare har inte plattform-admin-roll. Gå till{" "}
          <Link href="/admin" className="underline underline-offset-4">
            firma-administrationen
          </Link>{" "}
          istället.
        </p>
        <form action={signOutPlatform}>
          <button type="submit" className="btn-ghost">
            Logga ut
          </button>
        </form>
      </main>
    );
  }

  const [stats, certAssets] = await Promise.all([
    listSiteStats(),
    getCertAssets(),
  ]);

  const totalSites = stats.length;
  const sitesWithDomain = stats.filter((s) => s.domain).length;
  const sitesWithImages = stats.filter((s) => s.hero_image_url).length;
  const totalReviews = stats.reduce((sum, s) => sum + s.review_count, 0);

  return (
    <main className="container-x py-10 space-y-10 max-w-7xl">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="eyebrow mb-1">Plattform-admin</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Översikt — alla sajter
          </h1>
          <p className="text-[var(--muted)] mt-1 text-sm">
            {user.email} ·{" "}
            <Link
              href="/admin"
              className="underline underline-offset-4"
            >
              Min firma →
            </Link>
          </p>
        </div>
        <form action={signOutPlatform}>
          <button type="submit" className="btn-ghost btn-sm">
            Logga ut
          </button>
        </form>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Sajter totalt" value={totalSites} />
        <StatCard label="Med egen domän" value={sitesWithDomain} />
        <StatCard label="Med hero-bild" value={sitesWithImages} />
        <StatCard label="Omdömen totalt" value={totalReviews} />
      </section>

      {/* Skapa ny */}
      <section className="card bg-[var(--warm)] space-y-4">
        <div>
          <div className="eyebrow mb-1" style={{ color: "var(--accent)" }}>
            Skapa ny
          </div>
          <h2 className="text-xl font-semibold tracking-tight">
            Lägg upp en ny firma
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Skapar en sajt-rad, ett nytt admin-konto, och kopplar dem.
          </p>
        </div>
        <form action={createSiteAndOwner} className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Firmanamn"
            required
            className="input"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug (a-z, 0-9, -)"
            required
            pattern="[a-z0-9-]+"
            className="input"
          />
          <input
            type="text"
            name="city"
            placeholder="Ort"
            required
            className="input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            required
            className="input"
          />
          <input
            type="text"
            name="address"
            placeholder="Adress"
            required
            className="input sm:col-span-2"
          />
          <input
            type="email"
            name="owner_email"
            placeholder="Ägarens e-post (skapas)"
            required
            className="input"
          />
          <input
            type="password"
            name="owner_password"
            placeholder="Initial lösen (min 8 tecken)"
            required
            minLength={8}
            className="input"
          />
          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" className="btn-primary btn-sm">
              Skapa firma
            </button>
          </div>
        </form>
      </section>

      {/* Cert + Brand asset upload */}
      <section className="space-y-6">
        <div>
          <div className="eyebrow mb-1" style={{ color: "var(--accent)" }}>
            Logo-bibliotek
          </div>
          <h2 className="text-xl font-semibold tracking-tight">
            Certifikat- och märkesloggor
          </h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-2xl">
            Ladda upp officiella logo-filer som du har licens att använda (t.ex.
            Säker Vatten-märket för auktoriserade firmor). Sajterna visar
            uppladdad logo om den finns, annars en stiliserad badge.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-3">Certifikat ({CERTIFICATIONS.length})</h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((c) => (
              <CertAssetCard
                key={c.key}
                cardKey={c.key}
                kind="certification"
                label={c.short}
                color={c.color}
                initials={c.initials}
                logoUrl={certAssets[c.key]}
              />
            ))}
          </ul>
        </div>

        <div className="pt-4">
          <h3 className="font-medium mb-3">Märken ({BRAND_PARTNERS.length})</h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BRAND_PARTNERS.map((b) => (
              <CertAssetCard
                key={b.key}
                cardKey={b.key}
                kind="brand"
                label={b.label}
                color={b.color}
                initials={b.initials}
                logoUrl={certAssets[b.key]}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Sajt-lista */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Alla sajter
          </h2>
          <span className="text-sm text-[var(--muted)]">
            Sortering: senast uppdaterad
          </span>
        </div>

        {stats.length === 0 ? (
          <div className="card text-[var(--muted)]">Inga sajter än.</div>
        ) : (
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead className="text-left text-xs uppercase tracking-widest text-[var(--muted)]">
                <tr className="border-b border-[var(--border)]">
                  <th className="py-3 pr-3">Sajt</th>
                  <th className="py-3 px-3">Ort</th>
                  <th className="py-3 px-3">Domän</th>
                  <th className="py-3 px-3 text-right">Tjänster</th>
                  <th className="py-3 px-3 text-right">Galleri</th>
                  <th className="py-3 px-3 text-right">Omdömen</th>
                  <th className="py-3 px-3 text-right">Certifikat</th>
                  <th className="py-3 px-3">Senast</th>
                  <th className="py-3 pl-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--warm)] transition-colors"
                  >
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-[var(--warm)]">
                          {s.logo_url || s.hero_image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={s.logo_url ?? s.hero_image_url ?? ""}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{s.name}</div>
                          <div className="text-xs text-[var(--muted)] truncate">
                            /{s.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[var(--muted)]">{s.city}</td>
                    <td className="py-3 px-3">
                      {s.domain ? (
                        <a
                          href={`https://${s.domain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-4"
                        >
                          {s.domain}
                        </a>
                      ) : (
                        <span className="text-[var(--muted-2)] text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {s.service_count}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {s.gallery_count}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {s.review_count}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {s.cert_count}
                    </td>
                    <td className="py-3 px-3 text-[var(--muted)] text-xs">
                      {new Date(s.updated_at).toLocaleDateString("sv-SE")}
                    </td>
                    <td className="py-3 pl-3 text-right">
                      <Link
                        href={`/${s.slug}`}
                        target="_blank"
                        className="text-sm font-medium underline-offset-4 hover:underline"
                      >
                        Öppna ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <div className="text-3xl font-semibold tracking-tight tabular-nums">
        {value}
      </div>
      <div className="text-sm text-[var(--muted)] mt-1">{label}</div>
    </div>
  );
}

function CertAssetCard({
  cardKey,
  kind,
  label,
  color,
  initials,
  logoUrl,
}: {
  cardKey: string;
  kind: "certification" | "brand";
  label: string;
  color: string;
  initials: string;
  logoUrl?: string;
}) {
  return (
    <li className="card space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-white border border-[var(--border)] overflow-hidden grid place-items-center p-1.5 shrink-0">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={label}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div
              className="w-full h-full rounded-md grid place-items-center text-white font-bold text-xs"
              style={{
                background: `linear-gradient(135deg, ${color}, color-mix(in oklab, ${color} 70%, black))`,
              }}
              aria-hidden
            >
              {initials}
            </div>
          )}
        </div>
        <div className="font-medium leading-tight truncate flex-1">{label}</div>
      </div>

      <form action={uploadCertAsset} className="space-y-2">
        <input type="hidden" name="key" value={cardKey} />
        <input type="hidden" name="kind" value={kind} />
        <input
          type="url"
          name="logo_url"
          placeholder="Klistra in URL till officiell logo"
          defaultValue={logoUrl ?? ""}
          className="input text-xs"
        />
        <div className="flex items-center gap-2">
          <input
            type="file"
            name="logo"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="text-xs flex-1 min-w-0"
          />
          <button type="submit" className="btn-ghost btn-sm shrink-0">
            Spara
          </button>
        </div>
      </form>

      {logoUrl && (
        <form action={removeCertAsset}>
          <input type="hidden" name="key" value={cardKey} />
          <button
            type="submit"
            className="text-xs text-red-600 hover:underline underline-offset-4"
          >
            Ta bort logo
          </button>
        </form>
      )}
    </li>
  );
}
