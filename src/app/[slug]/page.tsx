import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustStrip, JourBanner } from "@/components/site/TrustStrip";
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
import {
  getSiteBySlug,
  getReviewsForSite,
  getCertAssets,
  listPublicSlugs,
} from "@/lib/site";

// Cachas på CDN (ISR). Uppdateras direkt vid admin-spara via revalidatePath(`/${slug}`),
// och som säkerhet automatiskt en gång i timmen.
export const revalidate = 3600;

// Prerendera kända firma-slugs vid build (statiska, CDN-snabba). Nya/okända
// slugs genereras on-demand och cachas (dynamicParams = true som standard).
export async function generateStaticParams() {
  return (await listPublicSlugs()).map((slug) => ({ slug }));
}

async function loadSite(slug: string) {
  return (await getSiteBySlug(slug)) ?? getMockSite(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await loadSite(slug);
  if (!site) return { title: "Hittas inte" };
  return {
    title: `${site.name} — VVS i ${site.city}`,
    description:
      site.hero_tagline ??
      `${site.name} — auktoriserad VVS-firma i ${site.city}. Ring ${site.phone}.`,
    openGraph: {
      title: `${site.name} — VVS i ${site.city}`,
      description: site.hero_tagline ?? undefined,
      images: site.hero_image_url ? [site.hero_image_url] : undefined,
    },
  };
}

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await loadSite(slug);
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
