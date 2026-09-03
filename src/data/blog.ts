/**
 * Locale-independent metadata for the Knowledge Hub (/blog) articles.
 * Copy lives in messages/{locale}.json under blog.items.<slug>.
 */
export type BlogMeta = {
  slug: string;
  /** ISO date used for lastModified/publishedTime metadata. */
  date: string;
  accent: string;
};

export const BLOG_META: BlogMeta[] = [
  { slug: "scoping-before-code", date: "2026-09-01", accent: "#22B8DE" },
  { slug: "see-it-before-its-built", date: "2026-09-01", accent: "#3ED2F0" },
  { slug: "ship-something-every-week", date: "2026-09-01", accent: "#1B6491" },
  { slug: "what-handover-includes", date: "2026-09-01", accent: "#22B8DE" },
  { slug: "cost-of-mobile-app-development-in-jordan", date: "2026-09-03", accent: "#22B8DE" },
  { slug: "how-to-choose-a-software-development-company-in-jordan", date: "2026-09-03", accent: "#3ED2F0" },
  { slug: "mobile-app-development-process-idea-to-launch", date: "2026-09-03", accent: "#1B6491" },
  { slug: "react-native-vs-native-development", date: "2026-09-03", accent: "#22B8DE" },
  { slug: "how-custom-software-automates-business-operations", date: "2026-09-03", accent: "#3ED2F0" },
  { slug: "how-to-choose-a-saas-development-partner", date: "2026-09-03", accent: "#1B6491" },
  { slug: "web-app-vs-mobile-app-which-is-right-for-your-business", date: "2026-09-03", accent: "#22B8DE" },
];
