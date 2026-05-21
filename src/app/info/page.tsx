import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cazt Media — Hemsidor för VVS- och byggföretag",
  description:
    "Vi designar, bygger och sköter hemsidan åt VVS- och byggföretag — med löpande SEO. 499 kr/mån exkl. moms.",
  openGraph: {
    title: "Cazt Media — Hemsidor för VVS- och byggföretag",
    description:
      "Vi designar, bygger och sköter hemsidan åt VVS- och byggföretag — med löpande SEO. 499 kr/mån exkl. moms.",
  },
};

const INCLUDED = [
  {
    title: "Färdig hemsida, designad åt er",
    body: "Byggd utifrån er firma — namn, tjänster, certifikat och bilder. Snabb och proffsig i både mobil och dator. Ni rör inte en rad kod.",
  },
  {
    title: "Syns på Google",
    body: "Löpande SEO så att ni dyker upp när kunder söker efter VVS, bygg och el lokalt.",
  },
  {
    title: "Hosting och domän",
    body: "Vi sköter driften och kopplar er egen domän. Allt fungerar utan att ni behöver tänka på tekniken.",
  },
  {
    title: "Support och uppdateringar",
    body: "Behöver något ändras hör ni bara av er, så fixar vi det. Ingen väntan.",
  },
];

const OM_MIG_PUNKTER = [
  "Bor och jobbar i Skåne",
  "Egen erfarenhet från VVS-branschen",
  "Bygger sajter åt VVS, bygg och el",
  "Kunnig inom hemsidor och SEO",
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
            className="w-52 md:w-72 h-auto -ml-8 md:-ml-10"
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
                  Kontakta mig
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Förhandsvisning av exempelsajt */}
        <section className="pb-10 md:pb-14">
          <div className="container-x">
            <Link
              href="/demo"
              className="group block max-w-3xl mx-auto rounded-2xl border border-[var(--border)] bg-white overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--warm)]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-[var(--muted-2)] truncate">
                  caztmedia.com/demo
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demo-preview-2.jpg"
                alt="Exempel på en färdig VVS-hemsida"
                className="w-full h-auto block"
              />
            </Link>
            <p className="mt-4 text-center text-sm text-[var(--muted)]">
              Så här kan din sajt se ut —{" "}
              <Link
                href="/demo"
                className="underline underline-offset-4"
                style={{ color: "var(--accent)" }}
              >
                öppna hela exempelsajten
              </Link>
            </p>
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
              <div
                className="card"
                style={{
                  borderColor: "var(--accent)",
                  boxShadow: "0 0 0 4px var(--accent-soft)",
                }}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="h-display text-5xl md:text-6xl"
                    style={{ color: "var(--accent)" }}
                  >
                    499 kr
                  </span>
                  <span className="text-[var(--muted)] text-lg">/mån exkl. moms</span>
                </div>
                <p className="mt-4 text-[var(--muted)] leading-relaxed">
                  Hemsida, hosting och löpande SEO-optimering ingår. Inga
                  uppstartsavgifter och ingen bindningstid.
                </p>
                <p className="mt-2 text-sm text-[var(--muted-2)] leading-relaxed">
                  Domän tillkommer om du inte redan har en — vanligtvis
                  100–300 kr/år.
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
                <div
                  key={f.title}
                  className="card"
                  style={{ borderTop: "3px solid var(--accent)" }}
                >
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Om mig */}
        <section
          className="section border-t border-[var(--border)]"
          style={{ background: "var(--accent-soft)" }}
        >
          <div className="container-x">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 items-start">
              <div>
                <div className="eyebrow mb-3" style={{ color: "var(--accent)" }}>
                  Om mig
                </div>
                <h2 className="h-display text-3xl md:text-4xl">
                  Jag heter Måns — och kan både rör och webb.
                </h2>
                <div className="mt-5 space-y-4 text-[var(--muted)] leading-relaxed max-w-xl">
                  <p>
                    Jag bor i Skåne och jobbar själv inom VVS-branschen. Vid
                    sidan av bygger jag hemsidor åt VVS-, bygg- och elföretag.
                  </p>
                  <p>
                    Det betyder att jag förstår din vardag — och vet vad som
                    faktiskt får kunder att höra av sig. Utöver hantverket har
                    jag lång erfarenhet av hemsidor och SEO, så att din firma
                    syns när folk söker lokalt.
                  </p>
                </div>
              </div>
              <div className="card bg-white">
                <ul className="space-y-4">
                  {OM_MIG_PUNKTER.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="font-medium">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                Hör av dig till mig så går vi igenom vad din firma behöver.
                Inga förpliktelser — bara ett samtal.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="tel:+46761997010"
                  className="inline-flex items-center gap-2 text-xl md:text-2xl font-medium tracking-tight underline-offset-4 hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  +46 76 199 70 10
                </a>
                <a
                  href="mailto:mansregren@caztmedia.com"
                  className="inline-block text-xl md:text-2xl font-medium tracking-tight underline-offset-4 hover:underline"
                >
                  mansregren@caztmedia.com
                </a>
              </div>
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

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
