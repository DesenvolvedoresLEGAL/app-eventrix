
import { Database } from '@/integrations/supabase/types';

// Types baseados na estrutura real da tabela events do Supabase
export type Event = Database['public']['Tables']['events']['Row'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];

// Enums do Supabase
export type EventStatus = Database['public']['Enums']['event_status_enum'];
export type EventCategory = Database['public']['Enums']['event_category_enum'];
export type FontStyle = Database['public']['Enums']['font_style_enum'];

// Interface otimizada para listagem de eventos
export interface EventListItem {
  id: string;
  name: string;
  start_date: string | null;
  end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  city: string | null;
  state: string | null;
  venue_name: string | null;
  status: EventStatus | null;
  category: EventCategory;
  exhibitors_count: number | null;
  estimated_capacity: number | null;
  logo_url: string | null;
  banner_url: string | null;
  tenant_id: string;
  created_at: string | null;
  deleted_at: string | null;
}

// Interface para filtros de busca
export interface EventFilters {
  status?: EventStatus;
  category?: EventCategory;
  dateRange?: {
    start: string;
    end: string;
  };
  includeDeleted?: boolean;
}
