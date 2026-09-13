import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Contact } from "@/features/contact/contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("hero.title"),
    description: t("hero.description"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        id: "/id/contact",
        "x-default": "/en/contact",
      },
    },
    openGraph: {
      url: `/${locale}/contact`,
      title: t("hero.title"),
      description: t("hero.description"),
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: t("hero.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("hero.title"),
      description: t("hero.description"),
      images: ["/images/og-image.png"],
    },
  };
}

export default async function Page() {
  return <Contact />;
}
