/**
 * Extracts the social media handle from a profile URL.
 * Falls back to the raw value if the URL is invalid.
 */
export function socialHandle(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/\//g, '').replace(/^@/, '');
    return `@${path}`;
  } catch {
    return url;
  }
}
