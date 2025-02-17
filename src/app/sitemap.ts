import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cbdrabbit.shop",
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uk: "https://cbdrabbit.shop/uk",
          en: "https://cbdrabbit.shop/en",
        },
      },
      priority: 1,
    },
    {
      url: "https://cbdrabbit.shop/cooperation",
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uk: "https://cbdrabbit.shop/uk/cooperation",
          en: "https://cbdrabbit.shop/en/cooperation",
        },
      },
      priority: 0.8,
    },
    {
      url: "https://cbdrabbit.shop/contacts",
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uk: "https://cbdrabbit.shop/uk/contacts",
          en: "https://cbdrabbit.shop/en/contacts",
        },
      },
      priority: 0.8,
    },
    {
      url: "https://cbdrabbit.shop/checkout-info",
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uk: "https://cbdrabbit.shop/uk/checkout-info",
          en: "https://cbdrabbit.shop/en/checkout-info",
        },
      },
      priority: 0.8,
    },
    {
      url: "https://cbdrabbit.shop/classic",
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uk: "https://cbdrabbit.shop/uk/classic",
          en: "https://cbdrabbit.shop/en/classic",
        },
      },
      priority: 0.8,
    },
    {
      url: "https://cbdrabbit.shop/banana",
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uk: "https://cbdrabbit.shop/uk/banana",
          en: "https://cbdrabbit.shop/en/banana",
        },
      },
      priority: 0.8,
    },
    {
      url: "https://cbdrabbit.shop/matcha",
      lastModified: new Date(),
      changeFrequency: "weekly",
      alternates: {
        languages: {
          uk: "https://cbdrabbit.shop/uk/matcha",
          en: "https://cbdrabbit.shop/en/matcha",
        },
      },
      priority: 0.8,
    },
  ];
}
