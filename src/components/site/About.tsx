import { type Site } from "@/lib/types";

export function About({ site }: { site: Site }) {
  if (!site.about_text) return null;
  return (
    <section id="om" className="section border-t border-[var(--border)]">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-3">Om oss</div>
          <h2 className="h-display text-3xl md:text-4xl mb-6">
            En lokal partner — inte en helpdesk på andra sidan landet.
          </h2>
          <div
            className="hidden lg:block h-1 w-16 rounded-full"
            style={{ background: site.primary_color }}
          />
        </div>
        <div className="lg:col-span-8 space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-[var(--foreground)]/90 whitespace-pre-line">
            {site.about_text}
          </p>

          {(site.years_in_business || site.service_area) && (
            <dl className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
              {site.years_in_business && site.years_in_business > 0 && (
                <Stat
                  value={`${site.years_in_business}+`}
                  label="år i branschen"
                />
              )}
              {site.service_area && (
                <Stat value="Lokala" label={site.service_area} />
              )}
              <Stat value="F-skatt" label="auktoriserad firma" />
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl md:text-3xl font-semibold tracking-tight">
        {value}
      </dt>
      <dd className="text-sm text-[var(--muted)] mt-1">{label}</dd>
    </div>
  );
}
