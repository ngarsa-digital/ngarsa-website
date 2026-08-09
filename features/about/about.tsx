import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const About = async () => {
  const t = await getTranslations("about");

  const team = [
    {
      name: t("team.members.alex.name"),
      role: t("team.members.alex.role"),
      bio: t("team.members.alex.bio"),
      img: "/images/team-alex.jpg",
      offset: "",
      bg: "bg-surface-container-lowest",
    },
    {
      name: t("team.members.jordan.name"),
      role: t("team.members.jordan.role"),
      bio: t("team.members.jordan.bio"),
      img: "/images/team-jordan.jpg",
      offset: "md:translate-y-8",
      bg: "bg-tertiary-container",
    },
    {
      name: t("team.members.sam.name"),
      role: t("team.members.sam.role"),
      bio: t("team.members.sam.bio"),
      img: "/images/team-sam.jpg",
      offset: "md:translate-y-16",
      bg: "bg-surface-container-lowest",
    },
  ];

  return (
    <main className="max-w-[1280px] mx-auto px-margin overflow-hidden">
      <section className="mt-section-gap mb-section-gap relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 z-10">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg bg-primary-container text-white inline-block px-4 py-2 brutalist-border shadow-[8px_8px_0px_0px_rgba(46,49,49,1)] -rotate-1 mb-8">
              {t("hero.title")}
            </h1>
            <p className="font-body-lg text-body-lg mt-6 bg-surface-container p-6 brutalist-border shadow-[4px_4px_0px_0px_rgba(46,49,49,1)] max-w-2xl translate-x-4">
              {t("hero.description")}
            </p>
          </div>
          <div className="md:col-span-5 relative mt-12 md:mt-0">
            <div className="aspect-square bg-secondary-container brutalist-border brutalist-shadow absolute top-4 left-4 w-full h-full -z-10"></div>
            <div className="relative w-full aspect-[4/5] brutalist-border bg-surface-container-high">
              <Image src="/images/about-hero.jpg" alt="The Ngarsa Digital team in their studio" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-section-gap bg-inverse-surface text-inverse-on-surface p-8 md:p-16 brutalist-border brutalist-shadow transform rotate-1">
        <div className="transform -rotate-1">
          <h2 className="font-headline-xl text-headline-xl mb-8 text-primary-container inline-block border-b-4 border-primary-container pb-2">
            {t("mission.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <p className="font-body-lg text-body-lg">{t("mission.description")}</p>
            <div className="bg-surface-tint p-6 brutalist-border flex flex-col justify-center text-on-primary">
              <span className="material-symbols-outlined text-6xl mb-4 block">rocket_launch</span>
              <h3 className="font-headline-lg text-headline-lg mb-2">{t("mission.propelling.title")}</h3>
              <p className="font-body-md">{t("mission.propelling.description")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-section-gap">
        <div className="flex items-end justify-between mb-12 border-b-4 border-outline-heavy pb-4">
          <h2 className="font-display-lg text-display-lg-mobile md:text-headline-xl bg-primary text-on-primary px-4 py-2 brutalist-border brutalist-shadow-sm inline-block uppercase">
            {t("team.title")}
          </h2>
          <span className="material-symbols-outlined text-4xl hidden md:block">groups</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {team.map((member) => (
            <div key={member.name} className={`bg-white brutalist-border brutalist-shadow hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-none transition-all group flex flex-col ${member.offset}`}>
              <div className="relative aspect-square overflow-hidden border-b-4 border-outline-heavy">
                <Image src={member.img} alt={member.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className={`p-6 flex-grow ${member.bg}`}>
                <h3 className="font-headline-lg text-headline-lg mb-1">{member.name}</h3>
                <p className="font-label-bold text-secondary mb-4 uppercase">{member.role}</p>
                <p className="font-body-md">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
