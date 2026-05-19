import { useState, useEffect, useRef, useCallback } from "react";

const TESTIMONIALS = [
  { id: 1,  name: "James Mwangi",   role: "Import Manager",      company: "Nairobi Traders Ltd",  review: "Ufanisi handled our sea freight clearance at Mombasa Port with incredible speed. What used to take 5 days now takes 2. Highly professional team.", rating: 5, initials: "JM", color: "#5b3a8e", bg: "linear-gradient(135deg,#5b3a8e,#7c5cbf)" },
  { id: 2,  name: "Amina Hassan",   role: "Logistics Director",  company: "East Africa Imports",  review: "Their cross-border team at Namanga is exceptional. Zero delays, full compliance, and real-time updates on every shipment. A true partner.", rating: 5, initials: "AH", color: "#0369a1", bg: "linear-gradient(135deg,#0369a1,#0ea5e9)" },
  { id: 3,  name: "Peter Ochieng",  role: "Supply Chain Mgr",    company: "Kenya Breweries",      review: "The bonded warehousing facility in Mombasa is world-class. ISO-certified, well-managed, and the collateral management service is a game changer.", rating: 5, initials: "PO", color: "#0a6e3f", bg: "linear-gradient(135deg,#0a6e3f,#16a34a)" },
  { id: 4,  name: "Sarah Kimani",   role: "Procurement Officer", company: "Unilever Kenya",       review: "We've used Ufanisi for air freight for 3 years. Their network is vast, rates are competitive, and cargo always arrives on time.", rating: 5, initials: "SK", color: "#b45309", bg: "linear-gradient(135deg,#b45309,#f59e0b)" },
  { id: 5,  name: "David Mutua",    role: "CEO",                 company: "Mutua Enterprises",    review: "Ufanisi's trucking service is reliable and affordable. Their drivers are professional and the fleet is well-maintained. Highly recommended.", rating: 5, initials: "DM", color: "#be123c", bg: "linear-gradient(135deg,#be123c,#f43f5e)" },
  { id: 6,  name: "Grace Wanjiku",  role: "Operations Manager",  company: "Twiga Foods",          review: "From customs clearance to last-mile delivery — Ufanisi handles everything seamlessly. Their 30 years of experience really shows.", rating: 5, initials: "GW", color: "#0a5b8e", bg: "linear-gradient(135deg,#0a5b8e,#2563eb)" },
  { id: 7,  name: "Brian Otieno",   role: "Warehouse Manager",   company: "Bamburi Cement",       review: "Excellent project cargo handling. They moved our heavy machinery from Mombasa to Kisumu without a single incident. True professionals.", rating: 5, initials: "BO", color: "#0f766e", bg: "linear-gradient(135deg,#0f766e,#14b8a6)" },
  { id: 8,  name: "Fatuma Ali",     role: "Trade Manager",       company: "Gulf Imports Ltd",     review: "Ufanisi's AEO certification means our cargo gets priority treatment. Clearance times have dropped by 60%. Incredible value.", rating: 5, initials: "FA", color: "#7c3aed", bg: "linear-gradient(135deg,#7c3aed,#a78bfa)" },
  { id: 9,  name: "Moses Kariuki",  role: "Fleet Manager",       company: "Dormans Coffee",       review: "Their cold chain and warehousing for our coffee exports is flawless. ISO 22000 certified — food safety is taken very seriously.", rating: 5, initials: "MK", color: "#92400e", bg: "linear-gradient(135deg,#92400e,#d97706)" },
  { id: 10, name: "Lydia Njeri",    role: "Customs Agent",       company: "Freight Solutions EA", review: "As a fellow agent, I refer clients to Ufanisi whenever the cargo is complex. Their expertise at all border points is unmatched.", rating: 5, initials: "LN", color: "#0369a1", bg: "linear-gradient(135deg,#1e3a5f,#0369a1)" },
  { id: 11, name: "Edwin Kipchoge", role: "Director",            company: "Alpine Trading Co",    review: "Reliable, fast, and transparent. Ufanisi gives us live tracking updates and their customer service is available 24/7. Outstanding.", rating: 5, initials: "EK", color: "#166534", bg: "linear-gradient(135deg,#166534,#22c55e)" },
];

