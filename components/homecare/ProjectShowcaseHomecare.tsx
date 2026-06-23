"use client";

import {
  BellRing,
  CheckCircle2,
  ExternalLink,
  Heart,
  HeartPulse,
  MessageCircle,
  MousePointer2,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type WheelEvent,
} from "react";
import styles from "./ProjectShowcaseHomecare.module.css";
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

const homecareWebsiteUrl = "https://homecare.primamadanitalenta.my.id/";

export default function ProjectShowcaseHomecare({
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
      icon: <UserRoundCheck size={17} />,
      title: lang === "id" ? "Permintaan Pengguna" : "User Request",
      description: lang === "id"
        ? "Pengguna memilih layanan homecare, mengisi kebutuhan, lalu mengirimkan pengajuan dari aplikasi."
        : "Users select homecare services, specify their requirements, and submit their request from the application.",
    },
    {
      icon: <BellRing size={17} />,
      title: lang === "id" ? "Koordinator" : "Coordinator",
      description: lang === "id"
        ? "Permintaan masuk melalui notifikasi, kemudian koordinator memilih perawat yang sesuai."
        : "Requests arrive via notifications, and the coordinator assigns the most suitable nurse.",
    },
    {
      icon: <MessageCircle size={17} />,
      title: lang === "id" ? "Obrolan Layanan" : "In-App Chat",
      description: lang === "id"
        ? "Pengguna, perawat, dan koordinator dapat berkomunikasi langsung agar koordinasi layanan lebih jelas."
        : "Users, nurses, and coordinators communicate directly to ensure clear service coordination.",
    },
    {
      icon: <CheckCircle2 size={17} />,
      title: lang === "id" ? "Validasi & Penilaian" : "Validation & Rating",
      description: lang === "id"
        ? "Setelah layanan selesai, data divalidasi dan pengguna memberikan ulasan atau penilaian."
        : "Once service is completed, data is validated and users rate the quality of care.",
    },
  ];

  const featureCards = [
    {
      title: lang === "id" ? "Sistem Multi-Peran" : "Multi-Role System",
      description: lang === "id"
        ? "Akses fitur yang disesuaikan untuk Pengguna, Admin, Direktur, Manajer, Koordinator, Perawat, dan IT."
        : "Customized feature access tailored for Users, Admins, Directors, Managers, Coordinators, Nurses, and IT support.",
    },
    {
      title: lang === "id" ? "Penugasan Layanan" : "Service Assignment",
      description: lang === "id"
        ? "Koordinator dapat mengelola dan mengatur penugasan perawat berdasarkan permintaan layanan yang masuk."
        : "Coordinators can manage and schedule nurse assignments based on incoming service requests.",
    },
    {
      title: lang === "id" ? "Obrolan dalam Aplikasi" : "In-App Chat",
      description: lang === "id"
        ? "Fitur obrolan membantu pengguna, perawat, dan koordinator berkomunikasi tanpa harus keluar dari aplikasi."
        : "Integrated chat allows users, nurses, and coordinators to communicate seamlessly without leaving the app.",
    },
    {
      title: lang === "id" ? "Notifikasi Realtime" : "Realtime Notification",
      description: lang === "id"
        ? "Notifikasi Firebase membantu setiap peran menerima pembaruan penting secara instan."
        : "Firebase Notifications ensure every user role receives critical updates instantly.",
    },
  ];

  const mobileScreens = [
    { src: project.imageUrl || "/homecare/homecare1.png", label: lang === "id" ? "Beranda" : "Home" },
    { src: project.secondImageUrl || "/homecare/homecare2.png", label: lang === "id" ? "Kelola Pasien" : "Manage Patients" },
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
        aria-label={lang === "id" ? "Tutup showcase Homecare" : "Close Homecare showcase"}
      >
        <X size={21} />
      </button>

      <main className={styles.modalContent}>
        <section className={styles.showcaseText}>
          <span className={styles.projectBadge}>
            <ShieldCheck size={15} />
            Homecare Multi Role Platform
          </span>

          <h2>
            Prima Homecare
            <span>{lang === "id" ? "Aplikasi Operasional" : "Operational App"}</span>
          </h2>

          <p>
            {lang === "id" ? (
              "Aplikasi Homecare ini dirancang untuk membuat alur pelayanan perawatan medis di rumah lebih terstruktur, responsif, dan mudah dipantau oleh setiap pihak yang terlibat."
            ) : (
              "This Homecare application is designed to streamline home-based medical care, making services more structured, highly responsive, and easy to monitor for all involved roles."
            )}
          </p>

          <p>
            {lang === "id" ? (
              "Sistem ini dibangun menggunakan Flutter dan Dart untuk aplikasi mobile, Laravel sebagai backend API, Firebase Cloud Messaging untuk notifikasi, serta fitur obrolan internal agar koordinasi antara pengguna, perawat, dan koordinator berjalan lancar. Saat ini, aplikasi dipublikasikan dalam versi web demo sementara menunggu proses peluncuran ke Google Play Store."
            ) : (
              "The ecosystem is built using Flutter and Dart for the mobile app, Laravel for the backend API, Firebase Cloud Messaging for notifications, and a built-in chat system to ensure smooth coordination between users, nurses, and coordinators. Currently, the app is deployed as a web demo while awaiting official release on the Google Play Store."
            )}
          </p>

          <div className={styles.techList}>
            <span>Flutter</span>
            <span>Dart</span>
            <span>Laravel</span>
            <span>Firebase</span>
            <span>In-App Chat</span>
            <span>Role Based Access</span>
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
            <a
              href={homecareWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.primaryButton}
            >
              <ExternalLink size={17} />
              {lang === "id" ? "Buka Website" : "Open Website"}
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
              <div className={styles.mobileFloatingCardIcon}><Heart size={13} /></div>
              <div>
                <strong>{lang === "id" ? "Perawat Tiba" : "Nurse Arrived"}</strong>
                <span>{lang === "id" ? "Jadwal 09:00 WIB" : "Schedule 09:00 WIB"}</span>
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
                aria-label={lang === "id" ? `Lihat layar ${idx + 1}` : `View screen ${idx + 1}`}
              />
            ))}
          </div>
          <div className={styles.mobileActions}>
            <a href={homecareWebsiteUrl} target="_blank" rel="noreferrer" className={styles.primaryButton}>
              <ExternalLink size={16} /> {lang === "id" ? "Buka Website" : "Open Website"}
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

            <div className={styles.chatPreviewCard}>
              <div className={styles.chatPreviewHeader}>
                <div className={styles.chatAvatar}>
                  <MessageCircle size={15} />
                </div>

                <div>
                  <strong>{lang === "id" ? "Obrolan Layanan" : "Service Chat"}</strong>
                  <span>{lang === "id" ? "Koordinator • online" : "Coordinator • online"}</span>
                </div>
              </div>

              <div className={styles.chatBubbleRow}>
                <div className={styles.chatBubbleLeft}>
                  {lang === "id" ? "Perawat sudah menuju lokasi ya." : "The nurse is on their way to your location."}
                </div>

                <div className={styles.chatBubbleRight}>
                  {lang === "id" ? "Baik, terima kasih." : "Understood, thank you."}
                </div>
              </div>

              <div className={styles.chatTyping}>
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className={styles.browserCard}>
              <div className={styles.browserBar}>
                <span />
                <span />
                <span />
                <small>homecare.primamadanitalenta.my.id</small>
              </div>

              <div className={styles.browserScreen}>
                <img
                  src={project.secondImageUrl || "/homecare/homecare2.png"}
                  alt="Prima Homecare web build preview"
                />
              </div>

              <span className={styles.browserLabel}>
                {lang === "id" ? "Demo Web Sementara" : "Temporary Web Build"}
              </span>
            </div>

            <div className={styles.phoneMockup}>
              <div className={styles.phoneAura} />

              <div className={styles.phoneFrame}>
                <div className={styles.phoneSpeaker} />

                <div className={styles.phoneScreen}>
                  <img
                     src={project.imageUrl || "/homecare/homecare1.png"}
                    alt="Prima Homecare mobile app preview"
                  />
                </div>
              </div>

              <span className={styles.phoneLabel}>
                {lang === "id" ? "Pratinjau Aplikasi Mobile" : "Mobile App Preview"}
              </span>
            </div>

            <div className={styles.processChipOne}>
              <Smartphone size={16} />
              <strong>{lang === "id" ? "Pengguna" : "User"}</strong>
              <span>{lang === "id" ? "Ajukan layanan" : "Request service"}</span>
            </div>

            <div className={styles.processChipTwo}>
              <BellRing size={16} />
              <strong>{lang === "id" ? "Koordinator" : "Coordinator"}</strong>
              <span>{lang === "id" ? "Terima notif" : "Receive notification"}</span>
            </div>

            <div className={styles.processChipThree}>
              <HeartPulse size={16} />
              <strong>{lang === "id" ? "Perawat" : "Nurse"}</strong>
              <span>{lang === "id" ? "Menuju lokasi" : "Go to location"}</span>
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
