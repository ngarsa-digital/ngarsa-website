import Image from "next/image";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

export const Services = async () => {
  const t = await getTranslations("services");

  return (
    <div className="max-w-[1280px] mx-auto w-full pt-section-gap pb-section-gap">
      <section className="px-margin mb-section-gap">
        <div className="relative inline-block mb-8">
          <span className="bg-primary-container px-6 py-2 inline-block -rotate-2 brutalist-border shadow-[8px_8px_0px_0px_#2e3131]">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white m-0 relative z-10">{t("title")}</h1>
          </span>
        </div>
        <p className="font-body-lg text-body-lg max-w-3xl mt-8 pl-4 border-l-4 border-primary-container">{t("intro")}</p>
      </section>

      <section className="px-margin mb-section-gap grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest brutalist-border brutalist-shadow p-8 md:col-span-2 group hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-1">
              <div className="inline-block bg-tertiary-container px-3 py-1 brutalist-border rounded-full mb-4">
                <span className="font-label-bold text-label-bold text-on-tertiary-container uppercase tracking-wider">{t("cards.webCreative.label")}</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl mb-4 group-hover:text-primary-container transition-colors">{t("cards.webCreative.title")}</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">{t("cards.webCreative.description")}</p>
              <ul className="space-y-2 mb-6">
                {t.raw("cards.webCreative.items").map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 font-body-md">
                    <span className="material-symbols-outlined text-primary-container">arrow_forward</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full md:w-1/2 h-64 bg-secondary-container brutalist-border overflow-hidden">
              <Image src="/images/service-web.jpg" alt="Web & creative development services" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="bg-primary-container text-inverse-on-surface brutalist-border brutalist-shadow p-8 flex flex-col justify-between hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
          <div>
            <div className="inline-block bg-inverse-surface px-3 py-1 brutalist-border rounded-full mb-4">
              <span className="font-label-bold text-label-bold text-surface-container uppercase tracking-wider">{t("cards.seoAnalytics.label")}</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-4 text-inverse-on-surface">{t("cards.seoAnalytics.title")}</h2>
            <p className="font-body-md text-surface-container-high">{t("cards.seoAnalytics.description")}</p>
          </div>
          <div className="mt-8 flex justify-end">
            <span className="material-symbols-outlined text-[64px] text-inverse-primary" style={{ fontVariationSettings: '"FILL" 1' }}>
              monitoring
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest brutalist-border brutalist-shadow p-8 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
          <div>
            <div className="inline-block bg-error-container px-3 py-1 brutalist-border rounded-full mb-4">
              <span className="font-label-bold text-label-bold text-on-error-container uppercase tracking-wider">{t("cards.marketingTech.label")}</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg mb-4">{t("cards.marketingTech.title")}</h2>
            <p className="font-body-md text-on-surface-variant">{t("cards.marketingTech.description")}</p>
          </div>
          <div className="mt-8">
            <span className="material-symbols-outlined text-[64px] text-error" style={{ fontVariationSettings: '"FILL" 1' }}>
              hub
            </span>
          </div>
        </div>

        <div className="bg-surface-container-highest brutalist-border brutalist-shadow p-8 md:col-span-2 flex flex-col md:flex-row-reverse gap-8 items-center hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
          <div className="flex-1">
            <div className="inline-block bg-tertiary px-3 py-1 brutalist-border rounded-full mb-4">
              <span className="font-label-bold text-label-bold text-on-tertiary uppercase tracking-wider">{t("cards.designBranding.label")}</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl mb-4">{t("cards.designBranding.title")}</h2>
            <p className="font-body-lg text-on-surface-variant">{t("cards.designBranding.description")}</p>
          </div>
          <div className="w-full md:w-1/3 h-48 bg-tertiary-container brutalist-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots text-outline-variant opacity-50"></div>
            <span className="material-symbols-outlined text-[88px] text-tertiary relative z-10" style={{ fontVariationSettings: '"FILL" 1' }}>
              brush
            </span>
          </div>
        </div>
      </section>

      <section className="px-margin mb-section-gap">
        <div className="bg-primary-container p-12 brutalist-border brutalist-shadow text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-inverse-on-surface mb-6">{t("cta.title")}</h2>
            <p className="font-body-lg text-surface-container-high max-w-2xl mx-auto mb-8">{t("cta.description")}</p>
            <Link href="/contact" className="inline-block bg-surface-container-lowest text-primary-container brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-4 font-headline-lg text-[24px] font-bold hover:bg-inverse-surface hover:text-white transition-all">
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
