/**
 * Locale-independent URL slugs for the dedicated /services/<slug> pages.
 * `id` maps to the matching entry in messages/{locale}.json under services.list.
 */
export type ServiceMeta = {
  id: number;
  slug: string;
};

export const SERVICE_META: ServiceMeta[] = [
  { id: 1, slug: "web-development" },
  { id: 2, slug: "mobile-apps" },
  { id: 3, slug: "ui-ux-design" },
  { id: 4, slug: "brand-identity" },
  { id: 5, slug: "cloud-devops" },
  { id: 6, slug: "workflow-automation" },
];
