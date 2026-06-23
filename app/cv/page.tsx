"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Phone, Mail, MapPin, Globe, CheckCircle2, ArrowLeft } from "lucide-react";
import styles from "./cv.module.css";
import { cvData } from "../../data/cv-data";

export default function CVPage() {
  const [lang, setLang] = useState<"id" | "en">("en");
  const data = cvData[lang];
  const [isOpening, setIsOpening] = useState(false);
  const [isDone, setIsDone] = useState(false);

  React.useEffect(() => {
    // Hold the gate for a moment so text is readable
    const timer = setTimeout(() => setIsOpening(true), 800);
    // Remove gate from DOM after animation completes (800ms + 1800ms transition)
    const doneTimer = setTimeout(() => setIsDone(true), 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {/* CV Entry Gate */}
      {!isDone && (
        <div className={`${styles.pageGate} ${isOpening ? styles.gatePointerNone : ""}`}>
          <div className={`${styles.gatePanel} ${styles.gatePanelLeft} ${isOpening ? styles.gateOpenLeft : ""}`}>
            <h2 className={`${styles.gateText} ${styles.gateTextLeft} ${isOpening ? styles.gateTextFade : ""}`}>
              Curriculum
            </h2>
          </div>
          <div className={`${styles.gatePanel} ${styles.gatePanelRight} ${isOpening ? styles.gateOpenRight : ""}`}>
            <h2 className={`${styles.gateText} ${styles.gateTextRight} ${isOpening ? styles.gateTextFade : ""}`}>
              Vitae
            </h2>
          </div>
        </div>
      )}

      <div className={styles.cvPageWrapper}>
      {/* Controls: Language and Download */}
      <div className={styles.cvControls}>
        <a href="https://www.ferdinandsianturi.my.id/" className={styles.backBtn}>
          <ArrowLeft size={18} />
          {lang === "id" ? "Kembali" : "Back"}
        </a>
        <div className={styles.controlGroup}>
          <button
            className={`${styles.langBtn} ${lang === "id" ? styles.active : ""}`}
            onClick={() => setLang("id")}
          >
            Bahasa Indonesia
          </button>
          <button
            className={`${styles.langBtn} ${lang === "en" ? styles.active : ""}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>
        <a 
          href={lang === "en" ? "/CV/cvinggris.pdf" : "/CV/cvindo.pdf"} 
          download={lang === "en" ? "CV_Ferdinand_Sianturi_EN.pdf" : "CV_Ferdinand_Sianturi_ID.pdf"} 
          className={styles.downloadBtn}
        >
          <Download size={18} />
          {lang === "id" ? "Download PDF" : "Download PDF"}
        </a>
      </div>

      {/* CV Paper Container */}
      <div className={styles.cvContainer}>
        
        {/* Header Section */}
        <header className={styles.headerSection}>
          <div className={styles.profileImageWrap}>
            <Image 
              src="/profile-ferdinand.png" 
              alt="Ferdinand Sianturi" 
              width={140} 
              height={140} 
              className={styles.profileImage} 
            />
          </div>
          <div className={styles.headerInfo}>
            <h1>{data.personal.name}</h1>
            <h2>{data.personal.role}</h2>
            
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <Phone size={14} />
                <span>{data.personal.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={14} />
                <span>{data.personal.email}</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={14} />
                <span>{data.personal.address}</span>
              </div>
              <div className={styles.contactItem} style={{ gridColumn: '1 / -1', justifyContent: 'center', marginTop: '4px' }}>
                <Globe size={14} />
                <a href={data.personal.website} target="_blank" rel="noreferrer">
                  {data.personal.website}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>{data.sections.about}</div>
          <div className={styles.sectionContent}>
            {data.about}
          </div>
        </section>

        {/* Education Section */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>{data.sections.education}</div>
          <div className={styles.timeline}>
            {data.education.map((edu, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{edu.year}</div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTitle}>{edu.school}</div>
                  {edu.details && (
                    <div className={styles.timelineDetails}>{edu.details}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>{data.sections.project}</div>
          <div className={styles.projectsGrid}>
            {data.projects.map((proj, idx) => (
              <div key={idx} className={styles.projectItem}>
                <CheckCircle2 size={14} className={styles.projectIcon} />
                <div className={styles.projectContent}>
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section className={styles.section}>
          <div className={styles.sectionTitle}>{data.sections.certificate}</div>
          <div className={styles.projectsGrid}>
            {data.certificates.map((cert, idx) => (
              <div key={idx} className={styles.projectItem}>
                <CheckCircle2 size={14} className={styles.projectIcon} />
                <div className={styles.projectContent}>
                  <h3>{cert.title}</h3>
                  <p>{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      </div>
    </>
  );
}
