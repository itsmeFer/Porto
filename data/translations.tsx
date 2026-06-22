import { GraduationCap, MapPin, Smartphone, Code2, TerminalSquare, Layers3 } from "lucide-react";
import React from "react";

export const translations = {
  id: {
    nav: {
      about: "Tentang Saya",
      skills: "Keahlian",
      projects: "Proyek",
      journey: "Perjalanan",
      contactBtn: "Hubungi Saya",
    },
    hero: {
      role: "Software Engineer",
      tagline: "Mobile & Web Developer",
      location: "Medan, Indonesia",
      btnViewProjects: "Lihat Portofolio",
      btnContactMe: "Hubungi Saya",
    },
    tech: {
      label: "Teknologi",
      heading: "Tech Stack.",
      title: "Bahasa pemrograman yang biasa saya pakai dan pelajari.",
    },

    about: {
      label: "Profil",
      heading: "Tentang Saya.",
      title: "Membangun perangkat lunak yang scalable, responsif, dan berorientasi pada pengguna.",
      desc1: "Saya Ferdinand Sianturi, seorang Software Developer yang berdomisili di Medan, Indonesia, dan merupakan lulusan program studi Teknik Informatika dari Universitas Prima Indonesia. Saya memiliki ketertarikan yang mendalam dalam rekayasa perangkat lunak, dengan fokus pada penciptaan antarmuka yang intuitif, arsitektur yang solid, dan pengalaman pengguna yang optimal.",
      desc2: "Meskipun memiliki fondasi yang kuat dalam pengembangan aplikasi mobile, saya terus berinovasi dan memperluas keahlian ke teknologi web dan arsitektur backend. Hal ini memungkinkan saya untuk merancang dan mengimplementasikan solusi perangkat lunak end-to-end yang dapat diandalkan dan mudah dipelihara.",
      info: [
        {
          icon: <GraduationCap size={22} />,
          label: "Pendidikan",
          value: "Universitas Prima Indonesia",
        },
        {
          icon: <MapPin size={22} />,
          label: "Lokasi",
          value: "Medan, Indonesia",
        },
      ],
    },
    skills: {
      label: "Kompetensi",
      heading: "Keahlian Utama.",
      title: "Keahlian dalam rekayasa perangkat lunak dan pengembangan produk digital.",
      desc: "Saya menguasai berbagai teknologi modern untuk membangun ekosistem aplikasi yang komprehensif, mulai dari frontend yang interaktif hingga backend yang efisien.",
      items: [
        {
          icon: <Smartphone size={22} />,
          title: "Mobile App Development",
          description:
            "Berpengalaman dalam merancang dan mengembangkan aplikasi mobile cross-platform yang responsif, mengutamakan clean code, manajemen state yang efisien, dan integrasi API yang mulus.",
        },
        {
          icon: <Code2 size={22} />,
          title: "Web & Frontend Development",
          description:
            "Membangun antarmuka web modern, landing page, dan dashboard interaktif menggunakan framework terkini dengan performa tinggi dan struktur komponen yang modular.",
        },
        {
          icon: <TerminalSquare size={22} />,
          title: "Backend & API Integration",
          description:
            "Memahami fondasi arsitektur backend, manajemen basis data, autentikasi, serta pengembangan dan integrasi RESTful API yang aman dan efisien.",
        },
        {
          icon: <Layers3 size={22} />,
          title: "UI/UX & System Design",
          description:
            "Menerjemahkan konsep desain menjadi pengalaman digital yang fungsional, estetis, dan user-friendly, serta merancang alur sistem yang logis untuk memenuhi kebutuhan bisnis.",
        },
      ],
    },
    projects: {
      scrollReveal: "Saya membangun antarmuka yang intuitif dan aplikasi mobile yang tangguh yang mendefinisikan ulang cara pengguna terhubung dengan dunia digital.",
      badge: "Portofolio",
      heading: "Proyek Terbaik.",
      description: "Berikut adalah beberapa proyek yang telah saya bangun untuk menyelesaikan berbagai masalah dan kebutuhan digital.",
      btnView: "Lihat Detail",
      btnOpen: "Buka Aplikasi",
      items: [
        {
          title: "Antrianku Mobile App",
          category: "Queue Management System",
          description:
            "Aplikasi digital untuk memanajemen antrian secara efisien di berbagai instansi publik maupun swasta. Dilengkapi dengan sistem onboarding, pemilihan layanan terintegrasi, penerbitan tiket digital, serta notifikasi status antrian secara real-time.",
          tech: ["Flutter", "Dart", "REST API", "Mobile UI", "Queue System"],
        },
        {
          title: "Prima Fitness Club",
          category: "Gym Management Application",
          description:
            "Sistem manajemen keanggotaan gym yang komprehensif. Menawarkan antarmuka modern yang memudahkan akses 24/7 bagi member, sistem reservasi personal trainer, manajemen langganan, hingga integrasi dengan sistem point-of-sale (POS).",
          tech: ["Flutter", "Dart", "REST API", "State Management", "Mobile UI"],
        },
        {
          title: "Royal Klinik Mobile App",
          category: "Healthcare Information System",
          description:
            "Aplikasi layanan kesehatan terpadu untuk memudahkan operasional pasien klinik. Menyediakan fitur reservasi jadwal dokter, pelacakan antrian digital, akses riwayat medis, hasil laboratorium, dan sistem penagihan.",
          tech: ["Flutter", "Firebase", "REST API", "Healthcare", "Play Store"],
        },
        {
          title: "Prima Homecare Mobile App",
          category: "Homecare Service Platform",
          description:
            "Platform layanan perawatan kesehatan di rumah yang menghubungkan pasien dengan tenaga medis profesional. Menawarkan kemudahan dalam pemesanan layanan, penjadwalan, pemantauan progres perawatan, dan komunikasi langsung dengan administrasi.",
          tech: ["Flutter", "Dart", "REST API", "Healthcare", "Mobile UI"],
        },
        {
          title: "Sistem Informasi Rekam Medis & Portal Dokter",
          category: "Medical Web Portal",
          description:
            "Sistem portal web terintegrasi untuk tenaga medis guna mengelola formulir pemeriksaan, diagnosis, dan rekam medis pasien. Terhubung langsung dengan basis data pusat untuk sinkronisasi hasil laboratorium dan resep obat secara real-time.",
          tech: ["Flutter Web", "Laravel", "REST API", "Medical System", "Web Portal"],
        },
      ],
    },
    journey: {
      label: "Riwayat",
      heading: "Jejak Karier.",
      title: "Dedikasi untuk pembelajaran berkelanjutan dan inovasi teknologi.",
      desc: "Bagi saya, menjadi profesional di bidang IT berarti terus beradaptasi dengan perkembangan teknologi, memahami ekosistem perangkat lunak secara menyeluruh, dan selalu fokus pada penyelesaian masalah melalui kode yang efisien.",
      btnCollab: "Mulai Kolaborasi",
      items: [
        {
          year: "Fokus Saat Ini",
          title: "Pengembangan Perangkat Lunak Skala Produksi",
          description:
            "Membangun aplikasi dan sistem yang tangguh, responsif, dan siap diimplementasikan untuk menyelesaikan masalah dunia nyata.",
        },
        {
          year: "Ekspansi Keahlian",
          title: "Modern Web & Full-Stack Development",
          description:
            "Memperdalam pemahaman dalam arsitektur sistem modern, pengembangan web performa tinggi, dan integrasi end-to-end.",
        },
        {
          year: "Visi ke Depan",
          title: "Software Architecture & Scalability",
          description:
            "Berkomitmen untuk terus mengeksplorasi arsitektur cloud, skalabilitas sistem, dan praktik rekayasa perangkat lunak tingkat lanjut.",
        },
      ],
    },
    contact: {
      badge: "Terbuka untuk Peluang Baru",
      title: "Mari diskusikan ide dan peluang kolaborasi.",
      subtitle: "Silakan pilih jenis keperluan Anda dan kirimkan pesan. Saya akan merespons secepat mungkin.",
      labelKeperluan: "Tujuan menghubungi:",
      bioNote: "Berdomisili di Sumatera Utara, Indonesia. Terbuka untuk diskusi awal melalui Google Meet, Zoom, atau WhatsApp.",
      labelKepada: "Kepada: Ferdinand",
      labelSignature: "Pengunjung Web",
      labelDraft: "Draf Pesan",
      btnEmail: "Kirim via Email",
      btnWA: "Kirim via WhatsApp",
      btnGitHub: "Kunjungi GitHub",
      types: [
        {
          id: "business",
          label: "Kerja Sama & Proyek",
          description: "Proyek freelance, konsultasi, dan kemitraan",
          messageBody:
            "Halo Ferdinand, saya tertarik untuk mendiskusikan peluang kerja sama atau proyek. Apakah kita bisa mengatur waktu untuk berdiskusi lebih lanjut?",
          emailSubject: "Diskusi Peluang Kerja Sama",
        },
        {
          id: "job",
          label: "Peluang Karier",
          description: "Tawaran full-time, part-time, atau kontrak",
          messageBody:
            "Halo Ferdinand, kami memiliki peluang karier yang sejalan dengan profil Anda. Apakah Anda bersedia meluangkan waktu untuk berdiskusi mengenai posisi ini?",
          emailSubject: "Tawaran Peluang Karier",
        },
      ],
      form: {
        title: "Kirimkan pesan singkat.",
        firstName: "NAMA DEPAN",
        lastName: "NAMA BELAKANG",
        email: "EMAIL",
        phone: "NOMOR TELEPON",
        company: "NAMA PERUSAHAAN",
        website: "WEBSITE SAAT INI",
        message: "PESAN",
        optional: "opsional",
        consent: "Saya setuju dengan pemrosesan data saya sesuai dengan kebijakan privasi.",
        submit: "Kirim pesan",
        infoEmail: "EMAIL",
        infoPhone: "TELEPON",
        infoLocation: "LOKASI",
        replyTime: "DIBALAS DALAM 24 JAM",
      }
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      journey: "Journey",
      contactBtn: "Contact Me",
    },
    hero: {
      role: "Software Engineer",
      tagline: "Mobile & Web Developer",
      location: "Medan, Indonesia",
      btnViewProjects: "View Portfolio",
      btnContactMe: "Get in Touch",
    },
    tech: {
      label: "Technologies",
      heading: "Tech Stack.",
      title: "Programming languages that I usually use and learn.",
    },

    about: {
      label: "Profile",
      heading: "Who am I?",
      title: "Building scalable, responsive, and user-centric applications.",
      desc1: "I am Ferdinand Sianturi, a Software Developer based in Medan, Indonesia, and an Informatics Engineering graduate from Universitas Prima Indonesia. I have a profound passion for software engineering, focusing on creating intuitive interfaces, solid architectures, and optimal user experiences.",
      desc2: "While I have a strong foundation in mobile app development, I continuously innovate and expand my skill set into web technologies and backend architecture. This enables me to design and implement reliable, maintainable end-to-end software solutions.",
      info: [
        {
          icon: <GraduationCap size={22} />,
          label: "Education",
          value: "Universitas Prima Indonesia",
        },
        {
          icon: <MapPin size={22} />,
          label: "Location",
          value: "Medan, Indonesia",
        },
      ],
    },
    skills: {
      label: "Competencies",
      heading: "My Expertise.",
      title: "Expertise in software engineering and digital product development.",
      desc: "I leverage modern technologies to build comprehensive application ecosystems, from interactive frontends to efficient backends.",
      items: [
        {
          icon: <Smartphone size={22} />,
          title: "Mobile App Development",
          description:
            "Experienced in designing and developing responsive cross-platform mobile applications, prioritizing clean code, efficient state management, and seamless API integrations.",
        },
        {
          icon: <Code2 size={22} />,
          title: "Web & Frontend Development",
          description:
            "Building modern web interfaces, engaging landing pages, and interactive dashboards using the latest frameworks with high performance and modular component structures.",
        },
        {
          icon: <TerminalSquare size={22} />,
          title: "Backend & API Integration",
          description:
            "Understanding backend architecture fundamentals, database management, authentication, and developing secure, efficient RESTful APIs.",
        },
        {
          icon: <Layers3 size={22} />,
          title: "UI/UX & System Design",
          description:
            "Translating design concepts into functional, aesthetic, and user-friendly digital experiences, while designing logical system flows to meet business requirements.",
        },
      ],
    },
    projects: {
      scrollReveal: "We build intuitive interfaces and robust mobile apps that redefine how users connect with the digital world.",
      badge: "Portfolio",
      heading: "Featured Projects.",
      description: "Here are some of the projects I have built to solve various digital needs and challenges.",
      btnView: "View Details",
      btnOpen: "Open Application",
      items: [
        {
          title: "Antrianku Mobile App",
          category: "Queue Management System",
          description:
            "A digital application for efficient queue management across various public and private institutions. Equipped with an onboarding system, integrated service selection, digital ticketing, and real-time queue status notifications.",
          tech: ["Flutter", "Dart", "REST API", "Mobile UI", "Queue System"],
        },
        {
          title: "Prima Fitness Club",
          category: "Gym Management Application",
          description:
            "A comprehensive gym membership management system. Offers a modern interface facilitating 24/7 member access, personal trainer reservations, subscription management, and integration with point-of-sale (POS) systems.",
          tech: ["Flutter", "Dart", "REST API", "State Management", "Mobile UI"],
        },
        {
          title: "Royal Klinik Mobile App",
          category: "Healthcare Information System",
          description:
            "An integrated healthcare application designed to streamline clinic operations for patients. Provides features for doctor appointment reservations, digital queue tracking, access to medical histories, laboratory results, and billing systems.",
          tech: ["Flutter", "Firebase", "REST API", "Healthcare", "Play Store"],
        },
        {
          title: "Prima Homecare Mobile App",
          category: "Homecare Service Platform",
          description:
            "A home healthcare service platform connecting patients with professional medical staff. Offers ease in booking services, scheduling, monitoring care progress, and direct communication with administration.",
          tech: ["Flutter", "Dart", "REST API", "Healthcare", "Mobile UI"],
        },
        {
          title: "Medical Record Information System & Doctor Portal",
          category: "Medical Web Portal",
          description:
            "An integrated web portal system for medical professionals to manage examination forms, diagnoses, and patient medical records. Directly connected to the central database for real-time synchronization of laboratory results and prescriptions.",
          tech: ["Flutter Web", "Laravel", "REST API", "Medical System", "Web Portal"],
        },
      ],
    },
    journey: {
      label: "History",
      heading: "Professional Journey.",
      title: "A commitment to continuous learning and technological innovation.",
      desc: "To me, being an IT professional means continuously adapting to technological advancements, understanding the software ecosystem holistically, and always focusing on problem-solving through efficient code.",
      btnCollab: "Start Collaboration",
      items: [
        {
          year: "Current Focus",
          title: "Production-Scale Software Development",
          description:
            "Building robust, responsive, and deployment-ready applications to solve real-world problems.",
        },
        {
          year: "Expanding",
          title: "Modern Web & Full-Stack Development",
          description:
            "Deepening my understanding of modern system architectures, high-performance web development, and end-to-end integration.",
        },
        {
          year: "Future Vision",
          title: "Software Architecture & Scalability",
          description:
            "Committed to continuously exploring cloud architecture, system scalability, and advanced software engineering practices.",
        },
      ],
    },
    contact: {
      badge: "Open to New Opportunities",
      title: "Let's discuss ideas and collaboration opportunities.",
      subtitle: "Please select your inquiry type and send a message. I will respond as soon as possible.",
      labelKeperluan: "Reason for inquiry:",
      bioNote: "Based in North Sumatra, Indonesia. I am open to an initial discussion via Google Meet, Zoom, or WhatsApp.",
      labelKepada: "To: Ferdinand",
      labelSignature: "Web Visitor",
      labelDraft: "Message Draft",
      btnEmail: "Send via Email",
      btnWA: "Send via WhatsApp",
      btnGitHub: "Visit GitHub",
      types: [
        {
          id: "business",
          label: "Partnerships & Projects",
          description: "Freelance projects, consulting, and partnerships",
          messageBody:
            "Hello Ferdinand, I am interested in discussing a potential project or partnership. Could we schedule a time to discuss this further?",
          emailSubject: "Discussion Regarding Partnership Opportunities",
        },
        {
          id: "job",
          label: "Career Opportunities",
          description: "Full-time, part-time, or contract offers",
          messageBody:
            "Hello Ferdinand, we have a career opportunity that aligns with your profile. Would you be available for a brief discussion regarding this position?",
          emailSubject: "Career Opportunity Offer",
        },
      ],
      form: {
        title: "Send us a short briefing.",
        firstName: "FIRST NAME",
        lastName: "LAST NAME",
        email: "EMAIL",
        phone: "PHONE NUMBER",
        company: "COMPANY NAME",
        website: "CURRENT WEBSITE",
        message: "MESSAGE",
        optional: "optional",
        consent: "I consent to the processing of my data according to the privacy policy.",
        submit: "Send request",
        infoEmail: "EMAIL",
        infoPhone: "PHONE",
        infoLocation: "LOCATION",
        replyTime: "REPLY WITHIN 24H",
      }
    },
  },
};
