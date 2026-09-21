import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Manrope, Work_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { locales, defaultLocale } from "@/routing";
import { Navigation } from "@/features/navigation/navigation";
import { Footer } from "@/features/footer/footer";
import { ScrollToTop } from "@/features/navigation/scroll-to-top";

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
  themeColor: "#004e5e",
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
    authors: [{ name: "Ngarsa Digital", url: baseUrl }],
    creator: "Ngarsa Digital",
    publisher: "Ngarsa Digital",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/images/favicon/favicon.ico", sizes: "any" },
        { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: ["/images/favicon/favicon.ico"],
    },
    manifest: "/images/favicon/site.webmanifest",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        id: "/id",
        "x-default": "/en",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      url: `/${locale}`,
      type: "website",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ngarsa Digital — Creative Digital Agency Indonesia",
        },
      ],
      locale: isDefault ? "en_US" : "id_ID",
      alternateLocale: isDefault ? ["id_ID"] : ["en_US"],
      siteName: "Ngarsa Digital",
    },
    twitter: {
      card: "summary_large_image",
      site: "@NgarsaDigital",
      creator: "@NgarsaDigital",
      title: t("ogTitle"),
      description: t("twitterDescription"),
      images: ["/images/og-image.png"],
    },
    verification: { yandex: "997f78d123f13810" },
    other: {
      "geo.region": "ID-JB",
      "geo.placename": "Jatinangor, Sumedang",
      "geo.position": "-6.9271;107.7718",
      ICBM: "-6.9271, 107.7718",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
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
            <main className="grow bg-background">{children}</main>
            <Footer />
            <ScrollToTop />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
