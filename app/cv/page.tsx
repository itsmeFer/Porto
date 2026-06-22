"use client";

import React from "react";
import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import styles from "./CV.module.css";

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Action Buttons (Hidden on Print) */}
      <Link href="/#contact" className={styles.backBtn}>
        <ArrowLeft size={16} /> Back to Portfolio
      </Link>
      
      <div className={styles.printAction}>
        <button onClick={handlePrint} className={styles.printBtn}>
          <Download size={18} /> Save as PDF
        </button>
      </div>

      {/* CV Document */}
      <main className={styles.cvContainer}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.name}>Ferdinand Sianturi</h1>
            <h2 className={styles.title}>Software Engineer</h2>
          </div>
          <div className={styles.contactInfo}>
            <div>Medan, Sumatera Utara, Indonesia</div>
            <div><a href="mailto:ferdinandsianturi28@gmail.com">ferdinandsianturi28@gmail.com</a></div>
            <div>+62 821 7289 2090</div>
            <div><a href="https://github.com" target="_blank" rel="noreferrer">github.com/ferdinand</a></div>
          </div>
        </header>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Summary</h3>
          <p className={styles.itemDescription} style={{ marginTop: 0 }}>
            Dedicated Software Engineer with a strong focus on building robust, scalable, and beautifully designed mobile and web applications. Experienced in developing full-stack solutions, particularly within the healthcare and enterprise sectors. Passionate about modern architecture, seamless user experiences, and continuous learning.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Experience</h3>
          
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <h4 className={styles.itemTitle}>Freelance Software Engineer</h4>
              <span className={styles.itemDate}>2022 - Present</span>
            </div>
            <div className={styles.itemSubtitle}>Independent Consultant</div>
            <div className={styles.itemDescription}>
              <ul>
                <li><strong>Royal Klinik Mobile App & Medical Portal:</strong> Developed an integrated healthcare information system. Built a Medical Record System (Laravel) synchronized with mobile apps (Flutter) for real-time doctor dashboards, digital prescriptions, and laboratory results.</li>
                <li><strong>Prima Homecare Mobile App:</strong> Engineered a robust homecare service platform using Flutter and Dart, featuring complex state management, doctor scheduling, patient tracking, and direct administrative communication tools.</li>
                <li><strong>Antrianku Mobile App:</strong> Designed and implemented a digital queue management application used by public and private institutions to streamline visitor flow, reducing wait times and providing live status notifications.</li>
                <li><strong>Prima Fitness Club:</strong> Created an interactive gym management mobile application utilizing modern frameworks for tracking workouts, subscriptions, and facility access.</li>
              </ul>
            </div>
          </div>
          
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Education</h3>
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              <h4 className={styles.itemTitle}>Bachelor of Computer Science</h4>
              <span className={styles.itemDate}>Graduated [Year]</span>
            </div>
            <div className={styles.itemSubtitle}>[University Name], Indonesia</div>
            <div className={styles.itemDescription}>
              <p style={{ margin: 0 }}><em>* Please update university name and graduation year.</em></p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Technical Skills</h3>
          <div className={styles.skillsGrid}>
            <div>
              <h4 className={styles.skillCategory}>Mobile & Frontend</h4>
              <p className={styles.skillList}>Flutter, Dart, React.js, Next.js, HTML/CSS, Tailwind CSS, JavaScript, TypeScript.</p>
            </div>
            <div>
              <h4 className={styles.skillCategory}>Backend & Database</h4>
              <p className={styles.skillList}>Node.js, Express, Laravel, REST APIs, Firebase, PostgreSQL, MySQL.</p>
            </div>
            <div>
              <h4 className={styles.skillCategory}>Tools & Architecture</h4>
              <p className={styles.skillList}>Git, GitHub, Vercel, Figma, Postman, State Management (Provider/Riverpod), UI/UX Design.</p>
            </div>
            <div>
              <h4 className={styles.skillCategory}>Languages</h4>
              <p className={styles.skillList}>Indonesian (Native), English (Professional Working Proficiency).</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
