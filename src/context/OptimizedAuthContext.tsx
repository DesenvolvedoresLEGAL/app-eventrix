import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { Tables } from '@/integrations/supabase/types'
import { signUp, signIn, signOut, sendMagicLink, resetPassword, updatePassword } from '@/services/authService'
import { Permission, hasPermission, canAccessRoute, getAllowedRoutes } from '@/utils/permissions'

// Interfaces baseadas nos tipos do Supabase
export type UserRole = Tables<'user_roles'>
export type Profile = Tables<'profiles'>
export type Tenant = Tables<'tenants'>

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
  hasPermission: (permission: Permission) => boolean
  canAccessRoute: (route: string) => boolean
  getAllowedRoutes: () => string[]
}

const OptimizedAuthContext = createContext<AuthContextValue | undefined>(undefined)

export const OptimizedAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const loadUserData = useCallback(async (userId: string) => {
    try {
      // Carregar profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (profileError) {
        console.warn('Erro ao carregar profile:', profileError)
        return
      }

      setProfile(profileData)

      if (profileData) {
        // Carregar tenant se existe
        if (profileData.tenant_id) {
          const { data: tenantData, error: tenantError } = await supabase
            .from('tenants')
            .select('*')
            .eq('id', profileData.tenant_id)
            .maybeSingle()

          if (!tenantError && tenantData) {
            setTenant(tenantData)
          }
        }

        // Carregar role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()

        if (!roleError && roleData) {
          setUserRole(roleData)
        }
      }
    } catch (err) {
      console.error('Erro ao carregar dados do usuário:', err)
    }
  }, [])

  const refreshTenant = useCallback(async () => {
    if (!user?.id || !profile?.tenant_id) return

    const { data: tenantData, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', profile.tenant_id)
      .maybeSingle()

    if (!error && tenantData) {
      setTenant(tenantData)
    }
  }, [user?.id, profile?.tenant_id])

  const enhancedSignIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      await signIn(email, password)
    } catch (err) {
      const errorMessage = (err as Error).message
      setError({ message: errorMessage, type: 'auth' })
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

        if (currentSession?.user) {
          setLoading(true)
          await loadUserData(currentSession.user.id)
          setLoading(false)
        } else {
          setProfile(null)
          setTenant(null)
          setUserRole(null)
          setLoading(false)
        }
      }
    )

    // Verificar sessão existente
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
  }, [loadUserData])

  const isAuthenticated = useMemo(() => !!user && !!session, [user, session])

  // Memoizar checadores de permissão
  const hasPermissionCheck = useCallback((permission: Permission) => {
    return hasPermission(userRole, permission)
  }, [userRole])

  const canAccessRouteCheck = useCallback((route: string) => {
    return canAccessRoute(userRole, route)
  }, [userRole])

  const getAllowedRoutesCheck = useCallback(() => {
    return getAllowedRoutes(userRole)
  }, [userRole])

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
    refreshTenant,
    hasPermission: hasPermissionCheck,
    canAccessRoute: canAccessRouteCheck,
    getAllowedRoutes: getAllowedRoutesCheck
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
    refreshTenant,
    hasPermissionCheck,
    canAccessRouteCheck,
    getAllowedRoutesCheck
  ])

  return (
    <OptimizedAuthContext.Provider value={value}>
      {children}
    </OptimizedAuthContext.Provider>
  )
}

export const useOptimizedAuth = () => {
  const context = useContext(OptimizedAuthContext)
  if (context === undefined) {
    throw new Error('useOptimizedAuth must be used within an OptimizedAuthProvider')
  }
  return context
}