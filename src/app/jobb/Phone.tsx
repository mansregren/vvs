// iPhone-ram. Skärminnehållet ritas i 390×844 (iPhone-punkter) och skalas till `width`.
export const SCREEN_W = 390;
export const SCREEN_H = 844;

export default function Phone({
  width,
  children,
  className = "",
}: {
  width: number;
  children: React.ReactNode;
  className?: string;
}) {
  const rim = Math.round(width * 0.012);
  const bezel = Math.round(width * 0.03);
  const screenW = width - 2 * (rim + bezel);
  const scale = screenW / SCREEN_W;
  const screenH = Math.round(SCREEN_H * scale);
  const outerR = Math.round(width * 0.165);
  const innerR = Math.round(width * 0.135);

  return (
    <div className={`relative ${className}`} style={{ width }}>
      {/* sidoknappar */}
      <span className="absolute rounded-l-sm bg-[#9aa1aa]" style={{ left: -2, top: width * 0.42, width: 3, height: width * 0.12 }} />
      <span className="absolute rounded-l-sm bg-[#9aa1aa]" style={{ left: -2, top: width * 0.58, width: 3, height: width * 0.12 }} />
      <span className="absolute rounded-l-sm bg-[#9aa1aa]" style={{ left: -2, top: width * 0.3, width: 3, height: width * 0.06 }} />
      <span className="absolute rounded-r-sm bg-[#9aa1aa]" style={{ right: -2, top: width * 0.48, width: 3, height: width * 0.2 }} />
      <div
        className="relative shadow-[0_40px_80px_-30px_rgba(11,37,64,0.55)]"
        style={{
          padding: rim,
          borderRadius: outerR,
          background: "linear-gradient(145deg,#e9ecef 0%,#a5acb4 30%,#eef0f2 55%,#8d949c 100%)",
        }}
      >
        <div className="bg-[#0b0b0c]" style={{ padding: bezel, borderRadius: outerR - rim }}>
          <div
            className="relative overflow-hidden bg-white"
            style={{ width: screenW, height: screenH, borderRadius: innerR }}
          >
            <div
              className="absolute left-0 top-0 origin-top-left"
              style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
            >
              {children}
              {/* Dynamic Island */}
              <div className="pointer-events-none absolute left-1/2 top-[11px] h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black" />
              {/* hemindikator */}
              <div className="pointer-events-none absolute bottom-[8px] left-1/2 h-[5px] w-[139px] -translate-x-1/2 rounded-full bg-[#0b2540]/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
