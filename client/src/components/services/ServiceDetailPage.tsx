import { useEffect, useState } from "react";
import { ServiceData } from "./servicesData";
import Footer from "../Footer";

type Props = { service: ServiceData };

export default function ServiceDetailPage({ service }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pad = isMobile ? "0 16px" : isTablet ? "0 40px" : "0 96px";
  const secPad = isMobile ? "56px 16px" : isTablet ? "64px 40px" : "80px 96px";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#ffffff" }}>

      {/* ══════════════════════════════════
          HERO — split layout
      ══════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: isMobile ? "40px 0 0" : isTablet ? "48px 0 0" : "56px 0 0" }}>
        <div style={{ padding: pad }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <a href="/services" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
              onMouseEnter={e => e.currentTarget.style.color = "#0a1628"}
              onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All Services
            </a>
            <span style={{ color: "rgba(10,22,40,0.2)", fontSize: "13px" }}>/</span>
            <span style={{ fontSize: "13px", color: "#0a1628", fontWeight: 600 }}>{service.title}</span>
          </div>

          {/* Hero grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "32px" : "48px",
            alignItems: "center",
            paddingBottom: isMobile ? "40px" : "64px",
          }}>
            {/* Left — text */}
            <div>
              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#fff", border: "1.5px solid rgba(10,22,40,0.1)",
                borderRadius: "100px", padding: "5px 16px 5px 7px", marginBottom: "20px",
                boxShadow: "3px 3px 8px rgba(10,22,40,0.07),-2px -2px 6px rgba(255,255,255,1)",
              }}>
                <span style={{ background: "#0a1628", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", letterSpacing: ".6px" }}>
                  {service.subtitle.toUpperCase()}
                </span>
                <span style={{ color: "#4a5568", fontSize: "13px", fontWeight: 500 }}>
                  Ufanisi Freighters
                </span>
              </div>

              <h1 style={{
                fontSize: isMobile ? "36px" : isTablet ? "48px" : "clamp(44px,5vw,68px)",
                fontWeight: 800,
                color: "#0a1628",
                lineHeight: 1.05,
                letterSpacing: isMobile ? "-1.5px" : "-2.5px",
                margin: "0 0 16px",
              }}>
                {service.title}.
              </h1>

              <p style={{
                fontSize: isMobile ? "14px" : "16px",
                color: "#6b7280",
                lineHeight: 1.7,
                margin: "0 0 32px",
                maxWidth: "440px",
              }}>
                {service.tagline}
              </p>

              {/* Stat chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
                {service.stats.map((stat) => (
                  <div key={stat.label} style={{
                    background: service.bg,
                    borderRadius: "100px",
                    padding: "7px 16px",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: service.accentColor, opacity: 0.7 }} />
                    <span style={{ fontSize: "11px", fontWeight: 600, color: service.accentColor, opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.4px" }}>{stat.label}:</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#0a1628" }}>{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="/contact" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "#0a1628", color: "#fff", border: "none",
                    padding: "13px 28px", borderRadius: "100px",
                    fontSize: "14px", fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit",
                    display: "inline-flex", alignItems: "center", gap: "7px",
                    boxShadow: "0 4px 16px rgba(10,22,40,0.2)",
                    transition: "all .2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(10,22,40,0.28)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,22,40,0.2)"; }}
                  >
                    Get a Quote
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </a>
                <a href="/contact" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "transparent", color: "#0a1628",
                    border: "1.5px solid rgba(10,22,40,0.18)",
                    padding: "13px 28px", borderRadius: "100px",
                    fontSize: "14px", fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit", transition: "all .2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#0a1628"; e.currentTarget.style.background = "rgba(10,22,40,0.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(10,22,40,0.18)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    Contact Us
                  </button>
                </a>
              </div>
            </div>

            {/* Right — abstract SVG on earthy bg */}
            {!isMobile && (
              <div style={{
                background: service.bg,
                borderRadius: "28px",
                overflow: "hidden",
                height: isTablet ? "320px" : "400px",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <div style={{ width: "90%", height: "90%" }}>
                  {service.shape}
                </div>
                {/* Subtitle tag */}
                <div style={{
                  position: "absolute", bottom: "20px", left: "20px",
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  display: "flex", alignItems: "center", gap: "7px",
                }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: service.accentColor }} />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: service.accentColor, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                    {service.subtitle}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          OVERVIEW
      ══════════════════════════════════ */}
      <section style={{ background: "#f8f9fb", padding: secPad }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
          gap: isMobile ? "32px" : "64px",
          alignItems: "start",
        }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: service.bg, border: `1px solid ${service.shapeColor}40`, borderRadius: "100px", padding: "5px 14px", marginBottom: "16px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: service.accentColor }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: service.accentColor, letterSpacing: "0.8px", textTransform: "uppercase" }}>Overview</span>
            </div>
            <h2 style={{ fontSize: isMobile ? "24px" : "clamp(24px,3vw,36px)", fontWeight: 800, color: "#0a1628", margin: "0 0 12px", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Why choose Ufanisi for {service.title.toLowerCase()}?
            </h2>
            <div style={{ width: "48px", height: "4px", background: `linear-gradient(90deg, ${service.accentColor}, ${service.shapeColor})`, borderRadius: "100px", marginTop: "16px" }} />
          </div>
          <p style={{ fontSize: "16px", color: "#4a5263", lineHeight: 1.85, margin: 0, paddingTop: isMobile ? "0" : "8px" }}>
            {service.overview}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════
          KEY FEATURES
      ══════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: secPad }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "36px" : "52px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: service.bg, border: `1px solid ${service.shapeColor}40`, borderRadius: "100px", padding: "5px 14px", marginBottom: "14px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: service.accentColor }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: service.accentColor, letterSpacing: "0.8px", textTransform: "uppercase" }}>Key Features</span>
          </div>
          <h2 style={{ fontSize: isMobile ? "24px" : "clamp(26px,3vw,40px)", fontWeight: 800, color: "#0a1628", margin: 0, letterSpacing: "-1px", lineHeight: 1.1 }}>
            What's included in our {service.title.toLowerCase()} service
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : `repeat(${service.features.length <= 3 ? service.features.length : 2}, 1fr)`,
          gap: "14px",
        }}>
          {service.features.map((feature, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                background: hoveredFeature === i ? service.bg : "#f8f9fb",
                borderRadius: "20px",
                padding: "28px 24px",
                border: hoveredFeature === i ? `1.5px solid ${service.shapeColor}50` : "1.5px solid rgba(10,22,40,0.05)",
                transition: "all .25s cubic-bezier(.22,1,.36,1)",
                transform: hoveredFeature === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredFeature === i ? "0 16px 40px rgba(10,22,40,0.08)" : "0 2px 8px rgba(10,22,40,0.03)",
              }}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "13px",
                background: service.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px",
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0a1628", margin: "0 0 8px", letterSpacing: "-0.3px" }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          PROCESS — vertical zigzag timeline
      ══════════════════════════════════ */}
      <section style={{ background: "#f8f9fb", padding: secPad }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: service.bg, border: `1px solid ${service.shapeColor}40`, borderRadius: "100px", padding: "5px 14px", marginBottom: "14px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: service.accentColor }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: service.accentColor, letterSpacing: "0.8px", textTransform: "uppercase" }}>How It Works</span>
          </div>
          <h2 style={{ fontSize: isMobile ? "24px" : "clamp(26px,3vw,40px)", fontWeight: 800, color: "#0a1628", margin: 0, letterSpacing: "-1px", lineHeight: 1.1 }}>
            Our {service.title.toLowerCase()} process
          </h2>
        </div>

        {/* Zigzag timeline */}
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>
          {/* Vertical line */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "24px",
              bottom: "24px",
              width: "2px",
              background: `linear-gradient(to bottom, ${service.shapeColor}60, ${service.shapeColor}20)`,
            }} />
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "20px" : "0" }}>
            {service.steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  style={{
                    display: isMobile ? "flex" : "grid",
                    gridTemplateColumns: isMobile ? undefined : "1fr 80px 1fr",
                    gap: isMobile ? "16px" : "0",
                    alignItems: "center",
                    minHeight: isMobile ? "auto" : "100px",
                  }}
                >
                  {/* Left slot */}
                  {!isMobile && (
                    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "32px" }}>
                      {isLeft && (
                        <div style={{
                          background: "#fff",
                          borderRadius: "18px",
                          padding: "20px 22px",
                          border: `1.5px solid rgba(10,22,40,0.07)`,
                          boxShadow: "0 4px 16px rgba(10,22,40,0.06)",
                          maxWidth: "300px",
                          width: "100%",
                        }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: service.accentColor, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "5px", opacity: 0.8 }}>
                            Step {step.number}
                          </div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628", marginBottom: "6px" }}>{step.title}</div>
                          <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{step.description}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Centre — numbered circle */}
                  {!isMobile ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
                      <div style={{
                        width: "48px", height: "48px",
                        borderRadius: "50%",
                        background: service.bg,
                        border: `2.5px solid ${service.shapeColor}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 0 0 6px #f8f9fb, 0 4px 16px ${service.shapeColor}40`,
                      }}>
                        <span style={{ fontSize: "13px", fontWeight: 800, color: service.accentColor }}>
                          {step.number}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Mobile: number pill */
                    <div style={{ flexShrink: 0, width: "36px", height: "36px", borderRadius: "50%", background: service.bg, border: `2px solid ${service.shapeColor}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: service.accentColor }}>{step.number}</span>
                    </div>
                  )}

                  {/* Right slot */}
                  {!isMobile && (
                    <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "32px" }}>
                      {!isLeft && (
                        <div style={{
                          background: "#fff",
                          borderRadius: "18px",
                          padding: "20px 22px",
                          border: `1.5px solid rgba(10,22,40,0.07)`,
                          boxShadow: "0 4px 16px rgba(10,22,40,0.06)",
                          maxWidth: "300px",
                          width: "100%",
                        }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: service.accentColor, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "5px", opacity: 0.8 }}>
                            Step {step.number}
                          </div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a1628", marginBottom: "6px" }}>{step.title}</div>
                          <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>{step.description}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mobile card */}
                  {isMobile && (
                    <div style={{ background: "#fff", borderRadius: "14px", padding: "16px 18px", border: "1px solid rgba(10,22,40,0.07)", flex: 1 }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: service.accentColor, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px", opacity: 0.8 }}>Step {step.number}</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a1628", marginBottom: "5px" }}>{step.title}</div>
                      <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{step.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA — dark navy strip
      ══════════════════════════════════ */}
      <section style={{ background: "#f0f2f5", padding: isMobile ? "48px 16px" : isTablet ? "56px 40px" : "64px 96px" }}>
        <div style={{
          background: "linear-gradient(135deg,#0a1628 0%,#0d1f3c 60%,#1a2a5e 100%)",
          borderRadius: "28px",
          padding: isMobile ? "40px 24px" : "56px 64px",
          position: "relative",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          gap: "32px",
          alignItems: "center",
        }}>
          {/* Orbs */}
          <div style={{ position: "absolute", top: "-80px", right: "15%", width: "360px", height: "360px", background: `radial-gradient(circle,${service.shapeColor}30 0%,transparent 65%)`, borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "10%", width: "240px", height: "240px", background: "radial-gradient(circle,rgba(255,140,0,0.08) 0%,transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: isMobile ? "24px" : "clamp(24px,3vw,38px)", fontWeight: 800, color: "#fff", margin: "0 0 10px", letterSpacing: "-1px", lineHeight: 1.1 }}>
              {service.ctaHeadline}
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.65, maxWidth: "420px" }}>
              Talk to our {service.title.toLowerCase()} team today — we respond with a tailored solution within minutes.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <a href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                background: "#fff", color: "#0a1628", border: "none",
                padding: "13px 26px", borderRadius: "100px",
                fontSize: "14px", fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit", whiteSpace: "nowrap",
                transition: "all .2s",
                display: "inline-flex", alignItems: "center", gap: "6px",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Get a Free Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </a>
            <a href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                background: "rgba(255,255,255,0.1)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.22)",
                padding: "13px 26px", borderRadius: "100px",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", whiteSpace: "nowrap", transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              >
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}