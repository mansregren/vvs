// App-skärmar för mockupen. Allt ritas i 390×844 iPhone-punkter (se Phone.tsx).

export const INK = "#0b2540";
export const MUTED = "#5b7590";
export const ACCENT = "#2aa8f2";
export const ACCENT_DEEP = "#0b84d8";
export const APP_BG = "#f3f9fe";

export type Job = {
  field: string;
  title: string;
  employer: string;
  initial: string;
  city: string;
  area: string;
  salary: string;
  extent: string;
  form: string;
  start: string;
  place: string;
  reqs: [string, boolean][];
  match: number;
  deadline: string;
  distance: string;
  posted: string;
  gradient: string;
};

export const JOBS: Job[] = [
  {
    field: "Juridik",
    title: "Biträdande jurist",
    employer: "Advokatbyrå inom affärsjuridik",
    initial: "A",
    city: "Malmö",
    area: "Västra Hamnen",
    salary: "42 000–48 000 kr/mån",
    extent: "Heltid",
    form: "Tillsvidare",
    start: "Januari 2027",
    place: "Hybrid",
    reqs: [["Juristexamen", true], ["Tingsnotarie", true], ["Flytande engelska", true], ["Erfarenhet av M&A", false]],
    match: 88,
    deadline: "3 nov",
    distance: "4,2 km",
    posted: "2 dagar sedan",
    gradient: "linear-gradient(135deg,#0b2540 0%,#1d5fa0 100%)",
  },
  {
    field: "Ekonomi",
    title: "Controller",
    employer: "Industriföretag inom förpackning",
    initial: "I",
    city: "Helsingborg",
    area: "Berga",
    salary: "45 000–52 000 kr/mån",
    extent: "Heltid",
    form: "Tillsvidare",
    start: "Enligt ök.",
    place: "På plats",
    reqs: [["Civilekonom", true], ["Avancerad Excel", true], ["Power BI", true], ["SAP", false]],
    match: 91,
    deadline: "24 okt",
    distance: "58 km",
    posted: "Idag",
    gradient: "linear-gradient(135deg,#0a6b6b 0%,#2bb3a3 100%)",
  },
  {
    field: "Vård",
    title: "Sjuksköterska, akutmottagning",
    employer: "Universitetssjukhus",
    initial: "U",
    city: "Lund",
    area: "Klinikområdet",
    salary: "38 500–43 000 kr/mån",
    extent: "Heltid eller 80 %",
    form: "Tillsvidare",
    start: "Omgående",
    place: "Dag/kväll",
    reqs: [["Sjuksköterskelegitimation", true], ["B-körkort", true], ["Erfarenhet av akutsjukvård", false]],
    match: 84,
    deadline: "30 okt",
    distance: "17 km",
    posted: "1 dag sedan",
    gradient: "linear-gradient(135deg,#1f4fbf 0%,#5fa8ff 100%)",
  },
  {
    field: "Tech",
    title: "Frontendutvecklare",
    employer: "Fintech-bolag, 120 anställda",
    initial: "F",
    city: "Stockholm",
    area: "Södermalm",
    salary: "50 000–62 000 kr/mån",
    extent: "Heltid",
    form: "Tillsvidare",
    start: "Februari 2027",
    place: "Hybrid",
    reqs: [["React", true], ["TypeScript", true], ["3+ års erfarenhet", true], ["Svenska", true]],
    match: 95,
    deadline: "15 nov",
    distance: "Distans möjligt",
    posted: "3 dagar sedan",
    gradient: "linear-gradient(135deg,#2b2d7a 0%,#6a6ff0 100%)",
  },
  {
    field: "El",
    title: "Elektriker, service & installation",
    employer: "Installationsfirma, 35 anställda",
    initial: "E",
    city: "Malmö",
    area: "Hyllie",
    salary: "34 000–40 000 kr/mån + tillägg",
    extent: "Heltid",
    form: "Tillsvidare",
    start: "Omgående",
    place: "Ute hos kund",
    reqs: [["Auktorisation AB", true], ["B-körkort", true], ["ESA", true]],
    match: 90,
    deadline: "Löpande urval",
    distance: "6,8 km",
    posted: "Idag",
    gradient: "linear-gradient(135deg,#0b5c8f 0%,#28b6e8 100%)",
  },
  {
    field: "Utbildning",
    title: "Lärare i matematik och NO, åk 7–9",
    employer: "Kommunal grundskola",
    initial: "G",
    city: "Göteborg",
    area: "Majorna",
    salary: "36 000–41 000 kr/mån",
    extent: "Heltid",
    form: "Tillsvidare",
    start: "Augusti 2027",
    place: "På plats",
    reqs: [["Lärarlegitimation", true], ["Behörighet matematik", true], ["Behörighet NO", false]],
    match: 80,
    deadline: "20 nov",
    distance: "275 km",
    posted: "5 dagar sedan",
    gradient: "linear-gradient(135deg,#145a73 0%,#3fc1c9 100%)",
  },
];

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "#ffffff" : INK;
  return (
    <div className="flex h-[54px] items-center justify-between px-[34px] pt-[6px]" style={{ color: c }}>
      <span className="text-[17px] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c}>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}>
          <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.2-1.2A10.4 10.4 0 0 0 8 .5C5.1.5 2.5 1.6.6 3.5l1.2 1.2A8.7 8.7 0 0 1 8 2.2Zm0 3.4c1.5 0 2.8.6 3.8 1.5l1.2-1.2A7 7 0 0 0 8 3.9a7 7 0 0 0-5 2l1.2 1.2c1-.9 2.3-1.5 3.8-1.5Zm0 3.4c.6 0 1.1.2 1.5.6L8 11.1 6.5 9.6c.4-.4.9-.6 1.5-.6Z" />
        </svg>
        <span className="relative ml-[2px] inline-block h-[13px] w-[27px] rounded-[4px] border" style={{ borderColor: c, opacity: 0.9 }}>
          <span className="absolute inset-[2px] right-[5px] rounded-[2px]" style={{ background: c }} />
        </span>
      </span>
    </div>
  );
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="grid place-items-center rounded-[9px] text-white"
        style={{ width: size + 8, height: size + 8, background: `linear-gradient(135deg,${ACCENT},${ACCENT_DEEP})` }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h12M13 6l6 6-6 6" />
        </svg>
      </span>
      <span className="font-semibold tracking-tight" style={{ fontSize: size, color: INK }}>
        jobbswajp
      </span>
    </span>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(11,37,64,0.12)]" style={{ color: INK }}>
      {children}
    </span>
  );
}

