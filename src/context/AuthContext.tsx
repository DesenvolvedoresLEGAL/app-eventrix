
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
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
  const bootIdRef = useRef(0)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const loadProfile = useCallback(async (userId: string) => {
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
      console.error('Erro ao carregar profile:', { error, code: (error as any)?.code, details: (error as any)?.details, hint: (error as any)?.hint })
      throw new Error('Não foi possível carregar os dados do perfil.')
    }

    return data as Profile
  }, [])

  const loadTenant = useCallback(async (userEmail: string) => {
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
      .is('deleted_at', null)
      .maybeSingle()

    if (error) {
      console.error('Erro ao carregar tenant:', { error, code: (error as any)?.code, details: (error as any)?.details, hint: (error as any)?.hint })
      throw new Error('Não foi possível carregar os dados do tenant.')
    }

    return (data as Tenant) ?? null
  }, [])

  const refreshTenant = useCallback(async () => {
    if (!user?.email) {
      setTenant(null)
      return
    }

    try {
      const tenantData = await loadTenant(user.email)
      setTenant(tenantData)
    } catch (err: any) {
      console.error('Erro ao atualizar tenant:', { err, code: err?.code, details: err?.details, hint: err?.hint })
      setError({ message: 'Falha ao atualizar dados do tenant', type: 'tenant' })
    }
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
    setLoading(true)

    // Configurar listener de mudanças de auth e centralizar bootstrapping
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!mounted) return

        console.log('Auth state changed:', event, currentSession?.user?.email)

        // Incrementa bootId para evitar condições de corrida entre eventos
        const localBootId = ++bootIdRef.current

        // Atualiza estados síncronos
        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (currentSession?.user) {
          // Inicia carregamento para bootstrap desta sessão
          setLoading(true)
          // Buscar dados adicionais de forma assíncrona e não bloquear o callback
          setTimeout(async () => {
            if (!mounted || localBootId !== bootIdRef.current) return
            try {
              const [profileData, tenantData] = await Promise.all([
                loadProfile(currentSession.user.id),
                currentSession.user.email ? loadTenant(currentSession.user.email) : Promise.resolve(null)
              ])

              if (mounted && localBootId === bootIdRef.current) {
                setProfile(profileData)
                setTenant(tenantData)
              }
            } catch (err: any) {
              if (!mounted || localBootId !== bootIdRef.current) return
              console.error('Erro ao carregar dados complementares:', { err, code: err?.code, details: err?.details, hint: err?.hint })
              setProfile(null)
              setTenant(null)
              setError({ message: 'Falha ao carregar dados do usuário', type: 'auth' })
            } finally {
              if (mounted && localBootId === bootIdRef.current) setLoading(false)
            }
          }, 0)
        } else {
          // Sem sessão: limpa dados e finaliza carregamento
          setProfile(null)
          setTenant(null)
          setLoading(false)
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
          setTenant(null)
        }
      }
    )

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
