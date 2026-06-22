"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function JourneySection() {
  const { lang } = useLanguage();
  const t = translations[lang].journey;

  return (
    <section id="journey" className="section soft-section">
      <div className="container journey-grid">
        <div className="journey-left section-head">
          <span className="section-label">{t.label}</span>

          {t.heading ? (() => {
            const words = t.heading.split(" ");
            const lastWord = words.pop();
            return (
              <h2>
                {words.join(" ")} <span className="section-title-highlight">{lastWord}</span>
              </h2>
            );
          })() : (
            <h2>{t.title}</h2>
          )}

          <p style={{ marginTop: "16px" }}>{t.title}</p>
          <p style={{ marginTop: "12px", color: "var(--text-soft)" }}>{t.desc}</p>

          <a href="#contact" className="btn btn-primary" style={{ marginTop: "24px" }}>
            {t.btnCollab}
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="journey-list">
          {t.items.map((item) => (
            <div className="journey-item reveal" key={item.title}>
              <div className="journey-year">{item.year}</div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}