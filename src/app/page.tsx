import Link from "next/link";
import { headers } from "next/headers";
import { getSiteByHost, listSites } from "@/lib/site";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Contact } from "@/components/site/Contact";
import { SocialFooter } from "@/components/site/SocialFooter";
import { MOCK_SITES } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

const PLATFORM_HOSTS = new Set(["localhost", "127.0.0.1"]);

export default async function RootPage() {
  const h = await headers();
  const host = (h.get("host") ?? "").split(":")[0].toLowerCase();

  if (host && !PLATFORM_HOSTS.has(host) && !host.endsWith(".vercel.app")) {
    const site = await getSiteByHost(host);
    if (site) {
      return (
        <main className="flex-1">
          <Hero site={site} />
          <About site={site} />
          <Services site={site} />
          <Contact site={site} />
          <SocialFooter site={site} />
        </main>
      );
    }
  }

  const dbSites = await listSites();
  const sites = dbSites.length
    ? dbSites
    : Object.values(MOCK_SITES).map((s) => ({
        slug: s.slug,
        name: s.name,
        city: s.city,
      }));

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-20">
      <div className="text-sm uppercase tracking-widest text-[var(--muted)] mb-4">
        VVS-sidor
      </div>
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
        Hemsidor för lokala VVS-firmor.
      </h1>
      <p className="text-lg text-[var(--muted)] max-w-xl leading-relaxed mb-12">
        En plattform som ger små VVS-firmor en proper hemsida på ett par minuter.
        Egen domän, eget innehåll, eget admin.
      </p>
      <h2 className="text-sm uppercase tracking-widest text-[var(--muted)] mb-4">
        Demos
      </h2>
      <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {sites.map((s) => (
          <li key={s.slug} className="py-4">
            <Link
              href={`/${s.slug}`}
              className="flex items-baseline justify-between gap-4 group"
            >
              <span className="text-lg font-medium group-hover:underline underline-offset-4">
                {s.name}
              </span>
              <span className="text-sm text-[var(--muted)]">{s.city} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
