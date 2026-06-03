import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/ufanisi-logo.png";

const NAV_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "SDGs",     href: "/sdgs"     },
  { label: "Blogs",    href: "/blogs"    },
  { label: "Contact",  href: "/contact"  },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile]     = useState(false);
  const [isTablet, setIsTablet]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Close drawer when breakpoint moves to desktop
  useEffect(() => {
    if (!isMobile && !isTablet) setDrawerOpen(false);
  }, [isMobile, isTablet]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;
  const navPadding = isMobile ? "0 16px" : isTablet ? "0 40px" : "0 96px";

  return (
    <>
      {/* ── Drawer overlay ── */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10,22,40,0.4)",
            zIndex: 200,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* ── Side drawer ── */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "280px",
        background: "#ffffff", zIndex: 300,
        transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: drawerOpen ? "-8px 0 32px rgba(10,22,40,0.15)" : "none",
        display: "flex", flexDirection: "column", padding: "24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
          <a href="/">
            <img src={logo} alt="Ufanisi Freighters" style={{ height: "48px", width: "48px", objectFit: "contain" }} />
          </a>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ background: "rgba(10,22,40,0.06)", border: "none", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a1628" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: isActive(link.href) ? "#0a1628" : "#4a5568",
                fontSize: "16px",
                fontWeight: isActive(link.href) ? 700 : 600,
                textDecoration: "none",
                padding: "14px 16px",
                borderRadius: "12px",
                borderLeft: isActive(link.href) ? "3px solid #ff8c00" : "3px solid transparent",
                background: isActive(link.href) ? "rgba(255,140,0,0.06)" : "transparent",
                transition: "background .2s, color .2s",
              }}
              onMouseEnter={e => {
                if (!isActive(link.href)) {
                  e.currentTarget.style.background = "rgba(10,22,40,0.05)";
                  e.currentTarget.style.color = "#0a1628";
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.href)) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#4a5568";
                }
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="/tracking"
            style={{
              color: isActive("/tracking") ? "#0a1628" : "#4a5568",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              padding: "14px 16px",
              borderRadius: "12px",
              display: "flex", alignItems: "center", gap: "8px",
              borderLeft: isActive("/tracking") ? "3px solid #ff8c00" : "3px solid transparent",
              background: isActive("/tracking") ? "rgba(255,140,0,0.06)" : "transparent",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Track Cargo
          </a>
        </div>

        <button style={{
          background: "#0a1628", color: "#fff", border: "none",
          padding: "14px", borderRadius: "100px",
          fontSize: "15px", fontWeight: 600, cursor: "pointer",
          fontFamily: "inherit", width: "100%",
        }}>
          Get a Quote
        </button>
      </div>

      {/* ── Sticky navbar ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: navPadding, height: "70px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(10,22,40,0.07)",
        fontFamily: "'DM Sans','Inter',sans-serif",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Ufanisi Freighters" style={{ height: "60px", width: "60px", objectFit: "contain" }} />
        </a>

        {/* Desktop nav links */}
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", gap: "34px" }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: isActive(link.href) ? "#0a1628" : "#4a5568",
                  fontSize: "14px",
                  fontWeight: isActive(link.href) ? 700 : 500,
                  textDecoration: "none",
                  borderBottom: isActive(link.href) ? "2px solid #ff8c00" : "2px solid transparent",
                  paddingBottom: "2px",
                  transition: "color .2s, border-color .2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#0a1628";
                  if (!isActive(link.href)) e.currentTarget.style.borderBottomColor = "rgba(255,140,0,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive(link.href) ? "#0a1628" : "#4a5568";
                  e.currentTarget.style.borderBottomColor = isActive(link.href) ? "#ff8c00" : "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Desktop right actions */}
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="/tracking"
              style={{
                color: "#0a1628", fontSize: "14px", fontWeight: 500,
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: "5px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff8c00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Track Cargo
            </a>
            <button style={{
              background: "#0a1628", color: "#fff", border: "none",
              padding: "10px 24px", borderRadius: "100px",
              fontSize: "14px", fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 14px rgba(10,22,40,0.22)",
              transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(10,22,40,0.28)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(10,22,40,0.22)"; }}
            >
              Get a Quote
            </button>
          </div>
        )}

        {/* Mobile / tablet hamburger */}
        {(isMobile || isTablet) && (
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              background: "rgba(10,22,40,0.06)", border: "none",
              borderRadius: "10px", width: "40px", height: "40px",
              cursor: "pointer",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "5px", padding: "10px",
            }}
          >
            <span style={{ display: "block", width: "18px", height: "2px", background: "#0a1628", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "18px", height: "2px", background: "#0a1628", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "18px", height: "2px", background: "#0a1628", borderRadius: "2px" }} />
          </button>
        )}
      </nav>
    </>
  );
}