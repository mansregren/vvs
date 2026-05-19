-- ============================================
-- vvs-sidor — utökningar för premium-design
-- ============================================

-- ============================================
-- sites: nya fält för hero-bild, galleri, trust-info
-- ============================================
alter table public.sites
  add column if not exists hero_image_url text,
  add column if not exists tagline_secondary text,
  add column if not exists years_in_business int,
  add column if not exists service_area text,
  add column if not exists cta_text text,
  add column if not exists gallery_images jsonb not null default '[]'::jsonb;

-- ============================================
-- site_reviews: kundomdömen per firma
-- ============================================
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

-- Reviews: alla kan läsa (publika)
drop policy if exists site_reviews_public_read on public.site_reviews;
create policy site_reviews_public_read on public.site_reviews
for select using (true);

-- Reviews: bara site-ägare kan skriva
drop policy if exists site_reviews_owner_write on public.site_reviews;
create policy site_reviews_owner_write on public.site_reviews
for all to authenticated
using (
  exists (
    select 1 from public.site_users
    where site_users.site_id = site_reviews.site_id
      and site_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.site_users
    where site_users.site_id = site_reviews.site_id
      and site_users.user_id = auth.uid()
  )
);

-- ============================================
-- Storage-bucket för galleri/hero-bilder
-- ============================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Media public read" on storage.objects;
create policy "Media public read"
on storage.objects for select
using (bucket_id = 'media');

drop policy if exists "Media upload by owner" on storage.objects;
create policy "Media upload by owner"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'media'
  and exists (
    select 1 from public.site_users
    where site_users.user_id = auth.uid()
      and site_users.site_id::text = split_part(name, '/', 1)
  )
);

drop policy if exists "Media update by owner" on storage.objects;
create policy "Media update by owner"
on storage.objects for update to authenticated
using (
  bucket_id = 'media'
  and exists (
    select 1 from public.site_users
    where site_users.user_id = auth.uid()
      and site_users.site_id::text = split_part(name, '/', 1)
  )
);

drop policy if exists "Media delete by owner" on storage.objects;
create policy "Media delete by owner"
on storage.objects for delete to authenticated
using (
  bucket_id = 'media'
  and exists (
    select 1 from public.site_users
    where site_users.user_id = auth.uid()
      and site_users.site_id::text = split_part(name, '/', 1)
  )
);
