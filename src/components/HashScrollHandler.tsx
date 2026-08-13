"use client";

import { useEffect } from "react";

export default function HashScrollHandler() {
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 200);
        }
      }
    };

    handleScrollToHash();
    window.addEventListener("hashchange", handleScrollToHash);
    return () => window.removeEventListener("hashchange", handleScrollToHash);
  }, []);

  return null;
}
