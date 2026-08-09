"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export const Contact = () => {
  const t = useTranslations("contact");

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin py-section-gap flex flex-col gap-section-gap">
      <section className="flex flex-col items-start gap-8 relative z-10">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white bg-primary-container inline-block px-4 py-2 border-4 border-outline-heavy shadow-[8px_8px_0px_0px_rgba(46,49,49,1)] -rotate-2">
          {t("hero.title")}
        </h1>
        <p className="font-body-lg text-body-lg max-w-2xl bg-white p-6 border-4 border-outline-heavy shadow-[4px_4px_0px_0px_rgba(46,49,49,1)]">
          {t("hero.description")}
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="bg-white border-4 border-outline-heavy shadow-[8px_8px_0px_0px_rgba(46,49,49,1)] p-8 flex flex-col gap-6">
          <h2 className="font-headline-xl mb-4 border-b-4 border-outline-heavy pb-2">{t("form.title")}</h2>
          <form action="https://formsubmit.co/hello@ngarsa.com" className="flex flex-col gap-6" encType="multipart/form-data" method="POST">
            <div className="flex flex-col gap-2">
              <label className="font-label-bold uppercase text-on-surface-variant" htmlFor="contact-name">{t("form.name")}</label>
              <input className="border-4 border-outline-heavy bg-surface p-4 focus:bg-primary-container focus:text-white transition-colors rounded-none" id="contact-name" name="name" placeholder={t("form.namePlaceholder")} required type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-bold uppercase text-on-surface-variant" htmlFor="contact-email">{t("form.email")}</label>
              <input className="border-4 border-outline-heavy bg-surface p-4 focus:bg-primary-container focus:text-white transition-colors rounded-none" id="contact-email" name="email" placeholder={t("form.emailPlaceholder")} required type="email" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-bold uppercase text-on-surface-variant" htmlFor="contact-message">{t("form.message")}</label>
              <textarea className="border-4 border-outline-heavy bg-surface p-4 focus:bg-primary-container focus:text-white transition-colors resize-none rounded-none" id="contact-message" name="message" placeholder={t("form.messagePlaceholder")} required rows={5}></textarea>
            </div>
            <input name="_blacklist" type="hidden" value="spammy pattern, banned term, phrase, gambling, investment" />
            <input name="_captcha" type="hidden" value="true" />
            <input autoComplete="off" name="_honey" style={{ display: "none" }} tabIndex={-1} type="text" />
            <input name="_autoresponse" type="hidden" value="Thank you for reach me out on this form contact and submitted your message. -- ngarsa.com" />
            <input name="_template" type="hidden" value="basic" />
            <input name="_next" type="hidden" value="https://ngarsa.com/" />
            <button className="bg-primary border-4 border-inverse-surface text-white font-headline-lg px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all uppercase self-start" type="submit">
              {t("form.submit")}
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-tertiary-container border-4 border-outline-heavy shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl bg-inverse-surface text-white p-2 w-fit">location_on</span>
              <div>
                <h3 className="font-label-bold uppercase mb-1">{t("info.hq.label")}</h3>
                <p className="font-bold">{t("info.hq.address")}</p>
              </div>
            </div>
            <div className="bg-secondary-container border-4 border-outline-heavy shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl bg-inverse-surface text-white p-2 w-fit">mail</span>
              <div>
                <h3 className="font-label-bold uppercase mb-1">{t("info.email.label")}</h3>
                <p className="font-bold break-words">{t("info.email.address")}</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[400px] border-4 border-outline-heavy shadow-[8px_8px_0px_0px_rgba(46,49,49,1)] bg-surface-container overflow-hidden group">
            <Image src="/images/map.jpg" alt="Map showing the Ngarsa Digital office location in Jatinangor, Sumedang" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <span className="material-symbols-outlined text-6xl text-primary drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontVariationSettings: '"FILL" 1' }}>
                location_on
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
