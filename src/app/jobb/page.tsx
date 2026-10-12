import type { Metadata } from "next";
import Phone from "./Phone";
import AppSwipe from "./AppSwipe";
import { ListScreen, LetterScreen, Logo, MatchScreen, ReportScreen, SwipeStatic, JOBS } from "./screens";

export const metadata: Metadata = {
  title: "Work Crush — Love your job",
  description:
    "Swajpa höger för att bli jurist. Swajpa höger på ekonomi. Work Crush matchar dig med lediga jobb och skriver ansökan åt dig.",
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#dcf0fd",
};

const EARLY_ACCESS =
  "mailto:mansregren@caztmedia.com?subject=Tidig%20tillg%C3%A5ng%20till%20Work%20Crush";

const SHOTS = [
  { title: "Swajpa höger på din framtid", sub: "Riktiga lediga jobb, matchade mot ditt CV.", screen: <SwipeStatic />, bg: "linear-gradient(180deg,#ffffff 0%,#e6f4fe 100%)" },
  { title: "Brevet skrivs åt dig", sub: "Personligt, utifrån annonsen och din erfarenhet.", screen: <LetterScreen />, bg: "linear-gradient(180deg,#0b2540 0%,#14406b 100%)", dark: true },
  { title: "Det är en match", sub: "Boka intervju direkt i appen.", screen: <MatchScreen />, bg: "linear-gradient(180deg,#ffffff 0%,#e6f4fe 100%)" },
  { title: "Allt på ett ställe", sub: "Se vem som läst din ansökan.", screen: <ListScreen />, bg: "linear-gradient(180deg,#2aa8f2 0%,#0b84d8 100%)", dark: true },
  { title: "Aktivitetsrapporten, klar", sub: "Månadens sökta jobb, redo att föra över.", screen: <ReportScreen />, bg: "linear-gradient(180deg,#ffffff 0%,#e6f4fe 100%)" },
];

const FEATURES = [
  {
    title: "Detaljerade annonser",
    body: "Lön, ort och stadsdel, omfattning, tillträde och krav — allt på kortet, innan du swajpar.",
  },
  {
    title: "Ansökan på sekunder",
    body: "Swajpa höger så skrivs ett personligt brev utifrån annonsen och ditt CV. Du granskar och skickar.",
  },
  {
    title: "Full koll",
    body: "Se vilka ansökningar som lästs, boka intervjuer och få månadens aktivitetsrapport sammanställd.",
  },
];

export default function JobbPage() {
  return (
    <main className="flex-1 overflow-x-clip bg-[#dcf0fd] font-sans text-[#0b2540] antialiased">
      {/* nav */}
      <header className="sticky top-0 z-30 border-b border-[#0b2540]/6 bg-[#dcf0fd]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo size={20} />
          <a
            href={EARLY_ACCESS}
            className="rounded-full bg-[#0b2540] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#14406b]"
          >
            Få tidig tillgång
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 35%, rgba(42,168,242,0.22) 0%, rgba(42,168,242,0) 70%), radial-gradient(40% 40% at 10% 10%, rgba(127,208,251,0.25) 0%, rgba(127,208,251,0) 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#2aa8f2]/25 bg-white px-3 py-1 text-[13px] font-medium text-[#0b84d8] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2aa8f2]" />
              Kommer snart till iPhone och Android
            </p>
            <h1 className="mt-5 text-[56px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-7xl md:text-[88px]">
              Love
              <br />
              <span className="bg-gradient-to-r from-[#2aa8f2] to-[#0b84d8] bg-clip-text text-transparent">your job.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#4a6680] sm:text-lg">
              Swajpa höger för att bli jurist. Swajpa höger på ekonomi. Work Crush visar lediga jobb
              nära dig — och skriver ansökan åt dig när du säger ja.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={EARLY_ACCESS}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#2aa8f2] to-[#0b84d8] px-6 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(11,132,216,0.8)] transition hover:brightness-105"
              >
                Få tidig tillgång
              </a>
              <a
                href="#skarmdumpar"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#0b2540]/12 bg-white px-6 text-[15px] font-semibold transition hover:border-[#0b2540]/25"
              >
                Se skärmdumpar
              </a>
            </div>
            <p className="mt-6 hidden text-sm text-[#7690a8] md:block">
              Prova telefonen — dra kortet eller använd piltangenterna.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Phone width={320}>
              <AppSwipe />
            </Phone>
            <p className="mt-5 text-center text-sm text-[#7690a8] md:hidden">Dra kortet åt höger eller vänster.</p>
          </div>
        </div>
      </section>

      {/* yrkesrad */}
      <section className="border-y border-[#0b2540]/6 bg-[#cbe8fc]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-6 text-[15px] font-medium text-[#4a6680] sm:px-6">
          {JOBS.map((j) => (
            <span key={j.field}>{j.field}</span>
          ))}
          <span>Bygg</span>
          <span>Marknad</span>
          <span>Logistik</span>
        </div>
      </section>

      {/* app store-skärmdumpar */}
      <section id="skarmdumpar" className="scroll-mt-16 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0b84d8]">App Store</p>
          <h2 className="mt-3 max-w-2xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
            Så ser Work Crush ut i telefonen.
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
            {SHOTS.map((s) => (
              <figure
                key={s.title}
                className="relative h-[560px] w-[260px] shrink-0 snap-start overflow-hidden rounded-[28px] ring-1 ring-[#0b2540]/8"
                style={{ background: s.bg }}
              >
                <figcaption className={`px-6 pt-8 text-center ${s.dark ? "text-white" : "text-[#0b2540]"}`}>
                  <p className="text-[24px] font-semibold leading-[1.1] tracking-[-0.02em]">{s.title}</p>
                  <p className={`mt-2 text-[13.5px] leading-snug ${s.dark ? "text-white/75" : "text-[#4a6680]"}`}>{s.sub}</p>
                </figcaption>
                <div className="absolute left-1/2 top-[150px] -translate-x-1/2">
                  <Phone width={224}>{s.screen}</Phone>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* funktioner */}
      <section className="bg-[#cbe8fc] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="max-w-2xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
            Jobbsök som inte känns som ett jobb.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="rounded-3xl border border-[#0b2540]/6 bg-white p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#2aa8f2] to-[#0b84d8] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-[#4a6680]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-[#0b2540] px-6 py-14 text-center text-white sm:px-12 md:py-20">
          <h2 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
            Nästa jobb är ett swajp bort.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-white/70">
            Skriv upp dig så hör vi av oss när appen släpps.
          </p>
          <a
            href={EARLY_ACCESS}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[15px] font-semibold text-[#0b2540] transition hover:bg-[#e8f6ff]"
          >
            Få tidig tillgång
          </a>
        </div>
      </section>

      <footer className="pb-10 text-center text-sm text-[#7690a8]">© 2026 Work Crush · Ett koncept från Cazt Media</footer>
    </main>
  );
}
