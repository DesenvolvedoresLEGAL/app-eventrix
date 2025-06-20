
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { AuthContextType, User } from '@/types/auth';
import { useAuthOperations } from '@/hooks/useAuthOperations';
import { useOptimizedUserProfile } from '@/hooks/useOptimizedUserProfile';
import { logAuthEvent } from '@/utils/authUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Refs para controle de estado interno
  const isInitialized = useRef(false);
  const currentUserId = useRef<string | null>(null);
  const authEventQueue = useRef<Set<string>>(new Set());
  
  const { user, createUserProfileOptimized, clearUser, profileCache } = useOptimizedUserProfile();
  const authOperations = useAuthOperations();

  // Memoização do handler de auth state change - SEM dependências circulares
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    const eventKey = `${event}-${session?.user?.id || 'null'}-${Date.now()}`;
    
    // Prevenir processamento de eventos duplicados em sequência rápida
    if (authEventQueue.current.has(eventKey.slice(0, -13))) { // Remove timestamp para check
      console.log('🚫 Skipping duplicate auth event:', event);
      return;
    }
    
    authEventQueue.current.add(eventKey.slice(0, -13));
    setTimeout(() => authEventQueue.current.delete(eventKey.slice(0, -13)), 1000);

    console.log('🔄 Auth state changed (optimized):', event, session?.user?.email || 'no user');
    
    setSession(session);
    
    if (session?.user) {
      const userId = session.user.id;
      
      // Verificar se é o mesmo usuário para evitar reprocessamento
      if (currentUserId.current === userId && event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed for same user, skipping profile reload');
        setLoading(false);
        return;
      }
      
      currentUserId.current = userId;
      
      // Apenas buscar/criar perfil em eventos específicos e se não estiver em cache
      if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && !profileCache.current.has(userId)) {
        console.log('👤 Loading user profile for event:', event);
        
        try {
          await createUserProfileOptimized(session.user);
          
          // Log apenas para login explícito
          if (event === 'SIGNED_IN') {
            await logAuthEvent('login', session.user.id);
          }
        } catch (error) {
          console.error('❌ Error in profile creation:', error);
        }
      } else if (profileCache.current.has(userId)) {
        console.log('✅ Using cached profile for user:', userId);
      }
    } else {
      console.log('👤 No user in session, clearing profile...');;
      currentUserId.current = null;
      clearUser();
      
      if (event === 'SIGNED_OUT') {
        await logAuthEvent('logout');
      }
    }
    
    setLoading(false);
  }, []); // SEM dependências para evitar recreação

  // Inicialização otimizada com getSession apenas uma vez
  useEffect(() => {
    if (isInitialized.current) return;
    
    console.log('🚀 Initializing optimized auth context...');
    isInitialized.current = true;
    
    // Setup do listener de auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Buscar sessão inicial apenas uma vez
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('❌ Error getting initial session:', error);
        setLoading(false);
        return;
      }
      
      if (session) {
        console.log('✅ Initial session found, processing...');
        handleAuthStateChange('INITIAL_SESSION', session);
      } else {
        console.log('ℹ️ No initial session found');
        setLoading(false);
      }
    });

    return () => {
      console.log('🧹 Cleaning up optimized auth subscription...');
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange]);

  // Memoização do valor do contexto
  const contextValue = useMemo(() => ({
    user,
    loading: loading || authOperations.loading,
    ...authOperations
  }), [user, loading, authOperations]);

  return (
    <AuthContext.Provider value={contextValue}>
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
