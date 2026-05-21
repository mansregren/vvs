import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cookie-fri anon-klient för PUBLIKA läsningar (sajt-data som visas för besökare).
// Använder inte next/headers cookies() — därför kan sidor som bara använder denna
// klient cachas på CDN (ISR) istället för att server-renderas vid varje besök.
// RLS gäller som för en anonym besökare, vilket är exakt vad publika sajt-sidor visar.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
