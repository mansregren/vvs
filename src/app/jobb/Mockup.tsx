function Phone({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="flex flex-col items-center">
      <div className="relative w-[270px] rounded-[2.6rem] bg-[#111] p-[10px] shadow-2xl ring-1 ring-white/30">
        <div className="absolute left-1/2 top-[18px] z-10 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[#111]" />
        <div className="relative flex h-[540px] flex-col overflow-hidden rounded-[2.1rem] bg-[#eaf7ff] text-[#0b3a5b]">
          <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-bold">
            <span>9:41</span>
            <span>●●● ▮</span>
          </div>
          {children}
        </div>
      </div>
      <figcaption className="mt-4 text-center text-base font-bold text-white">{label}</figcaption>
    </figure>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-2 pt-5">
      <span className="text-lg text-[#0b3a5b]/40">☰</span>
      <span
        className="bg-clip-text text-xl font-extrabold tracking-tight text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#38bdf8,#0284c7)" }}
      >
        jobbswajp
      </span>
      <span className="text-lg text-[#0b3a5b]/40">⚙</span>
    </div>
  );
}

function BottomNav({ active }: { active: number }) {
  const items = ["🔥", "★", "💬", "👤"];
  return (
    <nav className="mt-auto flex justify-around border-t border-black/5 py-3 text-xl">
      {items.map((it, i) => (
        <span key={it} className={i === active ? "" : "opacity-25 grayscale"}>
          {it}
        </span>
      ))}
    </nav>
  );
}

function SwipeScreen() {
  return (
    <>
      <TopBar />
      <div className="relative mx-3 flex-1">
        <div className="absolute inset-x-3 -bottom-0 top-3 rounded-3xl bg-[#bae6fd]" />
        <div
          className="relative flex h-full flex-col justify-end overflow-hidden rounded-3xl p-4 text-white shadow-lg"
          style={{ background: "linear-gradient(160deg,#bae6fd 0%,#38bdf8 45%,#0284c7 100%)" }}
        >
          <span className="absolute left-4 top-5 -rotate-12 rounded-lg border-[3px] border-[#00e0a4] px-2 text-lg font-extrabold text-[#00e0a4]">
            JA!
          </span>
          <div className="absolute right-4 top-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-3xl backdrop-blur">
            ⚖️
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Advokatbyrå · Malmö</p>
          <h3 className="text-2xl font-extrabold leading-tight">Biträdande jurist</h3>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold">
            {["Heltid", "Malmö", "Juristexamen", "Start: jan"].map((t) => (
              <span key={t} className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/85">
            Affärsjuridik, mycket eget ansvar från dag ett. Matchar 4 av 5 krav i ditt CV.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 py-3">
        {[
          { s: "↺", c: "#ffb800", big: false },
          { s: "✕", c: "#ff3d3d", big: true },
          { s: "★", c: "#3ddcff", big: false },
          { s: "♥", c: "#00d18f", big: true },
          { s: "⚡", c: "#8a5cff", big: false },
        ].map((b) => (
          <span
            key={b.s}
            className={`grid place-items-center rounded-full bg-white font-bold shadow-[0_4px_14px_rgba(0,0,0,0.12)] ${
              b.big ? "h-12 w-12 text-xl" : "h-9 w-9 text-sm"
            }`}
            style={{ color: b.c }}
          >
            {b.s}
          </span>
        ))}
      </div>
      <BottomNav active={0} />
    </>
  );
}

function MatchScreen() {
  return (
    <div
      className="flex flex-1 flex-col items-center px-5 pb-6 pt-8 text-center text-white"
      style={{ background: "linear-gradient(170deg,#7dd3fc 0%,#0ea5e9 100%)" }}
    >
      <p className="text-sm font-bold uppercase tracking-widest text-white/80">Det är en</p>
      <h3 className="-mt-1 text-5xl font-extrabold italic tracking-tight">match!</h3>
      <div className="mt-5 flex items-center">
        <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-[#ffd23f] text-4xl">
          🙂
        </div>
        <div className="-ml-4 grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-[#0b3a5b] text-4xl">
          ⚖️
        </div>
      </div>
      <p className="mt-4 text-sm text-white/90">Du och Advokatbyrån i Malmö</p>
      <div className="mt-4 w-full rounded-2xl bg-white p-3 text-left text-[#0b3a5b] shadow-lg">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7]">✨ Ditt brev är klart</p>
        <p className="mt-1 text-xs leading-relaxed text-[#0b3a5b]/80">
          Hej! Jag tog min juristexamen i Lund i våras och har under min notarietid jobbat med
          avtalsrätt och bolagsfrågor — precis det ni beskriver i annonsen…
        </p>
      </div>
      <span className="mt-auto w-full rounded-full bg-white py-3 text-sm font-extrabold text-[#0284c7]">
        Skicka ansökan
      </span>
      <span className="mt-2 w-full rounded-full border-2 border-white/70 py-2.5 text-sm font-bold">
        Redigera brevet
      </span>
    </div>
  );
}

function ListScreen() {
  const rows = [
    { e: "⚖️", t: "Biträdande jurist", c: "Advokatbyrå · Malmö", s: "Intervju!", bg: "#00e0a4", fg: "#0b3d2e" },
    { e: "📈", t: "Ekonomiassistent", c: "Revisionsbyrå · Lund", s: "Visad", bg: "#3ddcff", fg: "#08364a" },
    { e: "📊", t: "Controller", c: "Industriföretag · Helsingborg", s: "Skickad", bg: "#ffd23f", fg: "#4a3a00" },
    { e: "🏦", t: "Kundrådgivare", c: "Bank · Malmö", s: "Skickad", bg: "#ffd23f", fg: "#4a3a00" },
  ];
  return (
    <>
      <TopBar />
      <div className="px-5">
        <h3 className="text-xl font-extrabold">Dina ansökningar</h3>
        <p className="text-xs text-[#0b3a5b]/60">4 denna vecka · 1 intervju</p>
      </div>
      <ul className="mt-3 flex flex-col gap-2 px-4">
        {rows.map((r) => (
          <li key={r.t} className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-xl">{r.e}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{r.t}</span>
              <span className="block truncate text-[11px] text-[#0b3a5b]/60">{r.c}</span>
            </span>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold"
              style={{ background: r.bg, color: r.fg }}
            >
              {r.s}
            </span>
          </li>
        ))}
      </ul>
      <div className="mx-4 mt-3 rounded-2xl bg-[#0b3a5b] p-3 text-white">
        <p className="text-xs font-bold">📋 Aktivitetsrapport för oktober</p>
        <p className="mt-0.5 text-[11px] text-white/70">Alla sökta jobb, färdiga att klistra in.</p>
      </div>
      <BottomNav active={1} />
    </>
  );
}

export default function Mockup() {
  return (
    <section id="app" className="mx-auto max-w-5xl px-4 pb-20 pt-6">
      <h2 className="text-center text-4xl font-extrabold tracking-tight md:text-5xl">Så funkar appen</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-lg font-medium text-white/90">
        Swajpa på riktiga lediga jobb. Höger = vi skriver ditt personliga brev. Du trycker bara skicka.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        <Phone label="1. Swajpa på jobb">
          <SwipeScreen />
        </Phone>
        <Phone label="2. Match — brevet är skrivet">
          <MatchScreen />
        </Phone>
        <Phone label="3. Håll koll på allt">
          <ListScreen />
        </Phone>
      </div>
    </section>
  );
}
