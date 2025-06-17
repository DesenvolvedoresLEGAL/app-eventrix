
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

  // Otimizado: filtra eventos e remove redundância
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    console.log('🔄 Auth state changed:', event, session?.user?.email || 'no user');
    
    setSession(session);
    
    if (session?.user) {
      // Apenas buscar perfil em eventos específicos (INITIAL_SESSION e SIGNED_IN)
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        console.log('👤 Loading user profile for event:', event);
        await createUserProfile(session.user);
        
        // Log apenas para login explícito
        if (event === 'SIGNED_IN') {
          await logAuthEvent('login', session.user.id);
        }
      } else if (event === 'TOKEN_REFRESHED') {
        // Apenas log, sem recarregar perfil (otimização de performance)
        console.log('🔄 Token refreshed for user:', session.user.email);
      }
    } else {
      console.log('👤 No user in session, clearing profile...');
      clearUser();
      if (event === 'SIGNED_OUT') {
        await logAuthEvent('logout');
      }
    }
    
    setLoading(false);
  }, [createUserProfile, clearUser]);

  useEffect(() => {
    console.log('🚀 Setting up optimized auth state listener...');
    
    // OTIMIZAÇÃO: Remove chamada manual getSession() - onAuthStateChange já emite INITIAL_SESSION
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      console.log('🧹 Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: loading || authOperations.loading, 
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
