import { type Site } from "@/lib/types";

export function Socials({ site }: { site: Site }) {
  const showFb = site.facebook_enabled && site.facebook_url;
  const showIg = site.instagram_enabled && site.instagram_url;
  if (!showFb && !showIg) return null;

  return (
    <section
      id="sociala"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow mb-3">Följ oss</div>
          <h2 className="h-display text-3xl md:text-4xl">
            Senaste från sociala medier
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Vi delar pågående jobb, tips och svar på vanliga frågor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {showFb && site.facebook_url && (
            <SocialCard
              label="Facebook"
              url={site.facebook_url}
              color="#1877F2"
              icon={<FacebookIcon />}
              cta="Besök Facebook-sidan"
            />
          )}
          {showIg && site.instagram_url && (
            <SocialCard
              label="Instagram"
              url={site.instagram_url}
              color="#E4405F"
              icon={<InstagramIcon />}
              cta="Besök Instagram"
            />
          )}
        </div>
      </div>
    </section>
  );
}

function SocialCard({
  label,
  url,
  color,
  icon,
  cta,
}: {
  label: string;
  url: string;
  color: string;
  icon: React.ReactNode;
  cta: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="card flex items-center gap-4 sm:gap-5 hover:shadow-md transition-shadow group"
    >
      <div
        className="shrink-0 w-14 h-14 rounded-xl grid place-items-center text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-lg">{label}</div>
        <div className="text-sm text-[var(--muted)]">{cta}</div>
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="shrink-0 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-transform group-hover:translate-x-1"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="13 6 19 12 13 18" />
      </svg>
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
