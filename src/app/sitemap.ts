import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL as siteUrl } from "@/lib/site";
import { SERVICE_META } from "@/data/services";
import { PROJECT_META } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  const serviceEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    SERVICE_META.map((service) => ({
      url: `${siteUrl}/${locale}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    PROJECT_META.map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.messageKey}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...homeEntries, ...serviceEntries, ...projectEntries];
}