export function AppHeader() {
  return (
    <div className="flex items-center justify-between px-[18px] pb-[10px] pt-[4px]">
      <IconBtn>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M7 12h10M10 17h4" /></svg>
      </IconBtn>
      <Logo />
      <IconBtn>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></svg>
      </IconBtn>
    </div>
  );
}

export function TabBar({ active }: { active: number }) {
  const tabs = [
    { label: "Swajpa", d: "M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-5 1-8Z" },
    { label: "Ansökningar", d: "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3" },
    { label: "Meddelanden", d: "M4 5h16v11H9l-5 4z" },
    { label: "Profil", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" },
  ];
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-[84px] justify-around border-t border-[#0b2540]/8 bg-white/95 pt-[10px] backdrop-blur">
      {tabs.map((t, i) => (
        <span key={t.label} className="flex w-[80px] flex-col items-center gap-[3px]" style={{ color: i === active ? ACCENT_DEEP : "#9fb2c4" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={t.d} />
          </svg>
          <span className="text-[10px] font-medium">{t.label}</span>
        </span>
      ))}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.06em]" style={{ color: MUTED }}>
        {label}
      </p>
      <p className="mt-[2px] truncate text-[14px] font-semibold" style={{ color: INK }}>
        {value}
      </p>
    </div>
  );
}

export function JobCard({ job, stamp }: { job: Job; stamp?: { like: number; nope: number } }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_18px_40px_-18px_rgba(11,37,64,0.45)] ring-1 ring-[#0b2540]/6">
      <div className="relative px-[20px] pb-[18px] pt-[18px] text-white" style={{ background: job.gradient }}>
        <div className="flex items-start justify-between">
          <span className="grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-white text-[24px] font-bold" style={{ color: INK }}>
            {job.initial}
          </span>
          <span className="rounded-full bg-white/18 px-[10px] py-[5px] text-[12px] font-semibold backdrop-blur">
            {job.match} % match
          </span>
        </div>
        <p className="mt-[14px] text-[14px] font-medium text-white/80">{job.employer}</p>
        <p className="mt-[2px] flex items-center gap-[5px] text-[14px] font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
          {job.city} · {job.area}
          <span className="font-normal text-white/70">· {job.distance}</span>
        </p>
      </div>

      <div className="flex flex-1 flex-col px-[20px] pt-[16px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: ACCENT_DEEP }}>
          {job.field}
        </p>
        <h3 className="mt-[4px] text-[25px] font-semibold leading-[1.15] tracking-tight" style={{ color: INK }}>
          {job.title}
        </h3>

        <div className="mt-[14px] grid grid-cols-2 gap-x-[14px] gap-y-[12px] rounded-[16px] bg-[#f3f9fe] p-[14px]">
          <div className="col-span-2">
            <Meta label="Lön" value={job.salary} />
          </div>
          <Meta label="Omfattning" value={job.extent} />
          <Meta label="Anställning" value={job.form} />
          <Meta label="Tillträde" value={job.start} />
          <Meta label="Arbetsplats" value={job.place} />
        </div>

        <p className="mt-[14px] text-[11px] font-medium uppercase tracking-[0.06em]" style={{ color: MUTED }}>
          Krav · ditt CV
        </p>
        <div className="mt-[6px] flex flex-wrap gap-[6px]">
          {job.reqs.map(([r, ok]) => (
            <span
              key={r}
              className="flex items-center gap-[4px] rounded-full px-[10px] py-[5px] text-[12.5px] font-medium"
              style={ok ? { background: "#e1f3fd", color: ACCENT_DEEP } : { background: "#f1f3f5", color: "#8796a5" }}
            >
              {ok ? "✓" : "–"} {r}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#0b2540]/8 py-[12px] text-[12.5px]" style={{ color: MUTED }}>
          <span>Publicerad {job.posted}</span>
          <span className="font-semibold" style={{ color: INK }}>
            Sista dag: {job.deadline}
          </span>
        </div>
      </div>

      {stamp && (
        <>
          <span
            className="absolute left-[20px] top-[88px] -rotate-12 rounded-[10px] border-[3px] border-[#16b77a] bg-white/90 px-[12px] py-[2px] text-[26px] font-extrabold tracking-wide text-[#16b77a]"
            style={{ opacity: stamp.like }}
          >
            SÖK
          </span>
          <span
            className="absolute right-[20px] top-[88px] rotate-12 rounded-[10px] border-[3px] border-[#ef4b5f] bg-white/90 px-[12px] py-[2px] text-[26px] font-extrabold tracking-wide text-[#ef4b5f]"
            style={{ opacity: stamp.nope }}
          >
            NEJ
          </span>
        </>
      )}
    </div>
  );
}

export function ActionButtons({ onNope, onSave, onLike }: { onNope?: () => void; onSave?: () => void; onLike?: () => void }) {
  const base = "grid place-items-center rounded-full bg-white shadow-[0_8px_20px_-8px_rgba(11,37,64,0.35)] ring-1 ring-[#0b2540]/6 transition active:scale-90";
  return (
    <div className="flex items-center justify-center gap-[22px]">
      <button type="button" aria-label="Inte intressant" onClick={onNope} className={`${base} h-[62px] w-[62px] text-[#ef4b5f]`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <button type="button" aria-label="Spara" onClick={onSave} className={`${base} h-[48px] w-[48px]`} style={{ color: ACCENT }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12v18l-6-4-6 4z" /></svg>
      </button>
      <button type="button" aria-label="Sök jobbet" onClick={onLike} className={`${base} h-[62px] w-[62px] text-[#16b77a]`}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.6 3 5 6.5 5c2 0 3.4 1.1 4.2 2.3h2.6C14.1 6.1 15.5 5 17.5 5 21 5 23.1 8.6 21.6 11.8 19.5 16.4 12 21 12 21Z" /></svg>
      </button>
    </div>
  );
}

function Screen({ children, bg = APP_BG }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="relative h-full w-full" style={{ background: bg, color: INK }}>
      {children}
    </div>
  );
}

/* ---------- Statiska skärmar för App Store-bilderna ---------- */

export function SwipeStatic({ job = JOBS[0] }: { job?: Job }) {
  return (
    <Screen>
      <StatusBar />
      <AppHeader />
      <div className="relative mx-[16px] h-[560px]">
        <div className="absolute inset-x-[14px] top-[12px] bottom-[-10px] rounded-[26px] bg-[#d8ecfa]" />
        <div className="absolute inset-0">
          <JobCard job={job} stamp={{ like: 1, nope: 0 }} />
        </div>
      </div>
      <div className="mt-[22px]">
        <ActionButtons />
      </div>
      <TabBar active={0} />
    </Screen>
  );
}

export function LetterScreen() {
  const job = JOBS[0];
  return (
    <Screen bg="#ffffff">
      <StatusBar />
      <div className="flex items-center justify-between px-[18px] pb-[12px] pt-[4px]">
        <span className="text-[16px] font-medium" style={{ color: ACCENT_DEEP }}>‹ Tillbaka</span>
        <span className="text-[16px] font-semibold">Personligt brev</span>
        <span className="w-[70px]" />
      </div>
      <div className="mx-[18px] flex items-center gap-[12px] rounded-[16px] bg-[#f3f9fe] p-[12px]">
        <span className="grid h-[42px] w-[42px] place-items-center rounded-[12px] text-[18px] font-bold text-white" style={{ background: job.gradient }}>
          {job.initial}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold">{job.title}</span>
          <span className="block truncate text-[13px]" style={{ color: MUTED }}>{job.city} · {job.area} · {job.extent}</span>
        </span>
      </div>
      <div className="mx-[18px] mt-[16px] flex items-center gap-[8px]">
        <span className="rounded-full px-[10px] py-[5px] text-[12px] font-semibold" style={{ background: "#e1f3fd", color: ACCENT_DEEP }}>
          ✦ Skrivet utifrån ditt CV
        </span>
        <span className="text-[12px]" style={{ color: MUTED }}>Ton: Professionell</span>
      </div>
      <div className="mx-[18px] mt-[14px] space-y-[12px] text-[15px] leading-[1.55]" style={{ color: "#23405d" }}>
        <p>Hej,</p>
        <p>
          Jag tog min juristexamen vid Lunds universitet i våras och har sedan dess tjänstgjort som
          tingsnotarie vid Malmö tingsrätt, med fokus på tvistemål och bolagsrättsliga frågor.
        </p>
        <p>
          Er inriktning mot affärsjuridik och möjligheten att ta eget ansvar tidigt är precis det jag
          söker. Under notarietiden har jag skrivit utkast till domar i kommersiella tvister och vant
          mig vid att arbeta självständigt under tidspress.
        </p>
        <p className="opacity-40">
          Jag skulle gärna berätta mer om hur jag kan bidra till ert team i Västra Hamnen…
        </p>
      </div>
      <div className="absolute inset-x-[18px] bottom-[34px] space-y-[10px]">
        <div className="grid h-[54px] place-items-center rounded-[16px] text-[17px] font-semibold text-white" style={{ background: `linear-gradient(135deg,${ACCENT},${ACCENT_DEEP})` }}>
          Skicka ansökan
        </div>
        <div className="grid h-[50px] place-items-center rounded-[16px] bg-[#f3f9fe] text-[16px] font-semibold" style={{ color: ACCENT_DEEP }}>
          Redigera brevet
        </div>
      </div>
    </Screen>
  );
}

export function MatchScreen() {
  const job = JOBS[3];
  return (
    <Screen bg={`linear-gradient(170deg,#7fd0fb 0%,${ACCENT} 45%,${ACCENT_DEEP} 100%)`}>
      <StatusBar light />
      <div className="flex flex-col items-center px-[28px] pt-[70px] text-center text-white">
        <p className="text-[14px] font-semibold uppercase tracking-[0.2em] text-white/80">Ny intervju</p>
        <h3 className="mt-[6px] text-[46px] font-semibold leading-none tracking-tight">Det är en match</h3>
        <div className="mt-[38px] flex items-center">
          <span className="grid h-[104px] w-[104px] place-items-center rounded-full border-[4px] border-white bg-[#ffd9a8] text-[40px] font-semibold" style={{ color: INK }}>
            LS
          </span>
          <span className="-ml-[18px] grid h-[104px] w-[104px] place-items-center rounded-full border-[4px] border-white text-[40px] font-bold" style={{ background: job.gradient }}>
            {job.initial}
          </span>
        </div>
        <p className="mt-[22px] text-[17px] leading-snug text-white/90">
          {job.employer} vill träffa dig för
          <br />
          <strong className="font-semibold text-white">{job.title}</strong> i {job.city}.
        </p>
        <div className="mt-[26px] w-full rounded-[18px] bg-white/16 p-[16px] text-left backdrop-blur">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/70">Föreslagna tider</p>
          {["Tis 21 okt · 10:00", "Ons 22 okt · 14:30", "Tor 23 okt · 09:00"].map((t, i) => (
            <div key={t} className={`mt-[10px] flex items-center justify-between rounded-[12px] px-[14px] py-[11px] text-[15px] font-medium ${i === 0 ? "bg-white text-[#0b2540]" : "bg-white/12"}`}>
              {t}
              <span className={i === 0 ? "text-[#0b84d8]" : "text-white/60"}>{i === 0 ? "Vald" : "Video"}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-[24px] bottom-[34px]">
        <div className="grid h-[54px] place-items-center rounded-[16px] bg-white text-[17px] font-semibold" style={{ color: ACCENT_DEEP }}>
          Boka intervju
        </div>
      </div>
    </Screen>
  );
}

const STATUS = {
  Intervju: { bg: "#dcf6ea", fg: "#0f8a5b" },
  Läst: { bg: "#e1f3fd", fg: ACCENT_DEEP },
  Skickad: { bg: "#eef2f6", fg: "#51667a" },
} as const;

export function ListScreen() {
  const rows: [Job, keyof typeof STATUS, string][] = [
    [JOBS[3], "Intervju", "Idag"],
    [JOBS[0], "Läst", "Igår"],
    [JOBS[1], "Läst", "12 okt"],
    [JOBS[4], "Skickad", "11 okt"],
    [JOBS[2], "Skickad", "10 okt"],
    [JOBS[5], "Skickad", "9 okt"],
  ];
  return (
    <Screen>
      <StatusBar />
      <div className="px-[20px] pt-[6px]">
        <h3 className="text-[32px] font-semibold tracking-tight">Ansökningar</h3>
        <div className="mt-[14px] grid grid-cols-3 gap-[8px]">
          {[["Skickade", "14"], ["Lästa", "9"], ["Intervjuer", "2"]].map(([l, v]) => (
            <div key={l} className="rounded-[14px] bg-white p-[12px] shadow-[0_1px_3px_rgba(11,37,64,0.08)]">
              <p className="text-[24px] font-semibold leading-none">{v}</p>
              <p className="mt-[4px] text-[12px]" style={{ color: MUTED }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="mt-[18px] space-y-[8px] px-[16px]">
        {rows.map(([j, s, d]) => (
          <li key={j.title} className="flex items-center gap-[12px] rounded-[16px] bg-white p-[12px] shadow-[0_1px_3px_rgba(11,37,64,0.08)]">
            <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[12px] text-[18px] font-bold text-white" style={{ background: j.gradient }}>
              {j.initial}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold">{j.title}</span>
              <span className="block truncate text-[13px]" style={{ color: MUTED }}>
                {j.city} · {j.area} · {d}
              </span>
            </span>
            <span className="shrink-0 rounded-full px-[10px] py-[4px] text-[12px] font-semibold" style={{ background: STATUS[s].bg, color: STATUS[s].fg }}>
              {s}
            </span>
          </li>
        ))}
      </ul>
      <TabBar active={1} />
    </Screen>
  );
}

export function ReportScreen() {
  const rows: [string, string, string][] = [
    ["2026-10-14", "Frontendutvecklare", "Stockholm"],
    ["2026-10-13", "Biträdande jurist", "Malmö"],
    ["2026-10-12", "Controller", "Helsingborg"],
    ["2026-10-11", "Elektriker, service", "Malmö"],
    ["2026-10-10", "Sjuksköterska, akut", "Lund"],
    ["2026-10-09", "Lärare Ma/NO", "Göteborg"],
  ];
  return (
    <Screen bg="#ffffff">
      <StatusBar />
      <div className="px-[20px] pt-[6px]">
        <p className="text-[14px] font-medium" style={{ color: ACCENT_DEEP }}>Oktober 2026</p>
        <h3 className="mt-[2px] text-[30px] font-semibold leading-tight tracking-tight">Aktivitetsrapport</h3>
        <p className="mt-[6px] text-[15px] leading-snug" style={{ color: MUTED }}>
          Alla jobb du sökt den här månaden, sammanställda och redo att föra över.
        </p>
      </div>
      <div className="mx-[16px] mt-[18px] overflow-hidden rounded-[16px] ring-1 ring-[#0b2540]/8">
        <div className="grid grid-cols-[96px_1fr_92px] bg-[#f3f9fe] px-[14px] py-[10px] text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: MUTED }}>
          <span>Datum</span>
          <span>Tjänst</span>
          <span>Ort</span>
        </div>
        {rows.map(([d, t, o]) => (
          <div key={d} className="grid grid-cols-[96px_1fr_92px] border-t border-[#0b2540]/6 px-[14px] py-[11px] text-[13.5px]">
            <span style={{ color: MUTED }}>{d}</span>
            <span className="truncate pr-[6px] font-medium">{t}</span>
            <span className="truncate" style={{ color: MUTED }}>{o}</span>
          </div>
        ))}
      </div>
      <div className="mx-[16px] mt-[14px] flex items-center gap-[10px] rounded-[14px] bg-[#dcf6ea] p-[12px] text-[14px] font-medium text-[#0f8a5b]">
        <span className="grid h-[24px] w-[24px] place-items-center rounded-full bg-[#16b77a] text-[13px] text-white">✓</span>
        14 sökta jobb i oktober
      </div>
      <div className="absolute inset-x-[18px] bottom-[34px]">
        <div className="grid h-[54px] place-items-center rounded-[16px] text-[17px] font-semibold text-white" style={{ background: `linear-gradient(135deg,${ACCENT},${ACCENT_DEEP})` }}>
          Kopiera till rapporten
        </div>
      </div>
    </Screen>
  );
}
