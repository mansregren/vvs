import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cazt Media",
  description: null,
  robots: { index: false, follow: false },
  openGraph: { title: "Cazt Media" },
};

export default function HemPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-[var(--border)]">
        <div className="container-x flex items-center justify-between py-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/caztmedia.png"
            alt="Cazt Media"
            className="w-32 md:w-36 h-auto"
          />
          <Link href="/admin" className="btn-ghost btn-sm">
            Logga in
          </Link>
        </div>
      </header>

      <div className="flex-1">
        {/* Intro */}
        <section className="container-x pt-16 md:pt-24 pb-12">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4" style={{ color: "var(--accent)" }}>
              Cazt Media
            </div>
            <h1 className="h-display text-4xl md:text-5xl leading-tight">
              Hemsidor för VVS- och byggföretag.
            </h1>
            <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
              Vi designar och bygger sajten, optimerar den för Google och
              håller den uppdaterad. Du fokuserar på jobbet.
            </p>
          </div>
        </section>

        {/* Pris */}
        <section className="container-x pb-12">
          <div className="card max-w-md">
            <div className="eyebrow mb-3" style={{ color: "var(--accent)" }}>
              Allt-i-ett
            </div>
            <div className="flex items-baseline gap-2">
              <span className="h-display text-4xl md:text-5xl">699 kr</span>
              <span className="text-[var(--muted)] text-lg">/mån</span>
            </div>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Hemsida, hosting och löpande SEO-optimering ingår. Inga
              uppstartsavgifter.
            </p>
          </div>
        </section>

        {/* Kontakt */}
        <section className="container-x pb-20">
          <div className="max-w-md border-t border-[var(--border)] pt-8">
            <div className="text-xs uppercase tracking-widest text-[var(--muted-2)] mb-2">
              Kontakt
            </div>
            <p className="text-[var(--muted)] leading-relaxed mb-3">
              Vill du komma igång eller har frågor? Hör av dig till Måns.
            </p>
            <a
              href="mailto:mansregren@caztmedia.com"
              className="text-lg font-medium tracking-tight underline-offset-4 hover:underline"
            >
              mansregren@caztmedia.com
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="container-x text-xs text-[var(--muted-2)]">
          © {new Date().getFullYear()} Cazt Media
        </div>
      </footer>
    </main>
  );
}
