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
  { src: certISO9001,  alt: "ISO 9001 Certified", label: "ISO 9001",       size: 130 },
  { src: certISO22000, alt: "ISO 22000 Certified", label: "ISO 22000",     size: 110 },
  { src: certEAC,      alt: "EAC AEO Certified",   label: "EAC AEO",       size: 110 },
  { src: certWCA,      alt: "WCA eCommerce",        label: "WCA eCommerce", size: 110 },
  { src: certTOP100,   alt: "Kenya Top 100",        label: "Top 100",       size: 110 },
];

const CARD_WIDTH = 260;
const CARD_GAP   = 32;
const CARD_STEP  = CARD_WIDTH + CARD_GAP;
const TOTAL      = SERVICE_CARDS.length;
const ARC_DEPTH  = 40;
const STRING_Y   = 16;
const PIN_HEAD_R = 8;
const PIN_NEEDLE_H = 14;

// ─── Gallery dimensions locked per breakpoint ───────────────────────────────
// We derive these once from the INITIAL window width so mobile browser
// chrome show/hide (which changes innerHeight and can fire resize) never
// causes the gallery to jump between mobile and desktop sizes mid-scroll.
function getBreakpoint(w: number) {
  if (w < 768)  return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getArcY(screenX: number, vpWidth: number): number {
  const norm    = (screenX - vpWidth / 2) / (vpWidth / 2);
  const clamped = Math.max(-1, Math.min(1, norm));
  return ARC_DEPTH * (1 - clamped * clamped);
}

export default function HeroSection() {
  const [scrollX, setScrollX]     = useState(0);
  const [vpWidth, setVpWidth]     = useState(1440);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Breakpoint: derived from width only, not height ──────────────────────
  // Using a ref + state pair so the gallery card sizes never flip during
  // mobile scroll (when the browser address bar hides and fires resize).
  const [bp, setBp] = useState<"mobile"|"tablet"|"desktop">(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "desktop"
  );

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const isDragging      = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartScroll = useRef(0);
  const animRef         = useRef<number>(0);
  const velRef          = useRef(0);
  const lastX           = useRef(0);
  const lastT           = useRef(0);
  // Track the last WIDTH so we only update breakpoint on width changes
  const lastWidth       = useRef(typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // Only update vpWidth & breakpoint when WIDTH actually changes.
      // This prevents the gallery from reflowing when the mobile browser
      // address bar appears/disappears (which only changes innerHeight).
      if (w !== lastWidth.current) {
        lastWidth.current = w;
        setVpWidth(w);
        setBp(getBreakpoint(w));
      }
    };

    // Set correct initial values
    setVpWidth(window.innerWidth);
    setBp(getBreakpoint(window.innerWidth));
    lastWidth.current = window.innerWidth;

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isMobile && !isTablet) setDrawerOpen(false);
  }, [isMobile, isTablet]);

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
    stopAnim(); isDragging.current = true;
    dragStartX.current = e.clientX; dragStartScroll.current = scrollX;
    lastX.current = e.clientX; lastT.current = Date.now(); e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    velRef.current = (lastX.current - e.clientX) / Math.max(1, now - lastT.current) * 14;
    lastX.current = e.clientX; lastT.current = now;
    setScrollX(clamp(dragStartScroll.current - (e.clientX - dragStartX.current)));
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    animRef.current = requestAnimationFrame(animate);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    stopAnim(); isDragging.current = true;
    dragStartX.current = e.touches[0].clientX; dragStartScroll.current = scrollX;
    lastX.current = e.touches[0].clientX; lastT.current = Date.now();
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const now = Date.now();
    velRef.current = (lastX.current - e.touches[0].clientX) / Math.max(1, now - lastT.current) * 14;
    lastX.current = e.touches[0].clientX; lastT.current = now;
    setScrollX(clamp(dragStartScroll.current - (e.touches[0].clientX - dragStartX.current)));
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    animRef.current = requestAnimationFrame(animate);
  };

  const sets        = [-1, 0, 1];
  const trackOffset = vpWidth / 2 - TOTAL * CARD_STEP / 2;
  const stringPath  = `M 0,${STRING_Y} Q ${vpWidth / 2},${STRING_Y + ARC_DEPTH} ${vpWidth},${STRING_Y}`;

  // ── Responsive values ─────────────────────────────────────────────────────
  const navPadding  = isMobile ? "0 16px"       : isTablet ? "0 40px"       : "0 96px";
  const heroPadding = isMobile ? "40px 16px 0"  : isTablet ? "56px 40px 0"  : "64px 96px 0";
  const certPadding = isMobile ? "32px 16px"    : isTablet ? "36px 40px"    : "40px 96px";

  // ── Gallery card dimensions — FIXED per breakpoint ──
  // cardW / cardStep are used in JS scroll math only — still read from bp.
  // galleryH is intentionally REMOVED: the gallery container height is now
  // driven purely by a CSS class (see <style> block below) so the mobile
  // browser toolbar appearing / disappearing never causes a React re-render
  // that resizes the gallery.
  const cardW    = isMobile ? 200 : CARD_WIDTH;   // 200 / 260
  const cardStep = isMobile ? 220 : CARD_STEP;    // 220 / 292
  const imgH     = isMobile ? 130 : 170;          // image height inside card

  return (
    <div style={{ background: "#ffffff", fontFamily: "'DM Sans','Inter',sans-serif", overflowX: "hidden" }}>

      {/* ── Gallery height locked in CSS — immune to mobile toolbar resize ── */}
      <style>{`
        .uf-gallery {
          height: 400px;
        }
        @media (max-width: 1023px) {
          .uf-gallery { height: 360px; }
        }
        @media (max-width: 767px) {
          .uf-gallery { height: 320px; }
        }
        @keyframes certScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cert-track {
          display: flex;
          width: max-content;
          animation: certScroll 10s linear infinite;
        }
        .cert-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Ambient bg */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse at 90% 0%,rgba(255,140,0,0.03) 0%,transparent 50%),radial-gradient(ellipse at 10% 100%,rgba(10,22,40,0.03) 0%,transparent 50%)" }} />

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div onClick={() => setDrawerOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.4)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      )}

      {/* Side drawer */}
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "280px", background: "#ffffff", zIndex: 300, transform: drawerOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)", boxShadow: drawerOpen ? "-8px 0 32px rgba(10,22,40,0.15)" : "none", display: "flex", flexDirection: "column", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
          <img src={logo} alt="Ufanisi Freighters" style={{ height: "48px", width: "48px", objectFit: "contain" }} />
          <button onClick={() => setDrawerOpen(false)} style={{ background: "rgba(10,22,40,0.06)", border: "none", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a1628" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} onClick={() => setDrawerOpen(false)}
              style={{ color: "#0a1628", fontSize: "16px", fontWeight: 600, textDecoration: "none", padding: "14px 16px", borderRadius: "12px", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(10,22,40,0.05)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >{link.label}</a>
          ))}
          <a href="/tracking" onClick={() => setDrawerOpen(false)} style={{ color: "#0a1628", fontSize: "16px", fontWeight: 600, textDecoration: "none", padding: "14px 16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            Track Cargo
          </a>
        </div>
        <button style={{ background: "#0a1628", color: "#fff", border: "none", padding: "14px", borderRadius: "100px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
          Get a Quote
        </button>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: navPadding, height: "70px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(10,22,40,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Ufanisi Freighters" style={{ height: "60px", width: "60px", objectFit: "contain" }} />
        </div>
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", gap: "34px" }}>
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} style={{ color: "#4a5568", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0a1628")}
                onMouseLeave={e => (e.currentTarget.style.color = "#4a5568")}
              >{link.label}</a>
            ))}
          </div>
        )}
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="/tracking" style={{ color: "#0a1628", fontSize: "14px", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              Track Cargo
            </a>
            <button style={{ background: "#0a1628", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(10,22,40,0.22)" }}>Get a Quote</button>
          </div>
        )}
        {(isMobile || isTablet) && (
          <button onClick={() => setDrawerOpen(true)} style={{ background: "rgba(10,22,40,0.06)", border: "none", borderRadius: "10px", width: "40px", height: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "5px", padding: "10px" }}>
            <span style={{ display: "block", width: "18px", height: "2px", background: "#0a1628", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "18px", height: "2px", background: "#0a1628", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "18px", height: "2px", background: "#0a1628", borderRadius: "2px" }} />
          </button>
        )}
      </nav>

      {/* ── HERO CONTENT ── */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: heroPadding }}>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid rgba(10,22,40,0.1)", borderRadius: "100px", padding: "5px 16px 5px 7px", marginBottom: "24px", boxShadow: "3px 3px 8px rgba(10,22,40,0.07),-2px -2px 6px rgba(255,255,255,1)" }}>
          <span style={{ background: "#0a1628", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", letterSpacing: ".6px" }}>
            <span style={{ color: "#ff8c00" }}>35</span>+ YEARS
          </span>
          <span style={{ color: "#4a5568", fontSize: isMobile ? "11px" : "13px", fontWeight: 500 }}>East Africa's trusted freight partner</span>
        </div>

        {/* ── H1 — matches About page sizing exactly ── */}
        <h1 style={{
          fontSize: isMobile ? "38px" : isTablet ? "58px" : "clamp(60px,7.5vw,96px)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: isMobile ? "-1.5px" : "-3px",
          color: "#0a1628",
          maxWidth: "740px",
          margin: "0 0 16px",
        }}>
          World-Class Logistics<br />For Africa <span style={{ color: "#5b3a8e" }}>&amp; Beyond.</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "480px", lineHeight: 1.6, margin: "0 0 32px", fontWeight: 400, padding: isMobile ? "0 8px" : "0" }}>
          By land, air &amp; sea — moving your cargo across East &amp; Central Africa with speed and precision.
        </p>

        {/* CTA */}
        <button style={{ background: "#0a1628", color: "#fff", border: "none", padding: "14px 38px", borderRadius: "100px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: isMobile ? "100%" : "auto", maxWidth: isMobile ? "320px" : "none", boxShadow: "6px 6px 16px rgba(10,22,40,0.2),-3px -3px 10px rgba(255,255,255,1)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all .2s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "8px 8px 20px rgba(10,22,40,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "6px 6px 16px rgba(10,22,40,0.2),-3px -3px 10px rgba(255,255,255,1)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          Explore Services
        </button>
      </div>

      {/* ── FULL WIDTH GALLERY ── */}
      <div
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", marginTop: isMobile ? "32px" : "52px", position: "relative", userSelect: "none" }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        {/*
          Gallery container height is set via .uf-gallery CSS class (pure CSS
          media queries) — completely immune to mobile browser toolbar resize events.
        */}
        <div className="uf-gallery" style={{ position: "relative", cursor: isDragging.current ? "grabbing" : "grab" }}>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", pointerEvents: "none", zIndex: 2 }}
            height={STRING_Y + ARC_DEPTH + 10}
            viewBox={`0 0 ${vpWidth} ${STRING_Y + ARC_DEPTH + 10}`}
            preserveAspectRatio="none"
          >
            <path d={`M 0,${STRING_Y + 2} Q ${vpWidth / 2},${STRING_Y + ARC_DEPTH + 2} ${vpWidth},${STRING_Y + 2}`} fill="none" stroke="rgba(10,22,40,0.05)" strokeWidth="4" />
            <path d={stringPath} fill="none" stroke="rgba(10,22,40,0.2)" strokeWidth="2" />
          </svg>

          {sets.flatMap(set =>
            SERVICE_CARDS.map((card, i) => {
              // Use stable cardW / cardStep — derived from bp not live isMobile
              const tOffset   = vpWidth / 2 - TOTAL * cardStep / 2;
              const rawCenter = set * TOTAL * cardStep + i * cardStep + cardW / 2;
              const screenX   = rawCenter - scrollX + tOffset;
              if (screenX < -cardW - 100 || screenX > vpWidth + cardW + 100) return null;
              const arcY          = getArcY(screenX, vpWidth);
              const stringYAtCard = STRING_Y + arcY;
              const pinHeadCY     = stringYAtCard;
              const cardTop       = pinHeadCY + PIN_HEAD_R + PIN_NEEDLE_H;

              return (
                <div key={`${set}-${i}`} style={{ position: "absolute", left: screenX - cardW / 2, top: 0, width: `${cardW}px`, zIndex: 5, transform: `rotate(${card.rotate}deg)`, transformOrigin: `${cardW / 2}px ${pinHeadCY}px`, pointerEvents: "none" }}>
                  {/* Pin head */}
                  <div style={{ position: "absolute", left: "50%", top: pinHeadCY - PIN_HEAD_R, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10 }}>
                    <div style={{ width: `${PIN_HEAD_R * 2}px`, height: `${PIN_HEAD_R * 2}px`, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffb347, #e65c00)", boxShadow: "0 2px 8px rgba(230,92,0,0.55), inset 0 1px 2px rgba(255,255,255,0.45)", position: "relative" }}>
                      <div style={{ position: "absolute", top: "3px", left: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />
                    </div>
                    <div style={{ width: "2px", height: `${PIN_NEEDLE_H}px`, background: "linear-gradient(to bottom, #b34400, #7a2d00)", borderRadius: "0 0 2px 2px", marginTop: "-1px" }} />
                  </div>

                  {/* Card */}
                  <div style={{ position: "absolute", top: cardTop, left: 0, width: `${cardW}px`, background: "#fff", borderRadius: "18px", overflow: "hidden", border: `1px solid ${card.featured ? "rgba(255,140,0,0.28)" : "rgba(10,22,40,0.08)"}`, boxShadow: card.featured ? "0 12px 36px rgba(255,140,0,0.14),0 4px 12px rgba(10,22,40,0.08)" : "0 8px 28px rgba(10,22,40,0.1),0 2px 6px rgba(10,22,40,0.05)" }}>
                    <div style={{ height: `${imgH}px`, overflow: "hidden", position: "relative" }}>
                      <img src={card.image} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {card.featured && (
                        <div style={{ position: "absolute", top: "10px", right: "10px", background: "#ff8c00", color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "0.6px", padding: "3px 8px", borderRadius: "100px" }}>FEATURED</div>
                      )}
                    </div>
                    <div style={{ padding: isMobile ? "10px 12px 14px" : "14px 16px 18px" }}>
                      <div style={{ fontSize: isMobile ? "12px" : "13px", fontWeight: 700, color: "#0a1628", marginBottom: "3px" }}>{card.title}</div>
                      <div style={{ fontSize: isMobile ? "10px" : "11px", color: "#9ca3af" }}>{card.subtitle}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Edge fade masks */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "60px", background: "linear-gradient(to right,#fff 50%,transparent)", zIndex: 20, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "60px", background: "linear-gradient(to left,#fff 50%,transparent)", zIndex: 20, pointerEvents: "none" }} />
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div style={{ background: "#f0f2f5", padding: certPadding }}>
        <h2 style={{ fontSize: isMobile ? "24px" : "22px", fontWeight: 700, color: "#0a1628", margin: "0 0 24px", letterSpacing: "-0.3px", textAlign: "center" }}>
          Our Certifications
        </h2>

        <div style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 32px rgba(10,22,40,0.08), 0 1px 4px rgba(10,22,40,0.04), inset 0 1px 0 rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.6)", position: "relative" }}>

          {isMobile ? (
            <div style={{ position: "relative", padding: "16px 0", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "32px", background: "linear-gradient(to right, rgba(255,255,255,0.8), transparent)", zIndex: 10, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "32px", background: "linear-gradient(to left, rgba(255,255,255,0.8), transparent)", zIndex: 10, pointerEvents: "none" }} />
              <div className="cert-track">
                {[...CERT_IMAGES, ...CERT_IMAGES].map((cert, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "8px 16px", flexShrink: 0 }}>
                    <img src={cert.src} alt={cert.alt} style={{ height: "64px", width: "64px", objectFit: "contain" }} />
                    <span style={{ fontSize: "10px", fontWeight: 600, color: "#0a1628", textAlign: "center", whiteSpace: "nowrap" }}>{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ padding: isTablet ? "16px 24px" : "16px 48px", display: "flex", alignItems: "center", justifyContent: "center", gap: isTablet ? "16px" : "32px", flexWrap: "nowrap" }}>
              {CERT_IMAGES.map((cert, i) => (
                <div key={cert.alt} style={{ display: "flex", alignItems: "center", gap: isTablet ? "16px" : "32px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: isTablet ? "8px" : "16px", borderRadius: "16px", transition: "transform .2s, box-shadow .2s", cursor: "pointer" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(10,22,40,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                  >
                    <img src={cert.src} alt={cert.alt} style={{ height: isTablet ? `${cert.size * 0.7}px` : `${cert.size}px`, width: isTablet ? `${cert.size * 0.7}px` : `${cert.size}px`, objectFit: "contain", display: "block" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#0a1628", letterSpacing: "0.2px", textAlign: "center" }}>{cert.label}</span>
                  </div>
                  {i < CERT_IMAGES.length - 1 && <div style={{ width: "1px", height: "60px", background: "rgba(10,22,40,0.1)", flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}