import { useState, useEffect } from "react";

const SERVICES = [
  {
    id: "sea-freight",
    title: "Sea Freight",
    subtitle: "Ocean Shipping",
    description:
      "Full authority in customs clearance and delivery of sea cargo worldwide. FCL & LCL, import & export via major global ports.",
    href: "/service?r=sea-freight-management",
    bg: "#D6CFC4",
    shapeColor: "#A89880",
    accentColor: "#6B5B45",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <circle cx="260" cy="-20" r="140" fill="none" stroke="#A89880" strokeWidth="28" opacity="0.5" />
        <circle cx="260" cy="-20" r="95" fill="none" stroke="#A89880" strokeWidth="18" opacity="0.35" />
        <circle cx="80" cy="190" r="110" fill="none" stroke="#A89880" strokeWidth="22" opacity="0.3" />
        <rect x="30" y="110" width="90" height="90" rx="45" fill="#A89880" opacity="0.25" />
      </svg>
    ),
  },
  {
    id: "air-freight",
    title: "Air Freight",
    subtitle: "Global Express",
    description:
      "Fast import & export air cargo worldwide. We coordinate with a vast network of airline partners for time-critical shipments.",
    href: "/service?r=air-freight-management",
    bg: "#C8D4D8",
    shapeColor: "#8AAAB4",
    accentColor: "#3D606B",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="160" y="-40" width="220" height="220" rx="110" fill="#8AAAB4" opacity="0.22" />
        <rect x="180" y="-20" width="160" height="160" rx="80" fill="#8AAAB4" opacity="0.2" />
        <line x1="0" y1="155" x2="320" y2="55" stroke="#8AAAB4" strokeWidth="26" strokeLinecap="round" opacity="0.3" />
        <line x1="0" y1="180" x2="280" y2="90" stroke="#8AAAB4" strokeWidth="14" strokeLinecap="round" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    subtitle: "Sea & Air · AEO",
    description:
      "Swift import & export clearance at all major Kenyan ports and airports. Authorized Economic Operator — priority processing.",
    href: "/service?r=sea-and-air-customs-clearance",
    bg: "#D4CED8",
    shapeColor: "#A094AE",
    accentColor: "#5C5070",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="60" y="20" width="120" height="120" rx="12" fill="#A094AE" opacity="0.25" />
        <rect x="100" y="40" width="120" height="120" rx="12" fill="#A094AE" opacity="0.2" />
        <rect x="140" y="60" width="120" height="120" rx="12" fill="#A094AE" opacity="0.18" />
        <circle cx="70" cy="30" r="36" fill="#A094AE" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: "warehousing",
    title: "Warehousing",
    subtitle: "Free & Bonded",
    description:
      "ISO-certified, secure storage near major ports. Full cargo handling, collateral management, and bonded warehouse facilities.",
    href: "/service?r=free-and-customs-bonded-warehousing",
    bg: "#C9D6C8",
    shapeColor: "#7FA37C",
    accentColor: "#3D6B3A",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="20" y="60" width="280" height="160" rx="8" fill="#7FA37C" opacity="0.2" />
        <polygon points="160,10 310,75 10,75" fill="#7FA37C" opacity="0.28" />
        <rect x="100" y="100" width="50" height="60" rx="4" fill="#7FA37C" opacity="0.35" />
        <rect x="170" y="100" width="50" height="60" rx="4" fill="#7FA37C" opacity="0.28" />
      </svg>
    ),
  },
  {
    id: "cross-border",
    title: "Cross Border",
    subtitle: "East Africa Corridors",
    description:
      "Experienced teams at all major entry and exit points across East Africa — Malaba, Namanga, Holili and beyond.",
    href: "/service?r=cross-border-clearance",
    bg: "#D4C9BC",
    shapeColor: "#B5906A",
    accentColor: "#7A5535",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <circle cx="160" cy="90" r="80" fill="none" stroke="#B5906A" strokeWidth="30" opacity="0.28" />
        <circle cx="160" cy="90" r="45" fill="none" stroke="#B5906A" strokeWidth="18" opacity="0.22" />
        <line x1="0" y1="90" x2="320" y2="90" stroke="#B5906A" strokeWidth="2.5" strokeDasharray="10 8" opacity="0.45" />
        <line x1="160" y1="0" x2="160" y2="180" stroke="#B5906A" strokeWidth="2.5" strokeDasharray="10 8" opacity="0.45" />
        <circle cx="160" cy="90" r="10" fill="#B5906A" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "trucking",
    title: "Trucking",
    subtitle: "Door-to-Door",
    description:
      "Own fleet of flatbeds, skeletal, low loaders & canters. GPS-monitored delivery across the full East African road network.",
    href: "/service?r=transport-tracking",
    bg: "#C9C8BC",
    shapeColor: "#919077",
    accentColor: "#555447",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="-10" y="95" width="230" height="70" rx="8" fill="#919077" opacity="0.25" />
        <rect x="190" y="115" width="110" height="50" rx="8" fill="#919077" opacity="0.2" />
        <polygon points="190,115 240,75 330,75 330,115" fill="#919077" opacity="0.22" />
        <circle cx="60" cy="160" r="28" fill="none" stroke="#919077" strokeWidth="14" opacity="0.4" />
        <circle cx="255" cy="160" r="28" fill="none" stroke="#919077" strokeWidth="14" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "project-cargo",
    title: "Project Cargo",
    subtitle: "Heavy & Oversized",
    description:
      "Specialised handling for heavy lifts, oversized machinery and out-of-gauge cargo. End-to-end project logistics management.",
    href: "/service?r=project-cargo",
    bg: "#BFCDD4",
    shapeColor: "#6C93A6",
    accentColor: "#2C5568",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="40" y="40" width="100" height="100" rx="6" fill="#6C93A6" opacity="0.22" />
        <rect x="80" y="20" width="180" height="130" rx="6" fill="#6C93A6" opacity="0.18" />
        <line x1="40" y1="140" x2="260" y2="140" stroke="#6C93A6" strokeWidth="16" strokeLinecap="round" opacity="0.3" />
        <circle cx="80" cy="155" r="18" fill="#6C93A6" opacity="0.38" />
        <circle cx="230" cy="155" r="18" fill="#6C93A6" opacity="0.38" />
      </svg>
    ),
  },
  {
    id: "collateral-management",
    title: "Collateral Management",
    subtitle: "Asset Control",
    description:
      "Professional collateral management for commodity-backed financing. Secure monitoring, stock reporting and release protocols.",
    href: "/service?r=collateral-management",
    bg: "#D8C9C6",
    shapeColor: "#B5857A",
    accentColor: "#7A4A40",
    shape: (
      <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: "block" }}>
        <rect x="30" y="30" width="80" height="80" rx="6" fill="#B5857A" opacity="0.28" />
        <rect x="125" y="30" width="80" height="80" rx="6" fill="#B5857A" opacity="0.22" />
        <rect x="220" y="30" width="80" height="80" rx="6" fill="#B5857A" opacity="0.18" />
        <rect x="77" y="125" width="80" height="40" rx="6" fill="#B5857A" opacity="0.22" />
        <rect x="172" y="125" width="80" height="40" rx="6" fill="#B5857A" opacity="0.18" />
        <line x1="70" y1="110" x2="117" y2="125" stroke="#B5857A" strokeWidth="2.5" opacity="0.4" />
        <line x1="165" y1="110" x2="117" y2="125" stroke="#B5857A" strokeWidth="2.5" opacity="0.4" />
        <line x1="165" y1="110" x2="212" y2="125" stroke="#B5857A" strokeWidth="2.5" opacity="0.4" />
        <line x1="260" y1="110" x2="212" y2="125" stroke="#B5857A" strokeWidth="2.5" opacity="0.4" />
      </svg>
    ),
  },
];

