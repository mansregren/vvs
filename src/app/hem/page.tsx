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
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/caztmedia.png"
          alt="Cazt Media"
          className="w-64 md:w-80 h-auto mb-8"
        />
        <a
          href="mailto:mansregren@caztmedia.com"
          className="text-base md:text-lg font-medium tracking-tight text-[var(--muted)] underline-offset-4 hover:underline hover:text-[var(--foreground)]"
        >
          mansregren@caztmedia.com
        </a>
      </div>

      <footer className="py-8">
        <div className="container-x flex items-center justify-center text-xs text-[var(--muted-2)]">
          <Link
            href="/admin"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Logga in
          </Link>
        </div>
      </footer>
    </main>
  );
}
