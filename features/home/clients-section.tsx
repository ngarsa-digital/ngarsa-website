import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface ClientItem {
  name: string;
  category: string;
  logo: string;
  url: string;
  alt: string;
}

export const ClientsSection = async () => {
  const t = await getTranslations("home.clients");

  const clients: ClientItem[] = [
    {
      name: "Wistara Media",
      category: "Media & Production",
      logo: "/images/clients/wistara-media.webp",
      url: "https://wistaramedia.com/",
      alt: "Wistara Media logo",
    },
        {
      name: "Populify",
      category: "Digital Growth & Platform",
      logo: "/images/clients/populify.webp",
      url: "http://populify.com/",
      alt: "Populify logo",
    },
    {
      name: "Hexagon",
      category: "Technology & Partner",
      logo: "/images/clients/hexagon.webp",
      url: "#",
      alt: "Hexagon logo",
    },
  ];

  return (
    <section
      aria-label="Clients and Partners"
      className="max-w-7xl mx-auto px-gutter pb-section-gap w-full"
    >
      <div className="bg-surface-bright border-4 border-inverse-surface brutalist-shadow p-6 md:p-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b-4 border-inverse-surface">
          <div>
            <div className="inline-block bg-primary-fixed text-on-surface px-3 py-1 border-2 border-inverse-surface font-label-bold text-label-bold uppercase -rotate-1 mb-2">
              {t("badge")}
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              {t("title")}
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((client) => {
            const hasLink = client.url !== "#";
            const CardWrapper = hasLink ? "a" : "div";
            const linkProps = hasLink
              ? {
                  href: client.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `Visit ${client.name}`,
                }
              : {};

            return (
              <CardWrapper
                key={client.name}
                {...linkProps}
                className="bg-inverse-surface text-inverse-on-surface border-4 border-inverse-surface brutalist-shadow-sm p-6 flex flex-col justify-between group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 relative min-h-42.5"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-label-bold tracking-widest text-primary-fixed uppercase border border-primary-fixed/30 px-2 py-0.5">
                    {client.category}
                  </span>
                  {hasLink && (
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-[18px] text-primary-fixed group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    >
                      arrow_outward
                    </span>
                  )}
                </div>

                <div className="relative h-16 w-full flex items-center justify-center my-3">
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={140}
                    height={50}
                    className="max-h-12 w-auto object-contain filter group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-body-md text-surface-variant">
                  <span className="font-bold text-white">{client.name}</span>
                  {hasLink && (
                    <span className="text-primary-fixed underline text-[11px] group-hover:text-white transition-colors">
                      Visit
                    </span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
