
import { useState, useCallback } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import { User } from '@/types/auth';

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getProfileByAuthId } = useProfile();

  // CORREÇÃO FASE 2: Simplificar criação de perfil - sem promessas desnecessárias
  const createUserProfile = useCallback(async (
    supabaseUser: SupabaseUser, 
    onSuccess?: (user: User) => void
  ) => {
    try {
      console.log('📝 Enhancing user profile for:', supabaseUser.email);
      
      // Tentar buscar perfil detalhado
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
        
        if (onSuccess) {
          onSuccess(detailedUser);
        }
      } else {
        console.log('ℹ️ No detailed profile found, keeping basic user');
        // Manter user básico se não houver profile detalhado
        const basicUser: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 
                `${supabaseUser.user_metadata?.firstName || ''} ${supabaseUser.user_metadata?.lastName || ''}`.trim() ||
                supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          role: 'user'
        };
        
        if (onSuccess) {
          onSuccess(basicUser);
        }
      }
      
    } catch (error) {
      console.error('❌ Error enhancing user profile:', error);
      // Não fazer nada - manter user básico já definido
      throw error;
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
