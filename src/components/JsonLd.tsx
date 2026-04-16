import { getTranslations } from "next-intl/server";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "jsonLd" });
  const description = t("organizationDescription");

  const organizationJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "4o4 Solutions",
    alternateName: "4o4",
    url: siteUrl,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    foundingDate: "2025",
    areaServed: ["JO", "MENA"],
    knowsAbout: [
      "Software development",
      "Web applications",
      "Mobile application development",
      "Workflow automation",
    ],
    "@id": `${siteUrl}/#organization`,
  };

  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "4o4 Solutions",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJson),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }}
      />
    </>
  );
}
