"use client";

import { Home } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang].nav;

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" className="brand-home" aria-label="Home">
          <Home size={19} />
        </a>

        <nav className="nav" aria-label="Main Navigation">
          <a href="#about">{t.about}</a>
          <a href="#skills">{t.skills}</a>
          <a href="#projects">{t.projects}</a>
          <a href="#journey">{t.journey}</a>
        </nav>

        <div className="header-actions" style={{ display: "flex", alignItems: "center" }}>
          {/* Beautiful and Sleek Language Switcher */}
          <div className="lang-switcher" style={{ marginRight: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
            <button
              onClick={() => setLang("id")}
              style={{
                background: "none",
                border: "none",
                fontWeight: lang === "id" ? "700" : "500",
                color: lang === "id" ? "var(--blue)" : "var(--muted)",
                cursor: "pointer",
                fontSize: "12.5px",
                padding: "2px 6px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
                backgroundColor: lang === "id" ? "rgba(50, 121, 249, 0.08)" : "transparent"
              }}
            >
              ID
            </button>
            <button
              onClick={() => setLang("en")}
              style={{
                background: "none",
                border: "none",
                fontWeight: lang === "en" ? "700" : "500",
                color: lang === "en" ? "var(--blue)" : "var(--muted)",
                cursor: "pointer",
                fontSize: "12.5px",
                padding: "2px 6px",
                borderRadius: "6px",
                transition: "all 0.2s ease",
                backgroundColor: lang === "en" ? "rgba(50, 121, 249, 0.08)" : "transparent"
              }}
            >
              EN
            </button>
          </div>

          <a href="#contact" className="contact-btn">
            {t.contactBtn}
          </a>
        </div>
      </div>
    </header>
  );
}