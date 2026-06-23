"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import styles from "./ContactSection.module.css";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;
  const f = t.form;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmail = () => {
    if (!formData.name || !formData.message) return;
    const subject = `New Contact Request from ${formData.name}`;
    const body = `Name: ${formData.name}%0A%0AMessage:%0A${formData.message}`;
    window.location.href = `mailto:ferdinandsianturi28@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleWA = () => {
    if (!formData.name || !formData.message) return;
    const text = `Halo Ferdinand, saya ${formData.name}.%0A%0A${formData.message}`;
    window.open(`https://wa.me/6282172892090?text=${text}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const titleWords = f.title.split(" ");
  const lastTitleWord = titleWords.pop();
  const titlePrefix = titleWords.join(" ");

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.bgDecoration} />
      
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <h2 className={styles.title} style={{ marginBottom: "16px" }}>
              Let's <span className={styles.titleHighlight}>talk.</span>
            </h2>
            <p className={styles.description} style={{ fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "450px" }}>
              {lang === "id" ? (
                <>Apakah Anda memiliki ide proyek yang luar biasa, tawaran pekerjaan (peluang karier), atau sekadar ingin menyapa? <br /><br /> Jangan ragu untuk menghubungi saya. Mari kita diskusikan bagaimana kita bisa berkolaborasi untuk mewujudkan ide Anda atau bekerja sama di dalam tim Anda.</>
              ) : (
                <>Do you have an amazing project idea, a career/job opportunity, or just want to say hi? <br /><br /> Don't hesitate to reach out. Let's discuss how we can collaborate to turn your ideas into reality or work together in your team.</>
              )}
            </p>
            <div style={{ marginTop: "40px" }}>
              <a href="/CV/CV.pdf" target="_blank" download="CV_Ferdinand_Sianturi.pdf" className={styles.cvBtn}>
                <Download size={18} />
                {lang === "id" ? "Download / Lihat CV" : "Download / View CV"}
              </a>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className={styles.rightPanel}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.formBadge}>BRIEFING</span>
                <h3 className={styles.formTitle}>
                  {titlePrefix} <span className={styles.formTitleHighlight}>{lastTitleWord}</span>
                </h3>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>{lang === "id" ? "NAMA LENGKAP" : "FULL NAME"} <span className={styles.required}>*</span></label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                  <label>{f.message} <span className={styles.required}>*</span></label>
                  <textarea name="message" rows={5} required value={formData.message} onChange={handleChange}></textarea>
                </div>

                <div className={styles.checkboxGroup}>
                  <input type="checkbox" id="consent" required />
                  <label htmlFor="consent">{f.consent}</label>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
                  <button type="button" onClick={handleEmail} className={styles.submitBtn}>
                    {t.btnEmail} <ArrowRight size={16} />
                  </button>
                  <button type="button" onClick={handleWA} className={styles.submitBtn} style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)" }}>
                    {t.btnWA} <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}