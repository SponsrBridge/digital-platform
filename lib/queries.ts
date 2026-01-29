import { sanityClient, isSanityConfigured } from './sanity';

const postFields = `
  _id,
  title,
  slug,
  excerpt,
  tag,
  "date": publishedAt,
  readTime,
  author,
  isFeatured,
  "image": featuredImage.asset->url
`;

export async function getFeaturedPost() {
  if (!isSanityConfigured || !sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "post" && isFeatured == true] | order(publishedAt desc)[0] {
      ${postFields}
    }`
  );
}

export async function getPosts(limit = 6, offset = 0) {
  if (!isSanityConfigured || !sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "post" && isFeatured != true] | order(publishedAt desc)[${offset}...${offset + limit}] {
      ${postFields}
    }`
  );
}

export async function getLatestPosts(limit = 3) {
  if (!isSanityConfigured || !sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      ${postFields}
    }`
  );
}

export async function getPostCount() {
  if (!isSanityConfigured || !sanityClient) return 0;
  return sanityClient.fetch(
    `count(*[_type == "post" && isFeatured != true])`
  );
}

export async function getPostBySlug(slug: string) {
  if (!isSanityConfigured || !sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${postFields},
      body
    }`,
    { slug }
  );
}
