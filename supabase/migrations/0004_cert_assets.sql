-- ============================================
-- 0004: Plattform-uppladdade logos för certifikat och märkespartners
-- ============================================

create table if not exists public.cert_assets (
  key text primary key,
  kind text not null check (kind in ('certification', 'brand')),
  logo_url text,
  updated_at timestamptz not null default now()
);

alter table public.cert_assets enable row level security;

-- Publik läsning så sajterna kan rendera
drop policy if exists cert_assets_public_read on public.cert_assets;
create policy cert_assets_public_read on public.cert_assets
for select using (true);

-- Bara platform_admins får skriva
drop policy if exists cert_assets_admin_write on public.cert_assets;
create policy cert_assets_admin_write on public.cert_assets
for all to authenticated
using (exists (select 1 from public.platform_admins p where p.user_id = auth.uid()))
with check (exists (select 1 from public.platform_admins p where p.user_id = auth.uid()));

-- Storage-bucket för certifikat/märke-logos (publikt läsbar)
insert into storage.buckets (id, name, public)
values ('cert-assets', 'cert-assets', true)
on conflict (id) do nothing;

drop policy if exists "Cert assets public read" on storage.objects;
create policy "Cert assets public read"
on storage.objects for select
using (bucket_id = 'cert-assets');

drop policy if exists "Cert assets admin write" on storage.objects;
create policy "Cert assets admin write"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'cert-assets'
  and exists (select 1 from public.platform_admins p where p.user_id = auth.uid())
);

drop policy if exists "Cert assets admin update" on storage.objects;
create policy "Cert assets admin update"
on storage.objects for update to authenticated
using (
  bucket_id = 'cert-assets'
  and exists (select 1 from public.platform_admins p where p.user_id = auth.uid())
);

drop policy if exists "Cert assets admin delete" on storage.objects;
create policy "Cert assets admin delete"
on storage.objects for delete to authenticated
using (
  bucket_id = 'cert-assets'
  and exists (select 1 from public.platform_admins p where p.user_id = auth.uid())
);
