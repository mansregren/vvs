import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { type Site, type Review, type SiteStats } from "./types";

// Full kolumnsats (efter migration 0002+0003). Vid 42703/PGRST204 (okänd kolumn) faller vi tillbaka.
const SITE_COLUMNS_FULL =
  "id, slug, domain, name, city, primary_color, logo_url, phone, address, email, hero_tagline, tagline_secondary, about_text, services, opening_hours, facebook_url, facebook_enabled, facebook_page_url, instagram_url, instagram_enabled, instagram_post_urls, google_maps_embed, hero_image_url, years_in_business, service_area, cta_text, gallery_images, certifications, brand_partners";
const SITE_COLUMNS_BASE =
  "id, slug, domain, name, city, primary_color, logo_url, phone, address, email, hero_tagline, about_text, services, opening_hours, facebook_url, facebook_enabled, instagram_url, instagram_enabled, google_maps_embed";

type AnyRow = Record<string, unknown>;

function jsonArr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

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
    services: jsonArr<string>(row.services),
    opening_hours: (row.opening_hours as string | null) ?? null,
    facebook_url: (row.facebook_url as string | null) ?? null,
    facebook_enabled: Boolean(row.facebook_enabled),
    facebook_page_url: (row.facebook_page_url as string | null) ?? null,
    instagram_url: (row.instagram_url as string | null) ?? null,
    instagram_enabled: Boolean(row.instagram_enabled),
    instagram_post_urls: jsonArr<string>(row.instagram_post_urls),
    google_maps_embed: (row.google_maps_embed as string | null) ?? null,
    hero_image_url: (row.hero_image_url as string | null) ?? null,
    years_in_business: (row.years_in_business as number | null) ?? null,
    service_area: (row.service_area as string | null) ?? null,
    cta_text: (row.cta_text as string | null) ?? null,
    gallery_images: jsonArr<string>(row.gallery_images),
    certifications: jsonArr<string>(row.certifications),
    brand_partners: jsonArr<string>(row.brand_partners),
  };
}

async function querySite(
  filter: (col: string) => Promise<{ data: AnyRow | null; error: { code?: string } | null }>,
): Promise<Site | null> {
  const full = await filter(SITE_COLUMNS_FULL);
  if (full.data) return normalizeSite(full.data);
  if (
    full.error?.code === "42703" ||
    full.error?.code === "PGRST204" ||
    full.error?.code === "PGRST200"
  ) {
    const base = await filter(SITE_COLUMNS_BASE);
    if (base.data) return normalizeSite(base.data);
  }
  return null;
}

export async function getSiteBySlug(slug: string): Promise<Site | null> {
  return querySite(async (cols) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sites")
      .select(cols)
      .eq("slug", slug)
      .maybeSingle();
    return { data: (data as unknown as AnyRow) ?? null, error };
  });
}

export async function getSiteByHost(host: string): Promise<Site | null> {
  return querySite(async (cols) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sites")
      .select(cols)
      .ilike("domain", host)
      .maybeSingle();
    return { data: (data as unknown as AnyRow) ?? null, error };
  });
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

export async function isPlatformAdmin(userId: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("platform_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}

export async function listSiteStats(): Promise<SiteStats[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("site_stats")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) {
    // Fallback om vyn inte finns (migration 0003 ej applicerad)
    const { data: rows } = await admin
      .from("sites")
      .select("id, slug, name, city, domain, created_at, updated_at, hero_image_url, logo_url")
      .order("updated_at", { ascending: false });
    return (
      rows?.map((r) => ({
        ...r,
        review_count: 0,
        gallery_count: 0,
        service_count: 0,
        cert_count: 0,
      })) ?? []
    );
  }
  return (data as SiteStats[]) ?? [];
}
