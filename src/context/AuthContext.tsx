
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import supabase from '@/utils/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { signUp, signIn, signOut, sendMagicLink, resetPassword, updatePassword } from '@/services/authService'

export interface Tenant {
  id: string
  slug: string
  razao_social: string
  nome_fantasia: string
  contact_email: string
  cnpj: string
  status_id: string
  plan_id: string
  trial_ends_at: string | null
  features_enabled: Record<string, any>
  onboarding_completed: boolean
}

interface UserRole {
  id: string
  code: string
  description: string | null
}

interface Profile {
  id: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  whatsapp_number: string | null
  role: UserRole
}

interface AuthError {
  message: string
  type: 'auth' | 'network' | 'validation' | 'tenant'
}

interface AuthContextValue {
  user: User | null
  session: Session | null
  profile: Profile | null
  tenant: Tenant | null
  userRole: UserRole | null
  loading: boolean
  error: AuthError | null
  isAuthenticated: boolean
  signUp: typeof signUp
  signIn: (email: string, password: string) => Promise<void>
  signOut: typeof signOut
  sendMagicLink: typeof sendMagicLink
  resetPassword: typeof resetPassword
  updatePassword: typeof updatePassword
  clearError: () => void
  refreshTenant: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const loadProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          role:user_roles (
            id,
            code,
            description
          )
        `)
        .eq('id', userId)
        .single()

      if (error) {
        console.warn('Erro ao carregar profile:', error)
        return null
      }

      return data as Profile
    } catch (err) {
      console.warn('Erro ao carregar profile:', err)
      return null
    }
  }, [])

  const loadTenant = useCallback(async (userEmail: string) => {
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select(`
          id,
          slug,
          razao_social,
          nome_fantasia,
          contact_email,
          cnpj,
          status_id,
          plan_id,
          trial_ends_at,
          features_enabled,
          onboarding_completed
        `)
        .eq('contact_email', userEmail)
        .eq('deleted_at', null)
        .single()

      if (error) {
        console.warn('Erro ao carregar tenant:', error)
        return null
      }

      return data as Tenant
    } catch (err) {
      console.warn('Erro ao carregar tenant:', err)
      return null
    }
  }, [])

  const refreshTenant = useCallback(async () => {
    if (!user?.email) return

    const tenantData = await loadTenant(user.email)
    setTenant(tenantData)
  }, [user?.email, loadTenant])

  const enhancedSignIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const user = await signIn(email, password)
      
      // O user e session serão atualizados pelo onAuthStateChange
      // Não precisamos fazer nada aqui, apenas aguardar

    } catch (err) {
      const errorMessage = (err as Error).message
      
      let errorType: AuthError['type'] = 'auth'
      let friendlyMessage = 'Erro ao fazer login. Tente novamente.'

      if (errorMessage.includes('Invalid login credentials')) {
        friendlyMessage = 'Email ou senha incorretos'
      } else if (errorMessage.includes('Email not confirmed')) {
        friendlyMessage = 'Confirme seu email antes de fazer login'
      } else if (errorMessage.includes('Too many requests')) {
        friendlyMessage = 'Muitas tentativas. Aguarde alguns minutos.'
      } else if (errorMessage.includes('network')) {
        errorType = 'network'
        friendlyMessage = 'Erro de conexão. Verifique sua internet.'
      }

      setError({ message: friendlyMessage, type: errorType })
      throw new Error(friendlyMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Gerenciar estado de autenticação
  useEffect(() => {
    let mounted = true

    // Configurar listener de mudanças de auth PRIMEIRO
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return

        console.log('Auth state changed:', event, currentSession?.user?.email)

        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (currentSession?.user) {
          // Carregar dados adicionais de forma assíncrona
          setTimeout(async () => {
            if (!mounted) return

            const [profileData, tenantData] = await Promise.all([
              loadProfile(currentSession.user.id),
              loadTenant(currentSession.user.email!)
            ])

            if (mounted) {
              setProfile(profileData)
              setTenant(tenantData)
            }
          }, 0)
        } else {
          setProfile(null)
          setTenant(null)
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
          setTenant(null)
        }

        setLoading(false)
      }
    )

    // DEPOIS verificar sessão existente
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!mounted) return
      
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      
      if (!currentSession) {
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile, loadTenant])

  const isAuthenticated = useMemo(() => !!user && !!session, [user, session])

  const userRole = useMemo(() => profile?.role || null, [profile?.role])

  const value = useMemo(() => ({
    user,
    session,
    profile,
    tenant,
    userRole,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn: enhancedSignIn,
    signOut,
    sendMagicLink,
    resetPassword,
    updatePassword,
    clearError,
    refreshTenant
  }), [
    user,
    session,
    profile,
    tenant,
    userRole,
    loading,
    error,
    isAuthenticated,
    enhancedSignIn,
    clearError,
    refreshTenant
  ])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
