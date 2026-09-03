import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Services } from "@/features/services/services";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: "/en/services",
        id: "/id/services",
        "x-default": "/en/services",
      },
    },
    openGraph: {
      url: `/${locale}/services`,
      title: t("title"),
      description: t("intro"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Services />;
}
