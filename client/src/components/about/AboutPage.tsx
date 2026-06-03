import { useState, useEffect, useRef } from "react";
import {
  ChevronRight, Truck, MapPin, ShieldCheck, Globe,
  Calendar, Users, BadgeCheck,
  Anchor, Globe2, Shield, CheckCircle2, Award, Trophy,
  Zap, CheckCircle, Lock, Earth, Star,
  Check, ShieldAlert, ArrowRight,
} from "lucide-react";
import Footer from "../Footer";

import imgSeaFreight  from "../../assets/sea-freight.jfif";
import imgAirFreight  from "../../assets/air-freight.jfif";
import imgCustoms     from "../../assets/customs-clearance.jfif";
import imgWarehousing from "../../assets/warehousing.jfif";
import imgTrucking    from "../../assets/trucking.jfif";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
  { title: "Sea Freight",       subtitle: "Ocean Shipping",  image: imgSeaFreight,  color: "#0369a1", rotate: -18, zIndex: 1, delay: "0ms"   },
  { title: "Air Freight",       subtitle: "Express Cargo",   image: imgAirFreight,  color: "#5b3a8e", rotate: -9,  zIndex: 2, delay: "60ms"  },
  { title: "Customs Clearance", subtitle: "Sea & Air · AEO", image: imgCustoms,     color: "#0a1628", rotate: 0,   zIndex: 3, delay: "120ms" },
  { title: "Warehousing",       subtitle: "Free & Bonded",   image: imgWarehousing, color: "#0a6e3f", rotate: 9,   zIndex: 2, delay: "60ms"  },
  { title: "Trucking",          subtitle: "Door-to-Door",    image: imgTrucking,    color: "#b45309", rotate: 18,  zIndex: 1, delay: "0ms"   },
];

const PILLS = [
  { label: "35+ Years",     sub: "Est. 1989",      side: "left",  top: "28%", color: "#0a1628", Icon: Calendar   },
  { label: "8 Countries",   sub: "East & Central", side: "right", top: "22%", color: "#5b3a8e", Icon: Globe2     },
  { label: "250+ Staff",    sub: "Professionals",  side: "left",  top: "62%", color: "#0369a1", Icon: Users      },
  { label: "ISO Certified", sub: "9001 · 22000",   side: "right", top: "60%", color: "#0a6e3f", Icon: BadgeCheck },
];

const ROAD_PATH =
  "M 100,0 C 100,40 100,45 100,70 " +
  "C 100,115 52,145 52,180 " +
  "C 52,228 148,262 148,295 " +
  "C 148,343 52,378 52,410 " +
  "C 52,458 148,492 148,520 " +
  "C 148,568 100,602 100,630 " +
  "C 100,662 100,688 100,700";

const TIMELINE = [
  { year: "1989", title: "Founded",        stat: "Est. 1989",   desc: "Incorporated in Mombasa as a wholly Kenyan-owned freight & clearing company.", Icon: Anchor,       color: "#ff8c00", cx: 100 },
  { year: "1995", title: "Regional Growth", stat: "5 Offices",  desc: "Opened in Nairobi; cross-border presence at Malaba, Namanga & Holili.",        Icon: Globe2,       color: "#0369a1", cx: 52  },
  { year: "2005", title: "ISO 9001",        stat: "Certified",   desc: "Quality management certification — raising the bar for East African logistics.", Icon: Shield,       color: "#5b3a8e", cx: 148 },
  { year: "2012", title: "ISO 22000",       stat: "Food Safety", desc: "Added food safety cert for cold-chain and perishable cargo handling.",           Icon: CheckCircle2, color: "#0a6e3f", cx: 52  },
  { year: "2018", title: "AEO Status",      stat: "EAC AEO",     desc: "Authorized Economic Operator — priority customs clearance across the EAC.",      Icon: Award,        color: "#be123c", cx: 148 },
  { year: "2023", title: "Kenya Top 100",   stat: "Top 100",     desc: "Recognized among Kenya's Top 100 Mid-Sized Companies for sustained excellence.", Icon: Trophy,       color: "#b45309", cx: 100 },
];

