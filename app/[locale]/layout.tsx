import type { Metadata, Viewport } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { locales, defaultLocale } from "@/i18n";
import { Navigation } from "@/features/navigation/navigation";
import { Footer } from "@/features/footer/footer";

const manrope = Manrope({
  variable: "--manrope",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--work-sans",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: "#1d3ede",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDefault = locale === defaultLocale;
  const baseUrl = "https://ngarsa.com";
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: "%s | Ngarsa Digital",
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Ngarsa Digital" }],
    alternates: {
      canonical: isDefault ? "/" : `/${locale}`,
      languages: {
        en: "/",
        id: "/id",
        "x-default": "/",
      },
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    openGraph: {
      url: isDefault ? "/" : `/${locale}`,
      type: "website",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [{ url: "/images/logo-ngarsa.png", width: 1200, height: 630 }],
      locale: isDefault ? "en_US" : "id_ID",
      siteName: "Ngarsa Digital",
    },
    twitter: {
      card: "summary_large_image",
      site: "@NgarsaDigital",
      creator: "@NgarsaDigital",
      title: t("ogTitle"),
      description: t("twitterDescription"),
      images: ["/images/logo-ngarsa.png"],
    },
    verification: { yandex: "997f78d123f13810" },
    other: {
      "geo.region": "ID-JB",
      "geo.placename": "Jatinangor, Sumedang",
      "geo.position": "-6.9271;107.7718",
      ICBM: "-6.9271, 107.7718",
      "og:locale:alternate": isDefault ? "id_ID" : "en_US",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${workSans.variable} bg-background text-on-background font-manrope antialiased selection:bg-primary-fixed selection:text-on-primary-fixed`}
      >
        <GoogleTagManager gtmId="GTM-WTRJV2T" />
        <noscript>
          <iframe
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-WTRJV2T"
            style={{ display: "none", visibility: "hidden" }}
            width="0"
          />
        </noscript>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow bg-background">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
