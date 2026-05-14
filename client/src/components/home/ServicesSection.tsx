import { useState, useEffect } from "react";

const SERVICES = [
  {
    title: "Customs Clearance", subtitle: "Sea & Air",
    description: "Swift import & export clearance at all major Kenyan ports and airports.",
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>),
    color: "#5b3a8e", bg: "rgba(91,58,142,0.08)", href: "/service?r=sea-and-air-customs-clearance",
  },
  {
    title: "Warehousing", subtitle: "Free & Bonded",
    description: "Secure, ISO-certified storage near major ports with full cargo handling.",
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
    color: "#0a6e3f", bg: "rgba(10,110,63,0.08)", href: "/service?r=free-and-customs-bonded-warehousing",
  },
  {
    title: "Cross Border", subtitle: "East Africa",
    description: "Experienced teams at all major entry & exit points across East Africa.",
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
    color: "#0a5b8e", bg: "rgba(10,91,142,0.08)", href: "/service?r=cross-border-clearance",
  },
  {
    title: "Trucking", subtitle: "Door-to-Door",
    description: "Own fleet of flatbeds, low loaders & canters for reliable road delivery.",
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>),
    color: "#b45309", bg: "rgba(180,83,9,0.08)", href: "/service?r=transport-tracking",
  },
  {
    title: "Air Freight", subtitle: "Global Express",
    description: "Fast import & export air cargo via worldwide network partners.",
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>),
    color: "#0a1628", bg: "rgba(10,22,40,0.08)", href: "/service?r=air-freight-management",
  },
  {
    title: "Sea Freight", subtitle: "Ocean Shipping",
    description: "Full authority in customs clearance & delivery of sea cargo worldwide.",
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1"/><path d="M4 18l-1-5h18l-2 5"/><path d="M12 2v8"/><path d="M6.5 10l5.5-5.5L17.5 10"/></svg>),
    color: "#0369a1", bg: "rgba(3,105,161,0.08)", href: "/service?r=sea-freight-management",
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);
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

  const pad = isMobile ? "48px 16px" : isTablet ? "64px 40px" : "80px 96px";
  const cols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";

  return (
    <section style={{ background: "#ffffff", padding: pad }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(91,58,142,0.07)", border: "1px solid rgba(91,58,142,0.15)", borderRadius: "100px", padding: "5px 16px", marginBottom: "16px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5b3a8e" }} />
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#5b3a8e", letterSpacing: "0.8px", textTransform: "uppercase" }}>What We Do</span>
        </div>
        <h2 style={{ fontSize: isMobile ? "24px" : "clamp(28px,3.5vw,42px)", fontWeight: 800, color: "#0a1628", margin: "0 0 12px", letterSpacing: "-1px", lineHeight: 1.1 }}>Scope of Services</h2>
        <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>Select a service to request a quote — we respond within minutes.</p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? "16px" : "20px", marginBottom: "32px" }}>
        {SERVICES.map((service, i) => (
          <a key={service.title} href={service.href} style={{ textDecoration: "none" }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div style={{
              background: hovered === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              border: hovered === i ? `1px solid ${service.color}30` : "1px solid rgba(10,22,40,0.08)",
              borderRadius: "24px", padding: isMobile ? "20px 16px" : "28px 24px",
              cursor: "pointer", transition: "all .25s ease",
              transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
              boxShadow: hovered === i ? `0 20px 48px rgba(10,22,40,0.12),0 4px 12px ${service.color}20` : "0 4px 16px rgba(10,22,40,0.06),inset 0 1px 0 rgba(255,255,255,0.8)",
              height: "100%",
            }}>
              <div style={{ width: "48px", height: "48px", background: service.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: service.color, marginBottom: "16px" }}>{service.icon}</div>
              <div style={{ marginBottom: "8px" }}>
                <div style={{ fontSize: isMobile ? "15px" : "15px", fontWeight: 700, color: "#0a1628", marginBottom: "2px" }}>{service.title}</div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: service.color, textTransform: "uppercase", letterSpacing: "0.6px" }}>{service.subtitle}</div>
              </div>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: "0 0 16px" }}>{service.description}</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: service.color }}>
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <a href="/services" style={{ textDecoration: "none" }}>
          <button style={{
            background: "#0a1628", color: "#fff", border: "none",
            padding: "14px 40px", borderRadius: "100px", fontSize: "15px", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
            width: isMobile ? "100%" : "auto", maxWidth: isMobile ? "320px" : "none",
            boxShadow: "6px 6px 16px rgba(10,22,40,0.18),-3px -3px 10px rgba(255,255,255,1)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all .2s",
          }}>
            View All Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </a>
      </div>
    </section>
  );
}