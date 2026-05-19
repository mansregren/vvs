-- ============================================
-- 0005: Jour, ROT-avdrag, garanti, offert
-- ============================================
alter table public.sites
  add column if not exists has_jour boolean not null default false,
  add column if not exists jour_phone text,
  add column if not exists jour_text text,
  add column if not exists rot_avdrag boolean not null default false,
  add column if not exists guarantee_text text,
  add column if not exists offers_free_quote boolean not null default true;
