import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      //   userAgent: "*",
      disallow: "*",
    },
    host: "https://www.cbd.ua",
    sitemap: "https://www.cbd.ua/sitemap.xml",
  };
}
