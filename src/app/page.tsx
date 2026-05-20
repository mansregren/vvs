import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  getSiteByHost,
  getReviewsForSite,
  getCertAssets,
} from "@/lib/site";
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

export const dynamic = "force-dynamic";

const PLATFORM_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "vvs-sidor.vercel.app",
  "caztmedia.com",
  "www.caztmedia.com",
]);

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = (h.get("host") ?? "").split(":")[0].toLowerCase();
  const isPlatform =
    PLATFORM_HOSTS.has(host) || host.endsWith(".vercel.app") || !host;

  if (!isPlatform) {
    const site = await getSiteByHost(host);
    if (site) {
      return {
        title: site.name,
        description: site.hero_tagline ?? null,
      };
    }
  }

  // Plattform-roten (caztmedia.com): neutral titel, ingen VVS-text, ej indexerbar.
  return {
    title: "Cazt Media",
    description: null,
    robots: { index: false, follow: false },
    openGraph: { title: "Cazt Media" },
  };
}

export default async function RootPage() {
  const h = await headers();
  const host = (h.get("host") ?? "").split(":")[0].toLowerCase();
  const isPlatform =
    PLATFORM_HOSTS.has(host) || host.endsWith(".vercel.app") || !host;

  if (!isPlatform) {
    const site = await getSiteByHost(host);
    if (site) {
      const [reviews, certAssets] = await Promise.all([
        getReviewsForSite(site.id),
        getCertAssets(),
      ]);
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
            <Certifications site={site} assets={certAssets} />
            <Services site={site} />
            <Gallery site={site} />
            <Reviews site={site} reviews={reviews} />
            <BrandPartners site={site} assets={certAssets} />
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

  // ============================================================
  // Plattformens rot (caztmedia.com) — avskalad placeholder.
  // Inget om plattformen vi bygger. Plattform-/demo-indexet
  // bor på /hem.
  // ============================================================
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/caztmedia.png"
        alt="Cazt Media"
        className="w-80 md:w-[30rem] h-auto mb-8"
      />
      <a
        href="mailto:mansregren@caztmedia.com"
        className="text-base md:text-lg font-medium tracking-tight text-[var(--muted)] underline-offset-4 hover:underline hover:text-[var(--foreground)]"
      >
        mansregren@caztmedia.com
      </a>
    </main>
  );
}
