/**
 * Sanity-miljövariabler. Skapa ett projekt på https://www.sanity.io/manage
 * och lägg in värdena i .env.local (se .env.example).
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-01";

/** Sant när ett riktigt projekt-ID är ifyllt – annars körs sajten utan CMS-data. */
export const isSanityConfigured = /^[a-z0-9]+$/.test(projectId);
