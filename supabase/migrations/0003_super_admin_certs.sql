-- ============================================
-- 0003: Plattform-admin + certifikat + märkespartners + sociala embeds
-- ============================================

-- Nya fält på sites
alter table public.sites
  add column if not exists certifications jsonb not null default '[]'::jsonb,
  add column if not exists brand_partners jsonb not null default '[]'::jsonb,
  add column if not exists instagram_post_urls jsonb not null default '[]'::jsonb,
  add column if not exists facebook_page_url text;

-- platform_admins: vilka users har överblick över alla sajter
create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.platform_admins enable row level security;

drop policy if exists platform_admins_self_read on public.platform_admins;
create policy platform_admins_self_read on public.platform_admins
for select to authenticated
using (user_id = auth.uid());

-- ============================================
-- Vy: site-stats för super-admin
-- ============================================
create or replace view public.site_stats as
select
  s.id,
  s.slug,
  s.name,
  s.city,
  s.domain,
  s.created_at,
  s.updated_at,
  s.hero_image_url,
  s.logo_url,
  (select count(*) from public.site_reviews r where r.site_id = s.id) as review_count,
  jsonb_array_length(coalesce(s.gallery_images, '[]'::jsonb)) as gallery_count,
  jsonb_array_length(coalesce(s.services, '[]'::jsonb)) as service_count,
  jsonb_array_length(coalesce(s.certifications, '[]'::jsonb)) as cert_count
from public.sites s
order by s.updated_at desc;
