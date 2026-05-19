import { type Site } from "@/lib/types";

export function Footer({ site }: { site: Site }) {
  const showFb = site.facebook_enabled && site.facebook_url;
  const showIg = site.instagram_enabled && site.instagram_url;
  return (
    <footer className="border-t border-[var(--border)] py-12 bg-[var(--surface)]">
      <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <div className="font-semibold text-lg">{site.name}</div>
          <div className="text-sm text-[var(--muted)] mt-1">
            {site.address}
          </div>
          <div className="text-xs text-[var(--muted-2)] mt-3">
            © {new Date().getFullYear()} {site.name}. Alla rättigheter förbehållna.
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {showFb && (
            <a
              href={site.facebook_url!}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              Facebook
            </a>
          )}
          {showIg && (
            <a
              href={site.instagram_url!}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--muted)] hover:text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              Instagram
            </a>
          )}
          <a
            href="/admin"
            className="text-[var(--muted)] hover:text-[var(--foreground)] underline-offset-4 hover:underline"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
