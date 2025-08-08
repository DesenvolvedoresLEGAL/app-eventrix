import { removeSupabaseAuthFromLocalStorage, purgeAuthSession } from '@/utils/authStorage'

// Mock supabase client
jest.mock('@/utils/supabase/client', () => ({
  __esModule: true,
  default: {
    auth: {
      signOut: jest.fn().mockResolvedValue({ error: null })
    }
  }
}))

describe('authStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test('removeSupabaseAuthFromLocalStorage removes Supabase keys only', () => {
    localStorage.setItem('sb-abc123-auth-token', '{"access_token":"x"}')
    localStorage.setItem('supabase.auth.token', '{"access_token":"y"}')
    localStorage.setItem('unrelated', 'keep')

    removeSupabaseAuthFromLocalStorage()

    expect(localStorage.getItem('sb-abc123-auth-token')).toBeNull()
    expect(localStorage.getItem('supabase.auth.token')).toBeNull()
    expect(localStorage.getItem('unrelated')).toBe('keep')
  })

  test('purgeAuthSession calls signOut and removes tokens', async () => {
    const supabase = (await import('@/utils/supabase/client')).default as any
    localStorage.setItem('sb-xyz-auth-token', '{"access_token":"z"}')

    await purgeAuthSession()

    expect(supabase.auth.signOut).toHaveBeenCalled()
    expect(localStorage.getItem('sb-xyz-auth-token')).toBeNull()
  })

  test('purgeAuthSession removes tokens even if signOut throws', async () => {
    const supabase = (await import('@/utils/supabase/client')).default as any
    ;(supabase.auth.signOut as jest.Mock).mockRejectedValueOnce(new Error('network'))

    localStorage.setItem('sb-throw-auth-token', '{"access_token":"t"}')

    await purgeAuthSession()

    expect(supabase.auth.signOut).toHaveBeenCalled()
    expect(localStorage.getItem('sb-throw-auth-token')).toBeNull()
  })
})
