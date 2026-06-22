import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroller from "../components/SmoothScroller";
import Preloader from "../components/Preloader";

import { LanguageProvider } from "../context/LanguageContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ferdinand Sianturi Portfolio",
  description: "Portfolio personal Ferdinand Sianturi"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${poppins.variable} ${caveat.variable}`} suppressHydrationWarning>
        <LanguageProvider>
          <Preloader />
          <SmoothScroller />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}