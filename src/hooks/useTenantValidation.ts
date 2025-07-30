
import { useState } from 'react';
import supabase from '@/utils/supabase/client';

export const useTenantValidation = () => {
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);

  const checkSlugAvailability = async (slug: string): Promise<boolean> => {
    if (!slug || slug.length < 3) return false;
    
    setIsCheckingSlug(true);
    
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao verificar slug:', error);
        return false;
      }

      return !data; // true se não encontrou (disponível)
    } catch (error) {
      console.error('Erro ao verificar slug:', error);
      return false;
    } finally {
      setIsCheckingSlug(false);
    }
  };

  const checkUserHasTenant = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('id')
        .eq('created_by', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao verificar tenant do usuário:', error);
        return false;
      }

      return !!data; // true se encontrou tenant
    } catch (error) {
      console.error('Erro ao verificar tenant:', error);
      return false;
    }
  };

  return {
    checkSlugAvailability,
    checkUserHasTenant,
    isCheckingSlug
  };
};
