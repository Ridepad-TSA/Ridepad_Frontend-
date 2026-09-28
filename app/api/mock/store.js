// DEV-ONLY in-memory mock auth backend. Stands in for the real backend
// described in README.md until one exists — delete this whole app/api/mock/
// directory (and the matching NEXT_PUBLIC_API_URL entry in .env.local) once
// a real API is available. Data resets on every server restart, and
// passwords are kept in plaintext, which is fine for a throwaway local
// mock but must never happen in the real backend.
//
// globalThis (not a module-level array) so the store survives Next.js dev's
// Fast Refresh re-evaluating this module on every edit.
export const mockUsers = globalThis.__ridepadMockUsers ?? (globalThis.__ridepadMockUsers = []);
