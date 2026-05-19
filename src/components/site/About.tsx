import { type Site } from "@/lib/types";

export function About({ site }: { site: Site }) {
  if (!site.about_text) return null;
  return (
    <section id="om" className="section border-t border-[var(--border)]">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-20">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow mb-3">Om oss</div>
            <h2 className="h-display text-3xl md:text-4xl lg:text-5xl mb-8">
              En lokal partner — inte en helpdesk på andra sidan landet.
            </h2>
            <div
              className="h-px w-12 mb-8"
              style={{ background: site.primary_color }}
            />
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Familjärt företag med tydligt ansvar för varje uppdrag — från
              första hembesöket till slutbesiktningen.
            </p>
          </div>
        </aside>
        <div className="lg:col-span-8 space-y-10">
          <p className="text-xl md:text-2xl leading-relaxed text-[var(--foreground)]/90 whitespace-pre-line">
            {site.about_text}
          </p>

          {(site.years_in_business || site.service_area) && (
            <dl className="grid sm:grid-cols-3 gap-8 pt-10 border-t border-[var(--border)]">
              {site.years_in_business && site.years_in_business > 0 && (
                <Stat
                  value={`${site.years_in_business}+`}
                  label="år i branschen"
                />
              )}
              {site.service_area && (
                <Stat value="Lokal" label={site.service_area} />
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
      <dt className="text-3xl md:text-4xl font-semibold tracking-tight">
        {value}
      </dt>
      <dd className="text-sm text-[var(--muted)] mt-1.5">{label}</dd>
    </div>
  );
}
