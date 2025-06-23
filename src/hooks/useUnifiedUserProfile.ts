
import { useState, useCallback, useRef } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import { User } from '@/types/auth';

export interface UserProfileOptions {
  enableCache?: boolean;
  cacheTimeout?: number;
  enableOptimization?: boolean;
}

export const useUnifiedUserProfile = (options: UserProfileOptions = {}) => {
  const {
    enableCache = true,
    cacheTimeout = 5000,
    enableOptimization = false
  } = options;

  const [user, setUserState] = useState<User | null>(null);
  const { getProfileByAuthId } = useProfile();
  
  // Cache em memória para perfis e controle de loading
  const profileCache = useRef<Map<string, User>>(new Map());
  const loadingProfiles = useRef<Set<string>>(new Set());

  // Função de criação de perfil com cache configurável
  const createUserProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    const userId = supabaseUser.id;
    
    // Verificar cache apenas se habilitado
    if (enableCache && profileCache.current.has(userId)) {
      const cachedUser = profileCache.current.get(userId)!;
      console.log('✅ Using cached profile for user:', userId);
      setUserState(cachedUser);
      return;
    }
    
    // Verificar loading apenas se otimização habilitada
    if (enableOptimization && loadingProfiles.current.has(userId)) {
      console.log('⏳ Profile already being loaded for user:', userId);
      return;
    }
    
    if (enableOptimization) {
      loadingProfiles.current.add(userId);
    }
    
    try {
      console.log('📝 Creating user profile for:', supabaseUser.email);
      
      let profile;
      
      if (enableOptimization) {
        // Buscar perfil com timeout
        const profilePromise = getProfileByAuthId(supabaseUser.id);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
        );
        
        profile = await Promise.race([profilePromise, timeoutPromise]) as any;
      } else {
        // Buscar perfil normalmente
        profile = await getProfileByAuthId(supabaseUser.id);
      }
      
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
      
      // Cache apenas se habilitado
      if (enableCache) {
        profileCache.current.set(userId, userProfile);
      }
      
      setUserState(userProfile);
      console.log('✅ User profile created successfully');
      
    } catch (error) {
      console.error('❌ Error creating user profile:', error);
      
      // Fallback user data
      const fallbackProfile: User = {
        id: supabaseUser.id,
        name: supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: 'user'
      };
      
      // Cache fallback apenas se habilitado
      if (enableCache) {
        profileCache.current.set(userId, fallbackProfile);
      }
      
      setUserState(fallbackProfile);
      console.log('⚠️ Using fallback profile');
    } finally {
      if (enableOptimization) {
        loadingProfiles.current.delete(userId);
        // Cleanup cache após timeout configurado
        if (enableCache) {
          setTimeout(() => profileCache.current.delete(userId), cacheTimeout);
        }
      }
    }
  }, [getProfileByAuthId, enableCache, enableOptimization, cacheTimeout]);

  const clearUser = useCallback(() => {
    console.log('🧹 Clearing user profile and cache...');
    setUserState(null);
    if (enableCache) {
      profileCache.current.clear();
    }
    if (enableOptimization) {
      loadingProfiles.current.clear();
    }
  }, [enableCache, enableOptimization]);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
  }, []);

  return {
    user,
    setUser,
    createUserProfile,
    clearUser,
    profileCache: enableCache ? profileCache : undefined,
    loadingProfiles: enableOptimization ? loadingProfiles : undefined
  };
};
