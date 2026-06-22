import type React from "react";
import {
  Code2,
  GraduationCap,
  Layers3,
  MapPin,
  Smartphone,
  TerminalSquare,
} from "lucide-react";

import {
  SiDart,
  SiFirebase,
  SiFlutter,
  SiLaravel,
  SiNextdotjs,
  SiPostgresql,
  SiTypescript,
} from "react-icons/si";

export type Skill = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export type Project = {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  secondImageUrl?: string;
  tech: string[];
};

export type Journey = {
  year: string;
  title: string;
  description: string;
};

export type TechStack = {
  name: string;
  icon: React.ReactNode;
};

export type AboutInfo = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export const skills: Skill[] = [
  {
    icon: <Smartphone size={22} />,
    title: "Flutter Mobile App",
    description:
      "Membangun aplikasi mobile modern, responsif, clean UI, integrasi API, local storage, kamera, lokasi, dan flow aplikasi yang rapi.",
  },
  {
    icon: <Code2 size={22} />,
    title: "Next.js",
    description:
      "Membangun website modern, landing page, dashboard, API route, dan struktur full-stack berbasis React.",
  },
  {
    icon: <TerminalSquare size={22} />,
    title: "Laravel",
    description:
      "Mempelajari fondasi backend seperti routing, controller, database, authentication, dan integrasi dengan aplikasi mobile.",
  },
  {
    icon: <Layers3 size={22} />,
    title: "UI / UX Implementation",
    description:
      "Menerjemahkan desain menjadi tampilan aplikasi yang elegan, nyaman digunakan, tidak kaku, dan tetap responsif di berbagai layar.",
  },
];

export const projects: Project[] = [
  // --- PROJECT BARU: ANTRIANKU ---
  {
    title: "Antrianku Mobile App",
    category: "Queue Management App",
    description:
      "Aplikasi mobile untuk memudahkan pengambilan nomor antrian secara online di berbagai instansi. Dilengkapi fitur onboarding, pemilihan layanan instansi, pengambilan tiket antrian, serta notifikasi dan status antrian real-time.",
    imageUrl: "/antrianku/2.jpeg",
    tech: ["Flutter", "Dart", "REST API", "Mobile UI", "Queue System"],
  },
  // --- PROJECT BARU: GYM ---
  {
    title: "Prima Fitness Club",
    category: "Gym Management App",
    description:
      "Aplikasi mobile manajemen gym komprehensif. Didesain dengan antarmuka yang bersih dan modern untuk memudahkan akses member 24/7, booking personal trainer, manajemen membership, hingga sistem kasir dan sales.",
    imageUrl: "/gym/1.png",
    secondImageUrl: "/gym/2.png", // Akan berguna jika kamu buat showcase modalnya nanti
    tech: ["Flutter", "Dart", "REST API", "State Management", "Mobile UI"],
  },
  // -------------------------
  {
    title: "Royal Klinik Mobile App",
    category: "Mobile Healthcare App",
    description:
      "Aplikasi mobile healthcare untuk pasien Royal Klinik. Fitur utamanya mencakup notifikasi Firebase, booking jadwal dokter dari rumah, antrian digital, riwayat kunjungan, hasil lab, radiologi, obat, layanan, dan pembayaran.",
    imageUrl: "/royal/royal-klinik-showcase.png",
    tech: ["Flutter", "Firebase", "REST API", "Booking Dokter", "Play Store"],
  },
  {
    title: "Prima Homecare Mobile App",
    category: "Mobile Homecare App",
    description:
      "Aplikasi mobile Home Care yang membantu pasien dan keluarga memesan layanan perawatan dari rumah dengan lebih mudah. Mulai dari melihat layanan, memilih jadwal, menghubungi admin, sampai memantau informasi layanan dibuat lebih praktis dalam satu aplikasi dengan tampilan clean, modern, dan nyaman digunakan.",
    imageUrl: "/homecare/homecare1.png",
    secondImageUrl: "/homecare/homecare2.png",
    tech: ["Flutter", "Dart", "REST API", "Home Care", "Mobile UI"],
  },
  {
    title: "Website Dokter & Rekam Medis Digital",
    category: "Doctor Web System",
    description:
      "Website dokter berbasis Flutter Web dan Laravel untuk membantu dokter mengisi form pemeriksaan sesuai spesialis dan poli. Sistem ini juga menampilkan hasil lab, radiologi, resep obat, serta resume medis yang terhubung ke aplikasi mobile pasien.",
    imageUrl: "/royal/showcase/website/dokter.png",
    tech: ["Flutter Web", "Laravel", "REST API", "Medical Form", "Patient App"],
  },
];

export const journeys: Journey[] = [
  {
    year: "Sekarang",
    title: "Fokus Mobile App Flutter",
    description:
      "Membangun aplikasi mobile yang rapi, responsif, dan siap dikembangkan ke kebutuhan real project.",
  },
  {
    year: "Berkembang",
    title: "Membangun Website dengan Next.js",
    description:
      "Memperdalam website modern, dashboard, full-stack API, dan integrasi frontend-backend.",
  },
  {
    year: "Next Step",
    title: "Menguatkan Backend Laravel",
    description:
      "Menguatkan pemahaman backend agar bisa membangun sistem yang lebih lengkap dan scalable.",
  },
];

export const techStack: TechStack[] = [
  { name: "Flutter", icon: <SiFlutter size={23} /> },
  { name: "Dart", icon: <SiDart size={23} /> },
  { name: "Firebase", icon: <SiFirebase size={23} /> },
  { name: "Next.js", icon: <SiNextdotjs size={23} /> },
  { name: "TypeScript", icon: <SiTypescript size={23} /> },
  { name: "Laravel", icon: <SiLaravel size={23} /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={23} /> },
];

export const aboutInfo: AboutInfo[] = [
  {
    icon: <GraduationCap size={22} />,
    label: "Kampus",
    value: "Universitas Prima Indonesia",
  },
  {
    icon: <MapPin size={22} />,
    label: "Asal",
    value: "Medan, Indonesia",
  },
];