const ROW1 = SERVICES.slice(0, 3);
const ROW2 = SERVICES.slice(3, 5);
const ROW3 = SERVICES.slice(5, 8);

type CardProps = { service: (typeof SERVICES)[0] };

function ServiceCard({ service }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      id={service.id}
      href={service.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none",
        display: "block",
        borderRadius: "20px",
        overflow: "hidden",
        background: service.bg,
        border: `1.5px solid ${hovered ? service.shapeColor : "rgba(0,0,0,0.06)"}`,
        transition: "all .28s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "pointer",
      }}
    >
      <div style={{ height: "168px", overflow: "hidden", position: "relative", background: service.bg }}>
        {service.shape}
        <div style={{ position: "absolute", top: "14px", right: "14px", width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={service.accentColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div style={{ padding: "20px 22px 24px", background: service.bg }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: service.accentColor, marginBottom: "5px", opacity: 0.85, fontFamily: "'DM Sans', sans-serif" }}>
          {service.subtitle}
        </div>
        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0a1628", margin: "0 0 8px", letterSpacing: "-0.4px", lineHeight: 1.2, fontFamily: "'DM Sans', sans-serif" }}>
          {service.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#4a5263", lineHeight: 1.65, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
          {service.description}
        </p>
      </div>
    </a>
  );
}

export default function ServicesGrid() {
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

  return (
    <section style={{ background: "#ffffff", padding: pad, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: isMobile ? "36px" : "52px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(10,22,40,0.06)", border: "1px solid rgba(10,22,40,0.10)", borderRadius: "100px", padding: "5px 14px", marginBottom: "16px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff8c00" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#0a1628", letterSpacing: "0.8px", textTransform: "uppercase" }}>What We Offer</span>
        </div>
        <h2 style={{ fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#0a1628", margin: "0 0 12px", letterSpacing: "-1.5px", lineHeight: 1.08 }}>
          Our Full Suite of <span style={{ color: "#ff8c00" }}>Services</span>
        </h2>
        <p style={{ fontSize: "16px", color: "#6b7280", margin: "0 auto", lineHeight: 1.6, maxWidth: "440px" }}>
          Click any service to explore details and request a tailored quote.
        </p>
      </div>

      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap }}>
          {SERVICES.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      ) : isTablet ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap }}>
          {SERVICES.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap }}>
            {ROW1.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap }}>
            {ROW2.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap }}>
            {ROW3.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      )}
    </section>
  );
}