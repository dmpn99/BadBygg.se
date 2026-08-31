import { groq } from "next-sanity";

/** Bildobjekt som GROQ-frågorna nedan returnerar. */
export interface ProjectImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number };
  alt: string;
}

/** Motsvarar `project`-dokumentet i Sanity. */
export interface Project {
  _id: string;
  title: string;
  slug: string;
  service: string;
  location: string;
  completedAt: string;
  excerpt: string;
  description?: string;
  images: ProjectImage[];
}

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  service,
  location,
  completedAt,
  excerpt,
  description,
  images[]{ asset, hotspot, alt }
`;

export const allProjectsQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(completedAt desc) {
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`;

export const projectsByServiceQuery = groq`
  *[_type == "project" && service == $service && defined(slug.current)]
    | order(completedAt desc)[0...$limit] {
    ${projectFields}
  }
`;
