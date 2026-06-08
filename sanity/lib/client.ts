import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Helper to build Sanity image URLs with automatic optimisation.
 * Falls back to an empty string if the source is undefined.
 */
export function urlFor(source: SanityImage | undefined): string {
  if (!source) return "";
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return "";
  }
}

/**
 * Typed helper that wraps sanityClient.fetch and swallows errors in
 * development so pages still render with fallback data.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    const data = await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 }, // ISR — revalidate every 60 s
    });
    return data ?? null;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Sanity] fetch failed — using fallback data.", err);
    }
    return null;
  }
}
