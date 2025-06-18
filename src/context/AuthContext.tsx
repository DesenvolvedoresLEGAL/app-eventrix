
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
  
  const { user, createUserProfile, clearUser } = useUserProfile();
  const authOperations = useAuthOperations();

  // CORREÇÃO: Função para gerenciar loading com timeout de segurança reduzido
  const safeSetLoading = useCallback((value: boolean, timeoutMs: number = 3000) => {
    console.log('🔄 AuthContext loading state changed to:', value);
    setLoading(value);
    
    if (value) {
      // Safety timeout reduzido para 3 segundos
      setTimeout(() => {
        console.warn('🚨 AuthContext loading timeout reached, forcing loading to false');
        setLoading(false);
      }, timeoutMs);
    }
  }, []);

  // CORREÇÃO: Handler otimizado com controle de loading mais rigoroso
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    console.log('🔄 Auth state changed:', event, session?.user?.email || 'no user');
    
    setSession(session);
    
    // CORREÇÃO: Controle de loading mais granular - apenas para operações que requerem profile
    if (event === 'INITIAL_SESSION' && session?.user) {
      safeSetLoading(true, 3000);
    }
    
    if (session?.user) {
      // Apenas buscar perfil em eventos específicos (INITIAL_SESSION e SIGNED_IN)
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        console.log('👤 Loading user profile for event:', event);
        
        try {
          await createUserProfile(session.user);
          
          // Log apenas para login explícito
          if (event === 'SIGNED_IN') {
            await logAuthEvent('login', session.user.id);
          }
        } catch (profileError) {
          console.error('❌ Error creating user profile:', profileError);
        } finally {
          // CORREÇÃO: Sempre limpar loading após operações de perfil
          console.log('🧹 Cleaning AuthContext loading after profile operations');
          setLoading(false);
        }
      } else if (event === 'TOKEN_REFRESHED') {
        // Apenas log, sem recarregar perfil (otimização de performance)
        console.log('🔄 Token refreshed for user:', session.user.email);
        // CORREÇÃO: Não ativar loading para refresh de token
        setLoading(false);
      }
    } else {
      console.log('👤 No user in session, clearing profile...');
      clearUser();
      if (event === 'SIGNED_OUT') {
        try {
          await logAuthEvent('logout');
        } catch (logError) {
          console.error('❌ Error logging logout event:', logError);
        }
      }
      // CORREÇÃO: Sempre limpar loading quando não há usuário
      setLoading(false);
    }
    
    // CORREÇÃO: Para eventos que não requerem operações assíncronas, limpar loading
    if (!['INITIAL_SESSION', 'SIGNED_IN'].includes(event) || !session?.user) {
      setLoading(false);
    }
  }, [createUserProfile, clearUser, safeSetLoading]);

  useEffect(() => {
    console.log('🚀 Setting up optimized auth state listener...');
    
    // OTIMIZAÇÃO: Remove chamada manual getSession() - onAuthStateChange já emite INITIAL_SESSION
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      console.log('🧹 Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange]);

  // CORREÇÃO: Usar apenas loading do AuthContext - não combinar com authOperations.loading
  // Isso evita o problema de loading combinado que causava loading infinito
  
  // Debug logging para rastrear estados de loading
  useEffect(() => {
    console.log('🔍 Loading states - AuthContext:', loading, 'AuthOperations:', authOperations.loading);
  }, [loading, authOperations.loading]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: loading, // CORREÇÃO: Usar apenas loading do AuthContext
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
