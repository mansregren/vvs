// App-skärmar för mockupen. Allt ritas i 390×844 iPhone-punkter (se Phone.tsx).

export const INK = "#0b2540";
export const MUTED = "#5b7590";
export const ACCENT = "#2aa8f2";
export const ACCENT_DEEP = "#0b84d8";
export const APP_BG = "#f3f9fe";
// Swajp-vyn: loggblå bakgrund med nästan vita, ljusblå kort.
export const SWIPE_BG = "#2aa8f2";
export const CARD_BG = "#f5fbff";

export type LogoKind = "wave" | "boxes" | "cross" | "peak" | "bolt" | "book";

export const USER_IMG = "/jobb/women-65.jpg";

// Varumärkesmärken – samma symboler som ordlogotyperna i EmployerLogos.tsx.
const BRAND: Record<LogoKind, { bg: string; mark: React.ReactNode }> = {
  wave: {
    bg: "#ffffff",
    mark: (
      <svg viewBox="0 0 32 32" fill="none" stroke="#0b2540" strokeWidth="2.4" strokeLinecap="round">
        <path d="M3 12c3-3 6-3 9 0s6 3 9 0 6-3 8-1" />
        <path d="M3 19c3-3 6-3 9 0s6 3 9 0 6-3 8-1" opacity=".55" />
        <path d="M16 4v24" strokeWidth="2.8" />
      </svg>
    ),
  },
  boxes: {
    bg: "#ffffff",
    mark: (
      <svg viewBox="0 0 28 28" fill="#0a6b6b">
        <rect x="2" y="14" width="11" height="11" rx="2" />
        <rect x="15" y="14" width="11" height="11" rx="2" opacity=".7" />
        <rect x="8.5" y="2" width="11" height="11" rx="2" opacity=".45" />
      </svg>
    ),
  },
  cross: {
    bg: "#ffffff",
    mark: (
      <svg viewBox="0 0 30 30">
        <circle cx="15" cy="15" r="14" fill="#1f4fbf" />
        <path d="M12.5 7h5v5.5H23v5h-5.5V23h-5v-5.5H7v-5h5.5z" fill="#fff" />
      </svg>
    ),
  },
  peak: {
    bg: "#0b2540",
    mark: (
      <svg viewBox="0 0 30 30">
        <path d="M3 24 12 10l5 8 3-4 7 10z" fill="#fff" />
        <circle cx="22" cy="7.5" r="2.4" fill="#2aa8f2" />
      </svg>
    ),
  },
  bolt: {
    bg: "#ffcf33",
    mark: (
      <svg viewBox="0 0 24 24" fill="#0b2540">
        <path d="M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.5z" />
      </svg>
    ),
  },
  book: {
    bg: "#ffffff",
    mark: (
      <svg viewBox="0 0 30 30" fill="none" stroke="#145a73" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M15 8c-3-2-7-2.5-11-1.5v16c4-1 8-.5 11 1.5 3-2 7-2.5 11-1.5v-16C22 5.5 18 6 15 8Z" />
        <path d="M15 8v16" />
      </svg>
    ),
  },
};

export function CompanyLogo({ job, size = 52, radius = 14 }: { job: Job; size?: number; radius?: number }) {
  const b = BRAND[job.logo];
  return (
    <span
      className="grid shrink-0 place-items-center shadow-[inset_0_0_0_1px_rgba(11,37,64,0.08)]"
      style={{ width: size, height: size, borderRadius: radius, background: b.bg }}
    >
      <span className="block" style={{ width: size * 0.6, height: size * 0.6 }}>
        {b.mark}
      </span>
    </span>
  );
}

export function Avatar({ src, size, ring = 0, className = "" }: { src: string; size: number; ring?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size, boxShadow: ring ? `0 0 0 ${ring}px #fff` : undefined }}
    />
  );
}

export type Job = {
  field: string;
  title: string;
  employer: string;
  initial: string;
  company: string;
  logo: LogoKind;
  recruiter: { name: string; role: string; img: string };
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
  cover: string;
};

