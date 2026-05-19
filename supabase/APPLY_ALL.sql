-- ============================================
-- Klistra in HELA denna fil i Supabase Dashboard → SQL Editor → Run
-- https://supabase.com/dashboard/project/ksnsunufhluzukhrkret/sql/new
-- Säker att köra flera gånger (allt är idempotent).
-- ============================================

-- =====================
-- 0002: Utökningar för premium-design
-- =====================
alter table public.sites
  add column if not exists hero_image_url text,
  add column if not exists tagline_secondary text,
  add column if not exists years_in_business int,
  add column if not exists service_area text,
  add column if not exists cta_text text,
  add column if not exists gallery_images jsonb not null default '[]'::jsonb;

create table if not exists public.site_reviews (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  customer_name text not null,
  rating int not null check (rating between 1 and 5),
  text text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists site_reviews_site_idx on public.site_reviews (site_id, display_order);
alter table public.site_reviews enable row level security;

drop policy if exists site_reviews_public_read on public.site_reviews;
create policy site_reviews_public_read on public.site_reviews for select using (true);

drop policy if exists site_reviews_owner_write on public.site_reviews;
create policy site_reviews_owner_write on public.site_reviews for all to authenticated
  using (exists (select 1 from public.site_users where site_users.site_id = site_reviews.site_id and site_users.user_id = auth.uid()))
  with check (exists (select 1 from public.site_users where site_users.site_id = site_reviews.site_id and site_users.user_id = auth.uid()));

insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;

drop policy if exists "Media public read" on storage.objects;
create policy "Media public read" on storage.objects for select using (bucket_id = 'media');

drop policy if exists "Media upload by owner" on storage.objects;
create policy "Media upload by owner" on storage.objects for insert to authenticated with check (
  bucket_id = 'media' and exists (
    select 1 from public.site_users where site_users.user_id = auth.uid() and site_users.site_id::text = split_part(name, '/', 1)
  ));

drop policy if exists "Media update by owner" on storage.objects;
create policy "Media update by owner" on storage.objects for update to authenticated using (
  bucket_id = 'media' and exists (
    select 1 from public.site_users where site_users.user_id = auth.uid() and site_users.site_id::text = split_part(name, '/', 1)
  ));

drop policy if exists "Media delete by owner" on storage.objects;
create policy "Media delete by owner" on storage.objects for delete to authenticated using (
  bucket_id = 'media' and exists (
    select 1 from public.site_users where site_users.user_id = auth.uid() and site_users.site_id::text = split_part(name, '/', 1)
  ));

-- =====================
-- 0003: Super-admin + certifikat + märkespartners + sociala embeds
-- =====================
alter table public.sites
  add column if not exists certifications jsonb not null default '[]'::jsonb,
  add column if not exists brand_partners jsonb not null default '[]'::jsonb,
  add column if not exists instagram_post_urls jsonb not null default '[]'::jsonb,
  add column if not exists facebook_page_url text;

create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.platform_admins enable row level security;

drop policy if exists platform_admins_self_read on public.platform_admins;
create policy platform_admins_self_read on public.platform_admins
for select to authenticated using (user_id = auth.uid());

create or replace view public.site_stats as
select
  s.id, s.slug, s.name, s.city, s.domain,
  s.created_at, s.updated_at,
  s.hero_image_url, s.logo_url,
  (select count(*) from public.site_reviews r where r.site_id = s.id) as review_count,
  jsonb_array_length(coalesce(s.gallery_images, '[]'::jsonb)) as gallery_count,
  jsonb_array_length(coalesce(s.services, '[]'::jsonb)) as service_count,
  jsonb_array_length(coalesce(s.certifications, '[]'::jsonb)) as cert_count
from public.sites s
order by s.updated_at desc;

-- =====================
-- Gör demo-användaren till platform-admin
-- =====================
insert into public.platform_admins (user_id)
select id from auth.users where email = 'demo@vvs-sidor.local'
on conflict (user_id) do nothing;
