import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const isSanityConfigured = Boolean(projectId);

if (!isSanityConfigured) {
  console.info('[Sanity] No VITE_SANITY_PROJECT_ID set — using fallback data.');
}

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : null;

export function urlFor(source: any) {
  if (!sanityClient) return null;
  return imageUrlBuilder(sanityClient).image(source);
}