export const JOBS: Job[] = [
  {
    field: "Juridik",
    title: "Biträdande jurist",
    employer: "Advokatbyrå inom affärsjuridik",
    initial: "A",
    cover: "/jobb/cover/juridik.jpg",
    company: "Vågbrytaren Advokater",
    logo: "wave",
    recruiter: { name: "Sara Lind", role: "Rekryterare", img: "/jobb/women-44.jpg" },
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
    cover: "/jobb/cover/lager.jpg",
    company: "Kvarnholm Pack",
    logo: "boxes",
    recruiter: { name: "Erik Holm", role: "HR-chef", img: "/jobb/men-32.jpg" },
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
    cover: "/jobb/cover/vard.jpg",
    company: "Sundets Akutvård",
    logo: "cross",
    recruiter: { name: "Mei Andersson", role: "Vårdenhetschef", img: "/jobb/women-12.jpg" },
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
    cover: "/jobb/cover/tech.jpg",
    company: "Fjällpay",
    logo: "peak",
    recruiter: { name: "Anton Berg", role: "Engineering Manager", img: "/jobb/men-46.jpg" },
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
    gradient: "linear-gradient(135deg,#0b3d66 0%,#2aa8f2 100%)",
  },
  {
    field: "El",
    title: "Elektriker, service & installation",
    employer: "Installationsfirma, 35 anställda",
    initial: "E",
    cover: "/jobb/cover/el.jpg",
    company: "Ljusbåge El",
    logo: "bolt",
    recruiter: { name: "Omar Haddad", role: "Servicechef", img: "/jobb/men-11.jpg" },
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
    cover: "/jobb/cover/skola.jpg",
    company: "Majornas Skola",
    logo: "book",
    recruiter: { name: "Emma Nyström", role: "Rektor", img: "/jobb/women-68.jpg" },
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

export function Logo({ size = 22, light = false }: { size?: number; light?: boolean }) {
  return (
    <span className="font-extrabold leading-none tracking-[-0.045em]" style={{ fontSize: size + 2, color: light ? "#ffffff" : INK }}>
      Work <span style={{ color: light ? INK : ACCENT }}>Crush</span>
    </span>
  );
}

function IconBtn({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`grid h-[38px] w-[38px] place-items-center rounded-full ${light ? "bg-white/20 text-white" : "bg-white shadow-[0_1px_3px_rgba(11,37,64,0.12)]"}`}
      style={light ? undefined : { color: INK }}
    >
      {children}
    </span>
  );
}

export function AppHeader({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center justify-between px-[18px] pb-[10px] pt-[4px]">
      <Avatar src={USER_IMG} size={38} ring={2} className="shadow-[0_1px_4px_rgba(11,37,64,0.25)]" />
      <Logo light={light} />
      <IconBtn light={light}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5a5.5 5.5 0 0 0-5.5 5.5v3.6c0 .9-.3 1.8-.9 2.5L4.5 16.6h15l-1.1-1.5a4.2 4.2 0 0 1-.9-2.5V9A5.5 5.5 0 0 0 12 3.5ZM9.8 19.5a2.4 2.4 0 0 0 4.4 0" /></svg>
      </IconBtn>
    </div>
  );
}

// Ikoner i SF Symbols-stil: outline när inaktiv, fylld när aktiv.
function TabIcon({ name, filled }: { name: string; filled: boolean }) {
  const common = { width: 27, height: 27, viewBox: "0 0 28 28", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const sw = 1.7;
  switch (name) {
    case "Swajpa":
      return filled ? (
        <svg {...common}>
          <path d="M10.5 8V6.6A2.1 2.1 0 0 1 12.6 4.5h2.8a2.1 2.1 0 0 1 2.1 2.1V8" fill="none" stroke="currentColor" strokeWidth={sw + 0.3} />
          <rect x="3.5" y="8" width="21" height="15.5" rx="4" fill="currentColor" />
          <path d="M3.5 14.5h21" stroke="#fff" strokeWidth="1.4" />
          <rect x="12" y="13" width="4" height="3" rx="1" fill="#fff" />
        </svg>
      ) : (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={sw}>
          <path d="M10.5 8V6.6A2.1 2.1 0 0 1 12.6 4.5h2.8a2.1 2.1 0 0 1 2.1 2.1V8" />
          <rect x="3.5" y="8" width="21" height="15.5" rx="4" />
          <path d="M3.5 14.5h21" />
        </svg>
      );
    case "Ansökningar":
      return filled ? (
        <svg {...common}>
          <rect x="6" y="3.5" width="16" height="21" rx="3.5" fill="currentColor" />
          <path d="M10 10h8M10 14h8M10 18h5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={sw}>
          <rect x="6" y="3.5" width="16" height="21" rx="3.5" />
          <path d="M10 10h8M10 14h8M10 18h5" />
        </svg>
      );
    case "Meddelanden":
      return (
        <svg {...common} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={sw}>
          <path d="M14 4.5c5.8 0 10.5 3.7 10.5 8.3S19.8 21 14 21c-1.2 0-2.3-.15-3.4-.43L5.5 23l1.3-3.9C4.7 17.6 3.5 15.3 3.5 12.8 3.5 8.2 8.2 4.5 14 4.5Z" />
        </svg>
      );
    default:
      return filled ? (
        <svg {...common}>
          <circle cx="14" cy="14" r="10.5" fill="currentColor" />
          <circle cx="14" cy="11.3" r="3.6" fill="#fff" />
          <path d="M7.3 21.2c1.5-2.6 3.9-3.9 6.7-3.9s5.2 1.3 6.7 3.9" fill="#fff" />
        </svg>
      ) : (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={sw}>
          <circle cx="14" cy="14" r="10.5" />
          <circle cx="14" cy="11.3" r="3.6" />
          <path d="M7.3 21.2c1.5-2.6 3.9-3.9 6.7-3.9s5.2 1.3 6.7 3.9" />
        </svg>
      );
  }
}

export function TabBar({ active }: { active: number }) {
  const tabs = ["Swajpa", "Ansökningar", "Meddelanden", "Profil"];
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-[83px] justify-around border-t-[0.5px] border-black/15 bg-[#f9f9f9]/90 pt-[7px] backdrop-blur-xl">
      {tabs.map((t, i) => (
        <span key={t} className="flex w-[80px] flex-col items-center gap-[2px]" style={{ color: i === active ? ACCENT_DEEP : "#999999" }}>
          <TabIcon name={t} filled={i === active} />
          <span className="text-[10px] font-medium tracking-[0.01em]">{t}</span>
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
    <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] shadow-[0_22px_44px_-18px_rgba(11,37,64,0.55)]" style={{ background: CARD_BG }}>
      <div
        className="relative bg-cover bg-center px-[18px] pb-[14px] pt-[14px] text-white"
        style={{ backgroundImage: `linear-gradient(180deg,rgba(11,37,64,0.15) 0%,rgba(11,37,64,0.35) 40%,rgba(11,37,64,0.88) 100%),url(${job.cover})` }}
      >
        <div className="flex items-start justify-between">
          <span className="rounded-[16px] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]">
            <CompanyLogo job={job} size={50} radius={14} />
          </span>
          <span className="rounded-full bg-black/35 px-[10px] py-[5px] text-[12px] font-semibold backdrop-blur">
            {job.match} % match
          </span>
        </div>
        <p className="mt-[38px] text-[16px] font-semibold leading-tight">{job.company}</p>
        <p className="mt-[1px] text-[13px] font-medium text-white/75">{job.employer}</p>
        <p className="mt-[4px] flex items-center gap-[5px] text-[13px] font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
          {job.city} · {job.area}
          <span className="font-normal text-white/70">· {job.distance}</span>
        </p>
      </div>

      <div className="flex flex-1 flex-col px-[18px] pt-[12px]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: ACCENT_DEEP }}>
          {job.field}
        </p>
        <h3 className="mt-[2px] text-[22px] font-semibold leading-[1.15] tracking-tight" style={{ color: INK }}>
          {job.title}
        </h3>

        <div className="mt-[10px] grid grid-cols-2 gap-x-[12px] gap-y-[8px] rounded-[14px] bg-[#e4f2fd] px-[12px] py-[10px]">
          <div className="col-span-2">
            <Meta label="Lön" value={job.salary} />
          </div>
          <Meta label="Omfattning" value={job.extent} />
          <Meta label="Anställning" value={job.form} />
          <Meta label="Tillträde" value={job.start} />
          <Meta label="Arbetsplats" value={job.place} />
        </div>

        <p className="mt-[10px] text-[11px] font-medium uppercase tracking-[0.06em]" style={{ color: MUTED }}>
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

        <div className="mt-auto flex items-center justify-between border-t border-[#0b2540]/8 py-[10px] text-[12.5px]" style={{ color: MUTED }}>
          <span className="flex items-center gap-[8px]">
            <Avatar src={job.recruiter.img} size={28} />
            <span className="leading-tight">
              <span className="block font-semibold" style={{ color: INK }}>{job.recruiter.name}</span>
              <span className="block text-[11.5px]">{job.recruiter.role}</span>
            </span>
          </span>
          <span className="font-semibold" style={{ color: INK }}>
            Sista dag: {job.deadline}
          </span>
        </div>
      </div>

      {stamp && (
        <>
          <span
            className="absolute left-[86px] top-[22px] -rotate-12 rounded-[10px] border-[3px] border-[#1e9be6] bg-white/90 px-[12px] py-[2px] text-[26px] font-extrabold tracking-wide text-[#1e9be6]"
            style={{ opacity: stamp.like }}
          >
            SÖK
          </span>
          <span
            className="absolute right-[22px] top-[50px] rotate-12 rounded-[10px] border-[3px] border-[#ef4b5f] bg-white/90 px-[12px] py-[2px] text-[26px] font-extrabold tracking-wide text-[#ef4b5f]"
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
      <button type="button" aria-label="Spara" onClick={onSave} className={`${base} h-[48px] w-[48px]`} style={{ color: INK }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12v18l-6-4-6 4z" /></svg>
      </button>
      <button type="button" aria-label="Sök jobbet" onClick={onLike} className={`${base} h-[62px] w-[62px] text-[#1e9be6]`}>
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
    <Screen bg={SWIPE_BG}>
      <StatusBar light />
      <AppHeader light />
      <div className="relative mx-[16px] h-[560px]">
        <div className="absolute inset-x-[14px] top-[12px] bottom-[-10px] rounded-[26px] bg-white/35" />
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
        <CompanyLogo job={job} size={42} radius={12} />
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold">{job.title}</span>
          <span className="block truncate text-[13px]" style={{ color: MUTED }}>{job.company} · {job.city}</span>
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
      <div className="flex flex-col items-center px-[28px] pt-[56px] text-center text-white">
        <p className="text-[14px] font-semibold uppercase tracking-[0.2em] text-white/80">Ny intervju</p>
        <h3 className="mt-[6px] text-[46px] font-semibold leading-none tracking-tight">Det är en match</h3>
        <div className="mt-[38px] flex items-center">
          <span className="-rotate-6">
            <Avatar src={USER_IMG} size={108} ring={4} />
          </span>
          <span className="relative -ml-[20px] rotate-6">
            <Avatar src={job.recruiter.img} size={108} ring={4} />
            <span className="absolute -bottom-[4px] -right-[4px] rounded-[14px] bg-white p-[3px]">
              <CompanyLogo job={job} size={36} radius={11} />
            </span>
          </span>
        </div>
        <p className="mt-[22px] text-[17px] leading-snug text-white/90">
          {job.recruiter.name} på {job.company} vill träffa dig för
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
            <CompanyLogo job={j} size={44} radius={12} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold">{j.title}</span>
              <span className="block truncate text-[13px]" style={{ color: MUTED }}>
                {j.company} · {j.city} · {d}
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

export function MessagesScreen() {
  const chats: [Job, string, string, boolean][] = [
    [JOBS[3], "Hej Linn! Tisdag 10:00 funkar fint. Vi ses på kontoret.", "09:12", true],
    [JOBS[0], "Tack för ditt brev, vi återkommer i veckan.", "Igår", true],
    [JOBS[1], "Kan du skicka med betyg från civilekonomen?", "Igår", false],
    [JOBS[4], "Välkommen på en provdag i Hyllie!", "Mån", false],
    [JOBS[2], "Vi har tagit emot din ansökan.", "Sön", false],
  ];
  return (
    <Screen>
      <StatusBar />
      <div className="px-[20px] pt-[6px]">
        <h3 className="text-[32px] font-semibold tracking-tight">Meddelanden</h3>
        <p className="mt-[2px] text-[14px]" style={{ color: MUTED }}>Prata direkt med rekryteraren</p>
      </div>
      <div className="mt-[16px] flex gap-[14px] overflow-hidden px-[20px] pt-[4px]">
        {JOBS.slice(0, 5).map((j) => (
          <span key={j.title} className="flex w-[60px] shrink-0 flex-col items-center gap-[6px]">
            <span className="rounded-full p-[2px]" style={{ background: `linear-gradient(135deg,${ACCENT},${ACCENT_DEEP})` }}>
              <Avatar src={j.recruiter.img} size={54} ring={2} />
            </span>
            <span className="w-full truncate text-center text-[11.5px] font-medium">{j.recruiter.name.split(" ")[0]}</span>
          </span>
        ))}
      </div>
      <ul className="mt-[14px] space-y-[2px] px-[12px]">
        {chats.map(([j, msg, t, unread]) => (
          <li key={j.title} className="flex items-center gap-[12px] rounded-[16px] px-[8px] py-[10px]">
            <span className="relative shrink-0">
              <Avatar src={j.recruiter.img} size={52} />
              <span className="absolute -bottom-[3px] -right-[3px] rounded-[9px] bg-white p-[2px]">
                <CompanyLogo job={j} size={22} radius={7} />
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-[8px]">
                <span className="truncate text-[15px] font-semibold">{j.recruiter.name}</span>
                <span className="shrink-0 text-[12px]" style={{ color: MUTED }}>{t}</span>
              </span>
              <span className="block truncate text-[12.5px] font-medium" style={{ color: ACCENT_DEEP }}>{j.company}</span>
              <span className={`block truncate text-[13.5px] ${unread ? "font-semibold" : ""}`} style={{ color: unread ? INK : MUTED }}>{msg}</span>
            </span>
            {unread && <span className="h-[10px] w-[10px] shrink-0 rounded-full" style={{ background: ACCENT }} />}
          </li>
        ))}
      </ul>
      <TabBar active={2} />
    </Screen>
  );
}
