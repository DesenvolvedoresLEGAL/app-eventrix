# Auth routing and guards

Public routes:
- /login
- /register
- /plans

Rules:
- All other routes are private and require an authenticated session.
- Unauthenticated access to private routes redirects to `/login?redirectTo=<pathname>`.
- Authenticated users visiting /login or /register are redirected to /dashboard.
- Access Denied page is shown only for authenticated users lacking permission (handled by RoleBasedRoute).

Development:
- Public list in src/auth/publicRoutes.ts
- Redirect sanitization in src/auth/redirect.ts
- Access state helper in src/auth/access.ts
- Wrap private routes with PrivateRoute in src/App.tsx

Testing:
- Unit specs under src/auth/__tests__ for public routes and redirect sanitization.

