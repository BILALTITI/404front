import type { MetadataRoute } from "next";
import { SITE_URL as siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Explicit allows for AI/LLM crawlers (GEO) in addition to the general "*"
    // rule below, so a future tightening of "*" can't accidentally de-index
    // Watad from AI answer engines.
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
