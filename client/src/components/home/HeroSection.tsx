import { useRef, useState, useEffect, useCallback } from "react";
import logo from "../../assets/ufanisi-logo.png";
import imgSeaFreight from "../../assets/sea-freight.jfif";
import imgAirFreight from "../../assets/air-freight.jfif";
import imgCustoms from "../../assets/customs-clearance.jfif";
import imgWarehousing from "../../assets/warehousing.jfif";
import imgCrossBorder from "../../assets/cross-border.jfif";
import imgTrucking from "../../assets/trucking.jfif";
import imgProjectCargo from "../../assets/project-cargo.jfif";
import certEAC from "../../assets/eac-aeo.png";
import certISO9001 from "../../assets/iso-9001.png";
import certISO22000 from "../../assets/iso-22000.png";
import certTOP100 from "../../assets/top-100.png";
import certWCA from "../../assets/wca.png";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "SDGs", href: "/sdgs" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_CARDS = [
  { title: "Sea Freight",       subtitle: "Global ocean shipping",  image: imgSeaFreight,   rotate: -5 },
  { title: "Air Freight",       subtitle: "Express air cargo",       image: imgAirFreight,   rotate: -3 },
  { title: "Customs Clearance", subtitle: "Sea & air clearance",     image: imgCustoms,      rotate: -1, featured: true },
  { title: "Warehousing",       subtitle: "Bonded & free storage",   image: imgWarehousing,  rotate: 0  },
  { title: "Cross Border",      subtitle: "East Africa corridors",   image: imgCrossBorder,  rotate: 1  },
  { title: "Trucking",          subtitle: "Door-to-door delivery",   image: imgTrucking,     rotate: 3  },
  { title: "Project Cargo",     subtitle: "Heavy & oversized loads", image: imgProjectCargo, rotate: 5  },
];

const CERT_IMAGES = [
  { src: certISO9001,  alt: "ISO 9001 Certified", label: "ISO 9001",      size: 130 },
  { src: certISO22000, alt: "ISO 22000 Certified", label: "ISO 22000",    size: 110 },
  { src: certEAC,      alt: "EAC AEO Certified",   label: "EAC AEO",      size: 110 },
  { src: certWCA,      alt: "WCA eCommerce",        label: "WCA eCommerce",size: 110 },
  { src: certTOP100,   alt: "Kenya Top 100",        label: "Top 100",      size: 110 },
];

const CARD_WIDTH = 260;
const CARD_GAP = 32;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const TOTAL = SERVICE_CARDS.length;
const ARC_DEPTH = 40;
const STRING_Y = 16; // string sits at this y within the string container
const PIN_HEAD_R = 8;
const PIN_NEEDLE_H = 14;

function getArcY(screenX: number, vpWidth: number): number {
  const norm = (screenX - vpWidth / 2) / (vpWidth / 2);
  const clamped = Math.max(-1, Math.min(1, norm));
  return ARC_DEPTH * (1 - clamped * clamped);
}

