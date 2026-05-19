export type Site = {
  id: string;
  slug: string;
  domain: string | null;
  name: string;
  primary_color: string;
  logo_url: string | null;
  phone: string;
  address: string;
  city: string;
  email: string | null;
  hero_tagline: string | null;
  tagline_secondary: string | null;
  about_text: string | null;
  services: string[];
  opening_hours: string | null;
  facebook_url: string | null;
  facebook_enabled: boolean;
  instagram_url: string | null;
  instagram_enabled: boolean;
  google_maps_embed: string | null;
  hero_image_url: string | null;
  years_in_business: number | null;
  service_area: string | null;
  cta_text: string | null;
  gallery_images: string[];
};

export type Review = {
  id: string;
  site_id: string;
  customer_name: string;
  rating: number;
  text: string;
  display_order: number;
  created_at: string;
};
