"use client";

import { Mail, Phone } from "lucide-react";
import styles from "./Footer.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();

  // Create an array for the marquee items to repeat enough times to fill screen and animate smoothly
  const marqueeItems = Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className={styles.marqueeItem}>
      {lang === "id" ? "Mari bekerja sama" : "Let's work together"} <span className={styles.marqueeAsterisk}>*</span>
    </div>
  ));

  return (
    <div className={styles.footerRevealWrapper}>
      <div className={styles.footerFixed}>
        <footer className={styles.footer}>
          {/* Huge Outline Text */}
          <div className={styles.hugeTextContainer}>
        <div className={styles.hugeText}>Ferdinand Sianturi</div>
      </div>

      {/* Marquee Banner */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          {marqueeItems}
        </div>
      </div>

      {/* Contact Info */}
      <div className={styles.contactInfo}>
        <a href="mailto:ferdinandsianturi28@gmail.com" className={styles.contactLink}>
          <Mail size={15} /> ferdinandsianturi28@gmail.com
        </a>
        <a 
          href={
            lang === "id"
              ? "https://wa.me/6282172892090?text=Halo%20Ferdinand,%20saya%20melihat%20portofolio%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20mengenai%20peluang%20kerja%20atau%20pembuatan%20project."
              : "https://wa.me/6282172892090?text=Hello%20Ferdinand,%20I%20saw%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20job%20opportunities%20or%20project%20cooperation."
          }
          target="_blank" 
          rel="noreferrer" 
          className={styles.contactLink}
        >
          <Phone size={15} /> +62 821 7289 2090
        </a>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <span>{currentYear}</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
      </div>
    </div>
  );
}