import { type Site } from "./types";

// Generisk demo-site för förhandsvisning utan DB.
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
    email: "hej@demo-vvs.se",
    hero_tagline:
      "Lokal VVS-firma med 20 års erfarenhet — för privatpersoner och företag.",
    tagline_secondary:
      "Vi installerar, servar och felsöker. Snabb respons, ärliga priser, kvalitet som håller.",
    about_text:
      "Detta är ett demo-innehåll som visar hur en VVS-firma kan presentera sig på sin egen sida. Här går en längre text om firmans historia, värdegrund och arbetsområde.",
    services: [
      "Värmepumpar — installation och service",
      "Badrumsrenovering — totalentreprenad eller delar",
      "Rörarbeten och stambyten",
      "Felsökning och akut service",
      "Vattenskador — sanering och åtgärd",
      "Elinstallationer i samma uppdrag",
    ],
    opening_hours: "Mån–fre 07:00–16:00\nAkutservice efter överenskommelse",
    facebook_url: null,
    facebook_enabled: false,
    facebook_page_url: null,
    instagram_url: null,
    instagram_enabled: false,
    instagram_post_urls: [],
    google_maps_embed: null,
    hero_image_url:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600&auto=format&q=80",
    years_in_business: 20,
    service_area: "Demostad med omnejd",
    cta_text: null,
    gallery_images: [
      "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=800&auto=format&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&q=80",
      "https://images.unsplash.com/photo-1517414204284-fb7e35f969eb?w=800&auto=format&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&q=80",
    ],
    certifications: ["saker-vatten", "gvk", "vvs-foretagen", "f-skatt"],
    brand_partners: ["ctc", "nibe", "ivt", "thermia", "geberit", "ifo"],
    has_jour: true,
    jour_phone: "+46 70 000 00 01",
    jour_text: "Akutservice dygnet runt vid läckor och stopp",
    rot_avdrag: true,
    guarantee_text: "5 års garanti på arbeten enligt branschstandard",
    offers_free_quote: true,
    contacts: [],
  },
};

export function getMockSite(slug: string): Site | null {
  return MOCK_SITES[slug] || null;
}
