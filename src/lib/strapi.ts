import type { Project, Landing, Studio, ContactInfo } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export function getStrapiImageUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

async function fetchStrapi<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    cache: process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache',
    next: process.env.NODE_ENV === 'development' ? undefined : { revalidate: 3600 },
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Strapi fetch failed: ${path} (${res.status}) — ${body}`);
  }
  const json = await res.json();
  return json.data as T;
}

export async function getProjects(): Promise<Project[]> {
  return fetchStrapi<Project[]>(
    '/projects?populate=*&sort=order:asc'
  );
}

export async function getProject(slug: string): Promise<Project> {
  const results = await fetchStrapi<Project[]>(
    `/projects?filters[slug][$eq]=${slug}&populate[galleryBlocks][fields][0]=blockText&populate[galleryBlocks][fields][1]=blockTextAlign&populate[galleryBlocks][populate][images][populate]=*`
  );
  return results[0];
}

export async function getLanding(): Promise<Landing> {
  return fetchStrapi<Landing>('/landing?populate=*');
}

export async function getStudio(): Promise<Studio> {
  return fetchStrapi<Studio>(
    '/studio?populate=*'
  );
}

export async function getContactInfo(): Promise<ContactInfo> {
  return fetchStrapi<ContactInfo>('/contact-info');
}
