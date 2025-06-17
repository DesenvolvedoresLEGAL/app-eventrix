
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

  // Memoize the auth state handler to prevent recreation on every render
  const handleAuthStateChange = useCallback(async (event: string, session: Session | null) => {
    console.log('🔄 Auth state changed:', event, session?.user?.email);
    
    setSession(session);
    
    if (session?.user) {
      console.log('👤 User found in session, creating profile...');
      await createUserProfile(session.user);
      
      // Log successful auth events
      if (event === 'SIGNED_IN') {
        await logAuthEvent('login', session.user.id);
      } else if (event === 'TOKEN_REFRESHED') {
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
    console.log('🚀 Setting up auth state listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Check for existing session - but don't call createUserProfile here to avoid duplication
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 Initial session check:', session?.user?.email || 'No session');
      
      if (session) {
        // This will trigger the onAuthStateChange listener above
        setSession(session);
      } else {
        setLoading(false);
      }
    });

    return () => {
      console.log('🧹 Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array - no dependencies to prevent infinite loops

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
