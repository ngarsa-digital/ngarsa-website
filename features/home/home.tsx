import Image from "next/image";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { ClientsSection } from "@/features/home/clients-section";

export const Home = async () => {
  const t = await getTranslations("home");

  const services = [
    { name: t("services.cards.webCreative"), icon: "monitor", href: "/services/web-creative" },
    { name: t("services.cards.seoAnalytics"), icon: "rocket_launch", href: "/services/seo-analytics" },
    { name: t("services.cards.marketingTech"), icon: "campaign", href: "/services/marketing-technology" },
    { name: t("services.cards.designBranding"), icon: "draw", href: "/services/design-branding" },
  ];

  return (
    <div className="flex flex-col gap-0">
      <section className="max-w-7xl mx-auto px-gutter py-section-gap grid grid-cols-1 md:grid-cols-2 gap-gutter items-center relative">
        <div className="flex flex-col items-start z-10">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
            {t.rich("hero.title", {
              quality: (chunks) => (
                <span className="bg-primary-fixed px-2 border-4 border-inverse-surface inline-block -rotate-2">{chunks}</span>
              ),
              aiPowered: (chunks) => (
                <span className="bg-primary-fixed px-2 border-4 border-inverse-surface inline-block rotate-1">{chunks}</span>
              ),
            })}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-lg">{t("hero.description")}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 border-4 border-inverse-surface brutalist-shadow font-label-bold text-label-bold uppercase">
            {t("hero.cta")}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="relative w-full h-100 md:h-150 border-4 border-inverse-surface brutalist-shadow bg-surface-container-high overflow-hidden z-0">
          <Image src="/images/hero.jpg" alt="Ngarsa Digital creative team at work" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
        </div>
      </section>

      <ClientsSection />

      <section className="max-w-7xl mx-auto px-gutter py-section-gap grid grid-cols-1 md:grid-cols-2 gap-gutter items-center relative bg-surface-container-low border-y-4 border-inverse-surface w-full">
        <div className="relative w-full h-100 border-4 border-inverse-surface brutalist-shadow bg-surface-bright overflow-hidden order-2 md:order-1">
          <Image src="/images/about-snippet.jpg" alt="Inside the Ngarsa Digital studio" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="flex flex-col items-start order-1 md:order-2 pl-0 md:pl-12">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6 relative">{t("about.title")}</h2>
          <div className="font-body-md text-body-md text-on-surface-variant space-y-4 mb-8">
            <p>{t("about.description1")}</p>
            <p className="text-[10px] text-outline italic">{t("about.note")}</p>
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 bg-primary-fixed text-on-surface px-6 py-3 border-4 border-inverse-surface brutalist-shadow font-label-bold text-label-bold uppercase">
            {t("about.cta")}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-gutter py-section-gap relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="font-headline-xl text-headline-xl text-on-surface max-w-md">{t("services.title")}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">{t("services.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <Link
              key={service.name}
              href={service.href}
              className={`bg-surface border-4 border-inverse-surface p-8 brutalist-shadow flex flex-col items-start justify-between h-full group hover:bg-primary-fixed transition-colors ${
                idx % 2 !== 0 ? "md:translate-y-8" : ""
              }`}
            >
              <div>
                <div className="bg-primary-container text-on-primary-container p-4 border-2 border-inverse-surface mb-6 inline-block">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                    {service.icon}
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4 group-hover:text-inverse-surface">{service.name}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface mb-6">{t("services.cards.description")}</p>
              </div>
              <span className="inline-flex items-center gap-1 font-label-bold text-label-bold uppercase text-primary-container group-hover:text-inverse-surface mt-auto">
                Explore <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
