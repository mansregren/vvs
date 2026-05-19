import { notFound } from "next/navigation";
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
import { getMockSite } from "@/lib/mock-data";
import { getSiteBySlug, getReviewsForSite } from "@/lib/site";

export const dynamic = "force-dynamic";

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

  const reviews =
    site.id && !site.id.startsWith("mock-") ? await getReviewsForSite(site.id) : [];

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
