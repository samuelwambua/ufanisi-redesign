import { useState, useEffect } from "react";

const SERVICES = [
  {
    id: "sea-freight",
    title: "Sea Freight",
    subtitle: "Ocean Shipping",
    description:
      "Full authority in customs clearance and delivery of sea cargo worldwide. FCL & LCL, import & export via all major global ports.",
    highlights: [
      { label: "Coverage", value: "Worldwide FCL & LCL" },
      { label: "Ports", value: "Mombasa · Dar · Mtwara" },
    ],
    stat: "30+ Years", statSub: "Ocean expertise",
    href: "#sea-freight",
    bg: "#D6CFC4",
    shapeColor: "#A89880",
    accentColor: "#6B5B45",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <circle cx="340" cy="-10" r="190" fill="none" stroke="#A89880" strokeWidth="36" opacity="0.45" />
        <circle cx="340" cy="-10" r="128" fill="none" stroke="#A89880" strokeWidth="22" opacity="0.3" />
        <circle cx="90" cy="270" r="150" fill="none" stroke="#A89880" strokeWidth="28" opacity="0.25" />
        <rect x="30" y="160" width="110" height="110" rx="55" fill="#A89880" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: "air-freight",
    title: "Air Freight",
    subtitle: "Global Express",
    description:
      "Fast import & export air cargo worldwide. We coordinate with a vast network of airline partners for time-critical shipments.",
    highlights: [
      { label: "Transit", value: "24–72 hr delivery" },
      { label: "Network", value: "Global airline partners" },
    ],
    stat: "72 hrs", statSub: "Avg. transit time",
    href: "#air-freight",
    bg: "#C8D4D8",
    shapeColor: "#8AAAB4",
    accentColor: "#3D606B",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="220" y="-50" width="280" height="280" rx="140" fill="#8AAAB4" opacity="0.18" />
        <rect x="250" y="-20" width="210" height="210" rx="105" fill="#8AAAB4" opacity="0.15" />
        <line x1="0" y1="210" x2="420" y2="70" stroke="#8AAAB4" strokeWidth="32" strokeLinecap="round" opacity="0.28" />
        <line x1="0" y1="250" x2="370" y2="120" stroke="#8AAAB4" strokeWidth="18" strokeLinecap="round" opacity="0.18" />
      </svg>
    ),
  },
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    subtitle: "Sea & Air · AEO",
    description:
      "Swift import & export clearance at all major Kenyan ports and airports. Authorized Economic Operator — priority processing guaranteed.",
    highlights: [
      { label: "Status", value: "EAC AEO Certified" },
      { label: "Ports", value: "All Kenyan entry points" },
    ],
    stat: "AEO", statSub: "Priority clearance",
    href: "#customs-clearance",
    bg: "#D4CED8",
    shapeColor: "#A094AE",
    accentColor: "#5C5070",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="80" y="20" width="160" height="160" rx="14" fill="#A094AE" opacity="0.22" />
        <rect x="130" y="50" width="160" height="160" rx="14" fill="#A094AE" opacity="0.18" />
        <rect x="180" y="80" width="160" height="160" rx="14" fill="#A094AE" opacity="0.15" />
        <circle cx="90" cy="35" r="48" fill="#A094AE" opacity="0.25" />
        <circle cx="90" cy="35" r="28" fill="#A094AE" opacity="0.18" />
      </svg>
    ),
  },
  {
    id: "warehousing",
    title: "Warehousing",
    subtitle: "Free & Bonded",
    description:
      "ISO-certified, secure storage near major ports. Full cargo handling, collateral management, and bonded warehouse facilities.",
    highlights: [
      { label: "Standard", value: "ISO 9001 · ISO 22000" },
      { label: "Location", value: "Mombasa port area" },
    ],
    stat: "ISO", statSub: "9001 · 22000 certified",
    href: "#warehousing",
    bg: "#C9D6C8",
    shapeColor: "#7FA37C",
    accentColor: "#3D6B3A",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="20" y="90" width="380" height="200" rx="10" fill="#7FA37C" opacity="0.18" />
        <polygon points="210,10 400,100 20,100" fill="#7FA37C" opacity="0.26" />
        <rect x="120" y="148" width="70" height="82" rx="5" fill="#7FA37C" opacity="0.32" />
        <rect x="210" y="148" width="70" height="82" rx="5" fill="#7FA37C" opacity="0.25" />
        <rect x="300" y="148" width="50" height="82" rx="5" fill="#7FA37C" opacity="0.18" />
      </svg>
    ),
  },
  {
    id: "cross-border",
    title: "Cross Border",
    subtitle: "East Africa Corridors",
    description:
      "Experienced teams at all major entry and exit points — Malaba, Namanga, Holili and beyond. Zero-delay corridor management.",
    highlights: [
      { label: "Border Points", value: "Malaba · Namanga · Holili" },
      { label: "Region", value: "8 East African countries" },
    ],
    stat: "8", statSub: "Countries covered",
    href: "#cross-border",
    bg: "#D4C9BC",
    shapeColor: "#B5906A",
    accentColor: "#7A5535",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <circle cx="210" cy="130" r="110" fill="none" stroke="#B5906A" strokeWidth="38" opacity="0.24" />
        <circle cx="210" cy="130" r="65" fill="none" stroke="#B5906A" strokeWidth="24" opacity="0.18" />
        <circle cx="210" cy="130" r="28" fill="#B5906A" opacity="0.3" />
        <line x1="0" y1="130" x2="420" y2="130" stroke="#B5906A" strokeWidth="2.5" strokeDasharray="12 8" opacity="0.4" />
        <line x1="210" y1="0" x2="210" y2="260" stroke="#B5906A" strokeWidth="2.5" strokeDasharray="12 8" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "trucking",
    title: "Trucking",
    subtitle: "Door-to-Door",
    description:
      "Own fleet of flatbeds, skeletal trailers, low loaders & canters. GPS-monitored delivery across the full East African road network.",
    highlights: [
      { label: "Fleet", value: "Flatbeds · Low loaders · Canters" },
      { label: "Tracking", value: "GPS-monitored real-time" },
    ],
    stat: "GPS", statSub: "Real-time fleet tracking",
    href: "#trucking",
    bg: "#C9C8BC",
    shapeColor: "#919077",
    accentColor: "#555447",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="-10" y="130" width="300" height="90" rx="10" fill="#919077" opacity="0.22" />
        <rect x="255" y="155" width="150" height="65" rx="10" fill="#919077" opacity="0.18" />
        <polygon points="255,155 320,95 430,95 430,155" fill="#919077" opacity="0.2" />
        <circle cx="70" cy="218" r="36" fill="none" stroke="#919077" strokeWidth="18" opacity="0.38" />
        <circle cx="320" cy="218" r="36" fill="none" stroke="#919077" strokeWidth="18" opacity="0.38" />
      </svg>
    ),
  },
  {
    id: "project-cargo",
    title: "Project Cargo",
    subtitle: "Heavy & Oversized",
    description:
      "Specialised handling for heavy lifts, oversized machinery and out-of-gauge cargo. Full end-to-end project logistics management.",
    highlights: [
      { label: "Specialty", value: "Out-of-gauge & heavy lift" },
      { label: "Scope", value: "End-to-end project mgmt" },
    ],
    stat: "OOG", statSub: "Out-of-gauge specialists",
    href: "#project-cargo",
    bg: "#BFCDD4",
    shapeColor: "#6C93A6",
    accentColor: "#2C5568",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="50" y="50" width="140" height="140" rx="8" fill="#6C93A6" opacity="0.2" />
        <rect x="100" y="20" width="240" height="170" rx="8" fill="#6C93A6" opacity="0.15" />
        <line x1="50" y1="188" x2="340" y2="188" stroke="#6C93A6" strokeWidth="20" strokeLinecap="round" opacity="0.28" />
        <circle cx="100" cy="210" r="24" fill="#6C93A6" opacity="0.35" />
        <circle cx="290" cy="210" r="24" fill="#6C93A6" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "collateral-management",
    title: "Collateral Management",
    subtitle: "Asset Control",
    description:
      "Professional collateral management for commodity-backed financing. Secure monitoring, stock reporting and structured release protocols.",
    highlights: [
      { label: "Service", value: "Stock monitoring & reporting" },
      { label: "Clients", value: "Banks · Financiers · Traders" },
    ],
    stat: "24/7", statSub: "Stock monitoring",
    href: "#collateral-management",
    bg: "#D8C9C6",
    shapeColor: "#B5857A",
    accentColor: "#7A4A40",
    shape: (
      <svg viewBox="0 0 420 260" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="30" y="30" width="110" height="110" rx="8" fill="#B5857A" opacity="0.26" />
        <rect x="155" y="30" width="110" height="110" rx="8" fill="#B5857A" opacity="0.2" />
        <rect x="280" y="30" width="110" height="110" rx="8" fill="#B5857A" opacity="0.15" />
        <rect x="92" y="155" width="110" height="52" rx="8" fill="#B5857A" opacity="0.2" />
        <rect x="217" y="155" width="110" height="52" rx="8" fill="#B5857A" opacity="0.15" />
        <line x1="85" y1="140" x2="147" y2="155" stroke="#B5857A" strokeWidth="2.5" opacity="0.38" />
        <line x1="210" y1="140" x2="147" y2="155" stroke="#B5857A" strokeWidth="2.5" opacity="0.38" />
        <line x1="210" y1="140" x2="272" y2="155" stroke="#B5857A" strokeWidth="2.5" opacity="0.38" />
        <line x1="335" y1="140" x2="272" y2="155" stroke="#B5857A" strokeWidth="2.5" opacity="0.38" />
      </svg>
    ),
  },
];

