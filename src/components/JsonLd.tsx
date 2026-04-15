const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const organizationJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "4o4 Solutions",
  alternateName: "4o4",
  url: siteUrl,
  description:
    "Startup software development team in Amman, Jordan—custom web applications, mobile apps, and workflow automation for MENA.",
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
};

const websiteJson = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "4o4 Solutions",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...organizationJson,
            "@id": `${siteUrl}/#organization`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJson) }}
      />
    </>
  );
}
