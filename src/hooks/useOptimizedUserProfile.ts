
import { useState, useCallback, useRef } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import { User } from '@/types/auth';

export const useOptimizedUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getProfileByAuthId } = useProfile();
  
  // Cache em memória para perfis e controle de loading
  const profileCache = useRef<Map<string, User>>(new Map());
  const loadingProfiles = useRef<Set<string>>(new Set());

  // Função otimizada de criação de perfil com cache
  const createUserProfileOptimized = useCallback(async (supabaseUser: SupabaseUser) => {
    const userId = supabaseUser.id;
    
    // Verificar cache primeiro
    if (profileCache.current.has(userId)) {
      const cachedUser = profileCache.current.get(userId)!;
      console.log('✅ Using cached profile for user:', userId);
      setUser(cachedUser);
      return;
    }
    
    // Verificar se já está sendo carregado
    if (loadingProfiles.current.has(userId)) {
      console.log('⏳ Profile already being loaded for user:', userId);
      return;
    }
    
    loadingProfiles.current.add(userId);
    
    try {
      console.log('📝 Creating optimized user profile for:', supabaseUser.email);
      
      // Buscar perfil do banco com timeout
      const profilePromise = getProfileByAuthId(supabaseUser.id);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
      );
      
      const profile = await Promise.race([profilePromise, timeoutPromise]) as any;
      
      let userProfile: User;
      
      if (profile) {
        console.log('✅ Profile found in database:', profile.uuid);
        userProfile = {
          id: supabaseUser.id,
          name: `${profile.first_name} ${profile.last_name}`.trim(),
          email: profile.email,
          role: 'user',
          profile: profile
        };
      } else {
        console.log('⚠️ No profile found in database, using fallback data');
        userProfile = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 
                `${supabaseUser.user_metadata?.firstName || ''} ${supabaseUser.user_metadata?.lastName || ''}`.trim() ||
                supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          role: 'user'
        };
      }
      
      // Cache do perfil
      profileCache.current.set(userId, userProfile);
      setUser(userProfile);
      console.log('✅ Optimized user profile created and cached');
      
    } catch (error) {
      console.error('❌ Error creating optimized user profile:', error);
      
      // Fallback user data
      const fallbackProfile: User = {
        id: supabaseUser.id,
        name: supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: 'user'
      };
      
      // Cache mesmo o fallback para evitar tentativas repetidas
      profileCache.current.set(userId, fallbackProfile);
      setUser(fallbackProfile);
      console.log('⚠️ Using cached minimal fallback profile');
    } finally {
      loadingProfiles.current.delete(userId);
    }
  }, [getProfileByAuthId]);

  const clearUser = useCallback(() => {
    console.log('🧹 Clearing user profile and cache...');
    setUser(null);
    profileCache.current.clear();
    loadingProfiles.current.clear();
  }, []);

  const setUser = useCallback((newUser: User | null) => {
    setUser(newUser);
  }, []);

  return {
    user,
    setUser,
    createUserProfileOptimized,
    clearUser,
    profileCache,
    loadingProfiles
  };
};
