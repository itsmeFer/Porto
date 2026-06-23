"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Preloader.module.css";

const GREETINGS = [
  "Hello",      // English
  "Bonjour",    // French
  "Hola",       // Spanish
  "Ciao",       // Italian
  "Konnichiwa", // Japanese
  "Namaste",    // Hindi
  "Halo"        // Indonesian
];

export default function Preloader() {
  const pathname = usePathname();
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(pathname === "/cv");

  useEffect(() => {
    if (pathname === "/cv") return;
    
    document.body.style.overflow = "hidden";
    let isCancelled = false;

    const runSequence = async () => {
      // 1. Type "Hello"
      const firstWord = GREETINGS[0];
      for (let i = 0; i <= firstWord.length; i++) {
        if (isCancelled) return;
        setTypedText(firstWord.substring(0, i));
        await new Promise((r) => setTimeout(r, 140));
      }

      if (isCancelled) return;
      await new Promise((r) => setTimeout(r, 800));

      // 2. Cycle middle words
      for (let i = 1; i < GREETINGS.length - 1; i++) {
        if (isCancelled) return;
        setTypedText(GREETINGS[i]);
        await new Promise((r) => setTimeout(r, 250));
      }

      if (isCancelled) return;

      // 3. Type "Halo"
      const lastWord = GREETINGS[GREETINGS.length - 1];
      setTypedText("");
      for (let i = 0; i <= lastWord.length; i++) {
        if (isCancelled) return;
        setTypedText(lastWord.substring(0, i));
        await new Promise((r) => setTimeout(r, 160));
      }

      if (isCancelled) return;
      await new Promise((r) => setTimeout(r, 1100));

      // 4. Fade out text
      if (isCancelled) return;
      setIsFading(true);
      await new Promise((r) => setTimeout(r, 500));

      // 5. Open gates
      if (isCancelled) return;
      setIsSliding(true);
      await new Promise((r) => setTimeout(r, 1400));

      // 6. Finish
      if (isCancelled) return;
      setIsUnmounted(true);
      document.body.style.overflow = "";
    };

    runSequence();

    return () => {
      isCancelled = true;
      document.body.style.overflow = "";
    };
  }, []);

  // Once completely done, return nothing so it removes itself from DOM
  if (isUnmounted) return null;

  return (
    <div className={`${styles.preloader} ${isSliding ? styles.pointerNone : ""}`}>
      {/* Gate Doors */}
      <div className={`${styles.gate} ${styles.gateLeft} ${isSliding ? styles.gateOpenLeft : ""}`} />
      <div className={`${styles.gate} ${styles.gateRight} ${isSliding ? styles.gateOpenRight : ""}`} />

      {/* Content */}
      <div className={`${styles.preloaderContent} ${isFading ? styles.fadeOut : ""}`}>
        <div className={styles.dot} />
        <h2 className={styles.text}>{typedText}<span className={styles.cursor}>|</span></h2>
      </div>
    </div>
  );
}
