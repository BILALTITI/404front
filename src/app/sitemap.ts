import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL as siteUrl } from "@/lib/site";
import { SERVICE_META } from "@/data/services";
import { PROJECT_META } from "@/data/projects";
import { BLOG_META } from "@/data/blog";

function languageAlternates(path: string): Record<string, string> {
  return {
    en: `${siteUrl}/en${path}`,
    ar: `${siteUrl}/ar${path}`,
    "x-default": `${siteUrl}/en${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: languageAlternates("") },
  }));

  const serviceEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    SERVICE_META.map((service) => ({
      url: `${siteUrl}/${locale}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: languageAlternates(`/services/${service.slug}`),
      },
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    PROJECT_META.map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.messageKey}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: languageAlternates(`/projects/${project.messageKey}`),
      },
    })),
  );

  const blogIndexEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
    alternates: { languages: languageAlternates("/blog") },
  }));

  const blogPostEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    BLOG_META.map((post) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: languageAlternates(`/blog/${post.slug}`),
      },
    })),
  );

  const authorEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}/authors/bilal-altiti`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
    alternates: {
      languages: languageAlternates("/authors/bilal-altiti"),
    },
  }));

  return [
    ...homeEntries,
    ...serviceEntries,
    ...projectEntries,
    ...blogIndexEntries,
    ...blogPostEntries,
    ...authorEntries,
  ];
}
