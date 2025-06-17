
import { useState, useCallback } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import { User } from '@/types/auth';

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getProfileByAuthId } = useProfile();

  // Create user profile from database profile data
  const createUserProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Creating user profile for:', supabaseUser.email);
      
      // Try to get profile from database first
      const profile = await getProfileByAuthId(supabaseUser.id);
      
      if (profile) {
        console.log('Profile found in database:', profile);
        const userProfile: User = {
          id: supabaseUser.id,
          name: `${profile.first_name} ${profile.last_name}`.trim(),
          email: profile.email,
          role: 'user',
          profile: profile
        };
        setUser(userProfile);
      } else {
        console.log('No profile found, using fallback data');
        // Fallback to metadata if no profile in database
        const userProfile: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || 
                `${supabaseUser.user_metadata?.firstName || ''} ${supabaseUser.user_metadata?.lastName || ''}`.trim() ||
                supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          role: 'user'
        };
        setUser(userProfile);
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      // Fallback user data
      setUser({
        id: supabaseUser.id,
        name: supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: 'user'
      });
    }
  }, [getProfileByAuthId]);

  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    setUser,
    createUserProfile,
    clearUser
  };
};
