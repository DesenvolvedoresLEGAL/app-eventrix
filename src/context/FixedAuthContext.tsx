import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { signUp, signIn, signOut, sendMagicLink, resetPassword, updatePassword } from '@/services/authService'
import { Permission, hasPermission, canAccessRoute, getAllowedRoutes } from '@/utils/permissions'

// Interfaces simplificadas baseadas na estrutura real do banco
interface Profile {
  id: string;
  user_id: string;
  tenant_id: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  whatsapp_number: string | null;
  is_active: boolean;
  role: 'user' | 'admin' | 'moderator' | 'organizer';
  created_at: string;
  updated_at: string;
}

interface Tenant {
  id: string;
  slug: string;
  cnpj: string | null;
  razao_social: string | null;
  nome_fantasia: string | null;
  email: string | null;
  telefone: string | null;
  whatsapp: string | null;
  cep: string | null;
  endereco: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  segmento_id: string | null;
  cor_primaria: string | null;
  cor_secundaria: string | null;
  logo_url: string | null;
  website: string | null;
  descricao: string | null;
  created_at: string;
  updated_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'user' | 'admin' | 'moderator' | 'organizer';
  tenant_id: string | null;
  created_at: string;
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

      if (profileData) {
        setProfile(profileData as Profile)

        // Carregar tenant se existe
        if (profileData.tenant_id) {
          const { data: tenantData, error: tenantError } = await supabase
            .from('tenants')
            .select('*')
            .eq('id', profileData.tenant_id)
            .maybeSingle()

          if (!tenantError && tenantData) {
            setTenant(tenantData as Tenant)
          }
        }

        // Carregar role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle()

        if (!roleError && roleData) {
          setUserRole(roleData as UserRole)
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
      setTenant(tenantData as Tenant)
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

  // Funções de permissão simplificadas
  const hasPermissionCheck = useCallback((permission: Permission) => {
    // Implementação básica baseada no role do profile
    if (!profile?.role) return false
    
    // Admin tem todas as permissões
    if (profile.role === 'admin') return true
    
    // Organizer tem permissões de organização
    if (profile.role === 'organizer') {
      return ['events', 'dashboard', 'analytics', 'settings'].some(p => permission.includes(p))
    }
    
    // User tem permissões básicas
    return ['dashboard', 'profile'].some(p => permission.includes(p))
  }, [profile])

  const canAccessRouteCheck = useCallback((route: string) => {
    // Implementação básica de acesso a rotas
    if (!profile?.role) return false
    
    if (profile.role === 'admin') return true
    if (profile.role === 'organizer') return !route.includes('admin')
    
    return route === '/dashboard' || route === '/profile'
  }, [profile])

  const getAllowedRoutesCheck = useCallback(() => {
    if (!profile?.role) return []
    
    const baseRoutes = ['/dashboard']
    
    if (profile.role === 'admin') {
      return [...baseRoutes, '/admin', '/settings', '/users', '/analytics']
    }
    
    if (profile.role === 'organizer') {
      return [...baseRoutes, '/events', '/analytics', '/settings']
    }
    
    return baseRoutes
  }, [profile])

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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Export dos tipos para compatibilidade
export type { Profile, Tenant, UserRole }