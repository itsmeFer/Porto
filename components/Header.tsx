"use client";

import { Home, Menu, X, Download, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
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
          <div className="lang-switcher">
            <button
              className={`lang-btn ${lang === "id" ? "active" : ""}`}
              onClick={() => setLang("id")}
            >
              ID
            </button>
            <button
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>

          <Link href="/cv" className="cv-nav-btn">
            <FileText size={16} />
            {lang === "id" ? "Lihat CV" : "View CV"}
          </Link>

          <a href="#contact" className="contact-btn">
            {t.contactBtn}
          </a>

          <button 
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>

    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
      <nav className="mobile-nav-links">
        <a href="#about" onClick={closeMenu}>{t.about}</a>
        <a href="#skills" onClick={closeMenu}>{t.skills}</a>
        <a href="#projects" onClick={closeMenu}>{t.projects}</a>
        <a href="#journey" onClick={closeMenu}>{t.journey}</a>
      </nav>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        <Link href="/cv" className="btn" style={{ border: '1px solid var(--border)', color: 'var(--text)' }} onClick={closeMenu}>
          <FileText size={18} />
          {lang === "id" ? "Lihat CV" : "View CV"}
        </Link>
        <a href="#contact" className="btn btn-primary" onClick={closeMenu}>
          {t.contactBtn}
        </a>
      </div>
    </div>
    </>
  );
}