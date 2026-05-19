import Link from "next/link";
import { headers } from "next/headers";
import { getSiteByHost, getReviewsForSite, listSites } from "@/lib/site";
import { getSiteBySlug } from "@/lib/site";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Certifications } from "@/components/site/Certifications";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { BrandPartners } from "@/components/site/BrandPartners";
import { MapSection } from "@/components/site/MapSection";
import { InstagramFeed } from "@/components/site/InstagramFeed";
import { FacebookFeed } from "@/components/site/FacebookFeed";
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
        ...(reviews.length > 0 ? [{ id: "omdomen", label: "Omdömen" }] : []),
        ...(site.certifications.length > 0
          ? [{ id: "certifikat", label: "Certifikat" }]
          : []),
        { id: "kontakt", label: "Kontakt" },
      ];
      return (
        <>
          <Header site={site} sections={sections} />
          <main className="flex-1">
            <Hero site={site} />
            <About site={site} />
            <Certifications site={site} />
            <Services site={site} />
            <Gallery site={site} />
            <Reviews site={site} reviews={reviews} />
            <BrandPartners site={site} />
            <InstagramFeed site={site} />
            <FacebookFeed site={site} />
            <Socials site={site} />
            <MapSection site={site} />
            <Contact site={site} />
          </main>
          <Footer site={site} />
        </>
      );
    }
  }

  // ============================
  // Plattformens egen index-sida
  // ============================
  const dbSites = await listSites();
  const slugs = dbSites.length
    ? dbSites.map((s) => s.slug)
    : Object.keys(MOCK_SITES);

  const cards = await Promise.all(
    slugs.map(async (slug) => {
      const full = await getSiteBySlug(slug);
      const mock = MOCK_SITES[slug];
      return {
        slug,
        name: full?.name ?? mock?.name ?? slug,
        city: full?.city ?? mock?.city ?? "",
        hero_image_url: full?.hero_image_url ?? mock?.hero_image_url ?? null,
        primary_color: full?.primary_color ?? mock?.primary_color ?? "#0a4f8f",
        tagline: full?.hero_tagline ?? mock?.hero_tagline ?? null,
        service_count:
          full?.services?.length ?? mock?.services?.length ?? 0,
        review_count: 0,
      };
    }),
  );

  return (
    <>
      <header className="border-b border-[var(--border)] header-blur sticky top-0 z-40">
        <div className="container-x flex items-center justify-between py-4">
          <Link href="/" className="font-semibold tracking-tight">
            VVS-sidor
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#hur"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Hur det funkar
            </a>
            <a
              href="#sajter"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Demo
            </a>
            <Link href="/admin" className="btn-ghost btn-sm">
              Logga in
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[640px] opacity-30"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 40%, transparent), transparent)",
            }}
          />
          <div className="container-x pt-20 md:pt-28 pb-20">
            <div className="max-w-3xl">
              <div className="eyebrow mb-4">VVS-sidor · Plattform</div>
              <h1 className="h-display text-5xl md:text-6xl lg:text-7xl">
                Hemsidor för lokala VVS-firmor.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
                En plattform som ger små VVS-firmor en proper hemsida på ett
                par minuter. Egen domän, eget innehåll, eget admin — utan
                tekniska kunskaper.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/admin" className="btn-primary">
                  Kom igång
                </Link>
                <a href="#sajter" className="btn-ghost">
                  Se demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hur det funkar */}
        <section id="hur" className="section border-t border-[var(--border)]">
          <div className="container-x">
            <div className="max-w-2xl mb-12">
              <div className="eyebrow mb-3">Hur det funkar</div>
              <h2 className="h-display text-3xl md:text-4xl">
                Från noll till live på en eftermiddag.
              </h2>
            </div>
            <ol className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {[
                {
                  step: "01",
                  title: "Få ditt eget admin",
                  body: "Vi sätter upp ett konto åt firman. Inga tekniska krav.",
                },
                {
                  step: "02",
                  title: "Fyll i firma-info",
                  body: "Namn, telefon, tjänster, certifikat och bilder — allt via en enkel admin.",
                },
                {
                  step: "03",
                  title: "Peka domänen mot oss",
                  body: "Vi tar emot trafiken på er befintliga eller nya domän — eller en gratis adress.",
                },
              ].map((s) => (
                <li key={s.step} className="card">
                  <div className="eyebrow mb-3" style={{ color: "var(--accent)" }}>
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
                  <p className="text-[var(--muted)]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Demo-sajter */}
        <section
          id="sajter"
          className="section border-t border-[var(--border)] bg-[var(--warm)]"
        >
          <div className="container-x">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <div className="eyebrow mb-3">Demo</div>
                <h2 className="h-display text-3xl md:text-4xl">
                  Live-sajter på plattformen
                </h2>
              </div>
              <Link
                href="/admin"
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] underline-offset-4 hover:underline hidden sm:inline"
              >
                Admin →
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {cards.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div
                      className="aspect-[16/10] bg-[var(--warm)] relative overflow-hidden"
                      style={
                        !s.hero_image_url
                          ? {
                              background: `linear-gradient(135deg, ${s.primary_color}33, ${s.primary_color}66)`,
                            }
                          : undefined
                      }
                    >
                      {s.hero_image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.hero_image_url}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-xs uppercase tracking-widest opacity-80">
                          {s.city}
                        </div>
                        <div className="font-semibold text-lg drop-shadow-sm">
                          {s.name}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      {s.tagline && (
                        <p className="text-sm text-[var(--muted)] line-clamp-2">
                          {s.tagline}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="text-[var(--muted-2)]">
                          {s.service_count} tjänster
                        </span>
                        <span className="font-medium group-hover:text-[var(--accent)]">
                          Besök →
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-10 bg-[var(--surface)]">
        <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[var(--muted)]">
          <div>© {new Date().getFullYear()} VVS-sidor</div>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-[var(--foreground)]">
              Admin
            </Link>
            <Link href="/admin/oversikt" className="hover:text-[var(--foreground)]">
              Plattform-admin
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
