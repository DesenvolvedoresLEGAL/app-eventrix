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
      console.log('📝 Attempting to create profile with data:', JSON.stringify(profileData, null, 2));
      
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase error during profile creation:', {
          error: error,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      if (!data) {
        console.error('❌ No data returned from profile creation');
        throw new Error('Nenhum dado retornado da criação do perfil');
      }

      console.log('✅ Profile created successfully:', data);
      return data;
    } catch (error: any) {
      console.error('❌ Profile creation failed with error:', error);
      
      // Handle specific errors
      if (error.code === '23505') {
        if (error.message.includes('profiles_email_key')) {
          throw new Error('Este email já está cadastrado');
        } else if (error.message.includes('profiles_auth_user_id_key')) {
          throw new Error('Usuário já possui perfil cadastrado');
        }
      }
      
      // Check for permission errors (when RLS is not configured)
      if (error.code === '42501' || error.message.includes('permission denied')) {
        console.error('🚨 Permission denied - RLS may need configuration');
        throw new Error('Erro de permissão ao criar perfil. Contate o administrador.');
      }
      
      // Check for connection errors
      if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
        throw new Error('Erro de conexão. Verifique sua internet.');
      }
      
      throw new Error(`Erro ao criar perfil: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getProfileByAuthId = async (authUserId: string): Promise<Profile | null> => {
    console.log('🔍 Starting profile fetch for auth user:', authUserId);
    setLoading(true);
    
    try {
      console.log('📡 Making Supabase query...');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', authUserId)
        .maybeSingle();

      if (error) {
        console.error('❌ Supabase error during profile fetch:', error);
        throw error;
      }

      console.log('📋 Profile fetch result:', data ? `Found profile ${data.uuid}` : 'Profile not found');
      return data;
    } catch (error: any) {
      console.error('❌ Profile fetch failed:', error);
      throw new Error('Erro ao buscar perfil do usuário');
    } finally {
      console.log('✅ Profile fetch completed, resetting loading state');
      setLoading(false);
    }
  };

  const updateProfile = async (uuid: string, updates: Partial<Profile>): Promise<Profile | null> => {
    setLoading(true);
    
    try {
      console.log('📝 Updating profile:', uuid, 'with:', updates);
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('uuid', uuid)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating profile:', error);
        throw error;
      }

      console.log('✅ Profile updated successfully:', data);
      return data;
    } catch (error: any) {
      console.error('❌ Profile update failed:', error);
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
