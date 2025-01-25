import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // disallow: "*",
    },
    host: "https://cbdrabbit.shop",
    sitemap: "https://cbdrabbit.shop/sitemap.xml",
  };
}
