import type { MetadataRoute } from "next";
import { brand, legalLinks, navigation } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/apply", ...navigation.map((item) => item.href), ...legalLinks.map((item) => item.href)];
  return Array.from(new Set(routes)).map((route) => ({
    url: `${brand.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
