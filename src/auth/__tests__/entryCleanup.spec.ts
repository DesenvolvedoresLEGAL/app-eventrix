import { purgeAuthSession } from '@/utils/authStorage'

// Mock supabase client
jest.mock('@/utils/supabase/client', () => ({
  __esModule: true,
  default: {
    auth: {
      signOut: jest.fn().mockResolvedValue({ error: null })
    }
  }
}))

describe('Entry routes cleanup', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('cleans JWT-like tokens when visiting / or /login (simulated by calling purge)', async () => {
    localStorage.setItem('sb-demo-auth-token', '{"access_token":"abc"}')
    localStorage.setItem('some-other', 'value')

    await purgeAuthSession()

    expect(localStorage.getItem('sb-demo-auth-token')).toBeNull()
    expect(localStorage.getItem('some-other')).toBe('value')
  })
})
