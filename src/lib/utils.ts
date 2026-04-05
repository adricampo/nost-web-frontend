export function socialHandle(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/\//g, '').replace(/^@/, '');
    return `@${path}`;
  } catch {
    return url;
  }
}
