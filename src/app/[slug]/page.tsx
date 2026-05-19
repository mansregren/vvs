import { notFound } from "next/navigation";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Contact } from "@/components/site/Contact";
import { SocialFooter } from "@/components/site/SocialFooter";
import { getMockSite } from "@/lib/mock-data";
import { getSiteBySlug } from "@/lib/site";

export const dynamic = "force-dynamic";

async function loadSite(slug: string) {
  // Försök DB först; fall tillbaka till mock så vi kan förhandsgranska innan SQL körts.
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
    description: site.hero_tagline ?? undefined,
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
