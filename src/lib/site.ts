import "server-only";
import { createClient } from "@/lib/supabase/server";
import { type Site, type Review } from "./types";

// Full kolumnsats (efter migration 0002). Vid 42703 (okänd kolumn) faller vi tillbaka till bas-kolumnerna.
const SITE_COLUMNS_FULL =
  "id, slug, domain, name, city, primary_color, logo_url, phone, address, email, hero_tagline, tagline_secondary, about_text, services, opening_hours, facebook_url, facebook_enabled, instagram_url, instagram_enabled, google_maps_embed, hero_image_url, years_in_business, service_area, cta_text, gallery_images";
const SITE_COLUMNS_BASE =
  "id, slug, domain, name, city, primary_color, logo_url, phone, address, email, hero_tagline, about_text, services, opening_hours, facebook_url, facebook_enabled, instagram_url, instagram_enabled, google_maps_embed";

type AnyRow = Record<string, unknown>;

function normalizeSite(row: AnyRow): Site {
  return {
    id: row.id as string,
    slug: row.slug as string,
    domain: (row.domain as string | null) ?? null,
    name: row.name as string,
    city: row.city as string,
    primary_color: (row.primary_color as string) || "#0a4f8f",
    logo_url: (row.logo_url as string | null) ?? null,
    phone: row.phone as string,
    address: row.address as string,
    email: (row.email as string | null) ?? null,
    hero_tagline: (row.hero_tagline as string | null) ?? null,
    tagline_secondary: (row.tagline_secondary as string | null) ?? null,
    about_text: (row.about_text as string | null) ?? null,
    services: Array.isArray(row.services) ? (row.services as string[]) : [],
    opening_hours: (row.opening_hours as string | null) ?? null,
    facebook_url: (row.facebook_url as string | null) ?? null,
    facebook_enabled: Boolean(row.facebook_enabled),
    instagram_url: (row.instagram_url as string | null) ?? null,
    instagram_enabled: Boolean(row.instagram_enabled),
    google_maps_embed: (row.google_maps_embed as string | null) ?? null,
    hero_image_url: (row.hero_image_url as string | null) ?? null,
    years_in_business: (row.years_in_business as number | null) ?? null,
    service_area: (row.service_area as string | null) ?? null,
    cta_text: (row.cta_text as string | null) ?? null,
    gallery_images: Array.isArray(row.gallery_images)
      ? (row.gallery_images as string[])
      : [],
  };
}

export async function getSiteBySlug(slug: string): Promise<Site | null> {
  const supabase = await createClient();
  let res = await supabase
    .from("sites")
    .select(SITE_COLUMNS_FULL)
    .eq("slug", slug)
    .maybeSingle();
  if (res.error?.code === "42703" || res.error?.code === "PGRST204") {
    res = await supabase
      .from("sites")
      .select(SITE_COLUMNS_BASE)
      .eq("slug", slug)
      .maybeSingle();
  }
  if (res.error || !res.data) return null;
  return normalizeSite(res.data as AnyRow);
}

export async function getSiteByHost(host: string): Promise<Site | null> {
  const supabase = await createClient();
  let res = await supabase
    .from("sites")
    .select(SITE_COLUMNS_FULL)
    .ilike("domain", host)
    .maybeSingle();
  if (res.error?.code === "42703" || res.error?.code === "PGRST204") {
    res = await supabase
      .from("sites")
      .select(SITE_COLUMNS_BASE)
      .ilike("domain", host)
      .maybeSingle();
  }
  if (res.error || !res.data) return null;
  return normalizeSite(res.data as AnyRow);
}

export async function listSites(): Promise<
  Pick<Site, "slug" | "name" | "city">[]
> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sites")
    .select("slug, name, city")
    .order("name");
  return data ?? [];
}

export async function getReviewsForSite(siteId: string): Promise<Review[]> {
  if (!siteId || siteId.startsWith("mock-")) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_reviews")
    .select("*")
    .eq("site_id", siteId)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data as Review[]) ?? [];
}
