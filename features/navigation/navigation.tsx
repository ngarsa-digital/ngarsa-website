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
          <div className="hidden sm:flex items-center">
            <Image
              src="/images/ngarsa_horizontal.png"
              alt="Ngarsa Digital"
              width={160}
              height={40}
              priority
              className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex sm:hidden items-center gap-2">
            <Image
              src="/images/ngarsa_vertical.png"
              alt="Ngarsa"
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="font-headline-lg text-headline-lg font-black text-on-surface dark:text-inverse-on-surface uppercase tracking-tight">
              {t("brand")}
            </span>
          </div>
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
        <div className="fixed inset-0 z-50 bg-surface flex flex-col p-gutter md:hidden">
          <div className="flex justify-between items-center py-4 border-b-4 border-inverse-surface mb-8">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
              aria-label="Ngarsa Digital Home"
            >
              <Image
                src="/images/ngarsa_horizontal.png"
                alt="Ngarsa Digital"
                width={150}
                height={38}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label={t("closeMenu")}
              className="border-4 border-inverse-surface bg-error-container hover:bg-error hover:text-on-error transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] active:translate-x-1 active:translate-y-1 active:shadow-none p-2 flex items-center justify-center"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                close
              </span>
            </button>
          </div>

          <nav className="grow flex flex-col gap-6 justify-center">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group relative block w-full border-4 border-inverse-surface px-6 py-8 shadow-[8px_8px_0px_0px_rgba(46,49,49,1)] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all duration-200 ${
                    active ? "bg-primary-container" : "bg-surface hover:bg-surface-container-high"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-display-lg-mobile text-display-lg-mobile font-black transition-colors ${active ? "text-inverse-surface group-hover:text-surface-tint" : "text-on-surface-variant group-hover:text-primary"}`}>
                      {link.name}
                    </span>
                    {active && (
                      <span className="material-symbols-outlined text-4xl text-inverse-surface transform transition-all">
                        arrow_forward
                      </span>
                    )}
                  </div>
                  {active && <div className="absolute -left-2 -top-2 w-4 h-4 bg-inverse-surface border-2 border-surface"></div>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t-4 border-inverse-surface flex flex-col gap-4">
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="w-full border-4 border-inverse-surface bg-primary text-on-primary font-headline-lg text-headline-lg py-4 shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 flex items-center justify-center gap-2">
              {t("letsTalk")}
              <span className="material-symbols-outlined">arrow_outward</span>
            </Link>
            <div className="flex justify-center gap-4 py-4">
              <button
                onClick={() => {
                  const nextLocale = currentLocale === "en" ? "id" : "en";
                  switchLanguage(nextLocale as Locale);
                  setIsMenuOpen(false);
                }}
                aria-label={t("language")}
                className="border-4 border-inverse-surface px-4 py-3 bg-tertiary-container shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-2 font-bold"
              >
                <span className="material-symbols-outlined text-inverse-surface">language</span>
                <span className="font-label-bold text-label-bold uppercase text-inverse-surface">
                  {currentLocale === "en" ? "ID" : "EN"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
