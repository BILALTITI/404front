/**
 * Locale-independent metadata for the Knowledge Hub (/blog) articles.
 * Copy lives in messages/{locale}.json under blog.items.<slug>.
 */
export type BlogMeta = {
  slug: string;
  /** ISO date used for lastModified/publishedTime metadata. */
  date: string;
  accent: string;
  /** Service slugs related to this article, for cross-linking. */
  relatedServices?: string[];
  /** Project messageKeys related to this article, for cross-linking. */
  relatedProjects?: string[];
};

export const BLOG_META: BlogMeta[] = [
  { slug: "scoping-before-code", date: "2026-09-01", accent: "#22B8DE", relatedServices: ["web-development", "mobile-apps"] },
  { slug: "see-it-before-its-built", date: "2026-09-01", accent: "#3ED2F0", relatedServices: ["ui-ux-design"] },
  { slug: "ship-something-every-week", date: "2026-09-01", accent: "#1B6491", relatedServices: ["web-development", "cloud-devops"] },
  { slug: "what-handover-includes", date: "2026-09-01", accent: "#22B8DE", relatedServices: ["web-development", "cloud-devops"] },
  { slug: "cost-of-mobile-app-development-in-jordan", date: "2026-09-03", accent: "#22B8DE", relatedServices: ["mobile-apps"], relatedProjects: ["sooquk", "breshta"] },
  { slug: "how-to-choose-a-software-development-company-in-jordan", date: "2026-09-03", accent: "#3ED2F0", relatedServices: ["web-development", "mobile-apps"], relatedProjects: ["cashtics", "okal"] },
  { slug: "mobile-app-development-process-idea-to-launch", date: "2026-09-03", accent: "#1B6491", relatedServices: ["mobile-apps", "ui-ux-design"], relatedProjects: ["lastonewin", "breshta"] },
  { slug: "react-native-vs-native-development", date: "2026-09-03", accent: "#22B8DE", relatedServices: ["mobile-apps"], relatedProjects: ["sooquk", "lastonewin"] },
  { slug: "how-custom-software-automates-business-operations", date: "2026-09-03", accent: "#3ED2F0", relatedServices: ["workflow-automation", "web-development"], relatedProjects: ["cashtics", "clinical"] },
  { slug: "how-to-choose-a-saas-development-partner", date: "2026-09-03", accent: "#1B6491", relatedServices: ["web-development", "cloud-devops"], relatedProjects: ["cashtics", "ilern"] },
  { slug: "web-app-vs-mobile-app-which-is-right-for-your-business", date: "2026-09-03", accent: "#22B8DE", relatedServices: ["web-development", "mobile-apps"], relatedProjects: ["sooquk", "okal"] },
];
