import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Studio är hantverkarnas admin-verktyg och ska inte indexeras.
        disallow: ["/studio"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
