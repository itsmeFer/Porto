"use client";

import { CSSProperties } from "react";
import { techStack } from "@/data/portfolio";
import ElectricBorder from "@/components/ElectricBorder/ElectricBorder";
import "./TechStackElectric.css";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function TechStack() {
  const { lang } = useLanguage();
  const t = translations[lang].tech;

  return (
    <section className="tech-electric-section" aria-label="Technology Stack">
      <div className="container">
        <div className="tech-electric-head reveal">
          <span className="section-label">{t.label}</span>
          
          {t.heading ? (() => {
            const words = t.heading.split(" ");
            const lastWord = words.pop();
            return (
              <h2 style={{ marginBottom: "16px" }}>
                {words.join(" ")} <span className="section-title-highlight">{lastWord}</span>
              </h2>
            );
          })() : (
            <h2 style={{ marginBottom: "16px" }}>{t.title}</h2>
          )}
          
          <p style={{ marginTop: "16px", color: "var(--text-soft)", fontSize: "18px", maxWidth: "860px", lineHeight: "1.5", margin: "0 auto" }}>{t.title}</p>
        </div>

        <div className="tech-electric-list-container">
          <div className="tech-electric-list">
            {[...techStack, ...techStack].map((item, index) => (
              <ElectricBorder
                key={`${item.name}-${index}`}
                color="#7df9ff"
                speed={1.15}
                chaos={0.1}
                thickness={1.6}
                borderRadius={999}
                className={`tech-electric-border ${index >= techStack.length ? 'tech-electric-border-duplicate' : ''}`}
                style={
                  {
                    "--tech-delay": `${(index % techStack.length) * 0.13}s`
                  } as CSSProperties
                }
              >
                <div className="tech-electric-item">
                  <span className="tech-electric-icon">{item.icon}</span>
                  <span className="tech-electric-name">{item.name}</span>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}