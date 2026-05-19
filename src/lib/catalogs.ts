// Statiska kataloger över svenska VVS-certifikat och vanliga märkespartners.
// `key` lagras i sites.certifications/brand_partners (jsonb-array).
// `label` + `description` visas i admin-checklistor och på sajten.
// `url` länkar till officiella sidan vid hover på sajten.

export type Certification = {
  key: string;
  label: string;
  short: string;
  description: string;
  url: string;
  /** Färg-accent för badge */
  color: string;
  /** SVG-monogram (initialer) — fungerar utan att vi hostar trademarked-logo */
  initials: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    key: "saker-vatten",
    label: "Säker Vatten",
    short: "Säker Vatten",
    description:
      "Auktorisation från branschstandarden Säker Vatten. Krav på utbildning och godkända installationer.",
    url: "https://www.sakervatten.se/",
    color: "#005baa",
    initials: "SV",
  },
  {
    key: "gvk",
    label: "GVK — Golvbranschens Våtrumskontroll",
    short: "GVK",
    description:
      "Branschregler för tätskikt i våtrum. Behörig firma utfärdar GVK-intyg vid våtrumsarbete.",
    url: "https://www.gvk.se/",
    color: "#1e7e34",
    initials: "GVK",
  },
  {
    key: "bkr",
    label: "BKR / BBV — Byggkeramikrådet",
    short: "BKR",
    description:
      "Byggkeramikrådets branschregler för våtrum. Krav på utförande av kakel och klinker.",
    url: "https://bkr.se/",
    color: "#c9302c",
    initials: "BKR",
  },
  {
    key: "vvs-foretagen",
    label: "Medlem i Installatörsföretagen",
    short: "Installatörsföretagen",
    description:
      "Bransch- och arbetsgivarorganisationen för installationsföretag i Sverige.",
    url: "https://www.installatorsforetagen.se/",
    color: "#0a4f8f",
    initials: "IF",
  },
  {
    key: "auktoriserad",
    label: "Auktoriserad VVS-installatör",
    short: "Auktoriserad",
    description:
      "Behörig av branschen att utföra installationsarbeten av tappvatten- och värmesystem.",
    url: "https://www.sakervatten.se/",
    color: "#0a4f8f",
    initials: "VVS",
  },
  {
    key: "behorig-el",
    label: "Behörig Elinstallatör",
    short: "Elbehörig",
    description:
      "Auktorisation från Elsäkerhetsverket för elinstallationsarbete.",
    url: "https://www.elsakerhetsverket.se/",
    color: "#f7b500",
    initials: "EL",
  },
  {
    key: "f-skatt",
    label: "F-skattsedel",
    short: "F-skatt",
    description:
      "Företaget innehar F-skattsedel — du som kund behöver inte göra skatteavdrag.",
    url: "https://www.skatteverket.se/",
    color: "#444",
    initials: "F",
  },
  {
    key: "iso-9001",
    label: "ISO 9001 — Kvalitetsledning",
    short: "ISO 9001",
    description:
      "Certifierat kvalitetsledningssystem enligt internationell standard.",
    url: "https://www.iso.org/iso-9001-quality-management.html",
    color: "#005baa",
    initials: "ISO",
  },
  {
    key: "iso-14001",
    label: "ISO 14001 — Miljöledning",
    short: "ISO 14001",
    description:
      "Certifierat miljöledningssystem enligt internationell standard.",
    url: "https://www.iso.org/iso-14001-environmental-management.html",
    color: "#1e7e34",
    initials: "14K",
  },
  {
    key: "id06",
    label: "ID06 — Behörighet på byggarbetsplats",
    short: "ID06",
    description:
      "Branschstandard för identifikation och behörighet på byggarbetsplatser.",
    url: "https://id06.se/",
    color: "#222",
    initials: "ID",
  },
];

export type BrandPartner = {
  key: string;
  label: string;
  /** Kategori: "varmepump" | "sanitet" | "panna" osv */
  category: string;
  url: string;
  color: string;
  initials: string;
};

export const BRAND_PARTNERS: BrandPartner[] = [
  { key: "ctc", label: "CTC", category: "Värmepumpar / pannor", url: "https://www.ctc.se/", color: "#cc0000", initials: "CTC" },
  { key: "nibe", label: "NIBE", category: "Värmepumpar", url: "https://www.nibe.se/", color: "#003e6b", initials: "NB" },
  { key: "ivt", label: "IVT", category: "Värmepumpar", url: "https://www.ivt.se/", color: "#0072ce", initials: "IVT" },
  { key: "bosch", label: "Bosch", category: "Värmepumpar / vitvaror", url: "https://www.bosch.se/", color: "#ed1c24", initials: "BO" },
  { key: "thermia", label: "Thermia", category: "Värmepumpar", url: "https://www.thermia.se/", color: "#003366", initials: "TH" },
  { key: "vaillant", label: "Vaillant", category: "Pannor / värmepumpar", url: "https://www.vaillant.se/", color: "#005397", initials: "VA" },
  { key: "daikin", label: "Daikin", category: "Luftvärmepumpar / kyla", url: "https://www.daikin.se/", color: "#003a73", initials: "DK" },
  { key: "mitsubishi-heavy", label: "Mitsubishi Heavy", category: "Luftvärmepumpar", url: "https://www.mitsubishi-heavy.se/", color: "#003366", initials: "MH" },
  { key: "panasonic", label: "Panasonic", category: "Luftvärmepumpar", url: "https://www.panasonic.com/se/", color: "#0050a3", initials: "PA" },
  { key: "fujitsu", label: "Fujitsu", category: "Luftvärmepumpar", url: "https://www.fujitsu-general.com/", color: "#cc0000", initials: "FJ" },
  { key: "geberit", label: "Geberit", category: "Sanitet", url: "https://www.geberit.se/", color: "#003c69", initials: "GB" },
  { key: "gustavsberg", label: "Gustavsberg", category: "Sanitet", url: "https://www.gustavsberg.com/", color: "#003366", initials: "GV" },
  { key: "ifo", label: "Ifö", category: "Sanitet", url: "https://www.ifo.se/", color: "#002d62", initials: "IF" },
  { key: "fm-mattsson", label: "FM Mattsson", category: "Blandare", url: "https://www.fmm.se/", color: "#003366", initials: "FM" },
  { key: "mora", label: "Mora Armatur", category: "Blandare", url: "https://www.moraarmatur.se/", color: "#7c2d12", initials: "MA" },
  { key: "uponor", label: "Uponor", category: "Golvvärme / rör", url: "https://www.uponor.se/", color: "#0066cc", initials: "UP" },
];

