import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ngarsa.com";
  const paths = [
    "",
    "/services",
    "/services/web-creative",
    "/services/seo-analytics",
    "/services/marketing-technology",
    "/services/design-branding",
    "/about",
    "/contact",
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${path}`])
        ),
      },
    }))
  );
}
