"use client";

import {
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  X,
  Bell,
  MapPin,
  Clock,
  Ticket,
  Github
} from "lucide-react";
import {
  useEffect,
  useState,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type WheelEvent,
} from "react";
import styles from "./ProjectShowcaseAntrianku.module.css";
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

const antriankuWebsiteUrl: string = "https://antrianku.project-mahadatatech.web.id/login";

const roleFlowData = {
  id: [
    {
      icon: <MapPin size={17} />,
      title: "Pilih Instansi",
      description:
        "Pengguna memilih instansi atau layanan yang dituju (misal: Disdukcapil, RS, dll) dari daftar yang tersedia dalam aplikasi.",
    },
    {
      icon: <Ticket size={17} />,
      title: "Ambil Antrian",
      description:
        "Pengguna memilih jenis layanan spesifik dan menekan tombol ambil antrian untuk mendapatkan nomor tiket secara digital.",
    },
    {
      icon: <Clock size={17} />,
      title: "Pantau Real-time",
      description:
        "Sistem menampilkan status antrian saat ini secara live, sehingga pengguna tidak perlu menunggu berlama-lama di lokasi.",
    },
    {
      icon: <Bell size={17} />,
      title: "Notifikasi Panggilan",
      description:
        "Aplikasi akan mengirimkan notifikasi saat nomor antrian sudah hampir dipanggil atau sedang dipanggil oleh petugas.",
    },
  ],
  en: [
    {
      icon: <MapPin size={17} />,
      title: "Select Institution",
      description:
        "Users select the target institution or service (e.g., Civil Registry, Hospital, etc.) from the list available in the app.",
    },
    {
      icon: <Ticket size={17} />,
      title: "Get Ticket",
      description:
        "Users select the specific type of service and press the button to acquire their digital queue ticket number.",
    },
    {
      icon: <Clock size={17} />,
      title: "Real-time Tracking",
      description:
        "The system displays the current live status of the queue, eliminating the need to wait for a long time at the physical location.",
    },
    {
      icon: <Bell size={17} />,
      title: "Call Notifications",
      description:
        "The application sends push notifications when the queue number is close to being called or is currently being served by officers.",
    },
  ]
};

const featureCardsData = {
  id: [
    {
      title: "Sistem Multi-Instansi (SaaS)",
      description:
        "Satu aplikasi untuk menampung banyak instansi. Tiap instansi mengelola layanannya sendiri. Terbukti ampuh menghemat ratusan juta anggaran IT klien.",
    },
    {
      title: "Smart Crowd Control",
      description:
        "Memberikan estimasi waktu panggil agar warga tidak menumpuk di lokasi. Sangat efektif mengurai kerumunan dan antrean ruang tunggu.",
    },
    {
      title: "Proteksi Anti-Spam",
      description:
        "Sistem otomatis memblokir pengguna yang asal booking banyak tiket fiktif. Memastikan kuota harian layanan benar-benar tepat sasaran.",
    },
    {
      title: "Verifikasi via WhatsApp",
      description:
        "Login dan notifikasi menggunakan WhatsApp OTP. Data pengguna dijamin lebih valid, hemat biaya dibanding SMS, dan lebih direspons masyarakat.",
    },
    {
      title: "E-Officer & Data Analitik",
      description:
        "Petugas cukup memanggil dari panel web. Pimpinan instansi langsung mendapat laporan data rata-rata durasi pelayanan untuk evaluasi kerja.",
    },
    {
      title: "Channel Informasi Publik",
      description:
        "Tersedia space interaktif untuk menampilkan agenda kota, info layanan, atau promo UMKM lokal yang bisa dimanfaatkan untuk monetisasi.",
    },
  ],
  en: [
    {
      title: "Multi-Tenant SaaS System",
      description:
        "A single app designed to host multiple public sectors. Each sector manages its own services. Proven to save client IT infrastructure budgets.",
    },
    {
      title: "Smart Crowd Control",
      description:
        "Provides estimated call-up times to prevent visitors from crowding on-site. Extremely effective at minimizing waiting room queues.",
    },
    {
      title: "Anti-Spam Protection",
      description:
        "The system automatically blocks accounts placing multiple ghost bookings, ensuring daily service quotas reach real citizens.",
    },
    {
      title: "WhatsApp Verification",
      description:
        "OTP logins and updates delivered via WhatsApp. Ensures higher data validity, lower delivery costs than SMS, and better user response.",
    },
    {
      title: "E-Officer & Analytics",
      description:
        "Officers summon ticket holders via a simple web panel. Supervisors receive live data on service durations for performance evaluation.",
    },
    {
      title: "Public Info Channel",
      description:
        "Provides interactive spaces to display city agendas, updates, or local business promotions to enable monetization.",
    },
  ]
};

