import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ngarsa.com";
  const paths = ["", "/services", "/about", "/contact"];

  return paths.map((path) => ({
    url: `${base}${path === "" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [
          locale,
          `${base}${locale === defaultLocale ? "" : `/${locale}`}${path}`,
        ])
      ),
    },
  }));
}
