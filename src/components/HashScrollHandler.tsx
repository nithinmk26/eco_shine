"use client";

import { useEffect } from "react";

export default function HashScrollHandler() {
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const scrollToElement = () => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        };
        scrollToElement();
        setTimeout(scrollToElement, 250);
      }
    };

    handleScrollToHash();
    window.addEventListener("hashchange", handleScrollToHash);
    return () => window.removeEventListener("hashchange", handleScrollToHash);
  }, []);

  return null;
}
