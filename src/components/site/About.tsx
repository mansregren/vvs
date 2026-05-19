import { type Site } from "@/lib/types";

export function About({ site }: { site: Site }) {
  if (!site.about_text) return null;
  return (
    <section className="border-b border-[var(--border)] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Om oss
        </h2>
        <div className="md:col-span-2 text-lg leading-relaxed text-[var(--foreground)]/85 whitespace-pre-line">
          {site.about_text}
        </div>
      </div>
    </section>
  );
}
