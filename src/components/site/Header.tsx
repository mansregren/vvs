"use client";
import { useEffect, useState } from "react";
import { type Site } from "@/lib/types";
import { showSiteName } from "@/lib/logo";

type Section = { id: string; label: string };

export function Header({
  site,
  sections,
}: {
  site: Site;
  sections: Section[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[var(--border)]">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <a href="#top" className="flex items-center gap-3 min-w-0 flex-1">
            {site.logo_url && (
              <img
                src={site.logo_url}
                alt={site.name}
                className="h-14 md:h-16 w-auto max-w-[240px] md:max-w-[320px] object-contain object-left shrink-0"
              />
            )}
            {showSiteName(site) && (
              <span className="font-semibold tracking-tight text-lg md:text-2xl truncate">
                {site.name}
              </span>
            )}
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-[var(--warm)] shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 top-[60px] z-30 md:hidden mobile-nav ${
          open ? "open" : ""
        }`}
      >
        <div className="bg-[var(--surface)] border-b border-[var(--border)] shadow-md">
          <nav className="container-x py-6 flex flex-col gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-medium border-b border-[var(--border)] last:border-b-0"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
