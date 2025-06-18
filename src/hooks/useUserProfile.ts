
import { useState, useCallback } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import { User } from '@/types/auth';

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getProfileByAuthId } = useProfile();

  // CORREÇÃO: Create user profile com callback de sucesso
  const createUserProfile = useCallback(async (
    supabaseUser: SupabaseUser, 
    onSuccess?: (user: User) => void
  ) => {
    try {
      console.log('📝 Creating user profile for:', supabaseUser.email);
      
      // Criar user básico imediatamente
      const basicUser: User = {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.name || 
              `${supabaseUser.user_metadata?.firstName || ''} ${supabaseUser.user_metadata?.lastName || ''}`.trim() ||
              supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: 'user'
      };
      
      // Definir user básico imediatamente
      setUser(basicUser);
      console.log('✅ Basic user profile set immediately');
      
      // Chamar callback de sucesso se fornecido
      if (onSuccess) {
        onSuccess(basicUser);
      }
      
      // Tentar buscar perfil detalhado em background
      try {
        const profile = await getProfileByAuthId(supabaseUser.id);
        
        if (profile) {
          console.log('✅ Detailed profile found, updating user');
          const detailedUser: User = {
            id: supabaseUser.id,
            name: `${profile.first_name} ${profile.last_name}`.trim(),
            email: profile.email,
            role: 'user',
            profile: profile
          };
          setUser(detailedUser);
          
          // Chamar callback novamente com perfil detalhado
          if (onSuccess) {
            onSuccess(detailedUser);
          }
        }
      } catch (profileError) {
        console.warn('⚠️ Could not load detailed profile, keeping basic user:', profileError);
        // Manter user básico se profile detalhado falhar
      }
      
    } catch (error) {
      console.error('❌ Error creating user profile:', error);
      
      // Fallback mínimo mesmo em caso de erro
      const fallbackProfile: User = {
        id: supabaseUser.id,
        name: supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: 'user'
      };
      setUser(fallbackProfile);
      console.log('⚠️ Using minimal fallback profile due to error');
      
      if (onSuccess) {
        onSuccess(fallbackProfile);
      }
    }
  }, [getProfileByAuthId]);

  const clearUser = useCallback(() => {
    console.log('🧹 Clearing user profile...');
    setUser(null);
  }, []);

  return {
    user,
    setUser,
    createUserProfile,
    clearUser
  };
};
