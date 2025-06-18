
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { AuthContextType, User } from '@/types/auth';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { useUserProfile } from '@/hooks/useUserProfile';
import { logAuthEvent } from '@/utils/authUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  const { user, createUserProfile, clearUser, setUser } = useUserProfile();
  const authOperations = useAuthOperations();

  // CORREÇÃO FASE 1: Criar user básico imediatamente de uma sessão
  const createImmediateUser = useCallback((session: Session): User => {
    return {
      id: session.user.id,
      name: session.user.user_metadata?.name || 
            `${session.user.user_metadata?.firstName || ''} ${session.user.user_metadata?.lastName || ''}`.trim() ||
            session.user.email?.split('@')[0] || 'User',
      email: session.user.email || '',
      role: 'user'
    };
  }, []);

  // CORREÇÃO FASE 2: Handler síncrono otimizado
  const handleAuthStateChange = useCallback((event: string, session: Session | null) => {
    console.log('🔄 Auth state changed:', event, session?.user?.email || 'no user');
    
    // Sempre atualizar sessão imediatamente
    setSession(session);
    
    if (session?.user) {
      console.log('👤 User authenticated, setting immediate user state');
      
      // CORREÇÃO: Criar e definir user imediatamente - SEM AWAIT
      const immediateUser = createImmediateUser(session);
      setUser(immediateUser);
      console.log('✅ Immediate user state set for:', immediateUser.email);
      
      // CORREÇÃO: Buscar perfil detalhado apenas em background, sem bloquear
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        // Usar setTimeout(0) para evitar bloqueio
        setTimeout(() => {
          createUserProfile(session.user, (fullUser) => {
            console.log('✅ Enhanced user profile loaded');
          }).catch((profileError) => {
            console.warn('⚠️ Profile enhancement failed, keeping basic user:', profileError);
          });
        }, 0);
        
        // Log apenas para login explícito
        if (event === 'SIGNED_IN') {
          setTimeout(() => {
            logAuthEvent('login', session.user.id).catch(console.error);
          }, 0);
        }
      }
    } else {
      console.log('👤 No user in session, clearing profile...');
      clearUser();
      
      if (event === 'SIGNED_OUT') {
        setTimeout(() => {
          logAuthEvent('logout').catch(console.error);
        }, 0);
      }
    }
    
    // CORREÇÃO FASE 3: Simplificar loading - sempre limpar após processar
    if (isInitialized) {
      setLoading(false);
    }
  }, [createUserProfile, clearUser, setUser, createImmediateUser, isInitialized]);

  // CORREÇÃO FASE 1: Inicialização correta da sessão
  useEffect(() => {
    console.log('🚀 Initializing AuthContext with proper session handling...');
    
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        // STEP 1: Configurar listener PRIMEIRO
        const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
        
        // STEP 2: Buscar sessão existente DEPOIS
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error getting initial session:', error);
        }
        
        if (mounted) {
          console.log('📋 Initial session check:', session?.user?.email || 'no session');
          
          // Processar sessão inicial se existir
          if (session) {
            handleAuthStateChange('INITIAL_SESSION', session);
          }
          
          // Marcar como inicializado
          setIsInitialized(true);
          setLoading(false);
          console.log('✅ AuthContext initialization completed');
        }
        
        return () => {
          console.log('🧹 Cleaning up auth subscription...');
          subscription.unsubscribe();
        };
      } catch (initError) {
        console.error('❌ Auth initialization failed:', initError);
        if (mounted) {
          setIsInitialized(true);
          setLoading(false);
        }
      }
    };
    
    const cleanup = initializeAuth();
    
    return () => {
      mounted = false;
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, []); // CORREÇÃO: Sem dependências para evitar loops

  // Debug logging otimizado
  useEffect(() => {
    if (isInitialized) {
      console.log('🔍 Auth States - User:', user?.email || 'none', 'Loading:', loading, 'Initialized:', isInitialized);
    }
  }, [user, loading, isInitialized]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      ...authOperations
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
