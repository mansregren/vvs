-- ============================================
-- vvs-sidor — initial schema
-- ============================================

create extension if not exists pgcrypto;

-- ============================================
-- sites: en rad per firma
-- ============================================
create table public.sites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  domain text unique,                          -- t.ex. "topprorab.se" (null = bara slug-routen)
  name text not null,
  city text not null,
  primary_color text not null default '#0a4f8f',
  logo_url text,
  phone text not null,
  address text not null,
  email text,
  hero_tagline text,
  about_text text,
  services jsonb not null default '[]'::jsonb, -- string[]
  opening_hours text,
  facebook_url text,
  facebook_enabled boolean not null default false,
  instagram_url text,
  instagram_enabled boolean not null default false,
  google_maps_embed text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sites_domain_idx on public.sites (lower(domain));
create index sites_slug_idx on public.sites (slug);

-- ============================================
-- site_users: vilken Supabase Auth-user äger vilken firma
-- ============================================
create table public.site_users (
  site_id uuid not null references public.sites(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  primary key (site_id, user_id)
);

create index site_users_user_idx on public.site_users (user_id);

-- ============================================
-- updated_at-trigger
-- ============================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger sites_set_updated_at
before update on public.sites
for each row execute procedure public.set_updated_at();

-- ============================================
-- RLS
-- ============================================
alter table public.sites enable row level security;
alter table public.site_users enable row level security;

-- sites: alla kan läsa (publika hemsidor)
create policy sites_public_read on public.sites
for select using (true);

-- sites: endast ägare kan uppdatera
create policy sites_owner_update on public.sites
for update to authenticated
using (
  exists (
    select 1 from public.site_users
    where site_users.site_id = sites.id
      and site_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.site_users
    where site_users.site_id = sites.id
      and site_users.user_id = auth.uid()
  )
);

-- site_users: en user ser bara sina egna kopplingar
create policy site_users_self_read on public.site_users
for select to authenticated
using (user_id = auth.uid());

-- ============================================
-- Storage: logos bucket (publikt readable)
-- ============================================
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

create policy "Logo public read"
on storage.objects for select
using (bucket_id = 'logos');

create policy "Logo upload by owner"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'logos'
  and exists (
    select 1 from public.site_users
    where site_users.user_id = auth.uid()
      and site_users.site_id::text = split_part(name, '/', 1)
  )
);

create policy "Logo update by owner"
on storage.objects for update to authenticated
using (
  bucket_id = 'logos'
  and exists (
    select 1 from public.site_users
    where site_users.user_id = auth.uid()
      and site_users.site_id::text = split_part(name, '/', 1)
  )
);
