import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "../env";

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Bygger en optimerad CDN-URL för en Sanity-bild. */
export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity är inte konfigurerat.");
  return builder.image(source).auto("format");
}
