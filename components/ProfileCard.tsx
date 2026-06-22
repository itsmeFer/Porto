"use client";

import { CSSProperties, MouseEvent, useRef } from "react";
import styles from "./ProfileCard.module.css";

type ProfileCardProps = {
  avatarUrl: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  innerGradient?: string;
  onContactClick?: () => void;
};

export default function ProfileCard({
  avatarUrl,
  miniAvatarUrl,
  name = "Ferdinand Sianturi",
  title = "Flutter Mobile App Developer",
  handle = "ferdinand",
  status = "Available for Projects",
  contactText = "Hubungi Saya",
  showUserInfo = true,
  behindGlowEnabled = true,
  behindGlowColor = "rgba(65, 99, 180, 0.18)",
  innerGradient = "linear-gradient(145deg, #151a32 0%, #202944 46%, #071421 100%)",
  onContactClick,
}: ProfileCardProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const moveX = (x - 50) * 0.13;
    const moveY = (y - 50) * 0.09;

    el.style.setProperty("--pointer-x", `${x}%`);
    el.style.setProperty("--pointer-y", `${y}%`);
    el.style.setProperty("--avatar-move-x", `${moveX}px`);
    el.style.setProperty("--avatar-move-y", `${moveY}px`);
    el.style.setProperty("--holo-move-x", `${moveX * -0.45}px`);
    el.style.setProperty("--holo-move-y", `${moveY * -0.45}px`);
  };

  const handleMouseLeave = () => {
    const el = wrapperRef.current;
    if (!el) return;

    el.style.setProperty("--pointer-x", "50%");
    el.style.setProperty("--pointer-y", "50%");
    el.style.setProperty("--avatar-move-x", "0px");
    el.style.setProperty("--avatar-move-y", "0px");
    el.style.setProperty("--holo-move-x", "0px");
    el.style.setProperty("--holo-move-y", "0px");
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.profileCardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--behind-glow-color": behindGlowColor,
          "--inner-gradient": innerGradient,
        } as CSSProperties
      }
    >
      {behindGlowEnabled && <div className={styles.behindGlow} />}

      <div className={styles.profileCard}>
        <div className={styles.cardBg} />
        <div className={styles.softHoverBg} />

        <div className={styles.spotlight} aria-hidden="true" />
        <div className={styles.spotlightBeam} aria-hidden="true" />
        <div className={styles.stageGlow} aria-hidden="true" />

        <div className={styles.hologramLayer} aria-hidden="true">
          {[
            styles.holoOne,
            styles.holoTwo,
            styles.holoThree,
            styles.holoFour,
            styles.holoFive,
            styles.holoSix,
            styles.holoSeven,
            styles.holoEight,
            styles.holoNine,
            styles.holoTen,
          ].map((posClass, i) => (
            <span key={i} className={`${styles.holoCode} ${posClass}`}>
              {"</>"}
            </span>
          ))}
        </div>

        <div className={styles.avatarWrapper}>
          <img className={styles.avatar} src={avatarUrl} alt={name} />
        </div>

        <div className={styles.bottomFade} />

        {showUserInfo && (
          <div className={styles.userInfo}>
            <div className={styles.userLeft}>
              <div className={styles.miniAvatar}>
                <img src={miniAvatarUrl || avatarUrl} alt={name} />
              </div>

              <div className={styles.userText}>
                <strong>@{handle}</strong>
                <span>{status}</span>
              </div>
            </div>

            <button type="button" onClick={onContactClick}>
              {contactText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}