import { type Site } from "@/lib/types";

export function Hero({ site }: { site: Site }) {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {site.logo_url ? (
          <img
            src={site.logo_url}
            alt={site.name}
            className="h-16 md:h-20 mb-10"
          />
        ) : (
          <div
            className="inline-block text-sm tracking-widest uppercase mb-10 pb-2 border-b-2"
            style={{ borderColor: site.primary_color, color: site.primary_color }}
          >
            {site.city}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          {site.name}
        </h1>
        {site.hero_tagline && (
          <p className="mt-6 text-lg md:text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
            {site.hero_tagline}
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={telHref}
            className="btn-primary"
            style={{ background: site.primary_color }}
          >
            Ring {site.phone}
          </a>
          <a href="#kontakt" className="btn-ghost">
            Se kontakt
          </a>
        </div>
      </div>
    </header>
  );
}
