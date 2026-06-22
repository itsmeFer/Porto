"use client";

import {
  Activity,
  Dumbbell,
  ExternalLink,
  Flame,
  MousePointer2,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  X,
  Mail,
  MapPin,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import {
  useEffect,
  useState,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type WheelEvent,
} from "react";
import styles from "./ProjectShowcaseGYM.module.css";
import { useLanguage } from "../../context/LanguageContext";

type Project = {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  secondImageUrl?: string;
  tech: string[];
};

type Props = {
  open: boolean;
  project: Project;
  onClose: () => void;
};

const gymWebsiteUrl: string = "https://app-prima-fitness.project-mahadatatech.web.id/"; 

export default function ProjectShowcaseGYM({
  open,
  project,
  onClose,
}: Props) {
  const { lang } = useLanguage();
  const [rotate, setRotate] = useState({ x: -2, y: 5, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);
  const [mobileSlide, setMobileSlide] = useState(0);
  const prevOpenRef = useRef(open);

  const roleFlow = [
    {
      icon: <ClipboardCheck size={17} />,
      title: lang === "id" ? "Pilih Paket & Benefit" : "Select Package & Benefits",
      description: lang === "id"
        ? "Anggota (member) memilih paket gym dengan benefit terstruktur, menyelesaikan pembayaran, lalu admin memvalidasi transaksi."
        : "Members select a gym membership with structured benefits, complete their payment, and the admin validates the transaction.",
    },
    {
      icon: <Mail size={17} />,
      title: lang === "id" ? "Pengiriman E-Policy & Jadwal" : "E-Policy Email & Scheduling",
      description: lang === "id"
        ? "Sistem otomatis mengirimkan dokumen Ketentuan & Kebijakan (Terms & Policy) ke email anggota. Setelah itu, anggota bebas menentukan tanggal mulai latihan melalui aplikasi."
        : "The system auto-sends the official Terms & Policy document to the member's email. Members can then freely select their training start date in the app.",
    },
    {
      icon: <Sparkles size={17} />,
      title: lang === "id" ? "Integrasi Rujukan & Personal Trainer" : "Referral Program & PT Booking",
      description: lang === "id"
        ? "Anggota dapat mengundang teman menggunakan kode rujukan (referral) untuk mendapatkan poin bonus, serta memesan Personal Trainer (PT) berlisensi."
        : "Members can invite friends via referral codes to earn bonus points and book certified Personal Trainers (PT) directly.",
    },
    {
      icon: <MapPin size={17} />,
      title: lang === "id" ? "Presensi GPS & Geofencing" : "GPS Attendance & Geofencing",
      description: lang === "id"
        ? "Pemilik dapat memantau data kehadiran staf dan keuangan secara real-time. Staf wajib melakukan presensi masuk/pulang berbasis radius lokasi GPS."
        : "Owners track staff attendance and financial flows in real-time. Employees check in/out using GPS coordinates within the gym's radius.",
    },
  ];

  const featureCards = [
    {
      title: lang === "id" ? "Geofencing & Poin Penalti" : "Geofencing & Penalty Points",
      description: lang === "id"
        ? "Kehadiran staf otomatis terverifikasi menggunakan koordinat GPS (radius lokasi gym), dilengkapi sistem pemotongan poin pelanggaran dinamis."
        : "Staff attendance is automatically verified using GPS coordinates, with a dynamic system to calculate penalty points for late arrivals.",
    },
    {
      title: lang === "id" ? "Analitik Bisnis untuk Owner" : "Owner Business Intelligence",
      description: lang === "id"
        ? "Dashboard lengkap untuk memantau kehadiran staf, total omzet, komisi tim penjualan, dan daftar anggota aktif."
        : "A comprehensive dashboard to track employee attendance, monitor revenue, manage sales commissions, and view top-tier members.",
    },
    {
      title: lang === "id" ? "E-Contract & Email Otomatis" : "E-Contract & Automated Emails",
      description: lang === "id"
        ? "Konfirmasi pembayaran anggota oleh admin memicu pengiriman email berisi dokumen Ketentuan & Kebijakan ke email anggota."
        : "Payment verification by admins triggers automated emails delivering official Terms, Conditions, and Policy documents to members.",
    },
    {
      title: lang === "id" ? "Komisi Sales & Manajemen PT" : "Sales Commission & PT Management",
      description: lang === "id"
        ? "Pencatatan komisi otomatis bagi tim sales atas pendaftaran anggota baru, penjadwalan latihan, dan penugasan Personal Trainer."
        : "Automated commission calculations for the sales team, training schedule integration, and personal trainer assignment.",
    },
  ];

  const mobileScreens = [
    { src: project.imageUrl || "/gym/1.png", label: lang === "id" ? "Dasbor Anggota" : "Member Dashboard" },
    { src: "/gym/2.png", label: lang === "id" ? "Halaman Utama" : "Main Home" },
    { src: "/gym/3.png", label: lang === "id" ? "Pembelian Keanggotaan" : "Membership Purchase" },
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
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setRotate({ x: -2, y: 5, z: 0 });
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

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotate((current) => ({
      x: (0.5 - y) * 7,
      y: (x - 0.5) * 12,
      z: current.z,
    }));
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    setZoom((current) => {
      const next = current + (event.deltaY > 0 ? -0.025 : 0.025);
      return Math.min(1.06, Math.max(0.94, next));
    });

    setRotate((current) => ({
      ...current,
      z: current.z + (event.deltaY > 0 ? -0.25 : 0.25),
    }));
  };

  const resetView = () => {
    setRotate({ x: -2, y: 5, z: 0 });
    setZoom(1);
    setIsDragging(false);
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
      <div className={styles.noiseLayer} />
      <div className={styles.backdropGlowOne} />
      <div className={styles.backdropGlowTwo} />
      <div className={styles.backdropGlowThree} />
      <div className={styles.modalGrid} />

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label={lang === "id" ? "Tutup showcase Gym" : "Close Gym showcase"}
      >
        <X size={21} />
      </button>

      <main className={styles.modalContent}>
        <section className={styles.showcaseText}>
          <span className={styles.projectBadge}>
            <ShieldCheck size={15} />
            Gym Management Platform
          </span>

          <div className={styles.gymHeroCard}>
            <img
              src="/gym/gym.jpg"
              alt="Prima Fitness Center Facility"
              className={styles.gymHeroImage}
            />
            <div className={styles.gymHeroOverlay} />
            <div className={styles.gymHeroBadge}>
              <Flame size={13} />
              <span>{lang === "id" ? "Fasilitas Prima Fitness Gym" : "Prima Fitness Gym Facility"}</span>
            </div>
          </div>

          <h2>
            Prima Fitness
            <span>{lang === "id" ? "Ekosistem Kebugaran" : "Club Ecosystem"}</span>
          </h2>

          <p>
            {lang === "id" ? (
              "Ekosistem aplikasi manajemen gym modern yang dirancang khusus untuk mempermudah operasional dan manajemen internal. Dilengkapi dengan presensi staf berbasis koordinat GPS (radius lokasi gym) dengan perhitungan poin penalti otomatis, sistem komisi untuk tim penjualan atas pendaftaran anggota baru, serta dashboard analitik bagi pemilik untuk memantau keuangan dan performa staf."
            ) : (
              "A modern gym management ecosystem designed to streamline internal operations and business administration. It features GPS-based attendance tracking (within the gym's radius) with automated penalty point calculations, automated commission systems for sales representatives, and analytical dashboards for owners to monitor revenue and staff performance."
            )}
          </p>

          <p>
            {lang === "id" ? (
              "Sistem ini mendistribusikan email Ketentuan & Kebijakan (Terms & Policy) secara otomatis begitu pembayaran keanggotaan dikonfirmasi oleh admin. Setelah terdaftar, anggota dapat menjadwalkan tanggal mulai latihan secara fleksibel, menggunakan manfaat paket, membagikan kode referral untuk mendapatkan poin bonus, serta berlatih bersama Personal Trainer pilihan mereka."
            ) : (
              "The platform automatically sends Terms & Policy documents via email as soon as a membership payment is approved. Once registered, members can flexibly schedule their start date, enjoy membership benefits, share referral codes to accumulate bonus points, and book certified Personal Trainers."
            )}
          </p>

          <div className={styles.techList}>
            <span>Flutter</span>
            <span>Dart</span>
            <span>REST API</span>
            <span>State Management</span>
            <span>POS System</span>
            <span>Dynamic QR Gate</span>
          </div>

          <div className={styles.featureGrid}>
            {featureCards.map((feature) => (
              <div key={feature.title}>
                <strong>{feature.title}</strong>
                <span>{feature.description}</span>
              </div>
            ))}
          </div>

          <div className={styles.actionRow}>
            {gymWebsiteUrl !== "#" && (
              <a
                href={gymWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.primaryButton}
              >
                <ExternalLink size={17} />
                {lang === "id" ? "Buka Platform" : "Open Platform"}
              </a>
            )}

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={resetView}
            >
              <RotateCcw size={17} />
              {lang === "id" ? "Reset Tampilan" : "Reset View"}
            </button>
          </div>
        </section>

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
              <div className={styles.mobileFloatingCardIcon}><QrCode size={13} /></div>
              <div>
                <strong>QR Gate Check-In</strong>
                <span>Alex Johnson (VIP)</span>
              </div>
              <span className={styles.mobileLiveBadge}>
                {lang === "id" ? "Langsung" : "Live"}
              </span>
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
                aria-label={lang === "id" ? `Lihat layar ${idx + 1}` : `View screen ${idx + 1}`}
              />
            ))}
          </div>
          <div className={styles.mobileActions}>
            <a href={gymWebsiteUrl} target="_blank" rel="noreferrer" className={styles.primaryButton}>
              <ExternalLink size={16} /> {lang === "id" ? "Buka Platform" : "Open Platform"}
            </a>
          </div>
        </section>

        {/* ====== DESKTOP 3D STAGE ====== */}
        <section
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
              styles.deviceScene,
              isDragging ? styles.isDragging : "",
            ].join(" ")}
            style={
              {
                "--rotate-x": `${rotate.x}deg`,
                "--rotate-y": `${rotate.y}deg`,
                "--rotate-z": `${rotate.z}deg`,
                "--zoom": zoom,
              } as CSSProperties
            }
          >
            <div className={styles.sceneShadow} />

            {/* QR Gate Check-in Floating Card */}
            <div className={styles.qrGateCard}>
              <div className={styles.qrGateHeader}>
                <div className={styles.qrGateAvatar}>
                  <QrCode size={15} />
                </div>

                <div>
                  <strong>QR Gate Check-In</strong>
                  <span>{lang === "id" ? "Gerbang aktif • online" : "Active gate • online"}</span>
                </div>
              </div>

              <div className={styles.qrGateBody}>
                <div className={styles.qrStatusRow}>
                  <span className={styles.qrIndicator} />
                  <strong>{lang === "id" ? "Akses Diberikan" : "Access Granted"}</strong>
                </div>
                <div className={styles.qrDetails}>
                  <div>
                    <span>{lang === "id" ? "ANGGOTA" : "MEMBER"}</span>
                    <strong>Alex Johnson (VIP)</strong>
                  </div>
                  <div>
                    <span>{lang === "id" ? "WAKTU" : "CHECK-IN"}</span>
                    <strong>08:30:15</strong>
                  </div>
                </div>
              </div>

              <div className={styles.gateVerifiedBadge}>
                {lang === "id" ? "Terverifikasi" : "Verified"}
              </div>
            </div>

            {/* Phone Left */}
            <div className={styles.phoneMockupLeft}>
              <div className={styles.phoneAura} />

              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />

                <div className={styles.phoneScreen}>
                  <img
                    src="/gym/2.png"
                    alt="Prima Fitness Club PT & Trainer Booking"
                  />
                </div>
              </div>
            </div>

            {/* Phone Main (Center) */}
            <div className={styles.phoneMockupMain}>
              <div className={styles.phoneAura} />

              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />

                <div className={styles.phoneScreen}>
                  <img
                    src={project.imageUrl || "/gym/1.png"}
                    alt="Prima Fitness Club Member Dashboard"
                  />
                </div>
              </div>
            </div>

            {/* Phone Right */}
            <div className={styles.phoneMockupRight}>
              <div className={styles.phoneAura} />

              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />

                <div className={styles.phoneScreen}>
                  <img
                    src="/gym/3.png"
                    alt="Prima Fitness Club POS Kasir & Sales"
                  />
                </div>
              </div>
            </div>

            {/* Floating Process Chips */}
            <div className={styles.processChipOne}>
              <MapPin size={16} />
              <strong>GPS Geofencing</strong>
              <span>{lang === "id" ? "Presensi radius lokasi" : "Location-radius check-in"}</span>
            </div>

            <div className={styles.processChipTwo}>
              <TrendingUp size={16} />
              <strong>{lang === "id" ? "Dasbor Pemilik" : "Owner Dashboard"}</strong>
              <span>{lang === "id" ? "Omzet & Anggota Teratas" : "Revenue & Top Members"}</span>
            </div>

            <div className={styles.processChipThree}>
              <Mail size={16} />
              <strong>{lang === "id" ? "Email Otomatis" : "Email Auto-Send"}</strong>
              <span>{lang === "id" ? "Dokumen terkirim" : "Terms & Policy sent"}</span>
            </div>
          </div>
        </section>
      </main>

      <section className={styles.flowSection}>
        {roleFlow.map((item, index) => (
          <article key={item.title} className={styles.flowStep}>
            <div className={styles.flowIndex}>0{index + 1}</div>
            <div className={styles.flowIcon}>{item.icon}</div>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
