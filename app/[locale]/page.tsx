import { Home } from "@/features/home/home";

const baseUrl = "https://ngarsa.com";
const logoUrl = `${baseUrl}/images/ngarsa_horizontal.png`;

const jsonLdBlocks = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${baseUrl}/#organization`,
    name: "Ngarsa Digital",
    alternateName: "Ngarsa",
    url: baseUrl,
    logo: logoUrl,
    image: logoUrl,
    description:
      "Ngarsa Digital is a creative digital agency based in Jatinangor, Sumedang, West Java, Indonesia. We deliver high-quality web development, graphic design, marketing technology, SEO, and branding solutions.",
    foundingDate: "2019",
    sameAs: [
      "https://ngarsa.page.link/facebook-ngarsa",
      "https://ngarsa.page.link/twitter-ngarsa",
      "https://ngarsa.page.link/instagram-ngarsa",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Indonesian"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jln. Letda Lukito No.16",
      addressLocality: "Jatinangor",
      addressRegion: "West Java",
      postalCode: "45363",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.9271,
      longitude: 107.7718,
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Agency Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web & Creative Design",
            description:
              "We create simple, iconic web and interactive designs for businesses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marketing Technology",
            description:
              "Solutions for delivering clear and unique campaigns with Marketing Technology.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Analytics",
            description:
              "We accelerate your page visibility and findability in search engines.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Design & Branding",
            description:
              "Simple, elegant, and iconic design solutions for your brands.",
          },
        },
      ],
    },
    priceRange: "$$",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Ngarsa Digital",
    inLanguage: ["en", "id"],
    publisher: { "@id": `${baseUrl}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why choose Ngarsa Digital for quality results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At Ngarsa Digital, we provide the best quality according to what you need. We specialize in giving digital creative strategies and solutions to our clients.",
        },
      },
      {
        "@type": "Question",
        name: "Is Ngarsa Digital affordable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, at Ngarsa Digital, we provide relatively affordable and high-quality pricing for all our digital services including web design, SEO, and branding.",
        },
      },
      {
        "@type": "Question",
        name: "Does Ngarsa Digital offer free support and consultation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, at Ngarsa Digital, we support and provide free consultation about creative digital and marketing communications strategy.",
        },
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      {jsonLdBlocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <Home />
    </>
  );
}
