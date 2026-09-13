import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Legal } from "@/features/legal/legal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {
        en: "/en/terms",
        id: "/id/terms",
        "x-default": "/en/terms",
      },
    },
    openGraph: {
      url: `/${locale}/terms`,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og-image.png"],
    },
  };
}

export default async function Page() {
  return <Legal namespace="terms" />;
}
