import { getTranslations } from "next-intl/server";

type Props = {
  namespace: "privacy" | "terms";
};

const renderLegalBody = (text: string) => {
  const parts = text.split(/(hello@ngarsa\.com)/g);
  return parts.map((part, i) =>
    part === "hello@ngarsa.com" ? (
      <a
        key={i}
        href="mailto:hello@ngarsa.com"
        className="text-primary hover:underline font-bold transition-colors"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

export const Legal = async ({ namespace }: Props) => {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <div className="max-w-7xl mx-auto px-margin overflow-hidden">
      <section className="mt-section-gap mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 z-10">
            <h1 className="font-manrope text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-extrabold bg-primary-container text-white inline-block px-5 py-2.5 sm:px-6 sm:py-3 brutalist-border shadow-[6px_6px_0px_0px_rgba(46,49,49,1)] -rotate-1 mb-8 leading-none tracking-tight max-w-full">
              {t("title")}
            </h1>
            <p className="font-body-lg text-body-lg bg-surface-container p-6 brutalist-border shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] max-w-2xl translate-x-2 md:translate-x-4 leading-relaxed text-on-surface">
              {t("description")}
            </p>
          </div>
          <div className="md:col-span-5 flex md:justify-end mt-8 md:mt-0">
            <span className="bg-inverse-surface text-inverse-on-surface font-label-bold text-label-bold px-4 py-2 brutalist-border shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] rotate-1 inline-flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined">event</span>
              {t("lastUpdated")}
            </span>
          </div>
        </div>
      </section>

      <section className="mb-section-gap flex flex-col gap-8">
        {sections.map((section, idx) => (
          <article className="bg-white brutalist-border brutalist-shadow p-6 md:p-10" key={idx}>
            <h2 className="font-headline-lg text-headline-lg mb-4 flex items-baseline gap-4 text-on-surface">
              <span className="bg-primary text-on-primary px-3 py-1 brutalist-border font-label-bold text-label-bold shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface leading-relaxed whitespace-pre-line">
              {renderLegalBody(section.body)}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
};
