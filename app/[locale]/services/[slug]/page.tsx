import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";
import { ServiceDetail } from "@/features/services/service-detail";

export const serviceSlugs = [
  "web-creative",
  "seo-analytics",
  "marketing-technology",
  "design-branding",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: `serviceDetail.services.${slug}`,
  });

  const title = `${t("title")} | Ngarsa Digital`;
  const description = t("intro");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        id: `/id/services/${slug}`,
        "x-default": `/en/services/${slug}`,
      },
    },
    openGraph: {
      url: `/${locale}/services/${slug}`,
      title,
      description,
      images: [
        {
          url: "/images/logo-ngarsa.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    notFound();
  }

  setRequestLocale(locale);
  return <ServiceDetail slug={slug} />;
}
