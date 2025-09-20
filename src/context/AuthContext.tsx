/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import supabase from '@/utils/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { Tables } from '@/utils/supabase/types'
import { signUp, signIn, signOut, sendMagicLink, resetPassword, updatePassword } from '@/services/authService'
import { Permission, hasPermission, canAccessRoute, getAllowedRoutes } from '@/utils/permissions'
import { organizerService, type OrganizerData } from '@/services/organizerService'

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
  organizer: OrganizerData | null
  loading: boolean
  isOrganizerLoading: boolean
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
  const [organizer, setOrganizer] = useState<OrganizerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOrganizerLoading, setIsOrganizerLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  
  // Cache para otimizar carregamento de dados
  const [profileCache, setProfileCache] = useState<Map<string, Profile>>(new Map())
  const [roleCache, setRoleCache] = useState<Map<string, UserRole>>(new Map())
  const [tenantCache, setTenantCache] = useState<Map<string, Tenant>>(new Map())
  const [organizerCache, setOrganizerCache] = useState<Map<string, OrganizerData>>(new Map())

  // Validação RBAC temporariamente desabilitada para evitar problemas de dispatcher
  // useRBACValidator()

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
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        console.warn('Erro ao carregar profile:', error)
        return null
      }

      if (!data) {
        console.warn('Profile não encontrado para usuário:', userId)
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

  const loadUserRole = useCallback(async (userId: string): Promise<UserRole | null> => {
    // Verificar cache primeiro
    if (roleCache.has(userId)) {
      return roleCache.get(userId)!
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        console.warn('Erro ao carregar role:', error)
        return null
      }

      if (!data) {
        console.warn('Role não encontrada para usuário:', userId)
        return null
      }

      const roleData = data as UserRole
      // Adicionar ao cache
      setRoleCache(prev => new Map(prev).set(userId, roleData))
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

  const loadOrganizerData = useCallback(async (): Promise<OrganizerData | null> => {
    try {
      // Obter usuário autenticado
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Verificar cache primeiro (usando user ID como chave)
      if (organizerCache.has(user.id)) {
        return organizerCache.get(user.id)!;
      }

      // Primeiro buscar o profile para obter o tenant_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        throw new Error(`Erro ao buscar perfil: ${profileError.message}`);
      }

      if (!profile?.tenant_id) {
        throw new Error('Usuário não está associado a uma organização');
      }

      // Buscar dados do tenant diretamente
      const { data, error } = await supabase
        .from('tenants')
        .select(`
          id,
          slug,
          cnpj,
          razao_social,
          nome_fantasia,
          email,
          telefone,
          whatsapp,
          cep,
          endereco,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
          segmento_id,
          cor_primaria,
          cor_secundaria,
          logo_url,
          website,
          descricao,
          created_at,
          updated_at
        `)
        .eq('id', profile.tenant_id)
        .single();

      if (error) {
        throw new Error(`Erro ao buscar dados da organização: ${error.message}`);
      }

      if (!data) {
        throw new Error('Dados da organização não encontrados');
      }

      const organizerData = data as OrganizerData;
      
      // Adicionar ao cache (usando user ID como chave)
      setOrganizerCache(prev => new Map(prev).set(user.id, organizerData));
      return organizerData;
    } catch (error: any) {
      console.warn('Erro ao carregar dados do organizer:', error);
      
      // Para alguns erros específicos, podemos retornar um objeto vazio para inicializar o formulário
      // mas para outros erros (como problemas de rede), talvez seja melhor tentar novamente
      if (error?.message?.includes('não encontrados') || error?.message?.includes('não está associado')) {
        // Retorna um objeto vazio para inicializar o formulário com campos vazios
        return {
          id: '',
          slug: '',
          cnpj: '',
          razao_social: '',
          nome_fantasia: null,
          email: '',
          telefone: null,
          whatsapp: null,
          cep: '',
          endereco: '',
          numero: null,
          complemento: null,
          bairro: '',
          cidade: '',
          estado: '',
          segmento_id: null,
          cor_primaria: '#4D2BFB',
          cor_secundaria: '#03F9FF',
          logo_url: null,
          website: null,
          descricao: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as OrganizerData;
      }
      
      // Para outros erros, retorna null
      return null;
    }
  }, [organizerCache]);

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
                loadUserRole(currentSession.user.id)
              ])

              // Carregar dados do organizer
              let organizerData = null
              if (profileData.tenant_id) {
                setIsOrganizerLoading(true)
                organizerData = await loadOrganizerData()
                setIsOrganizerLoading(false)
              }

              if (mounted) {
                setProfile(profileData);
                setTenant(tenantData)
                setUserRole(roleData)
                setOrganizer(organizerData)
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
          setOrganizer(null)
          setLoadingWithTimeout(false)
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
          setTenant(null)
          setUserRole(null)
          setOrganizer(null)
          // Limpar caches ao fazer logout
          setProfileCache(new Map())
          setRoleCache(new Map())
          setTenantCache(new Map())
          setOrganizerCache(new Map())
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
  }, [loadProfile, loadTenant, loadUserRole, loadOrganizerData])

  const isAuthenticated = useMemo(() => !!user && !!session, [user, session])

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
    organizer,
    loading,
    isOrganizerLoading,
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
    organizer,
    loading,
    isOrganizerLoading,
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
