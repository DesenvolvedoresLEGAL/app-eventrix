
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        
        if (session?.user) {
          await createUserProfile(session.user);
          
          // Log successful auth events
          if (event === 'SIGNED_IN') {
            await logAuthEvent('login', session.user.id);
          } else if (event === 'TOKEN_REFRESHED') {
            console.log('Token refreshed for user:', session.user.email);
          }
        } else {
          clearUser();
          if (event === 'SIGNED_OUT') {
            await logAuthEvent('logout');
          }
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        createUserProfile(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [createUserProfile, clearUser]);

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
