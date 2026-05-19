"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--warm)] px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-6"
        >
          ← Tillbaka till start
        </Link>
        <div className="card space-y-6 shadow-md">
          <div className="text-center">
            <div className="eyebrow mb-2">VVS-sidor · Admin</div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Logga in
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Logga in på din firmas adminpanel.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium block mb-1">E-post</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium block mb-1">Lösenord</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </label>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? "Loggar in..." : "Logga in"}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-[var(--muted-2)]">
          Behöver du ett konto? Kontakta plattform-admin.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