const INNER = TESTIMONIALS.slice(0, 5);
const OUTER = TESTIMONIALS.slice(5, 11);

const CANVAS_W = 680;
const CANVAS_H = 580;
const CX = CANVAS_W / 2;
const CY = CANVAS_H / 2;
const R_INNER = 160;
const R_OUTER = 270;

const TAIL_ARC = 0.55;
const SPEED_INNER = 0.6;
const SPEED_OUTER = 0.45;

function ringPositions(count: number, radius: number, offsetAngle = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = offsetAngle + (i * 2 * Math.PI) / count - Math.PI / 2;
    return { x: CX + radius * Math.cos(angle), y: CY + radius * Math.sin(angle), angle: offsetAngle + (i * 2 * Math.PI) / count - Math.PI / 2 };
  });
}

function getCometColor(headAngle: number, direction: 1 | -1, avatarAngles: { angle: number; color: string }[]): string {
  const normalize = (a: number) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const head = normalize(headAngle);
  let bestColor = "#0a1628";
  let bestDist = Infinity;
  for (const av of avatarAngles) {
    const avN = normalize(av.angle);
    let dist: number;
    if (direction === 1) {
      dist = head >= avN ? head - avN : head + 2 * Math.PI - avN;
    } else {
      dist = avN >= head ? avN - head : avN + 2 * Math.PI - head;
    }
    if (dist < bestDist) { bestDist = dist; bestColor = av.color; }
  }
  return bestColor;
}

function cometPath(cx: number, cy: number, r: number, headAngle: number, tailArc: number, direction: 1 | -1) {
  const tailAngle = headAngle - direction * tailArc;
  const hx = cx + r * Math.cos(headAngle);
  const hy = cy + r * Math.sin(headAngle);
  const tx = cx + r * Math.cos(tailAngle);
  const ty = cy + r * Math.sin(tailAngle);
  const largeArc = tailArc > Math.PI ? 1 : 0;
  const sweep = direction === 1 ? 1 : 0;
  return `M ${tx} ${ty} A ${r} ${r} 0 ${largeArc} ${sweep} ${hx} ${hy}`;
}

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#ff8c00" stroke="#ff8c00" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ t, x, y, size, onClick }: {
  t: typeof TESTIMONIALS[0]; x: number; y: number; size: number;
  onClick: (t: typeof TESTIMONIALS[0], svgX: number, svgY: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isRight = x > CX;
  const isBottom = y > CY + 80;

  return (
    <g style={{ cursor: "pointer" }}>
      {hovered && (
        <foreignObject
          x={isRight ? x + size / 2 + 8 : x - 215 - size / 2}
          y={isBottom ? y - 130 : y - size / 2}
          width="205" height="130"
          style={{ overflow: "visible", zIndex: 50 }}
        >
          <div style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)", border: "1px solid rgba(10,22,40,0.08)", borderRadius: "14px", padding: "12px 14px", boxShadow: "0 12px 40px rgba(10,22,40,0.15)", fontFamily: "'DM Sans',sans-serif" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: t.color, marginBottom: "5px" }}>{t.name} · {t.company}</div>
            <div style={{ fontSize: "11px", color: "#374151", lineHeight: 1.55, fontStyle: "italic", marginBottom: "7px" }}>"{t.review.slice(0, 80)}..."</div>
            <div style={{ display: "flex", gap: "2px" }}>
              {Array.from({ length: t.rating }).map((_, i) => <span key={i} style={{ color: "#ff8c00", fontSize: "12px" }}>★</span>)}
            </div>
          </div>
        </foreignObject>
      )}
      <foreignObject x={x - size / 2} y={y - size / 2} width={size} height={size} style={{ overflow: "visible" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onClick(t, x, y)}
          style={{
            width: `${size}px`, height: `${size}px`, borderRadius: "50%",
            background: t.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: size > 54 ? "17px" : "14px", fontWeight: 700, color: "#fff",
            border: "3px solid white",
            boxShadow: hovered ? `0 8px 28px ${t.color}55, 0 0 0 5px ${t.color}20` : `0 4px 16px ${t.color}40, 0 0 0 3px rgba(255,255,255,0.9)`,
            transition: "all .25s ease",
            transform: hovered ? "scale(1.14)" : "scale(1)",
            fontFamily: "'DM Sans',sans-serif",
            userSelect: "none", cursor: "pointer",
          }}
        >{t.initials}</div>
      </foreignObject>
      <text x={x} y={y + size / 2 + 16} textAnchor="middle"
        style={{ fontSize: "10px", fontWeight: 600, fill: "#9ca3af", fontFamily: "'DM Sans',sans-serif", pointerEvents: "none" }}>
        {t.name.split(" ")[0]}
      </text>
    </g>
  );
}

