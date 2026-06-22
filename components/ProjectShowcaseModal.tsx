"use client";

import { MousePointer2, RotateCcw, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import styles from "./ProjectShowcaseModal.module.css";

type Project = {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tech: string[];
};

type Props = {
  open: boolean;
  project: Project;
  onClose: () => void;
};

const royalPlayStoreUrl =
  "https://play.google.com/store/apps/details?id=com.royalprima.royalklinik&hl=id";

const royalScreens = [
  {
    title: "Jadwal Dokter",
    image: "/royal/showcase/jadwal-dokter.png",
    className: "phoneLeft" as const
  },
  {
    title: "Beranda",
    image: "/royal/showcase/beranda.png",
    className: "phoneCenter" as const
  },
  {
    title: "Detail EMR",
    image: "/royal/showcase/detail-emr.png",
    className: "phoneRight" as const
  }
];

function PlayStoreLogo() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#00F076"
        d="M68.7 33.4c-6.8 7.1-10.7 18.1-10.7 32.5v380.2c0 14.4 3.9 25.4 10.7 32.5l1.3 1.2L282.9 257.9v-3.8L70 32.2l-1.3 1.2z"
      />

      <path
        fill="#00D0FF"
        d="M353.8 331.9l-70.9-74v-3.8l70.9-74 1.6.9 84 47.7c24 13.6 24 35.9 0 49.5l-84 47.7-1.6 1z"
      />

      <path
        fill="#FFCE00"
        d="M355.4 326.9l-72.5-72.8L68.7 478.6c10.8 11.4 28.7 12.8 48.8 1.4l237.9-153.1z"
      />

      <path
        fill="#FF3A44"
        d="M355.4 181.1L117.5 28C97.4 16.6 79.5 18 68.7 29.4l214.2 224.7 72.5-73z"
      />
    </svg>
  );
}

import { useLanguage } from "../context/LanguageContext";

export default function ProjectShowcaseModal({
  open,
  project,
  onClose
}: Props) {
  const { lang } = useLanguage();
  const [rotate, setRotate] = useState({ x: -6, y: 10, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (prevOpenRef.current) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 750); // match CSS duration
      return () => clearTimeout(timer);
    }
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setRotate({ x: -6, y: 10, z: 0 });
      setZoom(1);
      setIsDragging(false);
    }
  }, [open]);

  if (!shouldRender) return null;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const nextY = (x - 0.5) * 28;
    const nextX = (0.5 - y) * 16;

    setRotate((current) => ({
      ...current,
      x: nextX,
      y: nextY
    }));
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    setZoom((current) => {
      const next = current + (event.deltaY > 0 ? -0.04 : 0.04);
      return Math.min(1.16, Math.max(0.86, next));
    });

    setRotate((current) => ({
      ...current,
      z: current.z + (event.deltaY > 0 ? -0.8 : 0.8)
    }));
  };

  const resetView = () => {
    setRotate({ x: -6, y: 10, z: 0 });
    setZoom(1);
  };

  return (
    <div
      className={[
        styles.modalOverlay,
        isClosing ? styles.modalLeave : "",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.backdropGlowOne} />
      <div className={styles.backdropGlowTwo} />
      <div className={styles.modalGrid} />

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Tutup showcase"
      >
        <X size={22} />
      </button>

      <div className={styles.modalContent}>
        <div className={styles.showcaseText}>
          <span className={styles.projectBadge}>{project.category}</span>

          <h2>{project.title}</h2>

          <p>{project.description}</p>

          <div className={styles.techList}>
            {project.tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>



          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.resetButton}
              onClick={resetView}
            >
              <RotateCcw size={18} />
              {lang === "id" ? "Reset Tampilan" : "Reset View"}
            </button>

            <a
              href={royalPlayStoreUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.playStoreButton}
            >
              <PlayStoreLogo />
              Play Store
            </a>
          </div>
        </div>

        <div
          className={styles.showcaseStage}
          onPointerMove={handlePointerMove}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          onWheel={handleWheel}
        >
          <div className={styles.orbitRingOne} />
          <div className={styles.orbitRingTwo} />
          <div className={styles.orbitRingThree} />

          <div
            className={[
              styles.phoneScene,
              isDragging ? styles.isDragging : ""
            ].join(" ")}
            style={
              {
                "--rotate-x": `${rotate.x}deg`,
                "--rotate-y": `${rotate.y}deg`,
                "--rotate-z": `${rotate.z}deg`,
                "--zoom": zoom
              } as React.CSSProperties
            }
          >
            <div className={styles.phoneGroupShadow} />

             {royalScreens.map((screen) => {
               let displayTitle = screen.title;
               if (lang === "en") {
                 if (displayTitle === "Jadwal Dokter") displayTitle = "Doctor Schedule";
                 if (displayTitle === "Beranda") displayTitle = "Home";
                 if (displayTitle === "Detail EMR") displayTitle = "EMR Detail";
               }
               return (
                 <div
                   key={screen.title}
                   className={[
                     styles.phoneMockup,
                     styles[screen.className]
                   ].join(" ")}
                 >
                   <div className={styles.phoneSideLight} />

                   <div className={styles.phoneFrame}>
                     <div className={styles.phoneSpeaker} />

                     <div className={styles.phoneScreen}>
                       <img src={screen.image} alt={displayTitle} />
                     </div>
                   </div>

                   <span className={styles.phoneLabel}>{displayTitle}</span>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
}