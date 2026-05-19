import Link from "next/link";
import { headers } from "next/headers";
import { getSiteByHost, getReviewsForSite, listSites } from "@/lib/site";
import { getSiteBySlug } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { MapSection } from "@/components/site/MapSection";
import { Socials } from "@/components/site/Socials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { MOCK_SITES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

const PLATFORM_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "vvs-sidor.vercel.app",
]);

export default async function RootPage() {
  const h = await headers();
  const host = (h.get("host") ?? "").split(":")[0].toLowerCase();
  const isPlatform =
    PLATFORM_HOSTS.has(host) || host.endsWith(".vercel.app") || !host;

  if (!isPlatform) {
    const site = await getSiteByHost(host);
    if (site) {
      const reviews = await getReviewsForSite(site.id);
      const sections = [
        { id: "om", label: "Om oss" },
        { id: "tjanster", label: "Tjänster" },
        ...(site.gallery_images.length > 0
          ? [{ id: "galleri", label: "Galleri" }]
          : []),
        ...(reviews.length > 0
          ? [{ id: "omdomen", label: "Omdömen" }]
          : []),
        { id: "kontakt", label: "Kontakt" },
      ];
      return (
        <>
          <Header site={site} sections={sections} />
          <main className="flex-1">
            <Hero site={site} />
            <About site={site} />
            <Services site={site} />
            <Gallery site={site} />
            <Reviews site={site} reviews={reviews} />
            <MapSection site={site} />
            <Socials site={site} />
            <Contact site={site} />
          </main>
          <Footer site={site} />
        </>
      );
    }
  }

  // Plattformens egen index — visa demo-firmor + säljpitch.
  const dbSites = await listSites();
  const sites = dbSites.length
    ? dbSites
    : Object.values(MOCK_SITES).map((s) => ({
        slug: s.slug,
        name: s.name,
        city: s.city,
      }));

  // Pre-fetch hero-bild för varje site så kort-rendering blir snyggare
  const cards = await Promise.all(
    sites.map(async (s) => {
      const full = await getSiteBySlug(s.slug);
      return {
        ...s,
        hero_image_url: full?.hero_image_url ?? null,
        primary_color: full?.primary_color ?? "#0a4f8f",
        services_count: full?.services?.length ?? 0,
        tagline: full?.hero_tagline ?? null,
      };
    }),
  );

  return (
    <main className="flex-1">
      <section className="container-x pt-20 md:pt-28 pb-12">
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">VVS-sidor · Plattformen</div>
          <h1 className="h-display text-5xl md:text-7xl">
            Hemsidor för lokala VVS-firmor.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-xl">
            En plattform som ger små VVS-firmor en proper hemsida på ett par
            minuter. Egen domän, eget innehåll, eget admin — utan tekniska
            kunskaper.
          </p>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="eyebrow">Demos</h2>
          <Link
            href="/admin"
            className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] underline-offset-4 hover:underline"
          >
            Admin →
          </Link>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="group block rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition-shadow hover:shadow-md"
              >
                <div
                  className="aspect-[16/10] bg-[var(--warm)] relative overflow-hidden"
                  style={
                    !s.hero_image_url
                      ? {
                          background: `linear-gradient(135deg, ${s.primary_color}22, ${s.primary_color}44)`,
                        }
                      : undefined
                  }
                >
                  {s.hero_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.hero_image_url}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold text-lg tracking-tight">
                      {s.name}
                    </h3>
                    <span className="text-sm text-[var(--muted)] shrink-0">
                      {s.city}
                    </span>
                  </div>
                  {s.tagline && (
                    <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                      {s.tagline}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
