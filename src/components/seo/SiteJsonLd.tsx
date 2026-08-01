import { SITE_URL } from "@/lib/site";
import { SITE_EMAILS, SITE_OFFICE, SITE_PHONE } from "@/lib/site-contact";
import { JsonLd } from "@/components/catalog/JsonLd";

/** Global Organization + WebSite schema for Google Search. */
export function SiteJsonLd() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: "Saluvia Industries",
      legalName: "Saluvia Industries",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-removebg-preview.png`,
      image: `${SITE_URL}/logo-removebg-preview.png`,
      description:
        "Manufacturer of precision electrosurgical instruments for hospitals, medical distributors, and OEM partners worldwide. ISO 13485 and ISO 9001 certified.",
      email: SITE_EMAILS.general,
      telephone: SITE_PHONE.display,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
        addressCountry: "PK",
        streetAddress: SITE_OFFICE.addressLines.join(", "),
      },
      areaServed: "Worldwide",
      knowsAbout: [
        "Electrosurgical instruments",
        "Bipolar forceps",
        "Electrosurgical electrodes",
        "OEM manufacturing",
        "Private label medical devices",
      ],
      sameAs: [] as string[],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: "Saluvia Industries",
      description:
        "B2B catalog of electrosurgical instruments manufactured by Saluvia Industries in Sialkot, Pakistan.",
      publisher: { "@id": organizationId },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return <JsonLd data={data} />;
}
