import { type Site } from "@/lib/types";

export function Contact({ site }: { site: Site }) {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  return (
    <section id="kontakt" className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Kontakt
        </h2>
        <dl className="md:col-span-2 space-y-6 text-lg">
          <div>
            <dt className="text-sm uppercase tracking-wider text-[var(--muted)] mb-1">
              Telefon
            </dt>
            <dd>
              <a
                href={telHref}
                className="font-medium underline-offset-4 hover:underline"
                style={{ color: site.primary_color }}
              >
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm uppercase tracking-wider text-[var(--muted)] mb-1">
              Adress
            </dt>
            <dd>{site.address}</dd>
          </div>
          {site.email && (
            <div>
              <dt className="text-sm uppercase tracking-wider text-[var(--muted)] mb-1">
                E-post
              </dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="underline-offset-4 hover:underline"
                  style={{ color: site.primary_color }}
                >
                  {site.email}
                </a>
              </dd>
            </div>
          )}
          {site.opening_hours && (
            <div>
              <dt className="text-sm uppercase tracking-wider text-[var(--muted)] mb-1">
                Öppettider
              </dt>
              <dd className="whitespace-pre-line">{site.opening_hours}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
