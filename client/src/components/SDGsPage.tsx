import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const SDGS = [
  {
    number: "08",
    title: "Decent Work & Economic Growth",
    statement:
      "We invest in our 250+ strong workforce through structured training, fair employment practices and career development — contributing to sustainable economic growth across East Africa.",
    color: "#0a1628",
    accent: "#ff8c00",
    bg: "#0a1628",
    textColor: "#ffffff",
    pattern: "circles",
    size: "wide", // 2-column
  },
  {
    number: "09",
    title: "Industry, Innovation & Infrastructure",
    statement:
      "By managing freight through Kenya's ports, airports and border corridors, we strengthen the trade infrastructure that underpins East Africa's industrial growth.",
    color: "#5b3a8e",
    accent: "#c4a8ff",
    bg: "#5b3a8e",
    textColor: "#ffffff",
    pattern: "grid",
    size: "wide", // 2-column
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    statement:
      "Our cross-border corridors connect landlocked nations — Uganda, Rwanda, Burundi, DRC — to global trade, reducing the economic disadvantage of geography.",
    color: "#ff8c00",
    accent: "#fff",
    bg: "#ff8c00",
    textColor: "#0a1628",
    pattern: "lines",
    size: "normal",
  },
  {
    number: "11",
    title: "Sustainable Cities & Communities",
    statement:
      "Efficient last-mile trucking and port logistics reduce congestion and support cleaner, more organised urban supply chains in Mombasa and Nairobi.",
    color: "#0a1628",
    accent: "#5b3a8e",
    bg: "#f0f2f5",
    textColor: "#0a1628",
    pattern: "dots",
    size: "normal",
  },
  {
    number: "13",
    title: "Climate Action",
    statement:
      "GPS route optimisation, fleet maintenance programmes and fuel efficiency protocols in our trucking fleet reduce our carbon footprint on every journey.",
    color: "#1a3a2a",
    accent: "#6db88a",
    bg: "#1a3a2a",
    textColor: "#ffffff",
    pattern: "waves",
    size: "normal",
  },
  {
    number: "17",
    title: "Partnerships for the Goals",
    statement:
      "We collaborate with governments, port authorities, banks and international freight networks across 8 countries — building the partnerships that make sustainable trade possible.",
    color: "#0a1628",
    accent: "#ff8c00",
    bg: "#ffffff",
    textColor: "#0a1628",
    pattern: "hexagons",
    size: "full", // full-width
  },
];

