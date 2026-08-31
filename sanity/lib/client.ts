import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Hämtar data från Sanity med ISR-cache. Returnerar `fallback` om Sanity
 * inte är konfigurerat ännu eller om anropet misslyckas – sajten ska aldrig
 * krascha för att CMS:et saknas.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!client) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 600 },
    });
  } catch (error) {
    console.error("Sanity-hämtning misslyckades:", error);
    return fallback;
  }
}
