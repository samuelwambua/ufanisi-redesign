import { useState, useEffect } from "react";
import Footer from "../components/Footer";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

const INFO_CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Call Us",
    value: "+254 41 222 5555",
    sub: "Mon–Fri, 8am–6pm EAT",
    bg: "#0a1628",
    accent: "#ff8c00",
    textColor: "#ffffff",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email Us",
    value: "info@ufanisi.co.ke",
    sub: "We respond within minutes",
    bg: "#f8f9fb",
    accent: "#5b3a8e",
    textColor: "#0a1628",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Visit Us",
    value: "Mombasa, Kenya",
    sub: "Port Area, HQ Office",
    bg: "#f8f9fb",
    accent: "#0a6e3f",
    textColor: "#0a1628",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ fullName: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: "General Enquiry" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: `1.5px solid ${focusedField === field ? "#0a1628" : "rgba(10,22,40,0.1)"}`,
    background: focusedField === field ? "#ffffff" : "#f8f9fb",
    fontSize: "14px",
    color: "#0a1628",
    outline: "none",
    transition: "all .2s",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(10,22,40,0.06)" : "none",
    boxSizing: "border-box",
  });

  const pad = isMobile ? "56px 16px" : isTablet ? "64px 40px" : "80px 96px";
  const secPad = isMobile ? "48px 16px" : isTablet ? "56px 40px" : "64px 96px";
  const mapPad = isMobile ? "0 16px 48px" : isTablet ? "0 40px 56px" : "0 96px 64px";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#ffffff" }}>

      {/* ══ HERO ══ */}
      <section style={{ background: "#ffffff", padding: pad }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#fff", border: "1.5px solid rgba(10,22,40,0.1)",
            borderRadius: "100px", padding: "5px 16px 5px 7px", marginBottom: "20px",
            boxShadow: "3px 3px 8px rgba(10,22,40,0.07),-2px -2px 6px rgba(255,255,255,1)",
          }}>
            <span style={{ background: "#0a1628", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", letterSpacing: ".6px" }}>CONTACT</span>
            <span style={{ color: "#4a5568", fontSize: "13px", fontWeight: 500 }}>Ufanisi Freighters (K) Ltd</span>
          </div>

          <h1 style={{
            fontSize: isMobile ? "38px" : isTablet ? "56px" : "clamp(52px,6vw,80px)",
            fontWeight: 800, lineHeight: 1.0,
            letterSpacing: isMobile ? "-1.5px" : "-3px",
            margin: "0 0 16px",
          }}>
            <span style={{ color: "rgba(10,22,40,0.22)", display: "block" }}>Let's talk about</span>
            <span style={{ color: "#0a1628", display: "block" }}>your cargo.</span>
          </h1>

          <p style={{ fontSize: isMobile ? "15px" : "17px", color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
            Whether you need a freight quote, have a customs question or want to discuss a logistics project — our team is ready.
          </p>
        </div>
      </section>

      {/* ══ FORM ══ */}
      <section style={{ background: "#f0f2f5", padding: secPad }}>
        <div style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "28px",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 8px 40px rgba(10,22,40,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          padding: isMobile ? "32px 24px" : isTablet ? "44px 40px" : "52px 56px",
        }}>
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(10,22,40,0.06)", border: "1px solid rgba(10,22,40,0.10)", borderRadius: "100px", padding: "5px 14px", marginBottom: "14px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff8c00" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#0a1628", letterSpacing: "0.8px", textTransform: "uppercase" }}>Send a Message</span>
            </div>
            <h2 style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: 800, color: "#0a1628", margin: "0 0 6px", letterSpacing: "-0.8px" }}>
              Get in touch with our team
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
              Fill in your details below and we'll respond within minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Full Name</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="James Mwangi" required
                  onFocus={() => setFocusedField("fullName")} onBlur={() => setFocusedField(null)} style={inputStyle("fullName")} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="james@company.com" required
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} style={inputStyle("email")} />
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Phone Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" required
                onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} style={inputStyle("phone")} />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us about your cargo, route, or any questions you have..."
                required rows={5}
                onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle("message"), resize: "none" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <button type="submit" disabled={status === "loading"} style={{
                background: status === "loading" ? "rgba(10,22,40,0.6)" : "#0a1628",
                color: "#fff", border: "none", padding: "14px 32px", borderRadius: "100px",
                fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer",
                fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: "8px",
                boxShadow: "6px 6px 16px rgba(10,22,40,0.18),-3px -3px 10px rgba(255,255,255,1)",
                transition: "all .2s",
              }}
                onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {status === "loading" ? "Sending..." : (<>Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>)}
              </button>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>We typically respond within minutes during business hours.</p>
            </div>

            {status === "success" && (
              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "rgba(10,110,63,0.08)", border: "1px solid rgba(10,110,63,0.2)", borderRadius: "12px", fontSize: "13px", color: "#0a6e3f", fontWeight: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Message sent! Our team will be in touch shortly.
              </div>
            )}
            {status === "error" && (
              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "rgba(190,18,60,0.08)", border: "1px solid rgba(190,18,60,0.2)", borderRadius: "12px", fontSize: "13px", color: "#be123c", fontWeight: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Something went wrong. Please try again or call us directly.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ══ INFO CARDS ══ */}
      <section style={{ background: "#ffffff", padding: secPad }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr", gap: "14px" }}>
          {INFO_CARDS.map(card => (
            <div key={card.label} style={{
              background: card.bg, borderRadius: "20px",
              padding: isMobile ? "28px 24px" : "32px 28px",
              border: card.bg === "#f8f9fb" ? "1.5px solid rgba(10,22,40,0.06)" : "none",
              display: "flex", flexDirection: "column", gap: "16px",
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "14px",
                background: card.bg === "#0a1628" ? "rgba(255,255,255,0.1)" : `${card.accent}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: card.accent,
              }}>
                {card.icon}
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: card.bg === "#0a1628" ? "rgba(255,255,255,0.45)" : "#9ca3af", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: "5px" }}>
                  {card.label}
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: card.textColor, letterSpacing: "-0.3px", marginBottom: "4px" }}>
                  {card.value}
                </div>
                <div style={{ fontSize: "12px", color: card.bg === "#0a1628" ? "rgba(255,255,255,0.4)" : "#9ca3af", lineHeight: 1.5 }}>
                  {card.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MAP ══ */}
      <section style={{ background: "#ffffff", padding: mapPad }}>
        <div style={{
          borderRadius: "24px", overflow: "hidden",
          border: "1.5px solid rgba(10,22,40,0.07)",
          boxShadow: "0 8px 32px rgba(10,22,40,0.08)",
          height: isMobile ? "280px" : isTablet ? "360px" : "420px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "16px", left: "16px", zIndex: 10,
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
            borderRadius: "12px", padding: "10px 14px",
            display: "flex", alignItems: "center", gap: "8px",
            boxShadow: "0 4px 16px rgba(10,22,40,0.10)",
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff8c00" }} />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0a1628" }}>Ufanisi HQ — Mombasa Port Area</span>
          </div>
          <iframe
            title="Ufanisi Freighters Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.947059027657!2d39.6598543!3d-4.0559424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012f8e8e8e8e9%3A0xabcdef1234567890!2sMombasa%20Port!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
            width="100%" height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}