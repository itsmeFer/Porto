"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroller() {
  useEffect(() => {
    // Initialize Lenis for a highly luxurious momentum scrolling
    const lenis = new Lenis({
      duration: 1.1, // Shorter = lebih responsive, tidak terasa laggy
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease-out: smooth tapi lebih cepat settle
      wheelMultiplier: 1.0, // Normal wheel speed
      touchMultiplier: 1.5, // Natural touch drag
      infinite: false,
    });

    // High performance scroll reveal function
    function handleScroll() {
      const vh = window.innerHeight;
      // The transition completes when the element enters 240px from the bottom
      const transitionRange = Math.min(240, vh * 0.28); 

      const elements = document.querySelectorAll(".reveal, .section-head");

      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();

        // If the element has scrolled past the top of the viewport, keep it visible
        if (rect.bottom < 0) {
          htmlEl.style.opacity = "1";
          htmlEl.style.filter = "none";
          htmlEl.style.transform = "none";
          return;
        }

        // If the element is still below the viewport bottom
        if (rect.top > vh) {
          htmlEl.style.opacity = "0";
          htmlEl.style.filter = "blur(8px)";
          htmlEl.style.transform = "translateY(30px) scale(0.985)";
        } else {
          // Element is entering the viewport
          const distanceEntered = vh - rect.top;
          
          if (distanceEntered < transitionRange) {
            const progress = distanceEntered / transitionRange;
            // Smoothly calculate styles based on actual progress
            htmlEl.style.opacity = progress.toFixed(3);
            htmlEl.style.filter = `blur(${(8 * (1 - progress)).toFixed(2)}px)`;
            htmlEl.style.transform = `translateY(${(30 * (1 - progress)).toFixed(2)}px) scale(${(0.985 + 0.015 * progress).toFixed(4)})`;
          } else {
            // Fully visible
            htmlEl.style.opacity = "1";
            htmlEl.style.filter = "none";
            htmlEl.style.transform = "none";
          }
        }
      });
    }

    // Trigger initially on load
    setTimeout(handleScroll, 100);

    // Sync scroll handling with Lenis scroll event
    lenis.on("scroll", handleScroll);

    // Also backup with window scroll event to make sure it always tracks
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Sync Lenis scroll with requestAnimationFrame for 60fps/120fps smoothness
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
