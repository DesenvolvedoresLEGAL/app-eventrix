export function sanitizeRedirect(target?: string | null): string {
  const DEFAULT = '/dashboard';
  if (!target || typeof target !== 'string') return DEFAULT;

  try {
    // decode once to catch encoded attempts like /%2f%2fevil
    const decoded = decodeURIComponent(target);
    const value = decoded.trim();

    // Must start with a single '/'
    if (!value.startsWith('/')) return DEFAULT;

    // Disallow protocols or external hosts
    const lower = value.toLowerCase();
    if (lower.startsWith('http:') || lower.startsWith('https:')) return DEFAULT;

    // Disallow '//' followed by non-slash (potential protocol-relative)
    if (/\/\/[^/]/.test(value)) return DEFAULT;

    // Normalize multi slashes to single (but keep leading '/')
    const normalized = '/' + value.replace(/^\/+/, '').replace(/\/+/, '/');
    return normalized;
  } catch {
    return DEFAULT;
  }
}
