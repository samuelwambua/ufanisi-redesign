import { useState, useEffect } from "react";

const SERVICES = [
  "Sea Freight",
  "Air Freight",
  "Customs Clearance",
  "Warehousing",
  "Cross Border Clearance",
  "Trucking",
  "Project Cargo",
  "Collateral Management",
];

const CONTACT_INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email us",
    value: "info@ufanisi.co.ke",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Call us",
    value: "+254 41 222 5555",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Visit us",
    value: "Mombasa, Kenya",
  },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function QuoteFormSection() {
  const [form, setForm] = useState<FormState>({
    fullName: "", email: "", phone: "", service: "", message: "",
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "11px 14px",
    borderRadius: "12px",
    border: `1.5px solid ${focusedField === field ? "#0a1628" : "rgba(10,22,40,0.1)"}`,
    background: focusedField === field ? "#ffffff" : "#f8f9fb",
    fontSize: "14px",
    color: "#0a1628",
    outline: "none",
    transition: "all .2s",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(10,22,40,0.06)" : "none",
  });

  return (
    <section style={{ background: "#f0f2f5", padding: isMobile ? "48px 16px" : isTablet ? "64px 40px" : "80px 96px" }}>

      {/* Badge + H2 + subheading — above the card */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "40px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(10,22,40,0.06)", border: "1px solid rgba(10,22,40,0.1)", borderRadius: "100px", padding: "5px 14px", marginBottom: "16px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ff8c00" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#0a1628", letterSpacing: "0.8px", textTransform: "uppercase" }}>Free Quote</span>
        </div>
        <h2 style={{ fontSize: isMobile ? "24px" : "clamp(28px,3.5vw,42px)", fontWeight: 800, color: "#0a1628", margin: "0 0 12px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          Get a <span style={{ color: "#ff8c00" }}>Free</span> Freight Quote
        </h2>
        <p style={{ fontSize: "16px", color: "#6b7280", margin: 0, lineHeight: 1.6, padding: isMobile ? "0 8px" : "0" }}>
          Tell us about your cargo — we respond with a competitive rate within minutes.
        </p>
      </div>

      {/* Outer container card */}
      <div style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "28px",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 8px 40px rgba(10,22,40,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        overflow: "hidden",
        minHeight: isMobile ? "auto" : "460px",
      }}>

        {/* LEFT — contact info only */}
        <div style={{
          padding: isMobile ? "32px 24px" : "56px 48px",
          background: "linear-gradient(145deg, #0a1628 0%, #0d1f3c 60%, #1a2a5e 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background orbs */}
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", background: "radial-gradient(circle,rgba(91,58,142,0.25) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle,rgba(255,140,0,0.1) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 40px", maxWidth: "300px" }}>
              Reach out directly or fill in the form and our team will prepare a tailored freight solution for you.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {CONTACT_INFO.map(info => (
                <div key={info.label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ff8c00", flexShrink: 0 }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontWeight: 500, marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{info.label}</div>
                    <div style={{ fontSize: "14px", color: "#ffffff", fontWeight: 600 }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{ padding: isMobile ? "32px 24px" : "48px 44px", background: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "center" }}>

          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0a1628", margin: "0 0 28px", letterSpacing: "-0.3px" }}>
            Request a Quote
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Full Name */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Full Name</label>
              <input
                name="fullName" value={form.fullName} onChange={handleChange}
                placeholder="James Mwangi" required
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("fullName") as React.CSSProperties}
              />
            </div>

            {/* Email + Phone row — stack on mobile */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="james@company.com" required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle("email") as React.CSSProperties}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Phone</label>
                <input
                  name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="+254 700 000 000" required
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle("phone") as React.CSSProperties}
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Service Type</label>
              <select
                name="service" value={form.service} onChange={handleChange} required
                onFocus={() => setFocusedField("service")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle("service"), appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px", cursor: "pointer" } as React.CSSProperties}
              >
                <option value="">Select a service...</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px", letterSpacing: "0.3px" }}>Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us about your cargo — origin, destination, weight, volume..." required
                rows={3}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle("message"), resize: "none" } as React.CSSProperties}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: status === "loading" ? "rgba(10,22,40,0.6)" : "#0a1628",
                color: "#fff", border: "none",
                padding: "13px 28px", borderRadius: "100px",
                fontSize: "14px", fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                display: "inline-flex", alignItems: "center", gap: "8px",
                alignSelf: "flex-start",
                boxShadow: "6px 6px 16px rgba(10,22,40,0.18),-3px -3px 10px rgba(255,255,255,1)",
                transition: "all .2s",
              }}
              onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {status === "loading" ? (
                <>Sending...</>
              ) : (
                <>
                  Get a Free Quote
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>

            {/* Status messages */}
            {status === "success" && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "rgba(10,110,63,0.08)", border: "1px solid rgba(10,110,63,0.2)", borderRadius: "12px", fontSize: "13px", color: "#0a6e3f", fontWeight: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Quote request sent! We'll respond within minutes.
              </div>
            )}
            {status === "error" && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "rgba(190,18,60,0.08)", border: "1px solid rgba(190,18,60,0.2)", borderRadius: "12px", fontSize: "13px", color: "#be123c", fontWeight: 500 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Something went wrong. Please try again or call us directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}