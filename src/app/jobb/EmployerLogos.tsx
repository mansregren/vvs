import { DM_Serif_Display, Manrope, Playfair_Display, Space_Grotesk, Archivo, Fraunces } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "800"], display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["700"], display: "swap" });
const archivo = Archivo({ subsets: ["latin"], weight: ["800"], display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"], display: "swap" });

function Vagbrytaren() {
  return (
    <span className="flex items-center gap-2.5 text-[#0b2540]">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M3 12c3-3 6-3 9 0s6 3 9 0 6-3 8-1" />
        <path d="M3 19c3-3 6-3 9 0s6 3 9 0 6-3 8-1" opacity=".55" />
        <path d="M16 4v24" strokeWidth="2.6" />
      </svg>
      <span className="leading-none">
        <span className={`${playfair.className} block text-[17px] tracking-[0.12em]`}>VÅGBRYTAREN</span>
        <span className="mt-1 block text-[9px] font-semibold tracking-[0.42em] text-[#5b7590]">ADVOKATER</span>
      </span>
    </span>
  );
}

function Kvarnholm() {
  return (
    <span className="flex items-center gap-2 text-[#0a6b6b]">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
        <rect x="2" y="14" width="11" height="11" rx="2" />
        <rect x="15" y="14" width="11" height="11" rx="2" opacity=".7" />
        <rect x="8.5" y="2" width="11" height="11" rx="2" opacity=".45" />
      </svg>
      <span className={`${manrope.className} text-[21px] font-extrabold leading-none tracking-[-0.04em]`}>
        kvarnholm<span className="font-medium text-[#2bb3a3]">pack</span>
      </span>
    </span>
  );
}

function Sundets() {
  return (
    <span className="flex items-center gap-2.5 text-[#1f4fbf]">
      <svg width="30" height="30" viewBox="0 0 30 30">
        <circle cx="15" cy="15" r="14" fill="currentColor" />
        <path d="M12.5 7h5v5.5H23v5h-5.5V23h-5v-5.5H7v-5h5.5z" fill="#fff" />
      </svg>
      <span className="leading-none">
        <span className={`${manrope.className} block text-[18px] font-extrabold tracking-[-0.02em]`}>Sundets</span>
        <span className={`${manrope.className} block text-[13px] font-medium text-[#5b7590]`}>Akutvård</span>
      </span>
    </span>
  );
}

function Fjallpay() {
  return (
    <span className="flex items-center gap-2 text-[#2b2d7a]">
      <svg width="30" height="30" viewBox="0 0 30 30">
        <rect width="30" height="30" rx="9" fill="currentColor" />
        <path d="M5 22 12.5 10l4.5 7 2.5-3.5L25 22z" fill="#fff" />
        <circle cx="21" cy="8.5" r="2" fill="#8f94ff" />
      </svg>
      <span className={`${space.className} text-[23px] font-bold leading-none tracking-[-0.05em]`}>fjällpay</span>
    </span>
  );
}

function Ljusbage() {
  return (
    <span className="flex items-center gap-2 text-[#0b2540]">
      <span className="grid h-[28px] w-[28px] place-items-center rounded-[6px] bg-[#ffcf33]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0b2540">
          <path d="M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.5z" />
        </svg>
      </span>
      <span className={`${archivo.className} text-[20px] font-extrabold uppercase leading-none tracking-[-0.01em]`}>
        Ljusbåge<span className="ml-1 text-[#0b84d8]">El</span>
      </span>
    </span>
  );
}

function Majornas() {
  return (
    <span className="flex items-center gap-2.5 text-[#145a73]">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M15 8c-3-2-7-2.5-11-1.5v16c4-1 8-.5 11 1.5 3-2 7-2.5 11-1.5v-16C22 5.5 18 6 15 8Z" />
        <path d="M15 8v16" />
      </svg>
      <span className="leading-none">
        <span className={`${dmSerif.className} block text-[21px]`}>Majornas</span>
        <span className={`${fraunces.className} block text-[11px] tracking-[0.3em] text-[#3fa1a8]`}>SKOLA</span>
      </span>
    </span>
  );
}

export const EMPLOYERS = [
  { name: "Vågbrytaren Advokater", city: "Malmö", Logo: Vagbrytaren },
  { name: "Kvarnholm Pack", city: "Helsingborg", Logo: Kvarnholm },
  { name: "Sundets Akutvård", city: "Lund", Logo: Sundets },
  { name: "Fjällpay", city: "Stockholm", Logo: Fjallpay },
  { name: "Ljusbåge El", city: "Malmö", Logo: Ljusbage },
  { name: "Majornas Skola", city: "Göteborg", Logo: Majornas },
];

export default function EmployerLogos() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3">
      {EMPLOYERS.map(({ name, city, Logo }) => (
        <div
          key={name}
          title={name}
          className="flex h-[104px] flex-col items-center justify-center gap-2 rounded-2xl bg-white px-3 shadow-[0_1px_3px_rgba(11,37,64,0.06)] sm:h-[120px]"
        >
          <span className="origin-center scale-[0.78] sm:scale-100">
            <Logo />
          </span>
          <span className="text-[12px] text-[#7690a8]">{city}</span>
        </div>
      ))}
    </div>
  );
}
