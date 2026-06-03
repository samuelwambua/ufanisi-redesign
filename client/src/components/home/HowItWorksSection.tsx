import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Request a Quote",
    description: "Tell us about your cargo — what it is, where it's from, and where it needs to go.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: "#ff8c00",
    dark: false,
  },
  {
    number: "02",
    title: "Cargo Assessment",
    description: "Our experts review your shipment and recommend the best route and transport mode.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    color: "#0369a1",
    dark: true,
  },
  {
    number: "03",
    title: "Documentation & Clearance",
    description: "We handle all paperwork and customs so your cargo clears borders without delays.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <polyline points="9 15 11 17 15 13"/>
      </svg>
    ),
    color: "#5b3a8e",
    dark: true,
  },
  {
    number: "04",
    title: "Transport & Tracking",
    description: "Your cargo moves by sea, air, or road — with real-time updates at every step.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    color: "#0a6e3f",
    dark: true,
  },
  {
    number: "05",
    title: "Delivery & Confirmation",
    description: "Cargo arrives safely. We confirm delivery and follow up to ensure all went smoothly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    color: "#0a1628",
    dark: true,
  },
];

// SVG path that snakes down the centre — curves left/right to meet each pill
// Viewbox: 200 wide, 860 tall (172px per step)
const SNAKE_PATH = `
  M 100,0
  C 100,30 100,50 100,72
  C 100,110 160,124 160,162
  C 160,200 100,214 100,252
  C 100,290 40,304 40,342
  C 40,380 100,394 100,432
  C 100,470 160,484 160,522
  C 160,560 100,574 100,612
  C 100,650 100,680 100,720
`;

// Dot positions along the path — where each step node sits (y values)
const NODE_Y = [72, 252, 432, 522, 612];
// Which side each pill is on: true = right side, false = left side
const PILL_RIGHT = [true, false, true, false, true];
// Corresponding x for each node dot
const NODE_X = [160, 40, 160, 40, 100];

