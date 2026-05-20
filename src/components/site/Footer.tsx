import { type Site } from "@/lib/types";

export function Footer({ site }: { site: Site }) {
  const showFb = site.facebook_enabled && site.facebook_url;
  const showIg = site.instagram_enabled && site.instagram_url;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-x py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="mb-4 flex items-center gap-3">
            {site.logo_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.logo_url}
                alt={site.name}
                className="h-10 w-auto max-w-[120px] object-contain object-left shrink-0"
              />
            )}
            <div className="font-semibold tracking-tight text-xl">
              {site.name}
            </div>
          </div>
          {site.tagline_secondary && (
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-md">
              {site.tagline_secondary}
            </p>
          )}
        </div>

        <div className="lg:col-span-3">
          <div className="eyebrow mb-4">Kontakt</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={telHref}
                className="hover:text-[var(--accent)] transition-colors"
              >
                {site.phone}
              </a>
            </li>
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-[var(--accent)] transition-colors break-all"
                >
                  {site.email}
                </a>
              </li>
            )}
            <li className="text-[var(--muted)]">{site.address}</li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="eyebrow mb-4">Snabbnavigation</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#om" className="hover:text-[var(--foreground)] text-[var(--muted)]">
                Om oss
              </a>
            </li>
            <li>
              <a
                href="#tjanster"
                className="hover:text-[var(--foreground)] text-[var(--muted)]"
              >
                Tjänster
              </a>
            </li>
            <li>
              <a
                href="#kontakt"
                className="hover:text-[var(--foreground)] text-[var(--muted)]"
              >
                Kontakt
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="eyebrow mb-4">Följ oss</div>
          <ul className="space-y-2 text-sm">
            {showFb && (
              <li>
                <a
                  href={site.facebook_url!}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--foreground)] text-[var(--muted)]"
                >
                  Facebook
                </a>
              </li>
            )}
            {showIg && (
              <li>
                <a
                  href={site.instagram_url!}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--foreground)] text-[var(--muted)]"
                >
                  Instagram
                </a>
              </li>
            )}
            <li>
              <a
                href="/admin"
                className="hover:text-[var(--foreground)] text-[var(--muted-2)] text-xs"
              >
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-x py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--muted-2)]">
          <div>
            © {new Date().getFullYear()} {site.name}. Alla rättigheter förbehållna.
          </div>
          {site.opening_hours && (
            <div className="whitespace-pre-line">{site.opening_hours.split("\n")[0]}</div>
          )}
        </div>
      </div>
    </footer>
  );
}
