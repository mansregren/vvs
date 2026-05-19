import "server-only";
import { createClient } from "@/lib/supabase/server";
import { type Site } from "./types";

type SiteRow = Omit<Site, "services"> & { services: unknown };

function normalizeSite(row: SiteRow): Site {
  return {
    ...row,
    services: Array.isArray(row.services) ? (row.services as string[]) : [],
  };
}

export async function getSiteBySlug(slug: string): Promise<Site | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sites")
    .select(
      "id, slug, domain, name, city, primary_color, logo_url, phone, address, email, hero_tagline, about_text, services, opening_hours, facebook_url, facebook_enabled, instagram_url, instagram_enabled, google_maps_embed",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return normalizeSite(data as SiteRow);
}

export async function getSiteByHost(host: string): Promise<Site | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sites")
    .select(
      "id, slug, domain, name, city, primary_color, logo_url, phone, address, email, hero_tagline, about_text, services, opening_hours, facebook_url, facebook_enabled, instagram_url, instagram_enabled, google_maps_embed",
    )
    .ilike("domain", host)
    .maybeSingle();
  if (error || !data) return null;
  return normalizeSite(data as SiteRow);
}

export async function listSites(): Promise<Pick<Site, "slug" | "name" | "city">[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sites")
    .select("slug, name, city")
    .order("name");
  return data ?? [];
}
