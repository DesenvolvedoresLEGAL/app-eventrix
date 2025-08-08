import supabase from '@/utils/supabase/client'

// Regex: sb-<project-ref>-auth-token (Supabase v2 default)
const SUPABASE_TOKEN_KEY_REGEX = /^sb-[^-]+-auth-token$/
const LEGACY_KEYS = ['supabase.auth.token']

/**
 * Remove Supabase auth artifacts from localStorage without touching other keys.
 */
export function removeSupabaseAuthFromLocalStorage(): void {
  try {
    const keysToRemove: string[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key) continue

      if (SUPABASE_TOKEN_KEY_REGEX.test(key) || LEGACY_KEYS.includes(key)) {
        keysToRemove.push(key)
      }
    }

    keysToRemove.forEach((k) => localStorage.removeItem(k))
  } catch (e) {
    // no-op: accessing localStorage may throw in restricted environments
  }
}

/**
 * Sign out via Supabase (preferred) and ensure local storage tokens are purged.
 * Resilient to errors: it will always try to remove keys from localStorage.
 */
export async function purgeAuthSession(): Promise<void> {
  try {
    await supabase.auth.signOut()
  } catch (_) {
    // ignore network/SDK errors – we'll still delete tokens locally
  } finally {
    removeSupabaseAuthFromLocalLocalStorageSafe()
  }
}

// Internal wrapper to keep exported API stable if we need extra safety later
function removeSupabaseAuthFromLocalLocalStorageSafe() {
  try {
    removeSupabaseAuthFromLocalStorage()
  } catch (_) {
    // swallow
  }
}
