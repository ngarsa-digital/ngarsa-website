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
    },
  };
}

export default async function Page() {
  return <Contact />;
}
