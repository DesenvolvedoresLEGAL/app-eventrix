import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { signUp, signIn, signOut, sendMagicLink, resetPassword, updatePassword } from '@/services/authService'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  error: any
  isAuthenticated: boolean
  signUp: typeof signUp
  signIn: (email: string, password: string) => Promise<void>
  signOut: typeof signOut
  sendMagicLink: typeof sendMagicLink
  resetPassword: typeof resetPassword
  updatePassword: typeof updatePassword
  clearError: () => void
}

const CleanAuthContext = createContext<AuthContextValue | undefined>(undefined)

export const CleanAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const enhancedSignIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      await signIn(email, password)
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Configurar listeners de auth
  useEffect(() => {
    let mounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return

        setSession(currentSession)
        setUser(currentSession?.user ?? null)
        setLoading(false)
      }
    )

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!mounted) return
      
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const isAuthenticated = useMemo(() => !!user && !!session, [user, session])

  const value = useMemo(() => ({
    user,
    session,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn: enhancedSignIn,
    signOut,
    sendMagicLink,
    resetPassword,
    updatePassword,
    clearError
  }), [
    user,
    session,
    loading,
    error,
    isAuthenticated,
    enhancedSignIn,
    clearError
  ])

  return (
    <CleanAuthContext.Provider value={value}>
      {children}
    </CleanAuthContext.Provider>
  )
}

export const useCleanAuth = () => {
  const context = useContext(CleanAuthContext)
  if (context === undefined) {
    throw new Error('useCleanAuth must be used within a CleanAuthProvider')
  }
  return context
}