export default function HeroSection() {
  const [scrollX, setScrollX] = useState(0);
  const [vpWidth, setVpWidth] = useState(1440);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const animRef = useRef<number>(0);
  const velRef = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);

  useEffect(() => {
    const update = () => setVpWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const clamp = useCallback((x: number) => {
    const range = TOTAL * CARD_STEP;
    return ((x % range) + range) % range;
  }, []);

  const animate = useCallback(() => {
    velRef.current *= 0.93;
    if (Math.abs(velRef.current) < 0.2) return;
    setScrollX(prev => clamp(prev + velRef.current));
    animRef.current = requestAnimationFrame(animate);
  }, [clamp]);

  const stopAnim = () => cancelAnimationFrame(animRef.current);

  const onMouseDown = (e: React.MouseEvent) => {
    stopAnim();
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = scrollX;
    lastX.current = e.clientX;
    lastT.current = Date.now();
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    velRef.current = (lastX.current - e.clientX) / Math.max(1, now - lastT.current) * 14;
    lastX.current = e.clientX;
    lastT.current = now;
    setScrollX(clamp(dragStartScroll.current - (e.clientX - dragStartX.current)));
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    animRef.current = requestAnimationFrame(animate);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    stopAnim();
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartScroll.current = scrollX;
    lastX.current = e.touches[0].clientX;
    lastT.current = Date.now();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    velRef.current = (lastX.current - e.touches[0].clientX) / Math.max(1, now - lastT.current) * 14;
    lastX.current = e.touches[0].clientX;
    lastT.current = now;
    setScrollX(clamp(dragStartScroll.current - (e.touches[0].clientX - dragStartX.current)));
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    animRef.current = requestAnimationFrame(animate);
  };

  // Render 3 sets for seamless infinite loop
  const sets = [-1, 0, 1];
  const trackOffset = vpWidth / 2 - TOTAL * CARD_STEP / 2;

  // String arc path
  const stringPath = `M 0,${STRING_Y} Q ${vpWidth / 2},${STRING_Y + ARC_DEPTH} ${vpWidth},${STRING_Y}`;

  return (
    <div style={{ background: "#ffffff", fontFamily: "'DM Sans','Inter',sans-serif", overflowX: "hidden" }}>

      {/* Ambient bg */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse at 90% 0%,rgba(255,140,0,0.03) 0%,transparent 50%),radial-gradient(ellipse at 10% 100%,rgba(10,22,40,0.03) 0%,transparent 50%)" }} />

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 96px", height: "70px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(10,22,40,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Ufanisi Freighters" style={{ height: "60px", width: "60px", objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", gap: "34px" }}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} style={{ color: "#4a5568", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0a1628")}
              onMouseLeave={e => (e.currentTarget.style.color = "#4a5568")}
            >{link.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/tracking" style={{ color: "#0a1628", fontSize: "14px", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            Track Cargo
          </a>
          <button style={{ background: "#0a1628", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(10,22,40,0.22)" }}>Get a Quote</button>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "64px 96px 0" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid rgba(10,22,40,0.1)", borderRadius: "100px", padding: "5px 16px 5px 7px", marginBottom: "24px", boxShadow: "3px 3px 8px rgba(10,22,40,0.07),-2px -2px 6px rgba(255,255,255,1)" }}>
          <span style={{ background: "#0a1628", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", letterSpacing: ".6px" }}>
            <span style={{ color: "#ff8c00" }}>30</span>+ YEARS
          </span>
          <span style={{ color: "#4a5568", fontSize: "13px", fontWeight: 500 }}>East Africa's trusted freight partner</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-2px", color: "#0a1628", maxWidth: "740px", margin: "0 0 16px" }}>
          World-Class Logistics<br />For Africa <span style={{ color: "#5b3a8e" }}>&amp; Beyond.</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "480px", lineHeight: 1.6, margin: "0 0 32px", fontWeight: 400 }}>
          By land, air &amp; sea — moving your cargo across East &amp; Central Africa with speed and precision.
        </p>

        {/* CTA */}
        <button style={{ background: "#0a1628", color: "#fff", border: "none", padding: "14px 38px", borderRadius: "100px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "6px 6px 16px rgba(10,22,40,0.2),-3px -3px 10px rgba(255,255,255,1)", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all .2s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "8px 8px 20px rgba(10,22,40,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "6px 6px 16px rgba(10,22,40,0.2),-3px -3px 10px rgba(255,255,255,1)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          Explore Services
        </button>
      </div>

      {/* FULL WIDTH GALLERY */}
      <div
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", marginTop: "48px", position: "relative", userSelect: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* String + pins + cards canvas */}
        <div style={{ position: "relative", height: "360px", cursor: isDragging.current ? "grabbing" : "grab" }}>

          {/* THE STRING — rendered as SVG layer behind everything */}
          <svg
            style={{ position: "absolute", top: 0, left: 0, width: "100%", pointerEvents: "none", zIndex: 2 }}
            height={STRING_Y + ARC_DEPTH + 10}
            viewBox={`0 0 ${vpWidth} ${STRING_Y + ARC_DEPTH + 10}`}
            preserveAspectRatio="none"
          >
            {/* Shadow */}
            <path d={`M 0,${STRING_Y + 2} Q ${vpWidth / 2},${STRING_Y + ARC_DEPTH + 2} ${vpWidth},${STRING_Y + 2}`} fill="none" stroke="rgba(10,22,40,0.05)" strokeWidth="4" />
            {/* String */}
            <path d={stringPath} fill="none" stroke="rgba(10,22,40,0.2)" strokeWidth="2" />
          </svg>

          {/* CARDS + PINS — absolutely positioned */}
          {sets.flatMap(set =>
            SERVICE_CARDS.map((card, i) => {
              const rawCenter = set * TOTAL * CARD_STEP + i * CARD_STEP + CARD_WIDTH / 2;
              const screenX = rawCenter - scrollX + trackOffset;

              // Skip off-screen
              if (screenX < -CARD_WIDTH - 100 || screenX > vpWidth + CARD_WIDTH + 100) return null;

              // Arc Y at this card's screen position
              const arcY = getArcY(screenX, vpWidth);
              // String Y at this position = STRING_Y + arcY
              const stringYAtCard = STRING_Y + arcY;

              // Pin head centre sits at stringYAtCard (touching the string)
              const pinHeadCY = stringYAtCard;
              // Card top sits below pin needle
              const cardTop = pinHeadCY + PIN_HEAD_R + PIN_NEEDLE_H;

              return (
                <div
                  key={`${set}-${i}`}
                  style={{
                    position: "absolute",
                    left: screenX - CARD_WIDTH / 2,
                    top: 0,
                    width: `${CARD_WIDTH}px`,
                    zIndex: 5,
                    transform: `rotate(${card.rotate}deg)`,
                    transformOrigin: `${CARD_WIDTH / 2}px ${pinHeadCY}px`,
                    pointerEvents: "none",
                  }}
                >
                  {/* PIN HEAD + NEEDLE */}
                  <div style={{ position: "absolute", left: "50%", top: pinHeadCY - PIN_HEAD_R, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
                    {/* Head */}
                    <div style={{
                      width: `${PIN_HEAD_R * 2}px`,
                      height: `${PIN_HEAD_R * 2}px`,
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 35%, #ffb347, #e65c00)",
                      boxShadow: "0 2px 8px rgba(230,92,0,0.55), inset 0 1px 2px rgba(255,255,255,0.45)",
                      position: "relative",
                    }}>
                      {/* Shine */}
                      <div style={{ position: "absolute", top: "3px", left: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />
                    </div>
                    {/* Needle */}
                    <div style={{ width: "2px", height: `${PIN_NEEDLE_H}px`, background: "linear-gradient(to bottom, #b34400, #7a2d00)", borderRadius: "0 0 2px 2px", marginTop: "-1px" }} />
                  </div>

                  {/* CARD */}
                  <div style={{
                    position: "absolute",
                    top: cardTop,
                    left: 0,
                    width: `${CARD_WIDTH}px`,
                    background: "#fff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: `1px solid ${card.featured ? "rgba(255,140,0,0.28)" : "rgba(10,22,40,0.08)"}`,
                    boxShadow: card.featured
                      ? "0 12px 36px rgba(255,140,0,0.14),0 4px 12px rgba(10,22,40,0.08)"
                      : "0 8px 28px rgba(10,22,40,0.1),0 2px 6px rgba(10,22,40,0.05)",
                  }}>
                    <div style={{ height: "170px", overflow: "hidden", position: "relative" }}>
                      <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {card.featured && (
                        <div style={{ position: "absolute", top: "10px", right: "10px", background: "#ff8c00", color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "0.6px", padding: "3px 8px", borderRadius: "100px" }}>FEATURED</div>
                      )}
                    </div>
                    <div style={{ padding: "14px 16px 18px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0a1628", marginBottom: "3px" }}>{card.title}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>{card.subtitle}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Edge fades */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "80px", background: "linear-gradient(to right,#fff 50%,transparent)", zIndex: 20, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "80px", background: "linear-gradient(to left,#fff 50%,transparent)", zIndex: 20, pointerEvents: "none" }} />
      </div>

      {/* TRUST BAR */}
      <div style={{ background: "#f0f2f5", padding: "40px 96px" }}>
        {/* H2 outside the card */}
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0a1628", margin: "0 0 20px 0", letterSpacing: "-0.3px", textAlign: "center" }}>
          Our Certifications
        </h2>
        {/* Glassmorphism card */}
        <div style={{
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "20px",
          padding: "16px 48px",
          boxShadow: "0 8px 32px rgba(10,22,40,0.08), 0 1px 4px rgba(10,22,40,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
          border: "1px solid rgba(255,255,255,0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {CERT_IMAGES.map((cert, i) => (
              <div key={cert.alt} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  transition: "transform .2s, box-shadow .2s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(10,22,40,0.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    style={{ height: `${cert.size}px`, width: `${cert.size}px`, objectFit: "contain", display: "block" }}
                  />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#0a1628", letterSpacing: "0.2px", textAlign: "center" }}>
                    {cert.label}
                  </span>
                </div>
                {i < CERT_IMAGES.length - 1 && (
                  <div style={{ width: "1px", height: "60px", background: "rgba(10,22,40,0.1)", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}