
import { useState, useCallback } from 'react';
import supabase from '@/utils/supabase/client';

export const useTenantValidation = () => {
  const [isChecking, setIsChecking] = useState(false);

  const checkSlugAvailability = useCallback(async (slug: string): Promise<boolean> => {
    if (!slug.trim()) return false;
    
    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      
      return !data; // true if available (no data found)
    } catch (error) {
      console.error('Error checking slug availability:', error);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, []);

  const checkUserHasTenant = useCallback(async (userId: string): Promise<boolean> => {
    if (!userId) return false;
    
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('id')
        .eq('created_by', userId)
        .maybeSingle();

      if (error) throw error;
      
      return !!data; // true if user already has a tenant
    } catch (error) {
      console.error('Error checking user tenant:', error);
      return false;
    }
  }, []);

  return {
    checkSlugAvailability,
    checkUserHasTenant,
    isChecking
  };
};
