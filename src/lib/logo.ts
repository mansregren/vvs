import { type Site } from "@/lib/types";

// Loggor som redan innehåller firmanamnet (wordmark). För dessa visar vi bara
// loggan i header/footer — annars skulle namnet dubbleras. Ikon-loggor (utan
// text) saknas i listan och visar därför namnet bredvid loggan.
const WORDMARK_LOGO_SLUGS = new Set(["topp-ror", "demo-vvs", "nystroms-ror"]);

export function showSiteName(site: Pick<Site, "logo_url" | "slug">): boolean {
  if (!site.logo_url) return true;
  return !WORDMARK_LOGO_SLUGS.has(site.slug);
}
