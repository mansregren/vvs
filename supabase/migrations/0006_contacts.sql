-- ============================================
-- 0006: Flera kontaktpersoner per site
-- ============================================
alter table public.sites
  add column if not exists contacts jsonb not null default '[]'::jsonb;
