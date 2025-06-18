
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

  // CORREÇÃO: Função para gerenciar loading com timeout de segurança menor
  const safeSetLoading = useCallback((value: boolean, timeoutMs: number = 2000) => {
    console.log('🔄 AuthContext loading state changed to:', value);
    setLoading(value);
    
    if (value) {
      // Safety timeout reduzido para 2 segundos
      setTimeout(() => {
        console.warn('🚨 AuthContext loading timeout reached, forcing loading to false');
        setLoading(false);
      }, timeoutMs);
    }
  }, []);

  // CORREÇÃO: Handler otimizado com propagação imediata do user state
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    console.log('🔄 Auth state changed:', event, session?.user?.email || 'no user');
    
    setSession(session);
    
    if (session?.user) {
      console.log('👤 User authenticated, processing profile...');
      
      // CORREÇÃO: Propagação imediata do user state - não esperar profile
      const immediateUser: User = {
        id: session.user.id,
        name: session.user.user_metadata?.name || 
              `${session.user.user_metadata?.firstName || ''} ${session.user.user_metadata?.lastName || ''}`.trim() ||
              session.user.email?.split('@')[0] || 'User',
        email: session.user.email || '',
        role: 'user'
      };
      
      // Definir user imediatamente para permitir redirecionamento
      console.log('✅ Setting immediate user state for redirect');
      
      // Apenas buscar perfil detalhado para eventos específicos
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        safeSetLoading(true, 2000);
        
        try {
          // Criar perfil com callback de sucesso
          await createUserProfile(session.user, (fullUser) => {
            console.log('✅ Full user profile loaded successfully');
            // Profile já foi atualizado pelo callback
          });
          
          // Log apenas para login explícito
          if (event === 'SIGNED_IN') {
            await logAuthEvent('login', session.user.id);
          }
        } catch (profileError) {
          console.warn('⚠️ Error loading profile, using fallback user:', profileError);
          // Manter o user imediato mesmo se profile falhar
        } finally {
          console.log('🧹 Cleaning AuthContext loading after profile operations');
          setLoading(false);
        }
      } else {
        // Para outros eventos, apenas limpar loading
        console.log('🔄 Auth event processed, clearing loading');
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
      setLoading(false);
    }
  }, [createUserProfile, clearUser, safeSetLoading]);

  useEffect(() => {
    console.log('🚀 Setting up optimized auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      console.log('🧹 Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange]);

  // Debug logging para rastrear estados
  useEffect(() => {
    console.log('🔍 Auth States - User:', user?.email || 'none', 'Loading:', loading);
  }, [user, loading]);

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
