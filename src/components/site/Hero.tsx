import { type Site } from "@/lib/types";

export function Hero({ site }: { site: Site }) {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const ctaText = site.cta_text?.trim() || `Ring ${site.phone}`;
  const hasImage = !!site.hero_image_url;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{ minHeight: hasImage ? "min(70vh, 640px)" : undefined }}
    >
      {hasImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.hero_image_url!}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 w-full h-full object-cover"
          />
          <div className="absolute inset-0 -z-10 hero-overlay" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(80% 60% at 90% 0%, color-mix(in oklab, ${site.primary_color} 22%, transparent), transparent 60%), linear-gradient(180deg, var(--warm), var(--background) 70%)`,
          }}
        />
      )}

      <div
        className={`container-x ${
          hasImage
            ? "pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 text-white"
            : "pt-20 pb-14 md:pt-28 md:pb-20"
        } flex flex-col h-full`}
      >
        <div className="max-w-4xl">
          <div className={`flex items-center gap-3 mb-6 ${hasImage ? "text-white/85" : ""}`}>
            <span
              aria-hidden
              className="block w-8 h-px"
              style={{
                background: hasImage ? "currentColor" : site.primary_color,
                opacity: 0.6,
              }}
            />
            <span className="eyebrow" style={hasImage ? { color: "inherit" } : undefined}>
              {site.city}
            </span>
          </div>

          <h1
            className={`h-display text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${
              hasImage ? "text-white" : ""
            }`}
            style={{ letterSpacing: "-0.03em" }}
          >
            {site.hero_tagline ?? `${site.name} — VVS i ${site.city}`}
          </h1>

          {site.tagline_secondary && (
            <p
              className={`mt-6 md:mt-8 text-lg md:text-xl max-w-2xl leading-relaxed ${
                hasImage ? "text-white/85" : "text-[var(--muted)]"
              }`}
            >
              {site.tagline_secondary}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={telHref}
              className="btn-primary text-base md:text-lg"
              style={{ background: site.primary_color }}
            >
              <PhoneIcon />
              {ctaText}
            </a>
            <a
              href="#kontakt"
              className={`btn-ghost text-base ${
                hasImage
                  ? "!bg-white/[0.08] !border-white/35 !text-white hover:!bg-white/[0.16]"
                  : ""
              }`}
            >
              Kontakta oss
            </a>
          </div>
        </div>

        {(site.years_in_business || site.service_area) && (
          <div className="mt-10 md:mt-14 lg:mt-20">
            <dl
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t ${
                hasImage ? "border-white/20" : "border-[var(--border)]"
              } pt-8`}
            >
              {site.years_in_business && site.years_in_business > 0 && (
                <Stat
                  on={hasImage}
                  value={`${site.years_in_business}+`}
                  label="år i branschen"
                />
              )}
              {site.service_area && (
                <Stat on={hasImage} value="Lokala" label={site.service_area} />
              )}
              <Stat
                on={hasImage}
                value="Snabbt"
                label="oftast samma dag"
              />
              <Stat
                on={hasImage}
                value="F-skatt"
                label="auktoriserad firma"
              />
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  on,
}: {
  value: string;
  label: string;
  on: boolean;
}) {
  return (
    <div>
      <div
        className={`text-2xl md:text-3xl font-semibold tracking-tight ${on ? "text-white" : ""}`}
      >
        {value}
      </div>
      <div
        className={`text-sm mt-1.5 ${on ? "text-white/75" : "text-[var(--muted)]"}`}
      >
        {label}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