export default function HowItWorksSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [pathProgress, setPathProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(Array(STEPS.length).fill(false));
  const sectionRef = useRef<HTMLElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Measure actual SVG path length after mount
  useEffect(() => {
    if (svgPathRef.current) {
      setPathLen(svgPathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const duration = 2200;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTimeRef.current = 0;
          const tick = (now: number) => {
            if (!startTimeRef.current) startTimeRef.current = now;
            const elapsed = now - startTimeRef.current;
            const raw = Math.min(elapsed / duration, 1);
            // Ease in-out cubic
            const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
            setPathProgress(eased);

            STEPS.forEach((_, i) => {
              const threshold = (i + 0.8) / (STEPS.length + 0.5);
              if (eased >= threshold) {
                setVisibleSteps(prev => {
                  if (prev[i]) return prev;
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }
            });

            if (raw < 1) animFrameRef.current = requestAnimationFrame(tick);
          };
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(animFrameRef.current);
          setPathProgress(0);
          setVisibleSteps(Array(STEPS.length).fill(false));
          startTimeRef.current = 0;
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { observer.disconnect(); cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const strokeOffset = pathLen > 0 ? pathLen * (1 - pathProgress) : pathLen;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        padding: isMobile ? "48px 16px 56px" : isTablet ? "64px 40px 72px" : "80px 96px 88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint dot-grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(10,22,40,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.2)",
            borderRadius: "100px", padding: "5px 16px", marginBottom: "16px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff8c00" }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#ff8c00", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Simple Process
            </span>
          </div>
          <h2 style={{
            fontSize: isMobile ? "26px" : "clamp(28px,3.5vw,42px)",
            fontWeight: 800, color: "#0a1628",
            margin: "0 0 12px", letterSpacing: "-1px", lineHeight: 1.1,
          }}>
            How It Works
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7280", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
            From your first message to cargo at the door — here's exactly what happens.
          </p>
        </div>

        {/* ── MOBILE: simple vertical stack ── */}
        {isMobile && (
          <div style={{ position: "relative", paddingLeft: "52px" }}>
            {/* Animated vertical line */}
            <svg style={{ position: "absolute", left: "18px", top: 0, width: "4px", height: "100%", overflow: "visible" }} width="4">
              <defs>
                <linearGradient id="mobGrad" x1="0" y1="0" x2="0" y2="1">
                  {STEPS.map((s, i) => (
                    <stop key={i} offset={`${(i / (STEPS.length - 1)) * 100}%`} stopColor={s.color} />
                  ))}
                </linearGradient>
              </defs>
              <line x1="2" y1="0" x2="2" y2="100%" stroke="rgba(10,22,40,0.08)" strokeWidth="2" strokeDasharray="5 5" />
              <line x1="2" y1="0" x2="2" y2="100%"
                stroke="url(#mobGrad)" strokeWidth="2"
                strokeDasharray="5 5"
                style={{
                  strokeDashoffset: 0,
                  opacity: pathProgress,
                  transition: "opacity 0.1s",
                }}
              />
            </svg>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {STEPS.map((step, i) => (
                <div key={step.number} style={{
                  opacity: visibleSteps[i] ? 1 : 0,
                  transform: visibleSteps[i] ? "translateX(0)" : "translateX(-16px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  transitionDelay: `${i * 80}ms`,
                  position: "relative",
                }}>
                  {/* Dot on line */}
                  <div style={{
                    position: "absolute", left: "-42px", top: "20px",
                    width: "16px", height: "16px", borderRadius: "50%",
                    background: visibleSteps[i] ? step.color : "rgba(10,22,40,0.1)",
                    border: "3px solid #ffffff",
                    boxShadow: visibleSteps[i] ? `0 0 0 3px ${step.color}30` : "none",
                    transition: "all 0.3s ease",
                    transitionDelay: `${i * 80 + 200}ms`,
                  }} />

                  <MobilePill step={step} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DESKTOP / TABLET: zigzag pill layout ── */}
        {!isMobile && (
          <div style={{
            position: "relative",
            maxWidth: "100%",
            margin: "0 auto",
          }}>
            {/* SVG snake path — sits in the centre column */}
            <svg
              viewBox="0 0 200 720"
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: 0,
                width: isTablet ? "80px" : "100px",
                height: "100%",
                pointerEvents: "none",
                zIndex: 2,
                overflow: "visible",
              }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="snakeGrad" x1="0" y1="0" x2="0" y2="1">
                  {STEPS.map((s, i) => (
                    <stop key={i} offset={`${(i / (STEPS.length - 1)) * 100}%`} stopColor={s.color} />
                  ))}
                </linearGradient>
              </defs>

              {/* Ghost track — faint dots */}
              <path
                d={SNAKE_PATH}
                fill="none"
                stroke="rgba(10,22,40,0.10)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="5 8"
              />

              {/* Animated coloured path */}
              <path
                ref={svgPathRef}
                d={SNAKE_PATH}
                fill="none"
                stroke="url(#snakeGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="5 8"
                strokeDashoffset={strokeOffset}
                style={{ transition: "stroke-dashoffset 0.04s linear" }}
              />

              {/* Step node dots — appear as path reaches them */}
              {STEPS.map((step, i) => (
                <g key={step.number}>
                  {/* Outer ring */}
                  <circle
                    cx={NODE_X[i]} cy={NODE_Y[i]} r="10"
                    fill="#ffffff"
                    stroke={visibleSteps[i] ? step.color : "rgba(10,22,40,0.12)"}
                    strokeWidth="2.5"
                    style={{ transition: "stroke 0.3s ease" }}
                  />
                  {/* Inner dot */}
                  <circle
                    cx={NODE_X[i]} cy={NODE_Y[i]} r="4"
                    fill={visibleSteps[i] ? step.color : "rgba(10,22,40,0.15)"}
                    style={{ transition: "fill 0.3s ease" }}
                  />
                </g>
              ))}
            </svg>

            {/* Step rows — each row has pill on one side, number on the other */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: isTablet ? "28px" : "36px",
            }}>
              {STEPS.map((step, i) => {
                const pillRight = PILL_RIGHT[i];
                return (
                  <div
                    key={step.number}
                    style={{
                      display: "grid",
                      gridTemplateColumns: isTablet ? `1fr 80px 1fr` : `1fr 100px 1fr`,
                      alignItems: "center",
                      gap: isTablet ? "12px" : "16px",
                      opacity: visibleSteps[i] ? 1 : 0,
                      transform: visibleSteps[i]
                        ? "translateY(0)"
                        : pillRight ? "translateX(20px)" : "translateX(-20px)",
                      transition: "opacity 0.45s ease, transform 0.45s ease",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    {/* Left slot */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      {!pillRight ? (
                        <DesktopPill step={step} index={i} isTablet={isTablet} />
                      ) : (
                        <StepNumber step={step} align="right" isTablet={isTablet} />
                      )}
                    </div>

                    {/* Centre spacer — where the SVG path sits */}
                    <div style={{ width: isTablet ? "80px" : "100px" }} />

                    {/* Right slot */}
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      {pillRight ? (
                        <DesktopPill step={step} index={i} isTablet={isTablet} />
                      ) : (
                        <StepNumber step={step} align="left" isTablet={isTablet} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", marginTop: isMobile ? "40px" : "56px" }}>
          <a href="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#0a1628", color: "#fff", border: "none",
              padding: "14px 36px", borderRadius: "100px",
              fontSize: "15px", fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "320px" : "none",
              boxShadow: "6px 6px 16px rgba(10,22,40,0.18), -3px -3px 10px rgba(255,255,255,1)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
              transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "8px 8px 20px rgba(10,22,40,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "6px 6px 16px rgba(10,22,40,0.18), -3px -3px 10px rgba(255,255,255,1)"; }}
            >
              Start Your Shipment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Desktop pill ──────────────────────────────────────────────────────────────
function DesktopPill({ step, isTablet }: { step: typeof STEPS[0]; index: number; isTablet: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        width: "100%",
        filter: hovered ? `drop-shadow(0 8px 24px ${step.color}35)` : "drop-shadow(0 4px 12px rgba(10,22,40,0.10))",
        transition: "filter 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      {/* Icon circle — 3D raised disc */}
      <div style={{
        width: isTablet ? "64px" : "72px",
        height: isTablet ? "64px" : "72px",
        borderRadius: "50%",
        background: step.dark
          ? `radial-gradient(circle at 35% 35%, ${step.color}ee, ${step.color})`
          : `radial-gradient(circle at 35% 35%, #ffaa33, ${step.color})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#ffffff",
        flexShrink: 0,
        // 3D raised effect
        boxShadow: `
          inset 0 2px 4px rgba(255,255,255,0.25),
          inset 0 -2px 4px rgba(0,0,0,0.2),
          0 4px 16px ${step.color}50
        `,
        border: "3px solid #ffffff",
        zIndex: 2,
        position: "relative",
        transition: "transform 0.25s ease",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}>
        {step.icon}
      </div>

      {/* Pill body — overlaps the icon circle slightly */}
      <div style={{
        flex: 1,
        marginLeft: "-16px",
        background: step.dark
          ? `linear-gradient(135deg, ${step.color}f0, ${step.color}dd)`
          : `linear-gradient(135deg, #ff8c00ee, #ffaa00dd)`,
        borderRadius: "0 100px 100px 0",
        padding: isTablet ? "14px 18px 14px 28px" : "16px 22px 16px 30px",
        minHeight: isTablet ? "64px" : "72px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div style={{
          fontSize: "10px", fontWeight: 700,
          color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          marginBottom: "3px",
        }}>
          Step {step.number}
        </div>
        <div style={{
          fontSize: isTablet ? "13px" : "14px",
          fontWeight: 700, color: "#ffffff",
          lineHeight: 1.25, marginBottom: "5px",
        }}>
          {step.title}
        </div>
        <div style={{
          fontSize: isTablet ? "11px" : "12px",
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.55,
        }}>
          {step.description}
        </div>
      </div>
    </div>
  );
}

// ── Step number label (opposite side from pill) ───────────────────────────────
function StepNumber({ step, align, isTablet }: { step: typeof STEPS[0]; align: "left" | "right"; isTablet: boolean }) {
  return (
    <div style={{
      textAlign: align,
      paddingLeft: align === "left" ? (isTablet ? "12px" : "20px") : "0",
      paddingRight: align === "right" ? (isTablet ? "12px" : "20px") : "0",
    }}>
      <div style={{
        fontSize: "10px", fontWeight: 700,
        color: "rgba(10,22,40,0.35)",
        letterSpacing: "1px", textTransform: "uppercase",
        marginBottom: "2px",
      }}>
        Step
      </div>
      <div style={{
        fontSize: isTablet ? "52px" : "64px",
        fontWeight: 800,
        color: step.color,
        lineHeight: 1,
        letterSpacing: "-3px",
        opacity: 0.9,
      }}>
        {step.number}
      </div>
    </div>
  );
}

// ── Mobile pill ───────────────────────────────────────────────────────────────
function MobilePill({ step }: { step: typeof STEPS[0] }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0",
      filter: "drop-shadow(0 4px 12px rgba(10,22,40,0.10))",
    }}>
      {/* Icon circle */}
      <div style={{
        width: "56px", height: "56px",
        borderRadius: "50%",
        background: step.dark
          ? `radial-gradient(circle at 35% 35%, ${step.color}ee, ${step.color})`
          : `radial-gradient(circle at 35% 35%, #ffaa33, ${step.color})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#ffffff",
        flexShrink: 0,
        boxShadow: `inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2), 0 4px 12px ${step.color}40`,
        border: "3px solid #ffffff",
        zIndex: 2,
        position: "relative",
      }}>
        {step.icon}
      </div>

      {/* Pill body */}
      <div style={{
        flex: 1,
        marginLeft: "-12px",
        background: step.dark
          ? `linear-gradient(135deg, ${step.color}f0, ${step.color}dd)`
          : `linear-gradient(135deg, #ff8c00ee, #ffaa00dd)`,
        borderRadius: "0 100px 100px 0",
        padding: "12px 16px 12px 22px",
        minHeight: "56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div style={{
          fontSize: "9px", fontWeight: 700,
          color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.8px", textTransform: "uppercase",
          marginBottom: "2px",
        }}>
          Step {step.number}
        </div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: "3px" }}>
          {step.title}
        </div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>
          {step.description}
        </div>
      </div>
    </div>
  );
}