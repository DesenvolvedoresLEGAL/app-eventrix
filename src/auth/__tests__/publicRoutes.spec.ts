import { PUBLIC_ROUTES } from '@/auth/publicRoutes';

// Simple unit test ensuring only the three public paths exist
describe('PUBLIC_ROUTES', () => {
  it('contains exactly /login, /register, /plans', () => {
    const expected = new Set(['/login', '/register', '/plans']);
    expect(PUBLIC_ROUTES).toEqual(expected);
  });

  it('compares only pathname-like values', () => {
    // simulate comparison by extracting pathname only
    const url = new URL('https://app.local/login?x=1#y');
    expect(PUBLIC_ROUTES.has(url.pathname)).toBe(true);
  });
});
