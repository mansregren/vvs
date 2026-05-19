import { type Site } from "@/lib/types";

export function SocialFooter({ site }: { site: Site }) {
  const showFb = site.facebook_enabled && site.facebook_url;
  const showIg = site.instagram_enabled && site.instagram_url;
  return (
    <footer
      className="border-t border-[var(--border)] py-10 text-sm text-[var(--muted)]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} {site.name}</div>
        {(showFb || showIg) && (
          <div className="flex gap-4">
            {showFb && (
              <a
                href={site.facebook_url!}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                Facebook
              </a>
            )}
            {showIg && (
              <a
                href={site.instagram_url!}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
