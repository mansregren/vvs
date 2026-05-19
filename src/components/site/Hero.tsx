import { type Site } from "@/lib/types";

export function Hero({ site }: { site: Site }) {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const ctaText = site.cta_text?.trim() || `Ring ${site.phone}`;
  const hasImage = !!site.hero_image_url;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{
        minHeight: hasImage ? "min(78vh, 720px)" : undefined,
      }}
    >
      {hasImage && (
        <>
          <img
            src={site.hero_image_url!}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 w-full h-full object-cover"
          />
          <div className="absolute inset-0 -z-10 hero-overlay" />
        </>
      )}

      <div
        className={`container-x ${
          hasImage
            ? "pt-28 pb-20 md:pt-36 md:pb-32 text-white"
            : "pt-20 pb-16 md:pt-28 md:pb-24"
        }`}
      >
        <div className="max-w-3xl">
          <div
            className={`eyebrow mb-5 ${hasImage ? "text-white/80" : ""}`}
            style={hasImage ? undefined : { color: site.primary_color }}
          >
            VVS · El · Service · {site.city}
          </div>

          <h1
            className={`h-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
              hasImage ? "text-white" : ""
            }`}
          >
            {site.hero_tagline ?? `${site.name} — VVS i ${site.city}`}
          </h1>

          {site.tagline_secondary && (
            <p
              className={`mt-6 text-lg md:text-xl max-w-2xl leading-relaxed ${
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
                  ? "!bg-white/10 !border-white/40 !text-white hover:!bg-white/20"
                  : ""
              }`}
            >
              Kontakta oss
            </a>
          </div>

          {(site.years_in_business || site.service_area) && (
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
              {site.years_in_business && site.years_in_business > 0 && (
                <Stat
                  on={hasImage}
                  value={`${site.years_in_business}+ år`}
                  label="i branschen"
                />
              )}
              {site.service_area && (
                <Stat
                  on={hasImage}
                  value={site.service_area}
                  label="vårt område"
                />
              )}
              <Stat on={hasImage} value="Snabb service" label="oftast samma dag" />
            </div>
          )}
        </div>
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
    <div className="flex items-baseline gap-2">
      <span className={`font-semibold text-lg ${on ? "text-white" : ""}`}>
        {value}
      </span>
      <span
        className={`text-sm ${on ? "text-white/75" : "text-[var(--muted)]"}`}
      >
        {label}
      </span>
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
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