// Decorative SVG patterns per card
function Pattern({ type, accent }: { type: string; accent: string }) {
  if (type === "circles") return (
    <svg viewBox="0 0 300 200" width="100%" height="100%" style={{ display: "block" }}>
      <circle cx="260" cy="-20" r="120" fill="none" stroke={accent} strokeWidth="24" opacity="0.12" />
      <circle cx="260" cy="-20" r="80" fill="none" stroke={accent} strokeWidth="16" opacity="0.09" />
      <circle cx="40" cy="210" r="100" fill="none" stroke={accent} strokeWidth="20" opacity="0.08" />
      <circle cx="260" cy="180" r="50" fill={accent} opacity="0.05" />
    </svg>
  );
  if (type === "grid") return (
    <svg viewBox="0 0 300 200" width="100%" height="100%" style={{ display: "block" }}>
      {[0,1,2,3,4,5].map(col => [0,1,2,3].map(row => (
        <rect key={`${col}-${row}`} x={col*52+10} y={row*52+10} width="36" height="36" rx="6"
          fill={accent} opacity={0.04 + (col+row)*0.008} />
      )))}
    </svg>
  );
  if (type === "lines") return (
    <svg viewBox="0 0 300 200" width="100%" height="100%" style={{ display: "block" }}>
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={i} x1={i*40} y1="0" x2={i*40+100} y2="200"
          stroke={accent} strokeWidth="18" strokeLinecap="round" opacity={0.06 + i*0.01} />
      ))}
    </svg>
  );
  if (type === "dots") return (
    <svg viewBox="0 0 300 200" width="100%" height="100%" style={{ display: "block" }}>
      {[0,1,2,3,4,5,6,7,8].map(col => [0,1,2,3,4].map(row => (
        <circle key={`${col}-${row}`} cx={col*36+18} cy={row*44+22} r="3"
          fill={accent} opacity="0.15" />
      )))}
    </svg>
  );
  if (type === "waves") return (
    <svg viewBox="0 0 300 200" width="100%" height="100%" style={{ display: "block" }}>
      {[0,1,2,3].map(i => (
        <path key={i}
          d={`M -20,${40+i*40} C 60,${20+i*40} 120,${60+i*40} 180,${40+i*40} C 240,${20+i*40} 280,${60+i*40} 320,${40+i*40}`}
          fill="none" stroke={accent} strokeWidth="2" opacity={0.15 - i*0.02} />
      ))}
      <circle cx="240" cy="30" r="60" fill={accent} opacity="0.06" />
      <circle cx="240" cy="30" r="36" fill={accent} opacity="0.06" />
    </svg>
  );
  if (type === "hexagons") return (
    <svg viewBox="0 0 600 160" width="100%" height="100%" style={{ display: "block" }}>
      {[0,1,2,3,4,5,6,7].map(i => {
        const cx = i * 76 + 38;
        const cy = i % 2 === 0 ? 50 : 110;
        return <polygon key={i}
          points={`${cx},${cy-28} ${cx+24},${cy-14} ${cx+24},${cy+14} ${cx},${cy+28} ${cx-24},${cy+14} ${cx-24},${cy-14}`}
          fill="none" stroke={accent} strokeWidth="1.5" opacity="0.12" />;
      })}
    </svg>
  );
  return null;
}

function SDGCard({ sdg, isMobile }: { sdg: typeof SDGS[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: sdg.bg,
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        border: sdg.bg === "#ffffff" ? "1.5px solid rgba(10,22,40,0.08)" : "1.5px solid transparent",
        boxShadow: hovered
          ? "0 24px 56px rgba(10,22,40,0.14)"
          : sdg.bg === "#ffffff" ? "0 4px 20px rgba(10,22,40,0.06)" : "0 4px 20px rgba(10,22,40,0.08)",
        transition: "all .3s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        padding: isMobile ? "28px 24px 24px" : sdg.size === "full" ? "40px 48px" : "32px 28px",
        display: sdg.size === "full" && !isMobile ? "grid" : "flex",
        gridTemplateColumns: sdg.size === "full" && !isMobile ? "1fr 1fr" : undefined,
        flexDirection: sdg.size === "full" && !isMobile ? undefined : "column",
        gap: sdg.size === "full" && !isMobile ? "40px" : "0",
        alignItems: sdg.size === "full" ? "center" : undefined,
        minHeight: isMobile ? "auto" : sdg.size === "full" ? "200px" : "260px",
      }}
    >
      {/* Decorative pattern — absolutely positioned behind content */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: hovered ? 1 : 0.7,
        transition: "opacity .3s",
      }}>
        <Pattern type={sdg.pattern} accent={sdg.accent} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
        {/* SDG number badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: sdg.bg === "#ffffff" ? "rgba(10,22,40,0.06)" : "rgba(255,255,255,0.12)",
          borderRadius: "100px",
          padding: "4px 12px 4px 6px",
          marginBottom: "20px",
        }}>
          <span style={{
            background: sdg.accent,
            color: sdg.bg === "#ff8c00" ? "#0a1628" : sdg.bg === "#ffffff" ? "#0a1628" : "#fff",
            fontSize: "10px",
            fontWeight: 800,
            padding: "2px 9px",
            borderRadius: "100px",
            letterSpacing: "0.5px",
          }}>
            SDG {sdg.number}
          </span>
          <span style={{
            fontSize: "10px",
            fontWeight: 600,
            color: sdg.textColor,
            opacity: 0.55,
            letterSpacing: "0.3px",
          }}>
            UN Goal
          </span>
        </div>

        <h3 style={{
          fontSize: isMobile ? "18px" : sdg.size === "full" ? "clamp(22px,2.5vw,30px)" : "19px",
          fontWeight: 800,
          color: sdg.textColor,
          margin: "0 0 12px",
          letterSpacing: "-0.5px",
          lineHeight: 1.15,
        }}>
          {sdg.title}
        </h3>
      </div>

      {/* Statement — right column on full-width card, below title on others */}
      <p style={{
        position: "relative",
        zIndex: 1,
        fontSize: "13px",
        color: sdg.textColor,
        opacity: 0.72,
        lineHeight: 1.75,
        margin: 0,
        maxWidth: sdg.size === "full" ? "440px" : undefined,
      }}>
        {sdg.statement}
      </p>
    </div>
  );
}

