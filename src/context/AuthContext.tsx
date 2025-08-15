/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import supabase from '@/utils/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { Tables } from '@/utils/supabase/types'
import { signUp, signIn, signOut, sendMagicLink, resetPassword, updatePassword } from '@/services/authService'
import { Permission, hasPermission, canAccessRoute, getAllowedRoutes, getRolePermissions } from '@/utils/permissions'
import { useRBACValidator } from '@/utils/rbacValidator'

// Interfaces baseadas nos tipos do Supabase
export type UserRole = Tables<'user_roles'>
export type Profile = Tables<'profiles'>
export type Tenant = Tables<'tenants'>

// Interfaces de erro mantidas
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
  userPermissions: Permission[]
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

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)
  
  // Cache para otimizar carregamento de dados
  const [profileCache, setProfileCache] = useState<Map<string, Profile>>(new Map())
  const [roleCache, setRoleCache] = useState<Map<string, UserRole>>(new Map())
  const [tenantCache, setTenantCache] = useState<Map<string, Tenant>>(new Map())

  // Validação RBAC em desenvolvimento
  useRBACValidator()

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const loadProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    // Verificar cache primeiro
    if (profileCache.has(userId)) {
      return profileCache.get(userId)!
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.warn('Erro ao carregar profile:', error)
        return null
      }

      const profileData = data as Profile
      // Adicionar ao cache
      setProfileCache(prev => new Map(prev).set(userId, profileData))
      return profileData
    } catch (err) {
      console.warn('Erro ao carregar profile:', err)
      return null
    }
  }, [profileCache])

  const loadUserRole = useCallback(async (roleId: string): Promise<UserRole | null> => {
    // Verificar cache primeiro
    if (roleCache.has(roleId)) {
      return roleCache.get(roleId)!
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('id', roleId)
        .single()

      if (error) {
        console.warn('Erro ao carregar role:', error)
        return null
      }

      const roleData = data as UserRole
      // Adicionar ao cache
      setRoleCache(prev => new Map(prev).set(roleId, roleData))
      return roleData
    } catch (err) {
      console.warn('Erro ao carregar role:', err)
      return null
    }
  }, [roleCache])

  const loadTenant = useCallback(async (userTenantId: string): Promise<Tenant | null> => {
    // Verificar cache primeiro
    if (tenantCache.has(userTenantId)) {
      return tenantCache.get(userTenantId)!
    }

    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', userTenantId)
        .is('deleted_at', null)
        .single()

      if (error) {
        console.warn('Erro ao carregar tenant:', error)
        return null
      }

      const tenantData = data as Tenant
      // Adicionar ao cache
      setTenantCache(prev => new Map(prev).set(userTenantId, tenantData))
      return tenantData
    } catch (err) {
      console.warn('Erro ao carregar tenant:', err)
      return null
    }
  }, [tenantCache])

  const refreshTenant = useCallback(async () => {
    if (!user?.email || !profile?.tenant_id) return

    const tenantData = await loadTenant(profile.tenant_id);
    setTenant(tenantData)
  }, [user?.email, profile?.tenant_id, loadTenant])

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

  // Gerenciar estado de autenticação com otimizações
  useEffect(() => {
    let mounted = true
    let loadingTimeout: NodeJS.Timeout

    // Configurar timeout para loading state
    const setLoadingWithTimeout = (isLoading: boolean) => {
      if (loadingTimeout) clearTimeout(loadingTimeout)
      
      if (isLoading) {
        setLoading(true)
      } else {
        // Dar um pequeno delay para evitar flickers na UI
        loadingTimeout = setTimeout(() => {
          if (mounted) setLoading(false)
        }, 100)
      }
    }

    // Configurar listener de mudanças de auth PRIMEIRO
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return

        console.log('Auth state changed:', event, currentSession?.user?.email)

        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (currentSession?.user) {
          setLoadingWithTimeout(true)
          
          // Carregar dados adicionais de forma otimizada e paralela
          setTimeout(async () => {
            if (!mounted) return

            try {
              // Carregar profile, tenant e role em paralelo quando possível
              const profileData = await loadProfile(currentSession.user.id);
              
              if (!profileData) {
                if (mounted) {
                  setProfile(null)
                  setTenant(null)
                  setUserRole(null)
                  setLoadingWithTimeout(false)
                }
                return
              }

              // Carregar tenant e role em paralelo se os IDs estão disponíveis
              const [tenantData, roleData] = await Promise.all([
                profileData.tenant_id ? loadTenant(profileData.tenant_id) : Promise.resolve(null),
                profileData.role ? loadUserRole(profileData.role) : Promise.resolve(null)
              ])

              if (mounted) {
                setProfile(profileData);
                setTenant(tenantData)
                setUserRole(roleData)
                setLoadingWithTimeout(false)
              }
            } catch (error) {
              console.error('Erro ao carregar dados do usuário:', error)
              if (mounted) {
                setLoadingWithTimeout(false)
              }
            }
          }, 0)
        } else {
          setProfile(null)
          setTenant(null)
          setUserRole(null)
          setLoadingWithTimeout(false)
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
          setTenant(null)
          setUserRole(null)
          // Limpar caches ao fazer logout
          setProfileCache(new Map())
          setRoleCache(new Map())
          setTenantCache(new Map())
          setLoadingWithTimeout(false)
        }
      }
    )

    // DEPOIS verificar sessão existente
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!mounted) return
      
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      
      if (!currentSession) {
        setLoadingWithTimeout(false)
      }
    })

    return () => {
      mounted = false
      if (loadingTimeout) clearTimeout(loadingTimeout)
      subscription.unsubscribe()
    }
  }, [loadProfile, loadTenant, loadUserRole])

  const isAuthenticated = useMemo(() => !!user && !!session, [user, session])

  // Memoizar permissões do usuário para evitar recálculos
  const userPermissions = useMemo(() => {
    if (!userRole?.code) return []
    return getRolePermissions(userRole.code)
  }, [userRole?.code])

  // Memoizar checadores de permissão para performance
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
    userPermissions,
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
    userPermissions,
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
