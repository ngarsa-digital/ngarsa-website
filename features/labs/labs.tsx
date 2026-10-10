import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { GenerativeLightShader } from "@/features/labs/generative-light-shader";

export const Labs = async () => {
  const t = await getTranslations("labs");

  const projects = [
    {
      id: "polylinai",
      title: t("projects.items.polylinai.title"),
      tag: t("projects.items.polylinai.tag"),
      platform: t("projects.items.polylinai.platform"),
      description: t("projects.items.polylinai.description"),
      badge: t("projects.items.polylinai.badge"),
      highlight: t("projects.items.polylinai.highlight"),
      installCmd: t("projects.items.polylinai.installCmd"),
      url: t("projects.items.polylinai.url"),
      linkText: t("projects.items.polylinai.linkText"),
      icon: "polyline",
      colorBg: "bg-surface-container-lowest",
      badgeColor: "bg-primary text-on-primary",
      category: "AI & ADTECH",
    },
    {
      id: "local-storage-browser",
      title: t("projects.items.localStorageBrowser.title"),
      tag: t("projects.items.localStorageBrowser.tag"),
      platform: t("projects.items.localStorageBrowser.platform"),
      description: t("projects.items.localStorageBrowser.description"),
      badge: t("projects.items.localStorageBrowser.badge"),
      highlight: t("projects.items.localStorageBrowser.highlight"),
      installCmd: t("projects.items.localStorageBrowser.installCmd"),
      url: t("projects.items.localStorageBrowser.url"),
      linkText: t("projects.items.localStorageBrowser.linkText"),
      icon: "database",
      colorBg: "bg-surface-container-lowest",
      badgeColor: "bg-tertiary-container text-on-tertiary-container",
      category: "BROWSER UTILITY",
    },
    {
      id: "widget",
      title: t("projects.items.whatsappWidget.title"),
      tag: t("projects.items.whatsappWidget.tag"),
      platform: t("projects.items.whatsappWidget.platform"),
      description: t("projects.items.whatsappWidget.description"),
      badge: t("projects.items.whatsappWidget.badge"),
      highlight: t("projects.items.whatsappWidget.highlight"),
      installCmd: t("projects.items.whatsappWidget.installCmd"),
      url: t("projects.items.whatsappWidget.url"),
      linkText: t("projects.items.whatsappWidget.linkText"),
      icon: "chat",
      colorBg: "bg-surface-container-lowest",
      badgeColor: "bg-secondary text-white",
      category: "CONVERSION WIDGET",
    },
  ];

  return (
    <div className="flex flex-col gap-0 w-full overflow-hidden">
      <section className="relative w-full border-b-4 border-inverse-surface bg-[#08090D] overflow-hidden">
        {/* Generative Light Shader - Computed per pixel from clock & coordinate on ground #08090D */}
        <GenerativeLightShader />

        {/* Subtle grid pattern overlay for neo-brutalist tech feel */}
        <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none text-[#DBE0EB]" />

        <div className="max-w-7xl mx-auto px-gutter py-12 md:py-20 lg:py-24 relative z-10">
          {/* Top Pill / Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 bg-[#08090D]/90 text-[#DBE0EB] border-3 border-[#DBE0EB] px-3 py-1 font-label-bold text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(219,224,235,1)]">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
              {t("hero.tag")}
            </span>
            <span className="bg-primary-container text-white px-3 py-1 border-3 border-inverse-surface font-label-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(46,49,49,1)]">
              {t("badge")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <h1 className="font-manrope text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold leading-[1.12] tracking-tight text-white mb-6">
                {t.rich("hero.title", {
                  ai: (chunks) => (
                    <span className="bg-primary-fixed text-on-surface px-2.5 py-0.5 border-3 md:border-4 border-inverse-surface inline-block -rotate-1 whitespace-nowrap mx-1 align-middle shadow-[4px_4px_0px_0px_rgba(219,224,235,0.7)]">
                      {chunks}
                    </span>
                  ),
                  adtech: (chunks) => (
                    <span className="bg-secondary-fixed text-on-secondary-fixed px-2.5 py-0.5 border-3 md:border-4 border-inverse-surface inline-block rotate-1 whitespace-nowrap mx-1 align-middle shadow-[4px_4px_0px_0px_rgba(219,224,235,0.7)]">
                      {chunks}
                    </span>
                  ),
                  openSource: (chunks) => (
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 border-3 md:border-4 border-inverse-surface inline-block -rotate-2 whitespace-nowrap mx-1 align-middle shadow-[4px_4px_0px_0px_rgba(219,224,235,0.7)]">
                      {chunks}
                    </span>
                  ),
                })}
              </h1>

              <p className="font-body-lg text-body-lg text-[#DBE0EB]/90 mb-8 max-w-xl leading-relaxed">
                {t("hero.description")}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#prototypes"
                  className="inline-flex items-center gap-2 bg-primary-fixed text-inverse-surface px-7 py-3.5 border-4 border-inverse-surface brutalist-shadow font-label-bold text-label-bold uppercase tracking-wider group"
                >
                  <span>{t("hero.ctaProjects")}</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_downward
                  </span>
                </a>
                <a
                  href="#manifesto"
                  className="inline-flex items-center gap-2 bg-[#08090D] text-[#DBE0EB] px-6 py-3.5 border-4 border-[#DBE0EB] shadow-[4px_4px_0px_0px_rgba(219,224,235,1)] hover:bg-[#DBE0EB] hover:text-[#08090D] font-label-bold text-label-bold uppercase transition-all"
                >
                  <span>{t("hero.ctaManifesto")}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    menu_book
                  </span>
                </a>
              </div>

              {/* Quick Metric Badges */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-lg border-t-4 border-[#DBE0EB]/30 pt-6">
                <div className="bg-[#08090D] border-3 border-[#DBE0EB] p-3 shadow-[3px_3px_0px_0px_rgba(219,224,235,0.8)]">
                  <div className="font-headline-lg text-2xl sm:text-3xl font-black text-primary-fixed">
                    03+
                  </div>
                  <div className="text-[11px] sm:text-xs font-label-bold uppercase text-[#DBE0EB]/80">
                    {t("hero.stats.packages")}
                  </div>
                </div>
                <div className="bg-[#08090D] border-3 border-[#DBE0EB] p-3 shadow-[3px_3px_0px_0px_rgba(219,224,235,0.8)]">
                  <div className="font-headline-lg text-2xl sm:text-3xl font-black text-tertiary-fixed">
                    100%
                  </div>
                  <div className="text-[11px] sm:text-xs font-label-bold uppercase text-[#DBE0EB]/80">
                    {t("hero.stats.impact")}
                  </div>
                </div>
                <div className="bg-[#08090D] border-3 border-[#DBE0EB] p-3 shadow-[3px_3px_0px_0px_rgba(219,224,235,0.8)]">
                  <div className="font-headline-lg text-2xl sm:text-3xl font-black text-secondary-fixed">
                    PROD
                  </div>
                  <div className="text-[11px] sm:text-xs font-label-bold uppercase text-[#DBE0EB]/80">
                    {t("hero.stats.experiments")}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Column: Vector + Tech + Uncommon AI Operations Dashboard Simulation */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-square bg-primary-fixed border-4 border-inverse-surface brutalist-shadow absolute top-3 left-3 w-full h-full -z-10" />

              <div className="bg-surface border-4 border-inverse-surface brutalist-shadow p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden">
                {/* Simulated Terminal / Engine Window Header */}
                <div className="flex items-center justify-between border-b-3 border-inverse-surface pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-inverse-surface bg-error inline-block" />
                    <span className="w-3.5 h-3.5 border-2 border-inverse-surface bg-primary-fixed inline-block" />
                    <span className="w-3.5 h-3.5 border-2 border-inverse-surface bg-tertiary-fixed inline-block" />
                    <span className="font-mono text-xs font-bold text-on-surface-variant ml-2">
                      ngarsa-labs // runtime
                    </span>
                  </div>
                  <span className="bg-inverse-surface text-primary-fixed px-2 py-0.5 text-[10px] font-mono font-bold uppercase">
                    ACTIVE
                  </span>
                </div>

                {/* Circuit / Vector AI AdTech Nodes Diagram */}
                <div className="bg-inverse-surface text-inverse-on-surface p-4 border-3 border-inverse-surface font-mono text-xs space-y-2 relative overflow-hidden">
                  <div className="text-primary-fixed-dim font-bold flex items-center justify-between">
                    <span>&gt; pipeline: ai-marketing-adtech.agent</span>
                    <span className="text-[10px] text-white/60">NODE_01</span>
                  </div>
                  <div className="text-white/80 text-[11px]">
                    [ok] spatial_roi: initialized via{" "}
                    <span className="text-primary-fixed">@polylinai</span>
                  </div>
                  <div className="text-white/80 text-[11px]">
                    [ok] state_cache: synchronizing via{" "}
                    <span className="text-secondary-fixed">@local-storage</span>
                  </div>
                  <div className="text-white/80 text-[11px]">
                    [ok] omni_channel: chat webhook connected{" "}
                    <span className="text-tertiary-fixed">
                      @whatsapp_widget
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/20 overflow-hidden mt-3 border border-white/40">
                    <div className="h-full bg-primary-fixed w-3/4 animate-pulse" />
                  </div>
                </div>

                {/* Interactive Vector Cards Deck inside Hero */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-secondary-fixed border-3 border-inverse-surface p-3 shadow-[3px_3px_0px_0px_rgba(46,49,49,1)]">
                    <div className="flex items-center gap-1.5 text-xs font-label-bold text-on-secondary-fixed mb-1 uppercase">
                      <span className="material-symbols-outlined text-[16px]">
                        psychology
                      </span>
                      AI Models
                    </div>
                    <div className="font-headline-lg text-lg font-bold text-on-surface leading-tight">
                      ROI Analysis
                    </div>
                    <div className="text-[10px] text-on-secondary-fixed-variant mt-1 font-mono">
                      Predictive Ad Performance
                    </div>
                  </div>

                  <div className="bg-tertiary-fixed border-3 border-inverse-surface p-3 shadow-[3px_3px_0px_0px_rgba(46,49,49,1)]">
                    <div className="flex items-center gap-1.5 text-xs font-label-bold text-on-tertiary-fixed mb-1 uppercase">
                      <span className="material-symbols-outlined text-[16px]">
                        campaign
                      </span>
                      AdTech Lab
                    </div>
                    <div className="font-headline-lg text-lg font-bold text-on-surface leading-tight">
                      Micro Conversions
                    </div>
                    <div className="text-[10px] text-on-tertiary-fixed-variant mt-1 font-mono">
                      High-Touch Lead Engines
                    </div>
                  </div>
                </div>

                {/* Live Video / Motion Showcase Placeholder Component */}
                <div className="relative border-3 border-inverse-surface bg-inverse-surface text-surface p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-fixed text-xl animate-spin">
                      rotate_right
                    </span>
                    <span className="text-xs font-mono font-bold">
                      Continuous Integration & Release
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-primary-fixed bg-surface/10 px-2 py-0.5 border border-primary-fixed/40">
                    v1.0.2 / npm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="manifesto"
        className="max-w-7xl mx-auto px-gutter py-section-gap w-full relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header & Sticky Title */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            <div className="inline-block bg-primary-container text-white px-3.5 py-1.5 brutalist-border shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] uppercase font-label-bold text-xs tracking-wider mb-4">
              {t("manifesto.badge")}
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-tight tracking-tight text-on-surface mb-6">
              {t("manifesto.title")}
            </h2>
            <div className="w-20 h-2 bg-inverse-surface mb-6" />
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Ngarsa Labs exists to bridge the gulf between laboratory
              prototypes and scalable production. We test what works, eliminate
              noise, and package battle-tested tools.
            </p>
          </div>

          {/* Copywriter Prose & 3 Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-surface-container border-4 border-inverse-surface brutalist-shadow p-6 sm:p-8 space-y-4">
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed font-medium">
                {t("manifesto.p1")}
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {t("manifesto.p2")}
              </p>
            </div>

            {/* 3 Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {([0, 1, 2] as const).map((idx) => (
                <div
                  key={idx}
                  className="bg-surface border-4 border-inverse-surface p-5 brutalist-shadow flex flex-col justify-between hover:bg-primary-fixed transition-colors group"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-outline group-hover:text-inverse-surface block mb-2">
                      {t(`manifesto.pillars.${idx}.tag`)}
                    </span>
                    <h3 className="font-headline-lg text-xl font-bold text-on-surface mb-3 group-hover:text-inverse-surface">
                      {t(`manifesto.pillars.${idx}.title`)}
                    </h3>
                    <p className="font-body-md text-xs sm:text-sm text-on-surface-variant group-hover:text-on-surface leading-relaxed">
                      {t(`manifesto.pillars.${idx}.description`)}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t-2 border-inverse-surface/20 flex items-center justify-between text-outline group-hover:text-inverse-surface">
                    <span className="material-symbols-outlined text-lg">
                      check_circle
                    </span>
                    <span className="font-mono text-[10px] font-bold">
                      READY
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="prototypes"
        className="w-full bg-surface-container-low border-y-4 border-inverse-surface py-section-gap relative"
      >
        <div className="max-w-7xl mx-auto px-gutter">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-block bg-inverse-surface text-primary-fixed px-3 py-1 brutalist-border font-label-bold text-xs uppercase tracking-wider mb-4 shadow-[3px_3px_0px_0px_rgba(46,49,49,1)]">
                {t("projects.badge")}
              </div>
              <h2 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-black text-on-surface tracking-tight">
                {t("projects.title")}
              </h2>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-md">
              {t("projects.subtitle")}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((item, index) => (
              <div
                key={item.id}
                className="bg-surface border-4 border-inverse-surface brutalist-shadow flex flex-col justify-between p-6 sm:p-7 relative group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
              >
                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black bg-inverse-surface text-white px-2 py-0.5">
                        0{index + 1}
                      </span>
                      <span className="text-[11px] font-label-bold uppercase tracking-wider text-outline">
                        {item.category}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 border-2 border-inverse-surface font-mono text-xs font-bold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary-container text-on-primary-container border-2 border-inverse-surface flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-2xl"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="font-headline-lg text-2xl font-bold text-on-surface group-hover:text-primary transition-colors wrap-break-word">
                      {item.title}
                    </h3>
                  </div>

                  {/* Subtag / Domain Tag */}
                  <div className="inline-block bg-surface-container-high px-2.5 py-1 border border-inverse-surface text-xs font-mono font-medium text-on-surface-variant mb-4">
                    {item.tag}
                  </div>

                  {/* Description */}
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Install Command Box & Live Button */}
                <div className="space-y-4 pt-4 border-t-2 border-inverse-surface/20">
                  {/* Code snippet command */}
                  <div className="bg-inverse-surface text-surface px-3.5 py-2.5 border-2 border-inverse-surface font-mono text-xs flex items-center justify-between overflow-x-auto">
                    <span className="text-primary-fixed truncate mr-2">
                      $ {item.installCmd}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-white/60">
                      terminal
                    </span>
                  </div>

                  {/* Action Link */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary py-3 px-4 border-3 border-inverse-surface brutalist-shadow-sm font-label-bold text-xs uppercase tracking-wider hover:bg-primary-fixed hover:text-inverse-surface transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <span className="material-symbols-outlined text-[16px]">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-gutter py-section-gap w-full">
        <div className="bg-inverse-surface text-inverse-on-surface border-4 border-inverse-surface brutalist-shadow p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col items-start gap-6">
            <span className="bg-primary-fixed text-inverse-surface px-3 py-1 border-2 border-primary-fixed font-label-bold text-xs uppercase tracking-wider">
              {t("badge")}
            </span>
            <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              {t("cta.title")}
            </h2>
            <p className="font-body-lg text-body-lg text-surface-container-high leading-relaxed max-w-2xl">
              {t("cta.description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-primary-fixed text-on-surface px-8 py-4 border-4 border-inverse-surface brutalist-shadow font-label-bold text-label-bold uppercase tracking-wider hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <span>{t("cta.button")}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
