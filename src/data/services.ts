/**
 * Locale-independent URL slugs for the dedicated /services/<slug> pages.
 * `id` maps to the matching entry in messages/{locale}.json under services.list.
 */
export type ServiceMeta = {
  id: number;
  slug: string;
  /** Real technologies used for this service (shown on the service page; kept in sync with actual delivered work). */
  techStack: string[];
  /** messageKey values from PROJECT_META for shipped projects that used this service, for internal linking. */
  relatedProjects: string[];
};

export const SERVICE_META: ServiceMeta[] = [
  {
    id: 1,
    slug: "web-development",
    techStack: ["React", "Next.js", "ASP.NET Core", "Vue.js", "Laravel", "SQL Server", "REST & GraphQL APIs", "AWS", "Azure"],
    relatedProjects: ["cashtics", "sooquk", "okal", "ilern"],
  },
  {
    id: 2,
    slug: "mobile-apps",
    techStack: ["React Native", "iOS / App Store", "Android / Google Play", "Push notifications", "Offline support", "Secure REST APIs"],
    relatedProjects: ["sooquk", "breshta", "lastonewin"],
  },
  {
    id: 3,
    slug: "ui-ux-design",
    techStack: ["User flow mapping", "Wireframing", "Design systems", "Clickable prototypes", "Developer handoff"],
    relatedProjects: ["okal"],
  },
  {
    id: 4,
    slug: "brand-identity",
    techStack: ["Visual identity", "Logo & UI kits", "Design systems", "Tone & messaging", "Launch assets"],
    relatedProjects: [],
  },
  {
    id: 5,
    slug: "cloud-devops",
    techStack: ["AWS", "Azure", "CI/CD pipelines", "Monitoring & observability", "Hosting setup", "Security basics"],
    relatedProjects: ["cashtics", "breshta", "lastonewin", "okal"],
  },
  {
    id: 6,
    slug: "workflow-automation",
    techStack: ["n8n", "Third-party API integrations", "Webhooks", "Scheduled workflows", "Retries & alerting"],
    relatedProjects: [],
  },
];
