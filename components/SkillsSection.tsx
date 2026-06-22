"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function SkillsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <section id="skills" className="section soft-section">
      <div className="container">
        <div className="section-head">
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
        </div>

        <div className="skills-grid">
          {t.items.map((skill) => (
            <article className="skill-card reveal" key={skill.title}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}