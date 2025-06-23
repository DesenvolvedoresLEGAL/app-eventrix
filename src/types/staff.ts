
import { Database } from '@/integrations/supabase/types';

export type Staff = Database['public']['Tables']['event_team']['Row'];
export type StaffInsert = Database['public']['Tables']['event_team']['Insert'];
export type StaffUpdate = Database['public']['Tables']['event_team']['Update'];

export interface StaffListItem {
  id: string;
  name: string;
  email: string;
  role: string;
  event_id: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface StaffFilters {
  role?: string;
  search?: string;
}

export interface StaffFormData {
  name: string;
  email: string;
  role: string;
  event_id: string;
}