export default function ProjectShowcaseAntrianku({
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

  const roleFlow = roleFlowData[lang];
  const featureCards = featureCardsData[lang];

  const mobileScreens = [
    { src: "/antrianku/1.jpeg", label: lang === "id" ? "Onboarding" : "Onboarding" },
    { src: "/antrianku/2.jpeg", label: lang === "id" ? "Beranda" : "Home" },
    { src: "/antrianku/3.jpeg", label: lang === "id" ? "Pilih Layanan" : "Select Service" },
    { src: "/antrianku/4.jpeg", label: lang === "id" ? "Notifikasi" : "Notifications" },
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
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
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
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
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
        aria-label="Tutup showcase"
      >
        <X size={21} />
      </button>

      <main className={styles.modalContent}>
        <section className={styles.showcaseText}>
          <span className={styles.projectBadge}>
            <ShieldCheck size={15} />
            Queue Management Platform
          </span>

          <h2>
            Antrianku
            <span>Mobile App</span>
          </h2>

          <p>
            {lang === "id" ? (
              "Platform antrean digital cerdas yang dirancang khusus untuk merevolusi pelayanan publik dan instansi komersial. Tidak sekadar memindahkan nomor antrean ke layar HP, sistem ini dibangun sebagai solusi total untuk mengurai kerumunan dan inefisiensi waktu yang merugikan."
            ) : (
              "A smart digital queuing platform specifically designed to revolutionize public services and commercial sectors. More than just moving queue tickets onto phone screens, this system is built as a complete solution to reduce crowd bottlenecking and costly time inefficiencies."
            )}
          </p>

          <p>
            {lang === "id" ? (
              "Dengan arsitektur Multi-Tenant, aplikasi ini memungkinkan satu daerah atau grup rumah sakit memakai satu platform tunggal untuk puluhan cabang, namun tetap dengan panel admin mandiri. Solusi matang yang siap menghemat anggaran IT hingga ratusan juta rupiah."
            ) : (
              "With its Multi-Tenant architecture, this application allows a municipality or hospital group to deploy a single platform for dozens of branches, yet keep individual administrative control panels. A mature system ready to save massive IT development budgets."
            )}
          </p>

          <div className={styles.techList}>
            <span>Flutter</span>
            <span>Dart</span>
            <span>REST API</span>
            <span>State Management</span>
            <span>Push Notification</span>
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
            {antriankuWebsiteUrl !== "#" && (
              <a
                href={antriankuWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.primaryButton}
              >
                <ExternalLink size={17} />
                {lang === "id" ? "Buka Platform" : "Open Platform"}
              </a>
            )}

            <a
              href="https://github.com/itsmeFer"
              target="_blank"
              rel="noreferrer"
              className={styles.secondaryButton}
            >
              <Github size={17} />
              GitHub
            </a>

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
              <div className={styles.mobileFloatingCardIcon}><Bell size={13} /></div>
              <div>
                <strong>{lang === "id" ? "Giliran Anda Dekat!" : "Your Turn is Close!"}</strong>
                <span>Loket 3 · A-012</span>
              </div>
              <span className={styles.mobileLiveBadge}>Live</span>
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
            <a href={antriankuWebsiteUrl} target="_blank" rel="noreferrer" className={styles.primaryButton}>
              <ExternalLink size={16} /> {lang === "id" ? "Buka Platform" : "Open Platform"}
            </a>
            <a href="https://github.com/itsmeFer" target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              <Github size={16} /> GitHub
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

            {/* Notification Floating Card */}
            <div className={styles.qrGateCard}>
              <div className={styles.qrGateHeader}>
                <div className={styles.qrGateAvatar}>
                  <Bell size={15} />
                </div>

                <div>
                  <strong>{lang === "id" ? "Notifikasi Antrian" : "Queue Notification"}</strong>
                  <span>{lang === "id" ? "Sistem Antrianku" : "Antrianku System"}</span>
                </div>
              </div>

              <div className={styles.qrGateBody}>
                <div className={styles.qrStatusRow}>
                  <span className={styles.qrIndicator} />
                  <strong>{lang === "id" ? "Giliran Anda Dekat!" : "Your Turn is Close!"}</strong>
                </div>
                <div className={styles.qrDetails}>
                  <div>
                    <span>{lang === "id" ? "NOMOR" : "NUMBER"}</span>
                    <strong>A-012</strong>
                  </div>
                  <div>
                    <span>{lang === "id" ? "LOKET" : "COUNTER"}</span>
                    <strong>Loket 3</strong>
                  </div>
                </div>
              </div>

              <div className={styles.gateVerifiedBadge}>
                Live
              </div>
            </div>

            {/* Phone Left - Onboarding */}
            <div className={styles.phoneMockupLeft}>
              <div className={styles.phoneAura} />
              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />
                <div className={styles.phoneScreen}>
                  <img src="/antrianku/1.jpeg" alt="Antrianku Onboarding" />
                </div>
              </div>
            </div>

            {/* Phone Main - Home Page */}
            <div className={styles.phoneMockupMain}>
              <div className={styles.phoneAura} />
              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />
                <div className={styles.phoneScreen}>
                  <img src="/antrianku/2.jpeg" alt="Antrianku Beranda" />
                </div>
              </div>
            </div>

            {/* Phone Right - Selection */}
            <div className={styles.phoneMockupRight}>
              <div className={styles.phoneAura} />
              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />
                <div className={styles.phoneScreen}>
                  <img src="/antrianku/3.jpeg" alt="Antrianku Pemilihan Instansi" />
                </div>
              </div>
            </div>

            {/* Phone Four - Notification */}
            <div className={styles.phoneMockupFour}>
              <div className={styles.phoneAura} />
              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />
                <div className={styles.phoneScreen}>
                  <img src="/antrianku/4.jpeg" alt="Antrianku Notifikasi" />
                </div>
              </div>
            </div>

            {/* Floating Process Chips */}
            <div className={styles.processChipOne}>
              <MapPin size={16} />
              <strong>{lang === "id" ? "Pilih Layanan" : "Select Service"}</strong>
              <span>{lang === "id" ? "Daftar instansi" : "Institution list"}</span>
            </div>

            <div className={styles.processChipTwo}>
              <Ticket size={16} />
              <strong>{lang === "id" ? "Ambil Tiket" : "Get Ticket"}</strong>
              <span>{lang === "id" ? "Antrian Digital" : "Digital Queue"}</span>
            </div>

            <div className={styles.processChipThree}>
              <Bell size={16} />
              <strong>{lang === "id" ? "Notifikasi" : "Notification"}</strong>
              <span>{lang === "id" ? "Pantau Real-time" : "Real-time Tracking"}</span>
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
