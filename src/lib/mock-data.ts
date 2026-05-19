import { type Site } from "./types";

// Generiska demo-sites för förhandsvisning utan DB. Byts ut mot riktiga firmor i Supabase.
export const MOCK_SITES: Record<string, Site> = {
  "demo-vvs": {
    id: "mock-demo-vvs",
    slug: "demo-vvs",
    domain: null,
    name: "Demo VVS-firma",
    primary_color: "#0a4f8f",
    logo_url: null,
    phone: "+46 70 000 00 00",
    address: "Demogatan 1, 111 22 Demostad",
    city: "Demostad",
    email: null,
    hero_tagline:
      "Lokal VVS-firma i Demostad. Vi installerar, servar och felsöker — för privatpersoner och företag i regionen.",
    about_text:
      "Detta är ett demo-innehåll som visar hur en VVS-firma kan presentera sig på sin egen sida. Längre om-text går här — historik, värdegrund, arbetsområde.",
    services: [
      "Värmepumpar — installation och service",
      "Badrumsrenovering",
      "Rörarbeten och stambyten",
      "Felsökning och akut service",
    ],
    opening_hours: "Mån–fre 07:00–16:00",
    facebook_url: null,
    facebook_enabled: false,
    instagram_url: null,
    instagram_enabled: false,
    google_maps_embed: null,
  },
};

export function getMockSite(slug: string): Site | null {
  return MOCK_SITES[slug] || null;
}
