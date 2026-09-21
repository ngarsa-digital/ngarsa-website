"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const ScrollToTop = () => {
  const t = useTranslations("nav");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight > 0) {
        const progress = window.scrollY / scrollableHeight;
        setIsVisible(progress >= 0.5);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("scrollToTop")}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 size-12 md:size-14 bg-primary text-white border-4 border-inverse-surface shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-primary-container active:translate-x-2 active:translate-y-2 active:shadow-none transition-all flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-fixed ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <span className="material-symbols-outlined text-2xl md:text-3xl font-bold select-none" aria-hidden="true">
        arrow_upward
      </span>
    </button>
  );
};
