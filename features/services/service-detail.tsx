import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { ServiceVideoShowcase } from "./service-video-showcase";

export type ServiceDetailProps = {
  slug: string;
};

// Map of adjacent services for navigation
const adjacentServices: Record<
  string,
  { prev: { slug: string; key: string }; next: { slug: string; key: string } }
> = {
  "web-creative": {
    prev: { slug: "design-branding", key: "designBranding" },
    next: { slug: "seo-analytics", key: "seoAnalytics" },
  },
  "seo-analytics": {
    prev: { slug: "web-creative", key: "webCreative" },
    next: { slug: "marketing-technology", key: "marketingTech" },
  },
  "marketing-technology": {
    prev: { slug: "seo-analytics", key: "seoAnalytics" },
    next: { slug: "design-branding", key: "designBranding" },
  },
  "design-branding": {
    prev: { slug: "marketing-technology", key: "marketingTech" },
    next: { slug: "web-creative", key: "webCreative" },
  },
};

export const ServiceDetail = async ({ slug }: ServiceDetailProps) => {
  const tCommon = await getTranslations("serviceDetail.common");
  const tService = await getTranslations(`serviceDetail.services.${slug}`);
  const tServicesNav = await getTranslations("services.cards");

  const pillars = tService.raw("pillars") as Array<{
    tag: string;
    title: string;
    description: string;
    items: string[];
  }>;

  const roadmap = tService.raw("roadmap") as Array<{
    step: string;
    name: string;
    description: string;
    output: string;
  }>;

  const tools = tService.raw("tools") as string[];

  const faq = tService.raw("faq") as Array<{
    q: string;
    a: string;
  }>;

  const adjacent = adjacentServices[slug] || {
    prev: { slug: "web-creative", key: "webCreative" },
    next: { slug: "seo-analytics", key: "seoAnalytics" },
  };

  const prevTitle = tServicesNav(`${adjacent.prev.key}.title`);
  const nextTitle = tServicesNav(`${adjacent.next.key}.title`);

  return (
    <div className="max-w-[1280px] mx-auto w-full pt-8 pb-section-gap">
      {/* Top Breadcrumbs & Back Bar */}
      <div className="px-margin mb-8 flex items-center justify-between">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 bg-surface text-on-surface border-2 border-inverse-surface brutalist-shadow-sm px-4 py-2 font-label-bold text-label-bold uppercase hover:bg-primary-fixed transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          <span>{tCommon("backToServices")}</span>
        </Link>

        <div className="hidden sm:inline-block bg-inverse-surface text-surface px-3 py-1 font-mono text-[12px] uppercase tracking-widest font-bold">
          {tService("spec")}
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-margin mb-16">
        <div className="relative inline-block mb-6">
          <span className="bg-primary-container px-6 py-2 inline-block -rotate-2 brutalist-border shadow-[8px_8px_0px_0px_#2e3131]">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white m-0 relative z-10">
              {tService("title")}
            </h1>
          </span>
        </div>

        <div className="inline-block bg-primary-fixed text-inverse-surface px-3 py-1 border-2 border-inverse-surface font-label-bold text-label-bold uppercase tracking-wider mb-6 rotate-1">
          {tService("tagline")}
        </div>

        <p className="font-body-lg text-body-lg max-w-3xl pl-6 border-l-4 border-primary-container mb-10 text-on-surface">
          {tService("intro")}
        </p>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-surface-container-lowest brutalist-border brutalist-shadow-sm p-5 flex flex-col justify-between">
            <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              {tCommon("deliveryLabel")}
            </span>
            <span className="font-headline-lg text-[22px] text-on-surface font-bold">
              {tService("quickSpecs.delivery")}
            </span>
          </div>

          <div className="bg-surface-container-lowest brutalist-border brutalist-shadow-sm p-5 flex flex-col justify-between">
            <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              {tCommon("stackLabel")}
            </span>
            <span className="font-headline-lg text-[18px] text-on-surface font-bold leading-snug">
              {tService("quickSpecs.stack")}
            </span>
          </div>

          <div className="bg-surface-container-lowest brutalist-border brutalist-shadow-sm p-5 flex flex-col justify-between">
            <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-[11px] mb-2">
              {tCommon("architectureLabel")}
            </span>
            <span className="font-headline-lg text-[18px] text-on-surface font-bold leading-snug">
              {tService("quickSpecs.architecture")}
            </span>
          </div>

          <div className="bg-primary-fixed brutalist-border brutalist-shadow-sm p-5 flex flex-col justify-between">
            <span className="font-label-bold text-label-bold text-inverse-surface uppercase tracking-wider text-[11px] mb-2 font-black">
              {tCommon("ownershipLabel")}
            </span>
            <span className="font-headline-lg text-[18px] text-inverse-surface font-bold leading-snug">
              {tService("quickSpecs.ownership")}
            </span>
          </div>
        </div>
      </section>

      {/* Google AI Video Showcase Section */}
      <section className="px-margin mb-section-gap">
        <ServiceVideoShowcase
          title={tService("video.title")}
          description={tService("video.description")}
          videoSrc={tService("video.videoSrc")}
          poster={tService("video.poster")}
          badgeLabel={tCommon("videoBadge")}
          tagLabel={tCommon("videoTag")}
          caption={tCommon("videoCaption")}
          slug={slug}
        />
      </section>

      {/* Core Capabilities Grid */}
      <section className="px-margin mb-section-gap">
        <div className="mb-10">
          <div className="inline-block bg-tertiary-container px-3 py-1 brutalist-border rounded-full mb-3">
            <span className="font-label-bold text-label-bold text-on-tertiary-container uppercase tracking-wider">
              {tCommon("capabilitiesTitle")}
            </span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">
            {tCommon("capabilitiesSubtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest brutalist-border brutalist-shadow p-8 flex flex-col justify-between hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div>
                <div className="inline-block bg-surface-container-high px-3 py-1 border-2 border-inverse-surface font-mono text-[11px] font-bold uppercase tracking-wider mb-4">
                  {pillar.tag}
                </div>
                <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface">
                  {pillar.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="border-t-2 border-inverse-surface/20 pt-4 mt-4">
                <span className="font-label-bold text-[11px] uppercase tracking-wider text-on-surface-variant block mb-3">
                  {tCommon("keyOutputLabel")}:
                </span>
                <ul className="space-y-2">
                  {pillar.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-center gap-2 font-body-md text-[15px] text-on-surface"
                    >
                      <span className="material-symbols-outlined text-primary-container text-[18px]">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structural Execution Roadmap */}
      <section className="px-margin mb-section-gap">
        <div className="mb-10">
          <div className="inline-block bg-primary-container px-3 py-1 brutalist-border rounded-full mb-3">
            <span className="font-label-bold text-label-bold text-white uppercase tracking-wider">
              {tCommon("roadmapTitle")}
            </span>
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">
            {tCommon("roadmapSubtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmap.map((step) => (
            <div
              key={step.step}
              className="bg-surface brutalist-border brutalist-shadow p-6 flex flex-col justify-between relative"
            >
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary-fixed text-inverse-surface border-2 border-inverse-surface font-black flex items-center justify-center font-mono text-lg shadow-[2px_2px_0px_0px_#2e3131]">
                {step.step}
              </div>
              <div>
                <span className="font-label-bold text-label-bold text-primary-container uppercase tracking-wider block mb-2">
                  {tCommon("phaseLabel")} {step.step}
                </span>
                <h3 className="font-headline-lg text-[22px] text-on-surface mb-3 leading-tight font-bold">
                  {step.name}
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant mb-6 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="bg-surface-container-low border-2 border-inverse-surface p-3 mt-auto">
                <span className="font-label-bold text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                  {tCommon("keyOutputLabel")}:
                </span>
                <span className="font-body-md text-[13px] font-bold text-on-surface block">
                  {step.output}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tooling & Tech Ecosystem */}
      <section className="px-margin mb-section-gap">
        <div className="bg-surface-container-low brutalist-border brutalist-shadow p-8">
          <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">
            {tCommon("ecosystemTitle")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="bg-surface text-on-surface px-4 py-2 border-2 border-inverse-surface brutalist-shadow-sm font-label-bold text-label-bold uppercase hover:bg-primary-fixed hover:text-inverse-surface transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Direct FAQ Section */}
      <section className="px-margin mb-section-gap">
        <div className="mb-10">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">
            {tCommon("faqTitle")}
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            {tCommon("faqSubtitle")}
          </p>
        </div>

        <div className="space-y-6 max-w-4xl">
          {faq.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest brutalist-border brutalist-shadow p-6"
            >
              <h3 className="font-headline-lg text-[20px] text-on-surface mb-3 flex items-start gap-3">
                <span className="bg-primary-fixed text-inverse-surface px-2 py-0.5 border border-inverse-surface font-mono text-sm font-black">
                  Q{idx + 1}
                </span>
                <span>{item.q}</span>
              </h3>
              <p className="font-body-md text-on-surface-variant pl-9 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Next / Previous Discipline Switcher */}
      <section className="px-margin mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/services/${adjacent.prev.slug}`}
            className="group bg-surface brutalist-border brutalist-shadow p-6 flex items-center justify-between hover:bg-surface-container-high transition-colors"
          >
            <div>
              <span className="font-label-bold text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">
                ← {tCommon("prevService")}
              </span>
              <span className="font-headline-lg text-[22px] text-on-surface font-bold group-hover:text-primary-container transition-colors">
                {prevTitle}
              </span>
            </div>
            <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
          </Link>

          <Link
            href={`/services/${adjacent.next.slug}`}
            className="group bg-surface brutalist-border brutalist-shadow p-6 flex items-center justify-between hover:bg-surface-container-high transition-colors text-right"
          >
            <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:translate-x-1 transition-transform order-2 md:order-1">
              arrow_forward
            </span>
            <div className="order-1 md:order-2">
              <span className="font-label-bold text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1">
                {tCommon("nextService")} →
              </span>
              <span className="font-headline-lg text-[22px] text-on-surface font-bold group-hover:text-primary-container transition-colors">
                {nextTitle}
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Project Initiation Call to Action */}
      <section className="px-margin">
        <div className="bg-primary-container p-12 brutalist-border brutalist-shadow text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-inverse-on-surface mb-6">
              {tService("cta.title")}
            </h2>
            <p className="font-body-lg text-surface-container-high mb-8">
              {tService("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-block bg-surface-container-lowest text-primary-container brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-8 py-4 font-headline-lg text-[22px] font-bold hover:bg-inverse-surface hover:text-white transition-all"
              >
                {tService("cta.button")}
              </Link>
              <Link
                href="/services"
                className="inline-block bg-primary-fixed text-inverse-surface brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-4 font-label-bold text-label-bold uppercase hover:bg-white transition-all"
              >
                {tCommon("viewAllServices")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
