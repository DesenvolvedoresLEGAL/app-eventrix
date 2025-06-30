import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CreateTenantData {
  name: string;
  website_url?: string | null;
  document_id?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  plan_id?: string | null;
  logo_url?: string | null;
}

export interface Tenant extends CreateTenantData {
  id: string;
  created_at: string;
  updated_at: string;
}

export const useTenant = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createTenant = async (
    tenantData: CreateTenantData
  ): Promise<Tenant | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tenants')
        .insert([tenantData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Organiza\u00e7\u00e3o criada com sucesso!'
      });

      return data as Tenant;
    } catch (error: any) {
      console.error('Erro ao criar tenant:', error);
      toast({
        title: 'Erro ao criar organiza\u00e7\u00e3o',
        description: error.message,
        variant: 'destructive'
      });
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTenantById = async (id: string): Promise<Tenant | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as Tenant | null;
    } catch (error: any) {
      console.error('Erro ao buscar tenant:', error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const assignUserToTenant = async (
    userId: string,
    tenantId: string,
    isOwner = false
  ) => {
    setLoading(true);
    try {
      const updates: any = { tenant_id: tenantId };
      if (isOwner) {
        updates.user_role = 'admin';
      }
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('auth_user_id', userId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Usu\u00e1rio vinculado \u00e0 organiza\u00e7\u00e3o'
      });
    } catch (error: any) {
      console.error('Erro ao vincular usu\u00e1rio ao tenant:', error);
      toast({
        title: 'Erro ao vincular usu\u00e1rio',
        description: error.message,
        variant: 'destructive'
      });
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createTenant,
    getTenantById,
    assignUserToTenant,
    loading
  };
};