const CORE_VALUES = [
  { Icon: Zap,         title: "Speed",         color: "#0369a1", bg: "rgba(3,105,161,0.08)",  desc: "Systems audited continuously to eliminate delays at every checkpoint." },
  { Icon: CheckCircle, title: "Accuracy",      color: "#0a6e3f", bg: "rgba(10,110,63,0.08)", desc: "Error-free billing and proactive communication on every cargo movement." },
  { Icon: Lock,        title: "Safety",        color: "#be123c", bg: "rgba(190,18,60,0.08)", desc: "GPS-monitored fleet and ISO-certified warehousing for zero-risk delivery." },
  { Icon: Earth,       title: "Coverage",      color: "#5b3a8e", bg: "rgba(91,58,142,0.08)", desc: "8 countries, all major ports, airports and border crossings in East Africa." },
  { Icon: Users,       title: "Customer Focus",color: "#b45309", bg: "rgba(180,83,9,0.08)",  desc: "We place the highest priority on understanding and exceeding client expectations." },
  { Icon: Star,        title: "Competence",    color: "#ff8c00", bg: "rgba(255,140,0,0.08)", desc: "Careful recruitment, training and performance management keep our team world-class." },
];

const COMMITMENTS = [
  "Achieve high quality service through continuous staff training and development.",
  "Continuously provide feedback to our varied customers.",
  "Expand knowledge in local and international trade regulations.",
  "Respond promptly and efficiently to all service requests.",
  "Maintain high-level integrity and professionalism at all times.",
  "Adhere strictly to ISO 9001:2015 and ISO 22000:2018 quality standards.",
  "Maintain a team that is friendly, approachable and proactive.",
  "Provide consistent, accurate and impartial service information.",
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCountUp(target: string, run: boolean) {
  const num    = parseInt(target.replace(/\D/g, ""), 10);
  const suffix = target.replace(/[0-9]/g, "");
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let s = 0;
    const t = setInterval(() => {
      s += num / (1400 / 16);
      if (s >= num) { setV(num); clearInterval(t); }
      else setV(Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [run, num]);
  return v + suffix;
}

function CountStat({ value, label, sub, run }: { value: string; label: string; sub: string; run: boolean }) {
  const display = useCountUp(value, run);
  return (
    <div style={{ padding: "32px 28px", background: "#fff" }}>
      <div style={{ fontSize: "clamp(42px,5vw,58px)", fontWeight: 800, color: "#0a1628", letterSpacing: "-3px", lineHeight: 1, marginBottom: "6px" }}>{display}</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0a1628", marginBottom: "3px" }}>{label}</div>
      <div style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [statsRun, setStatsRun] = useState(false);
  const [hovered, setHovered]   = useState<string | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); };
    u();
    window.addEventListener("resize", u);
    const t = setTimeout(() => setMounted(true), 80);
    return () => { window.removeEventListener("resize", u); clearTimeout(t); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsRun(true); }, { threshold: 0.2 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const hp     = isMobile ? "0 16px" : isTablet ? "0 40px" : "0 96px";
  const CARD_W = isMobile ? 140 : isTablet ? 180 : 210;
  const CARD_H = isMobile ? 190 : isTablet ? 240 : 280;
  const X_STEP = isMobile ? 75  : isTablet ? 95  : 115;

  return (
    <div style={{ background: "#ffffff", fontFamily: "'DM Sans','Inter',sans-serif", overflowX: "hidden" }}>

      <style>{`
        @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pillLeft  { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes pillRight { from { opacity:0; transform:translateX(20px);  } to { opacity:1; transform:translateX(0); } }
      `}</style>

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", paddingTop: isMobile ? "56px" : "72px", paddingBottom: 0, paddingLeft: 0, paddingRight: 0, textAlign: "center", position: "relative", overflow: "hidden", minHeight: isMobile ? "auto" : "90vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(10,22,40,0.03) 0%, transparent 70%)" }} />

        {/* Badge + Headline + Short description */}
        <div style={{ position: "relative", zIndex: 10, padding: isMobile ? "0 20px" : "0 40px", animation: mounted ? "fadeUp .7s cubic-bezier(.22,1,.36,1) both" : "none", display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#fff", border: "1.5px solid rgba(10,22,40,0.10)", borderRadius: "100px", padding: "5px 16px 5px 7px", marginBottom: "20px", boxShadow: "0 2px 12px rgba(10,22,40,0.06)" }}>
            <span style={{ background: "#0a1628", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", letterSpacing: ".6px" }}>
              ABOUT US
            </span>
            <span style={{ color: "#6b7280", fontSize: "12px", fontWeight: 500 }}>Ufanisi Freighters (K) Ltd</span>
          </div>

          {/* H1 */}
          <h1 style={{ fontSize: isMobile ? "38px" : isTablet ? "58px" : "clamp(60px,7.5vw,96px)", fontWeight: 800, color: "#0a1628", lineHeight: 1.0, letterSpacing: isMobile ? "-2px" : "-4px", margin: "0 auto 18px", maxWidth: "860px" }}>
            A place to move<br />your <span style={{ color: "#5b3a8e" }}>cargo</span> with precision.
          </h1>

          {/* Short description */}
          <p style={{ fontSize: isMobile ? "15px" : "17px", color: "#6b7280", margin: 0, lineHeight: 1.6, maxWidth: "400px", fontWeight: 400 }}>
            We only have one customer — <span style={{ color: "#0a1628", fontWeight: 600 }}>you.</span>
          </p>
        </div>

        {/* Fan cards + floating pills */}
        <div style={{ position: "relative", width: "100%", height: isMobile ? "260px" : isTablet ? "340px" : "420px", marginTop: isMobile ? "8px" : "24px", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>

          {/* Floating pills */}
          {!isMobile && PILLS.map((pill, i) => (
            <div key={pill.label} style={{ position: "absolute", [pill.side]: isTablet ? "2%" : "6%", top: pill.top, zIndex: 20, animation: mounted ? `${pill.side === "left" ? "pillLeft" : "pillRight"} .8s cubic-bezier(.22,1,.36,1) ${180 + i * 80}ms both` : "none" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#ffffff", border: "1.5px solid rgba(10,22,40,0.10)", borderRadius: "100px", padding: "8px 16px 8px 10px", boxShadow: "0 4px 24px rgba(10,22,40,0.10)", whiteSpace: "nowrap" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: pill.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <pill.Icon size={13} color="#fff" strokeWidth={2.2} />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0a1628", lineHeight: 1 }}>{pill.label}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.4, marginTop: "2px" }}>{pill.sub}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Fan cards */}
          {CARDS.map((card, i) => {
            const offsetX       = (i - 2) * X_STEP;
            const fromTransform = `translateX(${offsetX}px) translateY(80px) rotate(${card.rotate * 0.4}deg)`;
            const toTransform   = `translateX(${offsetX}px) translateY(0px) rotate(${card.rotate}deg)`;
            return (
              <div key={card.title}
                style={{ position: "absolute", bottom: 0, left: "50%", width: `${CARD_W}px`, height: `${CARD_H}px`, marginLeft: `-${CARD_W / 2}px`, zIndex: card.zIndex + (i === 2 ? 10 : 0), transformOrigin: "bottom center", transform: mounted ? toTransform : fromTransform, opacity: mounted ? 1 : 0, transition: mounted ? `transform .85s cubic-bezier(.22,1,.36,1) ${card.delay}, opacity .5s ease ${card.delay}` : "none", borderRadius: "18px", overflow: "hidden", border: "3px solid #ffffff", boxShadow: i === 2 ? "0 32px 80px rgba(10,22,40,0.20),0 8px 24px rgba(10,22,40,0.12)" : "0 16px 48px rgba(10,22,40,0.14),0 4px 12px rgba(10,22,40,0.08)", cursor: "pointer" }}
                onMouseEnter={e => { if (i !== 2) { const d = e.currentTarget as HTMLDivElement; d.style.zIndex = "25"; d.style.transform = `translateX(${offsetX}px) translateY(-14px) rotate(${card.rotate * 0.3}deg)`; d.style.boxShadow = "0 32px 72px rgba(10,22,40,0.22)"; } }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.zIndex = String(card.zIndex + (i === 2 ? 10 : 0)); d.style.transform = toTransform; d.style.boxShadow = i === 2 ? "0 32px 80px rgba(10,22,40,0.20),0 8px 24px rgba(10,22,40,0.12)" : "0 16px 48px rgba(10,22,40,0.14),0 4px 12px rgba(10,22,40,0.08)"; }}
              >
                <img src={card.image} alt={card.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${card.color}f0 0%,${card.color}80 35%,transparent 65%)` }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: card.color }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 14px 16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>{card.title}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>{card.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div style={{ position: "relative", zIndex: 10, padding: isMobile ? "32px 20px 56px" : "40px 40px 72px", animation: mounted ? "fadeUp .8s cubic-bezier(.22,1,.36,1) 300ms both" : "none" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="/services" style={{ textDecoration: "none" }}>
              <button style={{ background: "#0a1628", color: "#fff", border: "none", padding: "13px 28px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: "7px", boxShadow: "0 4px 16px rgba(10,22,40,0.22)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(10,22,40,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,22,40,0.22)"; }}>
                <Truck size={15} strokeWidth={2.2} />Our Services
              </button>
            </a>
            <a href="/contact" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", color: "#0a1628", border: "1.5px solid rgba(10,22,40,0.18)", padding: "13px 28px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#0a1628"; e.currentTarget.style.background = "rgba(10,22,40,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(10,22,40,0.18)"; e.currentTarget.style.background = "transparent"; }}>
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 2 — WHO WE ARE + STATS
      ════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{ background: "#f0f2f5", padding: isMobile ? "56px 16px" : isTablet ? "64px 40px" : "80px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "360px 1fr", gap: "20px", alignItems: "start" }}>

          {/* ── Dark bio card ── */}
          <div style={{ background: "linear-gradient(160deg,#0a1628 0%,#0d1f3c 70%,#1a2a5e 100%)", borderRadius: "24px", padding: "36px 28px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "240px", height: "240px", background: "radial-gradient(circle,rgba(91,58,142,0.22) 0%,transparent 70%)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "180px", height: "180px", background: "radial-gradient(circle,rgba(255,140,0,0.1) 0%,transparent 70%)", borderRadius: "50%" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.3)", borderRadius: "100px", padding: "4px 12px", marginBottom: "20px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff8c00" }} />
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#ff8c00", letterSpacing: "0.6px" }}>WHO WE ARE</span>
              </div>

              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.5px", lineHeight: 1.2 }}>We're Ufanisi Freighters.</h2>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.78, margin: "0 0 22px" }}>
                A wholly Kenyan-owned company incorporated in Mombasa in 1989. We've grown to become East and Central Africa's most trusted logistics provider — by sea, air, and land.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {[
                  { Icon: MapPin,      text: "Mombasa HQ · Nairobi · Malaba · Holili · Namanga" },
                  { Icon: ShieldCheck, text: "ISO 9001:2015 · ISO 22000:2018 · EAC AEO"          },
                  { Icon: Globe,       text: "Kenya · Uganda · Tanzania · Rwanda · Burundi · DRC · S. Sudan · Zambia" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <row.Icon size={13} color="rgba(255,255,255,0.4)" style={{ marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{row.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "0 0 20px" }} />

              <div style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
                  <div style={{ width: "3px", height: "14px", background: "#ff8c00", borderRadius: "2px", flexShrink: 0 }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#ff8c00", textTransform: "uppercase", letterSpacing: "0.8px" }}>Our Vision</span>
                </div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, paddingLeft: "10px" }}>
                  A global leader in freight and allied services — respected for effective, timely and professional service delivery.
                </p>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
                  <div style={{ width: "3px", height: "14px", background: "#5b8fff", borderRadius: "2px", flexShrink: 0 }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#5b8fff", textTransform: "uppercase", letterSpacing: "0.8px" }}>Our Mission</span>
                </div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, paddingLeft: "10px" }}>
                  Committed to handling, preserving and moving freight with utmost speed, safety, accuracy and efficiency — supported by our professional staff.
                </p>
              </div>
            </div>

            <a href="/services" style={{ textDecoration: "none", marginTop: "24px", position: "relative", zIndex: 1 }}>
              <button style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff", padding: "12px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
                Explore Services <ChevronRight size={13} strokeWidth={2.2} />
              </button>
            </a>
          </div>

          {/* ── 2×2 stat cards ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              {
                value: "35+",  label: "Years",        tag: "Est. 1989",
                sub: "Serving East & Central Africa with world-class freight solutions.",
                color: "#ff8c00", colorLight: "rgba(255,140,0,0.12)",
                chart: (
                  <svg viewBox="0 0 120 52" style={{ width: "100%", height: "52px" }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff8c00" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#ff8c00" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,48 L20,38 L40,32 L60,22 L80,14 L100,8 L120,2" fill="none" stroke="#ff8c00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0,48 L20,38 L40,32 L60,22 L80,14 L100,8 L120,2 L120,52 L0,52Z" fill="url(#g1)" />
                    <circle cx="100" cy="8" r="3.5" fill="#ff8c00" />
                  </svg>
                ),
              },
              {
                value: "250+", label: "Employees",    tag: "EAC Region",
                sub: "Dedicated professionals operating across 8 East African nations.",
                color: "#0369a1", colorLight: "rgba(3,105,161,0.10)",
                chart: (
                  <svg viewBox="0 0 120 52" style={{ width: "100%", height: "52px" }}>
                    {[
                      { x: 4,  h: 20 }, { x: 22, h: 28 }, { x: 40, h: 22 },
                      { x: 58, h: 36 }, { x: 76, h: 30 }, { x: 94, h: 44 },
                    ].map((bar, i) => (
                      <rect key={i} x={bar.x} y={52 - bar.h} width="14" height={bar.h}
                        rx="4" fill={i === 5 ? "#0369a1" : "rgba(3,105,161,0.18)"} />
                    ))}
                  </svg>
                ),
              },
              {
                value: "8",    label: "Countries",    tag: "& Growing",
                sub: "From Kenya to Zambia — covering the full East & Central Africa corridor.",
                color: "#0a6e3f", colorLight: "rgba(10,110,63,0.10)",
                chart: (
                  <svg viewBox="0 0 120 52" style={{ width: "100%", height: "52px" }}>
                    <circle cx="60" cy="26" r="22" fill="none" stroke="rgba(10,110,63,0.15)" strokeWidth="10" />
                    <circle cx="60" cy="26" r="22" fill="none" stroke="#0a6e3f" strokeWidth="10"
                      strokeDasharray="110 138" strokeDashoffset="34.5" strokeLinecap="round"
                      style={{ transform: "rotate(-90deg)", transformOrigin: "60px 26px" }} />
                    <text x="60" y="30" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0a6e3f">8</text>
                  </svg>
                ),
              },
              {
                value: "99%",  label: "Satisfaction", tag: "All Time",
                sub: "Consistent client feedback sustained across three decades of service.",
                color: "#5b3a8e", colorLight: "rgba(91,58,142,0.10)",
                chart: (
                  <svg viewBox="0 0 120 52" style={{ width: "100%", height: "52px" }}>
                    <defs>
                      <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5b3a8e" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#5b3a8e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,38 C20,38 25,10 60,10 C95,10 100,38 120,36" fill="none" stroke="#5b3a8e" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M0,38 C20,38 25,10 60,10 C95,10 100,38 120,36 L120,52 L0,52Z" fill="url(#g4)" />
                    <circle cx="60" cy="10" r="4" fill="#5b3a8e" />
                    <circle cx="60" cy="10" r="7" fill="rgba(91,58,142,0.2)" />
                  </svg>
                ),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                onMouseEnter={() => setHovered(`s-${stat.label}`)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "#ffffff", borderRadius: "20px", padding: "22px 20px 18px",
                  border: "1px solid rgba(10,22,40,0.07)",
                  boxShadow: hovered === `s-${stat.label}` ? `0 16px 40px rgba(10,22,40,0.10), 0 2px 8px ${stat.color}18` : "0 2px 12px rgba(10,22,40,0.05)",
                  transition: "all .25s ease",
                  transform: hovered === `s-${stat.label}` ? "translateY(-4px)" : "translateY(0)",
                  display: "flex", flexDirection: "column", gap: "0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#0a1628" }}>{stat.label}</span>
                  <span style={{ fontSize: "10px", fontWeight: 600, color: stat.color, background: stat.colorLight, padding: "3px 8px", borderRadius: "100px", letterSpacing: "0.3px" }}>{stat.tag}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "14px" }}>
                  <span style={{ fontSize: "clamp(32px,4vw,42px)", fontWeight: 800, color: "#0a1628", letterSpacing: "-2px", lineHeight: 1 }}>
                    {statsRun ? stat.value : "0"}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "6px" }}>
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke={stat.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ margin: "0 -4px 14px" }}>{stat.chart}</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: 1.55, margin: 0, flex: 1 }}>{stat.sub}</p>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: stat.colorLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ArrowRight size={12} color={stat.color} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 3 — TIMELINE
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f9fb", padding: isMobile ? "56px 16px" : isTablet ? "72px 40px" : "88px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "48px" : "64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ width: "28px", height: "2px", background: "#0369a1", borderRadius: "2px" }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#0369a1", letterSpacing: "1px", textTransform: "uppercase" }}>Our History</span>
            <div style={{ width: "28px", height: "2px", background: "#0369a1", borderRadius: "2px" }} />
          </div>
          <h2 style={{ fontSize: isMobile ? "30px" : "clamp(32px,4vw,52px)", fontWeight: 800, color: "#0a1628", margin: "0 0 12px", letterSpacing: "-2px", lineHeight: 1.05 }}>
            35 years of <span style={{ color: "#5b3a8e" }}>growth.</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "360px", margin: "0 auto", lineHeight: 1.6 }}>
            From a single Mombasa office to East Africa's leading logistics group.
          </p>
        </div>

        {!isMobile && (
          <div style={{ position: "relative", maxWidth: isTablet ? "760px" : "960px", margin: "0 auto" }}>
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, width: isTablet ? "160px" : "200px", height: "100%", zIndex: 0, pointerEvents: "none" }}>
              <svg viewBox="0 0 200 700" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
                <defs>
                  <filter id="vShadow" x="-20%" y="-2%" width="140%" height="104%">
                    <feDropShadow dx="2" dy="0" stdDeviation="4" floodColor="#0a1628" floodOpacity="0.12" />
                  </filter>
                </defs>
                <path d={ROAD_PATH} fill="none" stroke="#1a2535" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" filter="url(#vShadow)" />
                <path d={ROAD_PATH} fill="none" stroke="#232f3e" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d={ROAD_PATH} fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="12 9" />
              </svg>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              {TIMELINE.map((m, i) => {
                const cardLeft = m.cx >= 100;
                return (
                  <div key={m.year} style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr 160px 1fr" : "1fr 200px 1fr", alignItems: "center", minHeight: isTablet ? "112px" : "118px" }}>
                    <div style={{ paddingRight: isTablet ? "24px" : "36px", display: "flex", justifyContent: "flex-end" }}>
                      {cardLeft && (
                        <div onMouseEnter={() => setHovered(m.year)} onMouseLeave={() => setHovered(null)}
                          style={{ background: "#fff", borderRadius: "18px", padding: "18px 20px", border: hovered === m.year ? `1.5px solid ${m.color}35` : "1.5px solid rgba(10,22,40,0.07)", boxShadow: hovered === m.year ? "0 12px 32px rgba(10,22,40,0.10)" : "0 2px 10px rgba(10,22,40,0.05)", transition: "all .22s ease", maxWidth: "280px", width: "100%", cursor: "default" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{m.year} · {m.stat}</div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628", marginBottom: "5px" }}>{m.title}</div>
                          <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 5 }}>
                      <div style={{ width: "44px", height: "44px", background: "#f8f9fb", borderRadius: "50%", border: `2.5px solid ${m.color}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 6px #f8f9fb, 0 4px 16px ${m.color}40` }}>
                        <m.Icon size={19} color={m.color} strokeWidth={1.9} />
                      </div>
                    </div>
                    <div style={{ paddingLeft: isTablet ? "24px" : "36px", display: "flex", justifyContent: "flex-start" }}>
                      {!cardLeft && (
                        <div onMouseEnter={() => setHovered(m.year)} onMouseLeave={() => setHovered(null)}
                          style={{ background: "#fff", borderRadius: "18px", padding: "18px 20px", border: hovered === m.year ? `1.5px solid ${m.color}35` : "1.5px solid rgba(10,22,40,0.07)", boxShadow: hovered === m.year ? "0 12px 32px rgba(10,22,40,0.10)" : "0 2px 10px rgba(10,22,40,0.05)", transition: "all .22s ease", maxWidth: "280px", width: "100%", cursor: "default" }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{m.year} · {m.stat}</div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628", marginBottom: "5px" }}>{m.title}</div>
                          <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ position: "relative", paddingLeft: "52px" }}>
            <div style={{ position: "absolute", left: "19px", top: 0, bottom: 0, width: "2px", background: "linear-gradient(to bottom,transparent,rgba(10,22,40,0.15) 5%,rgba(10,22,40,0.15) 95%,transparent)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {TIMELINE.map(m => (
                <div key={m.year} style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "-44px", top: "14px", width: "30px", height: "30px", background: "#f8f9fb", borderRadius: "50%", border: `2px solid ${m.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <m.Icon size={14} color={m.color} strokeWidth={2} />
                  </div>
                  <div style={{ background: "#fff", borderRadius: "14px", padding: "16px 18px", border: "1px solid rgba(10,22,40,0.07)", boxShadow: "0 2px 10px rgba(10,22,40,0.05)" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{m.year} · {m.stat}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a1628", marginBottom: "5px" }}>{m.title}</div>
                    <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 4 — CORE VALUES
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: isMobile ? "56px 16px" : isTablet ? "64px 40px" : "80px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "36px" : "52px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(91,58,142,0.07)", border: "1px solid rgba(91,58,142,0.15)", borderRadius: "100px", padding: "5px 14px", marginBottom: "14px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#5b3a8e" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#5b3a8e", letterSpacing: "0.8px", textTransform: "uppercase" }}>What Drives Us</span>
          </div>
          <h2 style={{ fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#0a1628", margin: "0 0 10px", letterSpacing: "-1.5px", lineHeight: 1.08 }}>Our Core Values</h2>
          <p style={{ fontSize: "15px", color: "#6b7280", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>Six pillars that define how we work and serve every day.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: "14px" }}>
          {CORE_VALUES.map(v => (
            <div key={v.title} onMouseEnter={() => setHovered(v.title)} onMouseLeave={() => setHovered(null)}
              style={{ background: hovered === v.title ? "#fff" : "#f8f9fb", borderRadius: "20px", padding: "26px 22px", border: hovered === v.title ? `1.5px solid ${v.color}25` : "1.5px solid rgba(10,22,40,0.05)", transition: "all .22s ease", transform: hovered === v.title ? "translateY(-5px)" : "translateY(0)", boxShadow: hovered === v.title ? "0 16px 40px rgba(10,22,40,0.09)" : "0 2px 8px rgba(10,22,40,0.03)" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "13px", background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <v.Icon size={20} color={v.color} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628", margin: "0 0 7px" }}>{v.title}</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 5 — COMMITMENT
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#0a1628", padding: isMobile ? "56px 16px" : isTablet ? "64px 40px" : "80px 96px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(91,58,142,0.15) 0%,transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "start" }}>
          <div style={{ position: isMobile ? "static" : "sticky", top: "100px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px", padding: "5px 14px", marginBottom: "20px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff8c00" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.8px", textTransform: "uppercase" }}>Our Commitment</span>
            </div>
            <h2 style={{ fontSize: isMobile ? "28px" : "clamp(28px,3vw,42px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-1.5px", lineHeight: 1.08 }}>
              Proud of our<br />professional team.
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.78, margin: "0 0 32px", maxWidth: "320px" }}>
              These standards define our culture. We hold ourselves accountable to each one, every single day.
            </p>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ShieldAlert size={17} color="#ff8c00" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>ISO 9001:2015 · ISO 22000:2018</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)" }}>Certified quality & food safety management</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {COMMITMENTS.map((item, i) => (
              <div key={i} onMouseEnter={() => setHovered(`c-${i}`)} onMouseLeave={() => setHovered(null)}
                style={{ background: hovered === `c-${i}` ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)", border: hovered === `c-${i}` ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.07)", borderRadius: "13px", padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: "12px", transition: "all .2s ease", cursor: "default" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: hovered === `c-${i}` ? "rgba(255,140,0,0.2)" : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .2s", marginTop: "1px" }}>
                  <Check size={10} color={hovered === `c-${i}` ? "#ff8c00" : "rgba(255,255,255,0.45)"} strokeWidth={3} />
                </div>
                <p style={{ fontSize: "13px", color: hovered === `c-${i}` ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0, transition: "color .2s" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 6 — TEAM
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: isMobile ? "64px 16px" : isTablet ? "80px 40px" : "96px 96px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-55%)", fontSize: "clamp(280px,30vw,480px)", fontWeight: 900, color: "rgba(10,22,40,0.025)", lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: "-20px", zIndex: 0 }}>U</div>
        <svg style={{ position: "absolute", top: "50%", left: 0, right: 0, width: "100%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 0 }} height="120" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,20 250,100 400,60 C550,20 650,100 800,60 C950,20 1050,100 1200,60" fill="none" stroke="rgba(3,105,161,0.12)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        {!isMobile && [
          { top: "22%", left: "18%", size: 10, color: "#ff8c00", opacity: 0.55 },
          { top: "28%", left: "72%", size: 8,  color: "#0369a1", opacity: 0.55 },
          { top: "70%", left: "38%", size: 13, color: "#0a6e3f", opacity: 0.5  },
          { top: "65%", left: "62%", size: 7,  color: "#ff8c00", opacity: 0.4  },
          { top: "20%", left: "52%", size: 6,  color: "#5b3a8e", opacity: 0.45 },
        ].map((dot, i) => (
          <div key={i} style={{ position: "absolute", top: dot.top, left: dot.left, width: `${dot.size}px`, height: `${dot.size}px`, borderRadius: "50%", background: dot.color, opacity: dot.opacity, pointerEvents: "none", zIndex: 0 }} />
        ))}

        <div style={{ textAlign: "center", marginBottom: isMobile ? "48px" : "64px", position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280", margin: "0 0 10px", letterSpacing: "0.2px" }}>Meet the People Behind the Operation</p>
          <h2 style={{ fontSize: isMobile ? "28px" : "clamp(30px,4vw,50px)", fontWeight: 800, color: "#0a1628", margin: "0 0 14px", letterSpacing: "-2px", lineHeight: 1.05 }}>Our Leadership Team</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "64px", height: "4px", background: "linear-gradient(90deg,#ff8c00,#ffb347)", borderRadius: "100px" }} />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(4,1fr)", gap: isMobile ? "16px" : "20px", maxWidth: "1040px", margin: "0 auto" }}>
          {[
            { name: "James Mwangi",  role: "Chief Executive Officer",       initials: "JM", color: "#0a1628", bg: "linear-gradient(135deg,#0a1628,#1a2a5e)" },
            { name: "Amina Hassan",  role: "Chief Operating Officer",       initials: "AH", color: "#0369a1", bg: "linear-gradient(135deg,#0369a1,#0ea5e9)" },
            { name: "Peter Ochieng", role: "Head of Customs Clearance",     initials: "PO", color: "#5b3a8e", bg: "linear-gradient(135deg,#5b3a8e,#7c3aed)" },
            { name: "Sarah Kimani",  role: "Head of Sea Freight",           initials: "SK", color: "#0a6e3f", bg: "linear-gradient(135deg,#0a6e3f,#16a34a)" },
            { name: "David Mutua",   role: "Head of Air Freight",           initials: "DM", color: "#b45309", bg: "linear-gradient(135deg,#b45309,#f59e0b)" },
            { name: "Grace Wanjiku", role: "Head of Warehousing",           initials: "GW", color: "#be123c", bg: "linear-gradient(135deg,#be123c,#f43f5e)" },
            { name: "Brian Otieno",  role: "Head of Cross Border Ops",      initials: "BO", color: "#0f766e", bg: "linear-gradient(135deg,#0f766e,#14b8a6)" },
            { name: "Fatuma Ali",    role: "Finance & Compliance Director",  initials: "FA", color: "#7c3aed", bg: "linear-gradient(135deg,#7c3aed,#a78bfa)" },
          ].map((member, i) => (
            <div key={member.name} onMouseEnter={() => setHovered(`tm-${i}`)} onMouseLeave={() => setHovered(null)}
              style={{ background: "#ffffff", borderRadius: "20px", padding: isMobile ? "20px 14px 18px" : "28px 20px 22px", border: hovered === `tm-${i}` ? `1.5px solid ${member.color}25` : "1.5px solid rgba(10,22,40,0.07)", boxShadow: hovered === `tm-${i}` ? `0 20px 48px rgba(10,22,40,0.12), 0 4px 12px ${member.color}20` : "0 4px 20px rgba(10,22,40,0.06)", transition: "all .28s cubic-bezier(.22,1,.36,1)", transform: hovered === `tm-${i}` ? "translateY(-8px)" : "translateY(0)", cursor: "default", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", background: `radial-gradient(circle,${member.color}18 0%,transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
              <div style={{ width: isMobile ? "64px" : "80px", height: isMobile ? "64px" : "80px", borderRadius: "50%", background: member.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? "18px" : "22px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px", marginBottom: isMobile ? "12px" : "16px", border: "3px solid #ffffff", boxShadow: `0 8px 24px ${member.color}40`, flexShrink: 0, position: "relative", zIndex: 1 }}>
                {member.initials}
              </div>
              <div style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 700, color: "#0a1628", marginBottom: "4px", lineHeight: 1.2, position: "relative", zIndex: 1 }}>{member.name}</div>
              <div style={{ fontSize: isMobile ? "10px" : "12px", color: member.color, fontWeight: 600, lineHeight: 1.4, position: "relative", zIndex: 1 }}>{member.role}</div>
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: hovered === `tm-${i}` ? "60%" : "0%", height: "3px", background: `linear-gradient(90deg,transparent,${member.color},transparent)`, borderRadius: "100px", transition: "width .35s cubic-bezier(.22,1,.36,1)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 7 — CTA STRIP
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f0f2f5", padding: isMobile ? "48px 16px" : isTablet ? "56px 40px" : "64px 96px" }}>
        <div style={{ background: "linear-gradient(135deg,#1a2a5e 0%,#5b3a8e 60%,#7c3aed 100%)", borderRadius: "28px", padding: isMobile ? "40px 24px" : "56px 64px", position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: "32px", alignItems: "center" }}>
          <div style={{ position: "absolute", top: "-80px", right: "15%", width: "360px", height: "360px", background: "radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: isMobile ? "24px" : "clamp(24px,3vw,38px)", fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: "-1px", lineHeight: 1.1 }}>Ready to move your cargo?</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.58)", margin: 0, lineHeight: 1.65, maxWidth: "420px" }}>Get a free freight quote within minutes — by land, air or sea.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <a href="/contact" style={{ textDecoration: "none" }}>
              <button style={{ background: "#fff", color: "#0a1628", border: "none", padding: "13px 26px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all .2s", display: "inline-flex", alignItems: "center", gap: "6px" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                Get a Free Quote <ArrowRight size={14} strokeWidth={2.2} />
              </button>
            </a>
            <a href="/tracking" style={{ textDecoration: "none" }}>
              <button style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)", padding: "13px 26px", borderRadius: "100px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}>
                Track Cargo
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
