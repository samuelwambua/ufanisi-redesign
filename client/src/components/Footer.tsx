import { useState, useEffect } from "react";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our History", href: "/about#history" },
  { label: "Certifications", href: "/about#certifications" },
  { label: "SDGs", href: "/sdgs" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blogs" },
];

const QUICK_LINKS = [
  { label: "Sea Freight", href: "/service?r=sea-freight-management" },
  { label: "Air Freight", href: "/service?r=air-freight-management" },
  { label: "Customs Clearance", href: "/service?r=sea-and-air-customs-clearance" },
  { label: "Warehousing", href: "/service?r=free-and-customs-bonded-warehousing" },
  { label: "Cross Border", href: "/service?r=cross-border-clearance" },
  { label: "Trucking", href: "/service?r=transport-tracking" },
];

const LOCATIONS = [
  { city: "Mombasa", detail: "HQ — Port Area", flag: "🇰🇪" },
  { city: "Nairobi", detail: "Westlands Office", flag: "🇰🇪" },
  { city: "Malaba", detail: "Border Point", flag: "🇰🇪" },
  { city: "Holili", detail: "Border Point", flag: "🇰🇪" },
  { city: "Namanga", detail: "Border Point", flag: "🇰🇪" },
];

const CONTACT = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    value: "+254 41 222 5555",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    value: "info@ufanisi.co.ke",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    value: "Mombasa, Kenya",
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Twitter/X",
    href: "https://twitter.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
];

const BOTTOM_LINKS = ["Privacy Policy", "Terms of Use", "Legal", "Site Map"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "success" | "error">("idle");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("success");
    setEmail("");
  };

  return (
    <footer style={{ background: "#0a1628", fontFamily: "'DM Sans', sans-serif" }}>

      {/* NEWSLETTER BANNER */}
      <div style={{ padding: isMobile ? "0 16px" : isTablet ? "0 40px" : "0 96px" }}>
        <div style={{
          background: "linear-gradient(135deg, #1a2a5e 0%, #5b3a8e 60%, #7c3aed 100%)",
          borderRadius: "0 0 28px 28px",
          padding: isMobile ? "32px 24px" : "48px 56px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "24px" : "40px",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Orbs */}
          <div style={{ position: "absolute", top: "-40px", right: "20%", width: "200px", height: "200px", background: "radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-30px", left: "30%", width: "150px", height: "150px", background: "radial-gradient(circle,rgba(255,140,0,0.1) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

          {/* Left text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ fontSize: isMobile ? "20px" : "clamp(20px,2.5vw,28px)", fontWeight: 800, color: "#ffffff", margin: "0 0 10px", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              Stay ahead of your shipments.
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>
              Subscribe for freight updates, trade news & exclusive rate alerts.
            </p>
          </div>

          {/* Right form */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  flex: 1,
                  padding: "13px 18px",
                  borderRadius: "100px",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#ffffff",
                  color: "#0a1628",
                  border: "none",
                  padding: "13px 24px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  transition: "all .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"; }}
              >
                Subscribe
              </button>
            </form>
            {subStatus === "success" && (
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", margin: "10px 0 0 18px" }}>
                ✓ You're subscribed! Welcome aboard.
              </p>
            )}
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "8px 0 0 18px" }}>
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER COLUMNS */}
      <div style={{
        padding: isMobile ? "48px 16px 32px" : isTablet ? "56px 40px 40px" : "64px 96px 48px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1.6fr 1fr 1fr 1fr 1fr",
        gap: isMobile ? "40px" : "40px",
      }}>

        {/* Brand column */}
        <div>
          {/* Logo placeholder */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg,#ff8c00,#ffaa00)", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "17px", color: "#fff" }}>U</div>
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.3px" }}>Ufanisi <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>Freighters</span></span>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: "0 0 28px", maxWidth: "240px" }}>
            Wholly Kenyan-owned freight & logistics company. Est. 1989. Serving East & Central Africa for 30+ years.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  width: "36px", height: "36px",
                  borderRadius: "10px",
                  background: hoveredSocial === s.label ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: hoveredSocial === s.label ? "#ff8c00" : "rgba(255,255,255,0.55)",
                  transition: "all .2s",
                  textDecoration: "none",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 20px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Company</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {COMPANY_LINKS.map(link => (
              <a key={link.label} href={link.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >{link.label}</a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 20px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {QUICK_LINKS.map(link => (
              <a key={link.label} href={link.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >{link.label}</a>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 20px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Locations</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {LOCATIONS.map(loc => (
              <div key={loc.city} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ fontSize: "14px", marginTop: "1px" }}>{loc.flag}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{loc.city}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{loc.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", margin: "0 0 20px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Contact Us</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {CONTACT.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ color: "#ff8c00", marginTop: "2px", flexShrink: 0 }}>{c.icon}</div>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{c.value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              marginTop: "28px",
              background: "linear-gradient(135deg,#ff6b00,#ff8c00)",
              color: "#fff", border: "none",
              padding: "11px 22px", borderRadius: "100px",
              fontSize: "13px", fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(255,107,0,0.3)",
              display: "inline-flex", alignItems: "center", gap: "6px",
              transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,107,0,0.3)"; }}
            >
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </a>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ margin: isMobile ? "0 16px" : isTablet ? "0 40px" : "0 96px", height: "1px", background: "rgba(255,255,255,0.08)" }} />

      {/* BOTTOM BAR */}
      <div style={{
        padding: isMobile ? "20px 16px" : isTablet ? "20px 40px" : "20px 96px",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: isMobile ? "16px" : "12px",
        flexWrap: "wrap",
      }}>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
          © {new Date().getFullYear()} Ufanisi Freighters (K) Ltd. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: isMobile ? "16px" : "24px", flexWrap: "wrap" }}>
          {BOTTOM_LINKS.map(link => (
            <a key={link} href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}