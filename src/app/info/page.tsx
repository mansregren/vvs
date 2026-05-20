import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cazt Media — Hemsidor för VVS- och byggföretag",
  description:
    "Vi designar, bygger och sköter hemsidan åt VVS- och byggföretag — med löpande SEO. 699 kr/mån, allt ingår.",
  openGraph: {
    title: "Cazt Media — Hemsidor för VVS- och byggföretag",
    description:
      "Vi designar, bygger och sköter hemsidan åt VVS- och byggföretag — med löpande SEO. 699 kr/mån, allt ingår.",
  },
};

const INCLUDED = [
  {
    title: "Färdig hemsida, designad åt er",
    body: "Vi bygger sajten utifrån er firma — namn, tjänster, certifikat och bilder. Ni behöver inte röra en rad kod.",
  },
  {
    title: "Löpande SEO-optimering",
    body: "Vi optimerar sajten så att ni syns på Google när kunder söker efter VVS och bygg lokalt.",
  },
  {
    title: "Hosting och domän",
    body: "Vi sköter driften och kopplar er egen domän. Allt fungerar utan att ni behöver tänka på tekniken.",
  },
  {
    title: "Eget admin",
    body: "Logga in och uppdatera tjänster, bilder, omdömen och kontaktuppgifter själva när som helst.",
  },
  {
    title: "Mobilanpassad och snabb",
    body: "Sajten ser lika proffsig ut i mobilen som på datorn — och laddar direkt.",
  },
  {
    title: "Support och uppdateringar",
    body: "Behöver något ändras hör ni bara av er, så fixar vi det. Ingen väntan.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Hör av dig",
    body: "Vi tar ett kort samtal om vad din firma behöver och vad sajten ska säga.",
  },
  {
    step: "02",
    title: "Vi bygger",
    body: "Vi sätter upp sajten med ert innehåll, certifikat, bilder och tjänster.",
  },
  {
    step: "03",
    title: "Live på er domän",
    body: "Sajten publiceras på er egen domän, optimerad för Google. Klart.",
  },
];

export default function InfoPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-[var(--border)] sticky top-0 z-40 bg-white">
        <div className="container-x flex items-center justify-between py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/caztmedia.png"
            alt="Cazt Media"
            className="w-40 md:w-52 h-auto"
          />
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link
              href="/demo"
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Exempel
            </Link>
            <a href="#pris" className="text-[var(--muted)] hover:text-[var(--foreground)] hidden sm:inline">
              Pris
            </a>
            <a href="#kontakt" className="btn-ghost btn-sm">
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      <div className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 -z-10 h-[560px] opacity-25"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 40%, transparent), transparent)",
            }}
          />
          <div className="container-x pt-16 md:pt-24 pb-12 md:pb-16">
            <div className="max-w-3xl">
              <div className="eyebrow mb-4" style={{ color: "var(--accent)" }}>
                Cazt Media
              </div>
              <h1 className="h-display text-4xl md:text-6xl leading-[1.05]">
                Proffsiga hemsidor för VVS- och byggföretag.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
                Vi designar, bygger och sköter hemsidan åt dig — och ser till
                att den syns på Google. Du fokuserar på jobbet, vi tar hand om
                resten.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/demo" className="btn-primary">
                  Se exempelsajt
                </Link>
                <a href="#kontakt" className="btn-ghost">
                  Kontakta oss
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pris */}
        <section
          id="pris"
          className="section border-t border-[var(--border)] bg-[var(--warm)]"
        >
          <div className="container-x">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="eyebrow mb-3">Pris</div>
                <h2 className="h-display text-3xl md:text-4xl">
                  Ett pris. Allt ingår.
                </h2>
                <p className="mt-4 text-[var(--muted)] leading-relaxed max-w-md">
                  Ingen stor investering, inga dolda kostnader. En komplett
                  hemsida som sköts åt dig — månad för månad.
                </p>
              </div>
              <div className="card">
                <div className="flex items-baseline gap-2">
                  <span className="h-display text-5xl md:text-6xl">699 kr</span>
                  <span className="text-[var(--muted)] text-lg">/mån</span>
                </div>
                <p className="mt-4 text-[var(--muted)] leading-relaxed">
                  Hemsida, hosting, domän och löpande SEO-optimering ingår.
                  Inga uppstartsavgifter.
                </p>
                <a href="#kontakt" className="btn-primary mt-6 w-full justify-center">
                  Kom igång
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Detta ingår */}
        <section className="section border-t border-[var(--border)]">
          <div className="container-x">
            <div className="max-w-2xl mb-10 md:mb-12">
              <div className="eyebrow mb-3">Detta ingår</div>
              <h2 className="h-display text-3xl md:text-4xl">
                Allt du behöver — inget du måste pyssla med.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {INCLUDED.map((f) => (
                <div key={f.title} className="card">
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Så funkar det */}
        <section className="section border-t border-[var(--border)] bg-[var(--warm)]">
          <div className="container-x">
            <div className="max-w-2xl mb-10 md:mb-12">
              <div className="eyebrow mb-3">Så funkar det</div>
              <h2 className="h-display text-3xl md:text-4xl">
                Från första samtal till live.
              </h2>
            </div>
            <ol className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {STEPS.map((s) => (
                <li key={s.step} className="card">
                  <div className="eyebrow mb-3" style={{ color: "var(--accent)" }}>
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Exempel-CTA */}
        <section className="section border-t border-[var(--border)]">
          <div className="container-x">
            <div className="card flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <div className="eyebrow mb-3" style={{ color: "var(--accent)" }}>
                  Exempel
                </div>
                <h2 className="h-display text-2xl md:text-3xl">
                  Se hur en färdig sajt kan se ut.
                </h2>
                <p className="mt-3 text-[var(--muted)] leading-relaxed">
                  Vi har byggt en exempelsajt för en påhittad VVS-firma så du
                  får en känsla för stilen och strukturen.
                </p>
              </div>
              <Link href="/demo" className="btn-primary shrink-0">
                Öppna exempelsajt
              </Link>
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section
          id="kontakt"
          className="section border-t border-[var(--border)] bg-[var(--warm)]"
        >
          <div className="container-x">
            <div className="max-w-2xl">
              <div className="eyebrow mb-3">Kontakt</div>
              <h2 className="h-display text-3xl md:text-4xl">
                Vill du komma igång?
              </h2>
              <p className="mt-4 text-[var(--muted)] leading-relaxed">
                Hör av dig till Måns så går vi igenom vad din firma behöver.
                Inga förpliktelser — bara ett samtal.
              </p>
              <a
                href="mailto:mansregren@caztmedia.com"
                className="inline-block mt-6 text-xl md:text-2xl font-medium tracking-tight underline-offset-4 hover:underline"
              >
                mansregren@caztmedia.com
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="container-x flex items-center justify-between text-xs text-[var(--muted-2)]">
          <span>© {new Date().getFullYear()} Cazt Media</span>
          <Link href="/admin" className="hover:text-[var(--foreground)]">
            Logga in
          </Link>
        </div>
      </footer>
    </main>
  );
}
