"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/navigation";
import { useState, useEffect, useRef } from "react";
import { locales, type Locale } from "@/routing";

export const Navigation = () => {
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as Locale;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("services"), path: "/services" },
    { name: t("about"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ];

  const switchLanguage = (locale: Locale) => {
    router.replace(pathname, { locale });
    setIsLangOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLangOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 flex justify-between items-center px-gutter py-4 bg-surface dark:bg-inverse-surface max-w-full mx-auto w-full border-b-4 border-inverse-surface dark:border-surface-variant shadow-[8px_8px_0px_0px_rgba(46,49,49,1)]">
        <Link href="/" className="flex items-center gap-2 group focus:outline-none" aria-label="Ngarsa Digital Home">
          <Image
            src="/images/ngarsa_horizontal.png"
            alt="Ngarsa Digital"
            width={160}
            height={40}
            priority
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                isActive(link.path)
                  ? "text-primary dark:text-inverse-primary border-b-4 border-primary dark:border-inverse-primary pb-1"
                  : "text-on-surface-variant dark:text-surface-variant"
              } font-bold font-body-md text-body-md hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div ref={langRef} className="relative hidden md:block">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-12 h-12 flex items-center justify-center bg-surface border-4 border-inverse-surface rounded-sm shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-surface-container-low focus:outline-none"
              aria-label={t("language")}
              aria-expanded={isLangOpen}
            >
              <span className="material-symbols-outlined">language</span>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white border-4 border-inverse-surface shadow-[8px_8px_0px_0px_rgba(46,49,49,1)] z-100 flex flex-col">
                {locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => switchLanguage(locale)}
                    className={`w-full text-left px-4 py-3 font-label-bold text-label-bold border-b-4 border-inverse-surface flex justify-between items-center group transition-colors duration-200 ${
                      locale === currentLocale
                        ? "bg-primary-container text-on-primary-container"
                        : "text-inverse-surface hover:bg-surface-container-high"
                    }`}
                  >
                    {locale === "en" ? tLang("english") : tLang("indonesian")}
                    <span className={`material-symbols-outlined text-[18px] ${locale === currentLocale ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}>
                      {locale === currentLocale ? "check" : "arrow_forward"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href="/contact" className="hidden md:flex items-center gap-2 bg-primary text-on-primary border-4 border-inverse-surface brutalist-shadow-sm px-6 py-2 font-headline-lg text-[20px] font-bold">
            {t("letsTalk")}
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-12 h-12 flex items-center justify-center bg-surface border-4 border-inverse-surface rounded-sm shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-surface-container-low focus:outline-none"
            aria-label="Open Menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col px-4 py-3 sm:px-6 sm:py-4 h-dvh max-h-dvh overflow-y-auto overscroll-contain md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex justify-between items-center py-2 border-b-4 border-inverse-surface mb-3 shrink-0">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
              aria-label="Ngarsa Digital Home"
            >
              <Image
                src="/images/ngarsa_horizontal.png"
                alt="Ngarsa Digital"
                width={130}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const nextLocale = currentLocale === "en" ? "id" : "en";
                  switchLanguage(nextLocale as Locale);
                  setIsMenuOpen(false);
                }}
                aria-label={t("language")}
                className="border-2 border-inverse-surface px-2.5 py-1 bg-tertiary-container text-inverse-surface shadow-[2px_2px_0px_0px_rgba(46,49,49,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 font-bold transition-all text-xs"
              >
                <span className="material-symbols-outlined text-[16px]">language</span>
                <span className="font-label-bold text-label-bold uppercase">
                  {currentLocale === "en" ? "ID" : "EN"}
                </span>
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label={t("closeMenu")}
                className="border-2 border-inverse-surface bg-error-container hover:bg-error hover:text-on-error transition-colors duration-200 shadow-[2px_2px_0px_0px_rgba(46,49,49,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none p-1.5 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-2xl">
                  close
                </span>
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2.5 my-auto py-2">
            {navLinks.map((link, index) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group relative block w-full border-4 border-inverse-surface px-4 py-3 sm:py-3.5 shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 ${
                    active ? "bg-primary-container text-white" : "bg-surface hover:bg-surface-container-high"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-2.5">
                      <span className={`text-xs font-mono font-bold ${active ? "text-white/80" : "text-outline"}`}>
                        0{index + 1}
                      </span>
                      <span className={`font-headline-xl-mobile sm:font-headline-xl text-headline-xl-mobile sm:text-headline-xl font-black tracking-tight transition-colors ${
                        active
                          ? "text-white group-hover:text-surface-tint"
                          : "text-on-surface-variant group-hover:text-primary"
                      }`}>
                        {link.name}
                      </span>
                    </div>
                    {active && (
                      <span className="material-symbols-outlined text-2xl text-white transform transition-all">
                        arrow_forward
                      </span>
                    )}
                  </div>
                  {active && <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-inverse-surface border-2 border-surface"></div>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-3 border-t-4 border-inverse-surface shrink-0">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full border-4 border-inverse-surface bg-primary text-on-primary font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg py-3 shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 flex items-center justify-center gap-2 font-bold"
            >
              {t("letsTalk")}
              <span className="material-symbols-outlined text-2xl">arrow_outward</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
