"use client";

import { PointerEvent, useRef } from "react";
import ProfileCard from "@/components/ProfileCard";
import styles from "./AboutSection.module.css";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function AboutSection() {
  const campusTapTimerRef = useRef<number | null>(null);
  const originTapTimerRef = useRef<number | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang].about;

  const handleCampusTap = (event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;

    if (campusTapTimerRef.current) {
      window.clearTimeout(campusTapTimerRef.current);
    }

    card.classList.add(styles.campusTapActive);

    campusTapTimerRef.current = window.setTimeout(() => {
      card.classList.remove(styles.campusTapActive);
    }, 3200);
  };

  const handleOriginTap = (event: PointerEvent<HTMLDivElement>) => {
    const card = event.currentTarget;

    if (originTapTimerRef.current) {
      window.clearTimeout(originTapTimerRef.current);
    }

    card.classList.add(styles.originTapActive);

    originTapTimerRef.current = window.setTimeout(() => {
      card.classList.remove(styles.originTapActive);
    }, 3200);
  };

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.aboutGrid}>
          <div className={`${styles.profileWrap} reveal`}>
            <ProfileCard
              name="Ferdinand Sianturi"
              title="Flutter Mobile App Developer"
              handle="ferdinand"
              status={lang === "id" ? "Asal Medan, Indonesia" : "From Medan, Indonesia"}
              contactText={lang === "id" ? "Hubungi Saya" : "Contact Me"}
              avatarUrl="/profile-ferdinand.png"
              miniAvatarUrl="/profile-ferdinand.png"
              showUserInfo
              behindGlowEnabled
              behindGlowColor="rgba(50, 121, 249, 0.26)"
              innerGradient="linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(247,249,255,0.94) 48%, rgba(232,240,255,0.88) 100%)"
              onContactClick={() => {
                const contact = document.querySelector("#contact");
                contact?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          <div className={styles.aboutContent}>
            <div className="section-head" style={{ marginBottom: "28px", maxWidth: "100%" }}>
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

              <p style={{ maxWidth: "100%", marginTop: "24px" }}>
                {t.desc1}
              </p>

              <p style={{ maxWidth: "100%" }}>
                {t.desc2}
              </p>
            </div>

            <div className={`${styles.aboutInfoGrid} reveal`}>
              {t.info.map((item, index) => {
                const label = item.label.toLowerCase();
                const isCampus = label === "kampus" || label === "university";
                const isOrigin = label === "asal" || label === "origin";

                return (
                  <div
                    className={`${styles.aboutInfoCard} ${
                      isCampus ? styles.campusCard : ""
                    } ${isOrigin ? styles.originCard : ""}`}
                    key={item.label}
                    onPointerDown={
                      isCampus
                        ? handleCampusTap
                        : isOrigin
                          ? handleOriginTap
                          : undefined
                    }
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    {isCampus && (
                      <>
                        <div className={styles.campusSky} />
                        <div className={styles.campusPhotoScene}>
                          <div className={styles.campusPhoto} />
                        </div>

                        <div className={styles.campusCloudCenter} />
                        <div className={styles.campusCloudLeft} />
                        <div className={styles.campusCloudRight} />
                        <div className={styles.campusCloudTop} />
                        <div className={styles.campusCloudBottom} />

                        <div className={styles.campusOverlay} />
                        <div className={styles.campusSun} />
                      </>
                    )}

                    {isOrigin && (
                      <>
                        <div className={styles.originSky} />
                        <div className={styles.originPhotoScene}>
                          <div className={styles.originPhoto} />
                        </div>

                        <div className={styles.originCloudCenter} />
                        <div className={styles.originCloudLeft} />
                        <div className={styles.originCloudRight} />
                        <div className={styles.originCloudTop} />
                        <div className={styles.originCloudBottom} />

                        <div className={styles.originOverlay} />
                        <div className={styles.originSun} />
                      </>
                    )}

                    <div className={styles.infoIcon}>{item.icon}</div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}