export default function TestimonialsSection() {
  const [modal, setModal] = useState<{ t: typeof TESTIMONIALS[0]; svgX: number; svgY: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [innerAngle, setInnerAngle] = useState(0);
  const [outerAngle, setOuterAngle] = useState(Math.PI);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const canvasW = isMobile ? 360 : isTablet ? 520 : CANVAS_W;
  const canvasH = isMobile ? 360 : isTablet ? 460 : CANVAS_H;
  const cx = canvasW / 2;
  const cy = canvasH / 2;
  const rInner = isMobile ? 90 : isTablet ? 130 : R_INNER;
  const rOuter = isMobile ? 155 : isTablet ? 220 : R_OUTER;

  const innerPos = ringPositions(INNER.length, rInner, 0).map(p => ({ ...p, x: cx + rInner * Math.cos(p.angle - Math.PI / 2 + Math.PI / 2), y: cy + rInner * Math.sin(p.angle - Math.PI / 2 + Math.PI / 2) }));
  const outerPos = ringPositions(OUTER.length, rOuter, Math.PI / OUTER.length).map(p => ({ ...p, x: cx + rOuter * Math.cos(p.angle - Math.PI / 2 + Math.PI / 2 + Math.PI / OUTER.length), y: cy + rOuter * Math.sin(p.angle - Math.PI / 2 + Math.PI / 2 + Math.PI / OUTER.length) }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const animate = useCallback((time: number) => {
    if (lastTimeRef.current === 0) lastTimeRef.current = time;
    const delta = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;
    setInnerAngle(prev => prev - SPEED_INNER * delta);
    setOuterAngle(prev => prev + SPEED_OUTER * delta);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isVisible) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, animate]);

  const innerAvatarAngles = innerPos.map((p, i) => ({ angle: p.angle, color: INNER[i].color }));
  const outerAvatarAngles = outerPos.map((p, i) => ({ angle: p.angle, color: OUTER[i].color }));

  const innerColor = getCometColor(innerAngle, -1, innerAvatarAngles);
  const outerColor = getCometColor(outerAngle, 1, outerAvatarAngles);

  const innerHeadX = cx + rInner * Math.cos(innerAngle);
  const innerHeadY = cy + rInner * Math.sin(innerAngle);
  const outerHeadX = cx + rOuter * Math.cos(outerAngle);
  const outerHeadY = cy + rOuter * Math.sin(outerAngle);

  const handleClick = (t: typeof TESTIMONIALS[0], svgX: number, svgY: number) => {
    setModal({ t, svgX, svgY });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "32px 16px 36px" : isTablet ? "60px 40px" : "60px 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(91,58,142,0.05) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "450px", height: "450px", background: "radial-gradient(circle,rgba(3,105,161,0.05) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      {/* Header: badge → H2 → hint */}
      <div style={{ marginBottom: isMobile ? "16px" : "32px", zIndex: 10, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(91,58,142,0.07)", border: "1px solid rgba(91,58,142,0.15)",
          borderRadius: "100px", padding: "5px 16px", marginBottom: "12px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5b3a8e" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#5b3a8e", letterSpacing: "0.8px", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
            Client Voices
          </span>
        </div>

        <h2 style={{
          fontSize: isMobile ? "24px" : "clamp(28px,3.5vw,42px)",
          fontWeight: 800, color: "#0a1628",
          margin: "0 0 8px", letterSpacing: "-1px", lineHeight: 1.1, display: "block",
        }}>
          What Our Clients Say
        </h2>

        <p style={{ fontSize: isMobile ? "13px" : "15px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
          Hover a face to preview · click to read in full
        </p>
      </div>

      {/* Circle canvas */}
      <div style={{ position: "relative", width: `${canvasW}px`, height: `${canvasH}px`, maxWidth: "100%" }}>
        <svg width={canvasW} height={canvasH} style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}>
          <defs>
            <linearGradient id="innerGrad" gradientUnits="userSpaceOnUse"
              x1={cx + rInner * Math.cos(innerAngle - (-1) * TAIL_ARC)}
              y1={cy + rInner * Math.sin(innerAngle - (-1) * TAIL_ARC)}
              x2={innerHeadX} y2={innerHeadY}>
              <stop offset="0%" stopColor={innerColor} stopOpacity="0" />
              <stop offset="100%" stopColor={innerColor} stopOpacity="1" />
            </linearGradient>
            <linearGradient id="outerGrad" gradientUnits="userSpaceOnUse"
              x1={cx + rOuter * Math.cos(outerAngle - TAIL_ARC)}
              y1={cy + rOuter * Math.sin(outerAngle - TAIL_ARC)}
              x2={outerHeadX} y2={outerHeadY}>
              <stop offset="0%" stopColor={outerColor} stopOpacity="0" />
              <stop offset="100%" stopColor={outerColor} stopOpacity="1" />
            </linearGradient>
            <filter id="glowInner" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glowOuter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="rgba(10,22,40,0.07)" strokeWidth="1.5" strokeDasharray="7 5" />
          <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="rgba(10,22,40,0.07)" strokeWidth="1.5" strokeDasharray="5 4" />

          {isVisible && (
            <g filter="url(#glowInner)">
              <path d={cometPath(cx, cy, rInner, innerAngle, TAIL_ARC, -1)} fill="none" stroke="url(#innerGrad)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx={innerHeadX} cy={innerHeadY} r="4" fill={innerColor} opacity="0.95" />
              <circle cx={innerHeadX} cy={innerHeadY} r="2" fill="white" opacity="0.8" />
            </g>
          )}

          {isVisible && (
            <g filter="url(#glowOuter)">
              <path d={cometPath(cx, cy, rOuter, outerAngle, TAIL_ARC, 1)} fill="none" stroke="url(#outerGrad)" strokeWidth="3" strokeLinecap="round" />
              <circle cx={outerHeadX} cy={outerHeadY} r="4.5" fill={outerColor} opacity="0.95" />
              <circle cx={outerHeadX} cy={outerHeadY} r="2" fill="white" opacity="0.8" />
            </g>
          )}

          {OUTER.map((t, i) => (
            <Avatar key={t.id} t={t} x={outerPos[i].x} y={outerPos[i].y} size={56} onClick={handleClick} />
          ))}
          {INNER.map((t, i) => (
            <Avatar key={t.id} t={t} x={innerPos[i].x} y={innerPos[i].y} size={62} onClick={handleClick} />
          ))}
        </svg>

        {/* Centre disc */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 10 }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            background: "linear-gradient(135deg,#5b3a8e,#7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(91,58,142,0.35)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (() => {
        const { t, svgX, svgY } = modal;
        const isRight = svgX > cx;
        const isBottom = svgY > cy + 80;
        const hPos = isMobile
          ? { left: "16px", right: "16px" }
          : isRight ? { left: "auto", right: "24px" } : { left: "24px", right: "auto" };
        const vPos = isMobile ? { top: "50%", bottom: "auto" } : isBottom ? { top: "auto", bottom: "24px" } : { top: "80px", bottom: "auto" };
        return (
          <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(10,22,40,0.35)", backdropFilter: "blur(4px)" }}>
            <div onClick={e => e.stopPropagation()} style={{ position: "fixed", ...hPos, ...vPos, transform: isMobile ? "translateY(-50%)" : "none", zIndex: 99999, width: isMobile ? "auto" : "320px", background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRadius: "24px", padding: "28px", boxShadow: `0 24px 64px rgba(10,22,40,0.2), 0 0 0 1px rgba(255,255,255,0.8)`, border: `1px solid ${t.color}20` }}>
              <button onClick={() => setModal(null)} style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(10,22,40,0.06)", border: "none", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#fff", boxShadow: `0 4px 16px ${t.color}40`, fontFamily: "'DM Sans',sans-serif", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628" }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{t.role}</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: t.color }}>{t.company}</div>
                </div>
              </div>
              <StarRating count={t.rating} />
              <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.75, fontStyle: "italic", margin: "14px 0 0" }}>"{t.review}"</p>
            </div>
          </div>
        );
      })()}
    </section>
  );
}