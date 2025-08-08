import { sanitizeRedirect } from '@/auth/redirect';

describe('sanitizeRedirect', () => {
  it('returns /dashboard for invalid inputs', () => {
    expect(sanitizeRedirect(undefined)).toBe('/dashboard');
    expect(sanitizeRedirect(null)).toBe('/dashboard');
    expect(sanitizeRedirect('')).toBe('/dashboard');
    expect(sanitizeRedirect('login')).toBe('/dashboard');
  });

  it('allows safe internal paths', () => {
    expect(sanitizeRedirect('/')).toBe('/');
    expect(sanitizeRedirect('/dashboard')).toBe('/dashboard');
    expect(sanitizeRedirect('/analytics/nps')).toBe('/analytics/nps');
  });

  it('rejects external or protocol-relative URLs', () => {
    expect(sanitizeRedirect('http://evil.com')).toBe('/dashboard');
    expect(sanitizeRedirect('https://evil.com')).toBe('/dashboard');
    expect(sanitizeRedirect('//evil.com')).toBe('/dashboard');
    expect(sanitizeRedirect('/%2f%2fevil')).toBe('/dashboard');
  });
});
