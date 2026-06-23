"use client";

import { ExternalLink, Monitor, RotateCcw, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import styles from "./ProjectShowcaseDokter.module.css";
import { useLanguage } from "../../context/LanguageContext";

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

const dokterWebsiteUrl = "https://dokter.royal-klinik.cloud";

export default function ProjectShowcaseDokter({
  open,
  project,
  onClose,
}: Props) {
  const { lang } = useLanguage();
  const [rotate, setRotate] = useState({ x: -4, y: 8, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);
  const [mobileSlide, setMobileSlide] = useState(0);
  const prevOpenRef = useRef(open);

  const mobileScreens = [
    { src: project.imageUrl || "/royal/showcase/website/dokter.png", label: lang === "id" ? "Dashboard Dokter" : "Doctor Dashboard" },
  ];

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
      setRotate({ x: -4, y: 8, z: 0 });
      setZoom(1);
      setIsDragging(false);
      setMobileSlide(0);
    }
  }, [open]);

  // Auto-rotate mobile carousel
  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => {
      setMobileSlide((prev) => (prev + 1) % mobileScreens.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [open, mobileScreens.length]);

  if (!shouldRender) return null;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const nextY = (x - 0.5) * 22;
    const nextX = (0.5 - y) * 12;

    setRotate((current) => ({
      ...current,
      x: nextX,
      y: nextY,
    }));
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    event.preventDefault();

    setZoom((current) => {
      const next = current + (event.deltaY > 0 ? -0.04 : 0.04);
      return Math.min(1.12, Math.max(0.9, next));
    });

    setRotate((current) => ({
      ...current,
      z: current.z + (event.deltaY > 0 ? -0.45 : 0.45),
    }));
  };

  const resetView = () => {
    setRotate({ x: -4, y: 8, z: 0 });
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
      <div className={styles.backdropGlowThree} />
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
          <span className={styles.projectBadge}>
            Doctor Web System
          </span>

          <h2>
            {lang === "id" ? (
              <>
                Website Dokter &
                <br />
                Rekam Medis Digital
              </>
            ) : (
              <>
                Doctor Portal &
                <br />
                Digital EMR System
              </>
            )}
          </h2>

          <p>
            {lang === "id" ? (
              "Platform dokter berbasis web yang dirancang untuk membantu proses pemeriksaan pasien menjadi lebih cepat, rapi, dan terhubung. Dokter dapat melihat antrean kunjungan, mengisi hasil pemeriksaan sesuai poli, membuat resep digital, membaca hasil lab dan radiologi, hingga mengirim resume medis ke aplikasi pasien."
            ) : (
              "A web-based doctor portal designed to make clinical examination faster, cleaner, and fully connected. Doctors can view active patient queues, write diagnostic check-ups per specialty, issue digital prescriptions, review laboratory and radiology reports, and push medical summaries straight to the patient mobile app."
            )}
          </p>

          <p>
            {lang === "id" ? (
              "Sistem ini dibuat agar alur kerja klinik lebih efisien, mulai dari pasien datang, dokter melakukan pemeriksaan, hasil medis dicatat, sampai data riwayat pasien tersimpan secara digital dan mudah ditelusuri kembali."
            ) : (
              "This system optimizes clinic workflows, covering patient arrival, doctor examination, digital entry of test records, and structuring clinical histories for seamless retrieval."
            )}
          </p>

          <div className={styles.techList}>
            <span>Flutter Web</span>
            <span>Laravel</span>
            <span>REST API</span>
            <span>Medical Form</span>
            <span>Patient App</span>
          </div>

          <div className={styles.featureGrid}>
            <div>
              {lang === "id" ? (
                <>
                  <strong>Form Pemeriksaan Dinamis</strong>
                  <span>Isi pemeriksaan menyesuaikan poli, spesialis, dan kebutuhan dokter.</span>
                </>
              ) : (
                <>
                  <strong>Dynamic Medical Forms</strong>
                  <span>Forms adapt instantly based on specialization, clinic type, and doctor needs.</span>
                </>
              )}
            </div>

            <div>
              {lang === "id" ? (
                <>
                  <strong>Rekam Medis Terintegrasi</strong>
                  <span>Diagnosa, resep, lab, radiologi, dan resume pasien tercatat dalam satu sistem.</span>
                </>
              ) : (
                <>
                  <strong>Unified EMR System</strong>
                  <span>Diagnoses, prescriptions, labs, imaging, and patient summaries are logged in a single database.</span>
                </>
              )}
            </div>

            <div>
              {lang === "id" ? (
                <>
                  <strong>Resep Digital</strong>
                  <span>Dokter dapat membuat resep obat yang langsung terhubung ke proses layanan klinik.</span>
                </>
              ) : (
                <>
                  <strong>E-Prescriptions</strong>
                  <span>Doctors issue digital prescriptions routed directly to clinic pharmacy/operations.</span>
                </>
              )}
            </div>

            <div>
              {lang === "id" ? (
                <>
                  <strong>Terhubung ke Aplikasi Pasien</strong>
                  <span>Resume pemeriksaan dapat dikirim agar pasien bisa melihat riwayat medis dari aplikasi mobile.</span>
                </>
              ) : (
                <>
                  <strong>Patient Mobile Sync</strong>
                  <span>Summaries are instantly shared so patients can review check-ups from their own mobile app.</span>
                </>
              )}
            </div>
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
              href={dokterWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.previewButton}
            >
              <ExternalLink size={18} />
              {lang === "id" ? "Buka Website" : "Open Website"}
            </a>
          </div>
        </div>

        {/* ====== MOBILE CAROUSEL ====== */}
        <section className={styles.mobileCarousel}>
          <div className={styles.mobilePhoneWrap}>
            <div className={styles.mobilePhoneGlow} />
            <div className={styles.mobilePhoneFrame}>
              <div className={styles.mobileSpeaker} />
              <div className={styles.mobilePhoneScreen}>
                {mobileScreens.map((screen, idx) => (
                  <img
                    key={screen.src}
                    src={screen.src}
                    alt={screen.label}
                    className={[
                      styles.mobileScreenImg,
                      idx === mobileSlide ? styles.mobileScreenImgActive : "",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
            <div className={styles.mobileFloatingCard}>
              <div className={styles.mobileFloatingCardIcon}><Monitor size={13} /></div>
              <div>
                <strong>{lang === "id" ? "Rekam Medis" : "Medical Record"}</strong>
                <span>{lang === "id" ? "Dokter Dashboard" : "Doctor Dashboard"}</span>
              </div>
              <span className={styles.mobileLiveBadge}>Web</span>
            </div>
            <div className={styles.mobileScreenLabel}>
              <span>{mobileScreens[mobileSlide].label}</span>
            </div>
          </div>
          <div className={styles.mobileDots}>
            {mobileScreens.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={[styles.mobileDot, idx === mobileSlide ? styles.mobileDotActive : ""].join(" ")}
                onClick={() => setMobileSlide(idx)}
                aria-label={`Lihat layar ${idx + 1}`}
              />
            ))}
          </div>
          <div className={styles.mobileActions}>
            <a href={dokterWebsiteUrl} target="_blank" rel="noreferrer" className={styles.primaryButton}>
              <ExternalLink size={16} /> {lang === "id" ? "Buka Website" : "Open Website"}
            </a>
          </div>
        </section>

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
              styles.desktopScene,
              isDragging ? styles.isDragging : "",
            ].join(" ")}
            style={
              {
                "--rotate-x": `${rotate.x}deg`,
                "--rotate-y": `${rotate.y}deg`,
                "--rotate-z": `${rotate.z}deg`,
                "--zoom": zoom,
              } as React.CSSProperties
            }
          >
            <div className={styles.sceneShadow} />

            <div className={styles.desktopMockup}>
              <div className={styles.desktopTopBar}>
                <span />
                <span />
                <span />
              </div>

              <div className={styles.desktopScreen}>
                <img
                  src="/royal/showcase/website/dokter.png"
                  alt="Website Dokter Royal Klinik"
                />
              </div>

              <div className={styles.desktopBase}>
                <div className={styles.desktopStand} />
                <div className={styles.desktopFoot} />
              </div>

              <span className={styles.screenLabel}>Doctor Dashboard</span>
            </div>

            <div className={styles.floatingCardOne}>
              <strong>{lang === "id" ? "Radiologi" : "Radiology"}</strong>
              <span>{lang === "id" ? "Hasil penunjang terhubung" : "Linked imaging records"}</span>
            </div>

            <div className={styles.floatingCardTwo}>
              <strong>{lang === "id" ? "Resep Obat" : "Prescriptions"}</strong>
              <span>{lang === "id" ? "Resep digital pasien" : "Patient e-prescription"}</span>
            </div>

            <div className={styles.floatingCardThree}>
              <strong>{lang === "id" ? "Resume" : "Summary"}</strong>
              <span>{lang === "id" ? "Dikirim ke aplikasi pasien" : "Pushed to patient app"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
