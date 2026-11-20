/**
 * Validates that a URL string is a well-formed http(s) URL safe for external links.
 * Rejects empty values, malformed strings, and non-http(s) schemes such as javascript: or data:.
 */
export function getSafeExternalUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) {
    return null;
  }
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return null;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export function isSafeExternalUrl(rawUrl: string | null | undefined): boolean {
  return getSafeExternalUrl(rawUrl) !== null;
}
