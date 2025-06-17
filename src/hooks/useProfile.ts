
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Profile, CreateProfileData } from '@/types/profile';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createProfile = async (profileData: CreateProfileData): Promise<Profile | null> => {
    setLoading(true);
    
    try {
      console.log('Creating profile with data:', profileData);
      
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        throw error;
      }

      console.log('Profile created successfully:', data);
      return data;
    } catch (error: any) {
      console.error('Profile creation failed:', error);
      
      // Handle specific errors
      if (error.code === '23505') {
        if (error.message.includes('profiles_email_key')) {
          throw new Error('Este email já está cadastrado');
        } else if (error.message.includes('profiles_auth_user_id_key')) {
          throw new Error('Usuário já possui perfil cadastrado');
        }
      }
      
      throw new Error('Erro ao criar perfil do usuário');
    } finally {
      setLoading(false);
    }
  };

  const getProfileByAuthId = async (authUserId: string): Promise<Profile | null> => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', authUserId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Profile fetch failed:', error);
      throw new Error('Erro ao buscar perfil do usuário');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (uuid: string, updates: Partial<Profile>): Promise<Profile | null> => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('uuid', uuid)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Profile update failed:', error);
      throw new Error('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return {
    createProfile,
    getProfileByAuthId,
    updateProfile,
    loading
  };
};