export function getCertification(key: string): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.key === key);
}
export function getBrandPartner(key: string): BrandPartner | undefined {
  return BRAND_PARTNERS.find((b) => b.key === key);
}

// ============================================
// Canonical VVS-tjänster — typiska för en svensk VVS-firma.
// Notera: ELINSTALLATIONER och RIVNING/SANERING ingår inte —
// det görs av elektriker resp. saneringsfirmor.
// ============================================
export type ServiceOption = {
  key: string;
  /** Visning på sajt och i admin */
  label: string;
  /** Kort beskrivning, läggs efter "—" på sajtens kort */
  description: string;
  category: string;
};

export const SERVICES_CATALOG: ServiceOption[] = [
  // Värme
  { key: "varmepump-installation", category: "Värme", label: "Värmepumpar", description: "installation, driftsättning och service" },
  { key: "luftvarmepump", category: "Värme", label: "Luftvärmepumpar", description: "luft-luft och luft-vatten" },
  { key: "bergvarme", category: "Värme", label: "Bergvärme och jordvärme", description: "borrning via partner, installation av oss" },
  { key: "panna-konvertering", category: "Värme", label: "Pannkonvertering", description: "byte från olja/el till värmepump" },
  { key: "golvvarme", category: "Värme", label: "Golvvärme", description: "vattenburen, installation och service" },
  { key: "radiatorer", category: "Värme", label: "Radiatorer", description: "byte, balansering och service" },

  // Vatten & avlopp
  { key: "rorarbeten", category: "Vatten & avlopp", label: "Rörarbeten", description: "tappvatten, värme och avlopp" },
  { key: "stambyte", category: "Vatten & avlopp", label: "Stambyten", description: "för bostadsrätter och hyresvärdar" },
  { key: "vattenskada", category: "Vatten & avlopp", label: "Vattenskador — VVS-åtgärd", description: "läcksökning och åtgärd (saneringen görs av certifierad partner)" },
  { key: "lacksokning", category: "Vatten & avlopp", label: "Läcksökning", description: "akut och förebyggande" },
  { key: "varmvattenberedare", category: "Vatten & avlopp", label: "Varmvattenberedare", description: "byte och installation" },
  { key: "avloppsspolning", category: "Vatten & avlopp", label: "Avloppsspolning", description: "akut stopp och underhåll" },
  { key: "vattenfilter", category: "Vatten & avlopp", label: "Vattenfilter", description: "installation och service" },

  // Badrum & kök
  { key: "badrumsrenovering", category: "Badrum & kök", label: "Badrumsrenovering", description: "totalentreprenad eller delar — vi samordnar kakel/el via partners" },
  { key: "vatrum", category: "Badrum & kök", label: "Våtrum", description: "branschregler enligt Säker Vatten och GVK" },
  { key: "blandare", category: "Badrum & kök", label: "Blandare och porslin", description: "byte och installation" },
  { key: "diskmaskin-tvattmaskin", category: "Badrum & kök", label: "Diskmaskin & tvättmaskin", description: "anslutning av VVS-delar" },
  { key: "kok-vvs", category: "Badrum & kök", label: "Köks-VVS", description: "vid renovering eller köksbyte" },

  // Service
  { key: "felsokning", category: "Service", label: "Felsökning", description: "akut respons och systematisk diagnos" },
  { key: "akutservice", category: "Service", label: "Akutservice", description: "jour för läckage och stopp" },
  { key: "underhall", category: "Service", label: "Underhåll och serviceavtal", description: "för fastigheter och företag" },
  { key: "ovk", category: "Service", label: "OVK-besiktning", description: "obligatorisk ventilationskontroll via certifierad partner" },
];

export function getServiceOption(key: string): ServiceOption | undefined {
  return SERVICES_CATALOG.find((s) => s.key === key);
}

export function renderService(s: string): { title: string; description: string } {
  // Stöder både katalog-keys ("varmepump-installation") och fritext-rader ("Värmepumpar — installation")
  const opt = getServiceOption(s);
  if (opt) return { title: opt.label, description: opt.description };
  const [title, ...rest] = s.split("—");
  return { title: title.trim(), description: rest.join("—").trim() };
}
