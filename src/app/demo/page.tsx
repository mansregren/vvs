import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
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
import { getMockSite } from "@/lib/mock-data";
import { getSiteBySlug, getReviewsForSite, getCertAssets } from "@/lib/site";

export const dynamic = "force-dynamic";

const DEMO_SLUG = "demo-vvs";

export const metadata: Metadata = {
  title: "Exempelsajt — Cazt Media",
  description: "Ett exempel på hur en färdig VVS-hemsida från Cazt Media kan se ut.",
  robots: { index: false, follow: false },
};

async function loadSite() {
  return (await getSiteBySlug(DEMO_SLUG)) ?? getMockSite(DEMO_SLUG);
}

export default async function DemoPage() {
  const site = await loadSite();
  if (!site) notFound();

  const [reviews, certAssets] = await Promise.all([
    site.id && !site.id.startsWith("mock-")
      ? getReviewsForSite(site.id)
      : Promise.resolve([]),
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
        <TrustStrip site={site} />
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
