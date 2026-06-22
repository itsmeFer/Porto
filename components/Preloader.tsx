"use client";

import { useEffect, useState } from "react";
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
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Lock scroll immediately on mount
    document.body.style.overflow = "hidden";
    
    let timer: number;
    let typeTimer: number;
    
    if (index === 0) {
      // Type out "Hello" slowly
      const word = GREETINGS[0];
      let currentLen = 0;
      
      const typeNextChar = () => {
        if (currentLen <= word.length) {
          setTypedText(word.substring(0, currentLen));
          currentLen++;
          typeTimer = window.setTimeout(typeNextChar, 140); // Slower typing speed
        } else {
          // Finished typing Hello, pause then go to next
          timer = window.setTimeout(() => {
            setIndex(1);
          }, 800);
        }
      };
      typeNextChar();

    } else if (index > 0 && index < GREETINGS.length - 1) {
      // Middle words cycle slower
      setTypedText(GREETINGS[index]);
      timer = window.setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 250);

    } else if (index === GREETINGS.length - 1) {
      // Last word "Halo", type it out!
      const word = GREETINGS[index];
      let currentLen = 0;
      
      const typeNextChar = () => {
        if (currentLen <= word.length) {
          setTypedText(word.substring(0, currentLen));
          currentLen++;
          typeTimer = window.setTimeout(typeNextChar, 160); // Even slower typing for final word
        } else {
          // Finished typing Halo, pause then exit
          timer = window.setTimeout(() => {
            setIsFading(true);
            
            // After fade out, start sliding up
            window.setTimeout(() => {
              setIsSliding(true);
              
              // After slide up animation finishes, unmount and unlock scroll
              window.setTimeout(() => {
                setIsUnmounted(true);
                document.body.style.overflow = "";
              }, 1400); // matches the new ultra-smooth 1.4s slide up CSS transition
              
            }, 500); // matches new fade out CSS transition duration
          }, 1100); // Hold final word longer
        }
      };
      
      // Clear previous typed text first, then type
      setTypedText("");
      typeTimer = window.setTimeout(typeNextChar, 160);
    }

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(typeTimer);
    };
  }, [index]);

  // Once completely done, return nothing so it removes itself from DOM
  if (isUnmounted) return null;

  return (
    <div className={`${styles.preloader} ${isSliding ? styles.slideUp : ""}`}>
      <div className={`${styles.preloaderContent} ${isFading ? styles.fadeOut : ""}`}>
        <div className={styles.dot} />
        <h2 className={styles.text}>{typedText}<span className={styles.cursor}>|</span></h2>
      </div>
    </div>
  );
}
