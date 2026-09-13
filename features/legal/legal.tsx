import { getTranslations } from "next-intl/server";

type Props = {
  namespace: "privacy" | "terms";
};

export const Legal = async ({ namespace }: Props) => {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <div className="max-w-7xl mx-auto px-margin overflow-hidden">
      <section className="mt-section-gap mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 z-10">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg bg-primary-container text-white inline-block px-4 py-2 brutalist-border shadow-[8px_8px_0px_0px_rgba(46,49,49,1)] -rotate-1 mb-8">
              {t("title")}
            </h1>
            <p className="font-body-lg text-body-lg mt-6 bg-surface-container p-6 brutalist-border shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] max-w-2xl translate-x-4">
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
              {section.body}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
};
