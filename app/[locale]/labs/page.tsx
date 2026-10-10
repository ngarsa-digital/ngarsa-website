import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Labs } from "@/features/labs/labs";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "labs" });

  const title = `Labs — ${t("badge")} | Ngarsa Digital`;
  const description = t("hero.description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/labs`,
      languages: {
        en: "/en/labs",
        id: "/id/labs",
        "x-default": "/en/labs",
      },
    },
    openGraph: {
      url: `/${locale}/labs`,
      title,
      description,
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ngarsa Digital Labs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function Page() {
  return <Labs />;
}