export default function SDGsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pad = isMobile ? "56px 16px" : isTablet ? "64px 40px" : "80px 96px";
  const gap = "14px";

  const [wide1, wide2, ...rest] = SDGS;
  const normals = rest.slice(0, 3);
  const fullWidth = rest[3];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#ffffff" }}>
      <section style={{ padding: pad }}>

        {/* ── Hero headline ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#fff", border: "1.5px solid rgba(10,22,40,0.1)",
            borderRadius: "100px", padding: "5px 16px 5px 7px", marginBottom: "20px",
            boxShadow: "3px 3px 8px rgba(10,22,40,0.07),-2px -2px 6px rgba(255,255,255,1)",
          }}>
            <span style={{ background: "#0a1628", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", letterSpacing: ".6px" }}>
              SDGs
            </span>
            <span style={{ color: "#4a5568", fontSize: "13px", fontWeight: 500 }}>
              Ufanisi Freighters (K) Ltd
            </span>
          </div>

          <h1 style={{
            fontSize: isMobile ? "36px" : isTablet ? "54px" : "clamp(52px,6vw,80px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: isMobile ? "-1.5px" : "-3px",
            margin: "0 0 16px",
          }}>
            <span style={{ color: "rgba(10,22,40,0.22)", display: "block" }}>Logistics with</span>
            <span style={{ color: "#0a1628", display: "block" }}>Purpose.</span>
          </h1>

          <p style={{
            fontSize: isMobile ? "15px" : "17px",
            color: "#6b7280",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.65,
          }}>
            As East Africa's trusted freight partner, we align our operations with the United Nations Sustainable Development Goals — because moving cargo responsibly means more than just speed.
          </p>
        </div>

        {/* ── Bento grid ── */}
        {isMobile ? (
          // Mobile: single column
          <div style={{ display: "flex", flexDirection: "column", gap }}>
            {SDGS.map(sdg => (
              <SDGCard key={sdg.number} sdg={sdg} isMobile={isMobile} />
            ))}
          </div>
        ) : isTablet ? (
          // Tablet: 2-column uniform
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap }}>
            {SDGS.map(sdg => (
              <SDGCard key={sdg.number} sdg={sdg} isMobile={isMobile} />
            ))}
          </div>
        ) : (
          // Desktop: bento
          <div style={{ display: "flex", flexDirection: "column", gap }}>
            {/* Row 1 — 2 wide cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap }}>
              <SDGCard sdg={wide1} isMobile={isMobile} />
              <SDGCard sdg={wide2} isMobile={isMobile} />
            </div>
            {/* Row 2 — 3 equal cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap }}>
              {normals.map(sdg => (
                <SDGCard key={sdg.number} sdg={sdg} isMobile={isMobile} />
              ))}
            </div>
            {/* Row 3 — 1 full-width card */}
            <SDGCard sdg={fullWidth} isMobile={isMobile} />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}