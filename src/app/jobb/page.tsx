import type { Metadata } from "next";
import Phone from "./Phone";
import AppSwipe from "./AppSwipe";
import LifeHours from "./LifeHours";
import { Avatar, CompanyLogo, JOBS, ListScreen, LetterScreen, Logo, MatchScreen, MessagesScreen, ReportScreen, SwipeStatic } from "./screens";

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

// Palett: Sky #2aa8f2 · Ice #dcf0fd · Navy #0b2540 · Periwinkle #6f7dff · Sunshine #ffdc5e · Mint #22c99a
const SHOTS = [
  { title: "Love what's next", sub: "Swajpa på riktiga jobb, matchade mot ditt CV.", screen: <SwipeStatic />, bg: "linear-gradient(180deg,#ffffff 0%,#e6f4fe 100%)" },
  { title: "Brevet skrivs åt dig", sub: "Personligt, utifrån annonsen och din erfarenhet.", screen: <LetterScreen />, bg: "linear-gradient(180deg,#0b2540 0%,#14406b 100%)", dark: true },
  { title: "Det är en match", sub: "Boka intervju direkt i appen.", screen: <MatchScreen />, bg: "linear-gradient(180deg,#fff0b3 0%,#ffdc5e 100%)" },
  { title: "Prata direkt med rekryteraren", sub: "Riktiga människor, inga svarta hål.", screen: <MessagesScreen />, bg: "linear-gradient(180deg,#ffffff 0%,#e6f4fe 100%)" },
  { title: "Allt på ett ställe", sub: "Se vem som läst din ansökan.", screen: <ListScreen />, bg: "linear-gradient(180deg,#2aa8f2 0%,#0b84d8 100%)", dark: true },
  { title: "Aktivitetsrapporten, klar", sub: "Månadens sökta jobb, redo att föra över.", screen: <ReportScreen />, bg: "linear-gradient(180deg,#97a3ff 0%,#6f7dff 100%)", dark: true },
];

const BADGE = ["#2aa8f2", "#6f7dff", "#22c99a"];
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
              "radial-gradient(45% 40% at 80% 30%, rgba(42,168,242,0.30) 0%, rgba(42,168,242,0) 70%), radial-gradient(30% 30% at 92% 75%, rgba(111,125,255,0.22) 0%, rgba(111,125,255,0) 70%), radial-gradient(30% 30% at 55% 85%, rgba(255,201,60,0.25) 0%, rgba(255,201,60,0) 70%), radial-gradient(35% 35% at 5% 10%, rgba(34,201,154,0.14) 0%, rgba(34,201,154,0) 70%)",
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
            <div className="relative">
              <Phone width={320}>
                <AppSwipe />
              </Phone>
              <span className="absolute -top-4 left-0 z-10 -rotate-6 rounded-full bg-[#6f7dff] sm:top-16 sm:-left-24 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(111,125,255,0.9)]">
                Love what&apos;s next ✦
              </span>
              <span className="absolute -right-3 top-[44%] z-10 hidden rotate-3 sm:flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] font-semibold shadow-[0_14px_30px_-12px_rgba(11,37,64,0.45)] sm:-right-20">
                <span className="flex -space-x-2">
                  {JOBS.slice(3, 6).map((j) => (
                    <Avatar key={j.title} src={j.recruiter.img} size={26} ring={2} />
                  ))}
                </span>
                3 nya matchningar
              </span>
              <span className="absolute -bottom-4 right-0 z-10 rotate-[-4deg] sm:bottom-28 sm:-left-20 sm:right-auto rounded-2xl bg-[#ffdc5e] px-3.5 py-2.5 text-[13px] font-bold text-[#0b2540] shadow-[0_14px_30px_-12px_rgba(230,190,40,0.8)]">
                Intervju imorgon 10:00
              </span>
            </div>
            <p className="mt-9 text-center text-sm text-[#7690a8] md:hidden">Dra kortet åt höger eller vänster.</p>
          </div>
        </div>
      </section>

      <LifeHours />

      {/* arbetsgivare */}
      <section className="px-4 pt-16 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm font-medium text-[#5b7590]">
            Från startups till sjukhus — exempel på arbetsgivare i appen
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">
            {JOBS.map((j) => (
              <div key={j.company} className="flex items-center gap-2.5 rounded-2xl bg-white px-3 py-3 sm:gap-3 sm:px-4 shadow-[0_1px_3px_rgba(11,37,64,0.06)]">
                <CompanyLogo job={j} size={36} radius={10} />
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold leading-tight sm:text-[14px]">{j.company}</span>
                  <span className="block truncate text-[12px] text-[#5b7590]">{j.city}</span>
                </span>
              </div>
            ))}
          </div>
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
            More <span className="text-[#6f7dff]">happy</span> working.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="rounded-3xl border border-[#0b2540]/6 bg-white p-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-sm font-semibold text-white" style={{ background: BADGE[i] }}>
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-[#4a6680]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* rekryterare */}
      <section className="px-4 pt-16 sm:px-6 md:pt-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-[32px] bg-white px-6 py-10 sm:px-10 md:flex-row md:justify-between md:py-12">
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Choose a career that <span className="text-[#1e9be6]">chooses you too.</span>
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#4a6680]">
              Riktiga människor på andra sidan. Varje annons har en rekryterare med namn och ansikte — när ni båda swajpar höger pratar ni direkt i appen.
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-3 gap-x-4 gap-y-5 sm:gap-x-6">
            {JOBS.map((j) => (
              <div key={j.recruiter.name} className="flex w-[92px] flex-col items-center text-center">
                <span className="relative">
                  <Avatar src={j.recruiter.img} size={72} ring={3} className="shadow-[0_8px_20px_-8px_rgba(11,37,64,0.5)]" />
                  <span className="absolute -bottom-1 -right-1 rounded-[9px] bg-white p-[2px]">
                    <CompanyLogo job={j} size={24} radius={7} />
                  </span>
                </span>
                <span className="mt-2 text-[13px] font-semibold leading-tight">{j.recruiter.name.split(" ")[0]}</span>
                <span className="text-[11.5px] leading-tight text-[#5b7590]">{j.company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="px-4 py-20 sm:px-6 md:py-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2aa8f2] to-[#0b84d8] px-6 py-14 text-center text-white sm:px-12 md:py-20">
          <span aria-hidden className="absolute -left-14 -top-14 h-28 w-28 rounded-full bg-[#ffdc5e] sm:-left-10 sm:-top-10 sm:h-40 sm:w-40" />
          <span aria-hidden className="absolute -bottom-20 -right-16 h-40 w-40 rounded-full sm:-bottom-16 sm:-right-8 sm:h-52 sm:w-52 bg-[#6f7dff]" />
          <span aria-hidden className="absolute bottom-8 left-[12%] h-6 w-6 rounded-full bg-[#22c99a]" />
          <h2 className="relative text-[34px] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            Stop settling.
            <br />
            Start swiping.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-[17px] text-white/85">
            Your next chapter starts here. Skriv upp dig så hör vi av oss när appen släpps.
          </p>
          <a
            href={EARLY_ACCESS}
            className="relative mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[15px] font-semibold text-[#0b2540] transition hover:bg-[#e8f6ff]"
          >
            Få tidig tillgång
          </a>
        </div>
      </section>

      <footer className="pb-10 text-center text-sm text-[#7690a8]">© 2026 Work Crush · Ett koncept från Cazt Media</footer>
    </main>
  );
}
