import React, { createContext, useContext, useEffect, useState } from 'react'
import supabase from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { signUp, signIn, signOut, sendMagicLink } from '@/services/authService'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signUp: typeof signUp
  signIn: typeof signIn
  signOut: typeof signOut
  sendMagicLink: typeof sendMagicLink
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, sendMagicLink }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

