"use client";

import { ArrowRight, Rocket } from "lucide-react";
import GridScan from "./GridScan";
import "./GridScan.css";
import styles from "./Hero.module.css";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} aria-hidden="true">
        <GridScan
          sensitivity={0.62}
          lineThickness={1}
          linesColor="#CBD5E1"
          gridScale={0.095}
          scanColor="#3279F9"
          scanOpacity={0.58}
          enablePost
          bloomIntensity={0.5}
          bloomThreshold={0}
          bloomSmoothing={0}
          chromaticAberration={0.0014}
          noiseIntensity={0.006}
          lineJitter={0.08}
          scanGlow={0.8}
          scanSoftness={1.7}
          scanDirection="forward"
          scanDuration={2.2}
          scanDelay={0}
          enableWebcam={false}
          showPreview={false}
        />
      </div>

      <div className={styles.gridFadeTop} aria-hidden="true" />
      <div className={styles.gridFadeBottom} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <span className={styles.heroSubLabel}>{t.role}</span>
          <h1 className={styles.heroMassiveText}>FERDINAND</h1>
        </div>

        {/* Buttons are perfectly centered relative to the text void */}
        <div className={styles.heroButtons}>
          <a href="#projects" className={styles.heroBlackBtn}>
            <Rocket size={18} />
            {t.btnViewProjects}
          </a>

          <a href="#contact" className={styles.heroLightBtn}>
            {t.btnContactMe}
            <ArrowRight size={17} />
          </a>
        </div>

        <div className={styles.heroRight}>
          <span className={styles.heroSubLabel}>{t.tagline}</span>
          <h1 className={styles.heroMassiveText}>SIANTURI</h1>
          <span className={styles.heroLocation}>{t.location}</span>
        </div>
      </div>
    </section>
  );
}