export default function ServicesHero() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
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

  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  const handleExplore = () => {
    const el = document.getElementById(active.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const pad = isMobile ? "56px 16px 48px" : isTablet ? "64px 40px 52px" : "72px 96px 60px";

  return (
    <section style={{ background: "#ffffff", padding: pad, fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Headline ── */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "36px" : "52px" }}>

        {/* Badge — About page style */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#fff",
          border: "1.5px solid rgba(10,22,40,0.1)",
          borderRadius: "100px",
          padding: "5px 16px 5px 7px",
          marginBottom: "20px",
          boxShadow: "3px 3px 8px rgba(10,22,40,0.07), -2px -2px 6px rgba(255,255,255,1)",
        }}>
          <span style={{
            background: "#0a1628",
            color: "#fff",
            fontSize: "10px",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "100px",
            letterSpacing: ".6px",
          }}>
            OUR SERVICES
          </span>
          <span style={{ color: "#4a5568", fontSize: "13px", fontWeight: 500 }}>
            Ufanisi Freighters (K) Ltd
          </span>
        </div>

        <h1 style={{
          fontSize: isMobile ? "38px" : isTablet ? "58px" : "clamp(56px,6.5vw,88px)",
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: isMobile ? "-1.5px" : "-3px",
          margin: 0,
        }}>
          <span style={{ color: "#0a1628", display: "block" }}>We Move</span>
          <span style={{ color: "#5b3a8e", display: "block" }}>What Matters.</span>
        </h1>

        <p style={{
          fontSize: "16px",
          color: "#6b7280",
          maxWidth: "420px",
          margin: "16px auto 0",
          lineHeight: 1.65,
        }}>
          By sea, air, road or across borders.
        </p>
      </div>

      {/* ── Tabs ── */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", marginBottom: "24px" }}>
        <div style={{
          display: "flex",
          borderBottom: "1.5px solid rgba(10,22,40,0.10)",
          minWidth: "max-content",
          margin: "0 auto",
          justifyContent: isMobile ? "flex-start" : "center",
        }}>
          {SERVICES.map((s) => {
            const isAct = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: isAct ? "2.5px solid #ff8c00" : "2.5px solid transparent",
                  padding: isMobile ? "10px 16px" : "12px 22px",
                  fontSize: isMobile ? "13px" : "14px",
                  fontWeight: isAct ? 700 : 500,
                  color: isAct ? "#0a1628" : "#6b7280",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "inherit",
                  marginBottom: "-1.5px",
                  transition: "color .2s, border-color .2s",
                }}
                onMouseEnter={(e) => { if (!isAct) e.currentTarget.style.color = "#0a1628"; }}
                onMouseLeave={(e) => { if (!isAct) e.currentTarget.style.color = "#6b7280"; }}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Preview panel ── */}
      <div style={{
        background: active.bg,
        borderRadius: "24px",
        border: "1.5px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        transition: "background .35s ease",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1.4fr 1fr",
        minHeight: isMobile ? "auto" : "260px",
      }}>

        {/* Left — title + highlights */}
        <div style={{
          padding: isMobile ? "28px 24px 0" : isTablet ? "36px 28px" : "44px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}>
          <div>
            <div style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.7px",
              textTransform: "uppercase" as const,
              color: active.accentColor,
              marginBottom: "6px",
              opacity: 0.85,
            }}>
              {active.subtitle}
            </div>
            <h2 style={{
              fontSize: isMobile ? "22px" : "24px",
              fontWeight: 800,
              color: "#0a1628",
              margin: 0,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}>
              {active.title}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {active.highlights.map((h) => (
              <div key={h.label}>
                <div style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: active.accentColor,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.6px",
                  marginBottom: "2px",
                  opacity: 0.7,
                }}>
                  {h.label}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0a1628", lineHeight: 1.4 }}>
                  {h.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centre — abstract SVG shape (desktop + tablet) */}
        {!isMobile && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            overflow: "hidden",
          }}>
            <div style={{ width: "100%", maxWidth: "420px" }}>
              {active.shape}
            </div>
          </div>
        )}

        {/* Right — stat chip + description + CTA */}
        <div style={{
          padding: isMobile ? "20px 24px 28px" : isTablet ? "36px 28px" : "44px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "20px",
        }}>
          {/* Stat chip */}
          <div style={{
            display: "inline-flex",
            alignItems: "flex-start",
            gap: "10px",
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "14px",
            padding: "12px 16px",
            backdropFilter: "blur(8px)",
            alignSelf: "flex-start",
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: active.accentColor,
              marginTop: "4px",
              flexShrink: 0,
            }} />
            <div>
              <div style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#0a1628",
                letterSpacing: "-0.5px",
                lineHeight: 1,
                marginBottom: "3px",
              }}>
                {active.stat}
              </div>
              <div style={{ fontSize: "11px", color: "#6b7280", fontWeight: 500 }}>
                {active.statSub}
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: "13px", color: "#4a5263", lineHeight: 1.7, margin: 0, flex: 1 }}>
            {active.description}
          </p>

          {/* CTA */}
          <button
            onClick={handleExplore}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#0a1628",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              alignSelf: "flex-start",
              transition: "all .2s",
              boxShadow: "0 4px 14px rgba(10,22,40,0.18)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(10,22,40,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(10,22,40,0.18)";
            }}
          >
            Explore Service
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}