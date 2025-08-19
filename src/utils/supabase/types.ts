export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      brazilian_states: {
        Row: {
          capital: string
          code: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          region: string
          timezone: string
          updated_at: string
        }
        Insert: {
          capital: string
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          region: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          capital?: string
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          region?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_segments: {
        Row: {
          code: string
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      invites: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string | null
          role: string
          status: string | null
          tenant_id: string | null
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          invited_by?: string | null
          role: string
          status?: string | null
          tenant_id?: string | null
          token: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          role?: string
          status?: string | null
          tenant_id?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invites_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invites_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      organizer_types: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string
          full_name: string
          id: string
          is_active: boolean
          last_name: string
          role: string
          tenant_id: string | null
          updated_at: string
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_name: string
          role?: string
          tenant_id?: string | null
          updated_at?: string
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_name?: string
          role?: string
          tenant_id?: string | null
          updated_at?: string
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_tenant"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          code: string
          created_at: string
          description: string | null
          features: Json
          id: string
          is_active: boolean
          is_enterprise: boolean
          is_popular: boolean
          max_admins: number
          max_events_max: number
          max_events_min: number
          max_exhibitors: number
          max_visitors_max: number
          max_visitors_min: number
          name: string
          price_monthly: number | null
          price_yearly: number | null
          sort_order: number
          support_type: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          is_enterprise?: boolean
          is_popular?: boolean
          max_admins?: number
          max_events_max?: number
          max_events_min?: number
          max_exhibitors?: number
          max_visitors_max?: number
          max_visitors_min?: number
          name: string
          price_monthly?: number | null
          price_yearly?: number | null
          sort_order?: number
          support_type?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          is_enterprise?: boolean
          is_popular?: boolean
          max_admins?: number
          max_events_max?: number
          max_events_min?: number
          max_exhibitors?: number
          max_visitors_max?: number
          max_visitors_min?: number
          name?: string
          price_monthly?: number | null
          price_yearly?: number | null
          sort_order?: number
          support_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      tenant_audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          lgpd_purpose: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          session_id: string | null
          table_name: string
          tenant_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          lgpd_purpose?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          session_id?: string | null
          table_name: string
          tenant_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          lgpd_purpose?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          session_id?: string | null
          table_name?: string
          tenant_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_audit_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_documents: {
        Row: {
          created_at: string
          document_name: string
          document_type: Database["public"]["Enums"]["tenant_document_type"]
          expires_at: string | null
          file_size_bytes: number
          file_url: string
          id: string
          mime_type: string
          rejection_reason: string | null
          tenant_id: string
          updated_at: string
          verification_status: Database["public"]["Enums"]["tenant_document_status"]
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          document_name: string
          document_type: Database["public"]["Enums"]["tenant_document_type"]
          expires_at?: string | null
          file_size_bytes: number
          file_url: string
          id?: string
          mime_type: string
          rejection_reason?: string | null
          tenant_id: string
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["tenant_document_status"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          document_name?: string
          document_type?: Database["public"]["Enums"]["tenant_document_type"]
          expires_at?: string | null
          file_size_bytes?: number
          file_url?: string
          id?: string
          mime_type?: string
          rejection_reason?: string | null
          tenant_id?: string
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["tenant_document_status"]
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_documents_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_plan_history: {
        Row: {
          change_reason: string
          changed_by: string | null
          created_at: string
          effective_date: string
          from_plan_id: string | null
          id: string
          price_difference_brl: number | null
          tenant_id: string
          to_plan_id: string
        }
        Insert: {
          change_reason: string
          changed_by?: string | null
          created_at?: string
          effective_date: string
          from_plan_id?: string | null
          id?: string
          price_difference_brl?: number | null
          tenant_id: string
          to_plan_id: string
        }
        Update: {
          change_reason?: string
          changed_by?: string | null
          created_at?: string
          effective_date?: string
          from_plan_id?: string | null
          id?: string
          price_difference_brl?: number | null
          tenant_id?: string
          to_plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_plan_history_from_plan_id_fkey"
            columns: ["from_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_plan_history_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_plan_history_to_plan_id_fkey"
            columns: ["to_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_settings: {
        Row: {
          category: string
          created_at: string
          id: string
          is_sensitive: boolean
          key: string
          tenant_id: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          is_sensitive?: boolean
          key: string
          tenant_id: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_sensitive?: boolean
          key?: string
          tenant_id?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "tenant_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_statuses: {
        Row: {
          code: string
          color_hex: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          code: string
          color_hex?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          code?: string
          color_hex?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      tenant_usage_stats: {
        Row: {
          active_events: number
          ai_requests_count: number
          api_requests: number
          boleto_transactions: number
          created_at: string
          credit_card_transactions: number
          emails_sent: number
          events_created: number
          features_used: Json
          id: string
          login_count: number
          period_end: string
          period_start: string
          pix_transactions: number
          revenue_generated_brl: number
          storage_used_mb: number
          tenant_id: string
          total_admins: number
          total_exhibitors: number
          total_visitors: number
          whatsapp_messages_sent: number
        }
        Insert: {
          active_events?: number
          ai_requests_count?: number
          api_requests?: number
          boleto_transactions?: number
          created_at?: string
          credit_card_transactions?: number
          emails_sent?: number
          events_created?: number
          features_used?: Json
          id?: string
          login_count?: number
          period_end: string
          period_start: string
          pix_transactions?: number
          revenue_generated_brl?: number
          storage_used_mb?: number
          tenant_id: string
          total_admins?: number
          total_exhibitors?: number
          total_visitors?: number
          whatsapp_messages_sent?: number
        }
        Update: {
          active_events?: number
          ai_requests_count?: number
          api_requests?: number
          boleto_transactions?: number
          created_at?: string
          credit_card_transactions?: number
          emails_sent?: number
          events_created?: number
          features_used?: Json
          id?: string
          login_count?: number
          period_end?: string
          period_start?: string
          pix_transactions?: number
          revenue_generated_brl?: number
          storage_used_mb?: number
          tenant_id?: string
          total_admins?: number
          total_exhibitors?: number
          total_visitors?: number
          whatsapp_messages_sent?: number
        }
        Relationships: [
          {
            foreignKeyName: "tenant_usage_stats_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          billing_cnpj: string | null
          billing_email: string | null
          billing_endereco: Json | null
          cep: string
          cnae_principal: string | null
          cnpj: string
          contact_email: string
          contact_phone: string | null
          created_at: string
          created_by: string | null
          current_admins_count: number
          current_events_count: number
          data_retention_months: number
          deleted_at: string | null
          deleted_by: string | null
          deletion_reason: string | null
          domain_validated: boolean
          domain_validated_at: string | null
          email_domain: string | null
          endereco_bairro: string
          endereco_cidade: string
          endereco_complemento: string | null
          endereco_logradouro: string
          endereco_numero: string | null
          favicon_url: string | null
          features_enabled: Json
          first_event_created: boolean
          font_family: string
          id: string
          inscricao_estadual: string | null
          integrations_config: Json
          last_login_at: string | null
          lgpd_acceptance_date: string | null
          locale: string
          logo_url: string | null
          max_admins_allowed: number
          max_events_allowed: number
          max_exhibitors_allowed: number
          max_visitors_allowed: number
          nome_fantasia: string | null
          onboarding_completed: boolean
          onboarding_current_step: string
          optante_simples_nacional: boolean
          payment_method: string
          payment_provider_id: string | null
          plan_expires_at: string | null
          plan_id: string
          primary_color: string
          primary_segment_id: string
          razao_social: string
          regime_tributario: string | null
          secondary_color: string
          setup_wizard_completed: boolean
          slug: string
          state_id: string
          status_id: string
          timezone: string
          total_events_created: number
          total_revenue_brl: number
          trial_ends_at: string | null
          updated_at: string
          website_url: string | null
          whatsapp_number: string | null
        }
        Insert: {
          billing_cnpj?: string | null
          billing_email?: string | null
          billing_endereco?: Json | null
          cep: string
          cnae_principal?: string | null
          cnpj: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          created_by?: string | null
          current_admins_count?: number
          current_events_count?: number
          data_retention_months?: number
          deleted_at?: string | null
          deleted_by?: string | null
          deletion_reason?: string | null
          domain_validated?: boolean
          domain_validated_at?: string | null
          email_domain?: string | null
          endereco_bairro: string
          endereco_cidade: string
          endereco_complemento?: string | null
          endereco_logradouro: string
          endereco_numero?: string | null
          favicon_url?: string | null
          features_enabled?: Json
          first_event_created?: boolean
          font_family?: string
          id?: string
          inscricao_estadual?: string | null
          integrations_config?: Json
          last_login_at?: string | null
          lgpd_acceptance_date?: string | null
          locale?: string
          logo_url?: string | null
          max_admins_allowed?: number
          max_events_allowed?: number
          max_exhibitors_allowed?: number
          max_visitors_allowed?: number
          nome_fantasia?: string | null
          onboarding_completed?: boolean
          onboarding_current_step?: string
          optante_simples_nacional?: boolean
          payment_method?: string
          payment_provider_id?: string | null
          plan_expires_at?: string | null
          plan_id: string
          primary_color?: string
          primary_segment_id: string
          razao_social: string
          regime_tributario?: string | null
          secondary_color?: string
          setup_wizard_completed?: boolean
          slug: string
          state_id: string
          status_id: string
          timezone?: string
          total_events_created?: number
          total_revenue_brl?: number
          trial_ends_at?: string | null
          updated_at?: string
          website_url?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          billing_cnpj?: string | null
          billing_email?: string | null
          billing_endereco?: Json | null
          cep?: string
          cnae_principal?: string | null
          cnpj?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          created_by?: string | null
          current_admins_count?: number
          current_events_count?: number
          data_retention_months?: number
          deleted_at?: string | null
          deleted_by?: string | null
          deletion_reason?: string | null
          domain_validated?: boolean
          domain_validated_at?: string | null
          email_domain?: string | null
          endereco_bairro?: string
          endereco_cidade?: string
          endereco_complemento?: string | null
          endereco_logradouro?: string
          endereco_numero?: string | null
          favicon_url?: string | null
          features_enabled?: Json
          first_event_created?: boolean
          font_family?: string
          id?: string
          inscricao_estadual?: string | null
          integrations_config?: Json
          last_login_at?: string | null
          lgpd_acceptance_date?: string | null
          locale?: string
          logo_url?: string | null
          max_admins_allowed?: number
          max_events_allowed?: number
          max_exhibitors_allowed?: number
          max_visitors_allowed?: number
          nome_fantasia?: string | null
          onboarding_completed?: boolean
          onboarding_current_step?: string
          optante_simples_nacional?: boolean
          payment_method?: string
          payment_provider_id?: string | null
          plan_expires_at?: string | null
          plan_id?: string
          primary_color?: string
          primary_segment_id?: string
          razao_social?: string
          regime_tributario?: string | null
          secondary_color?: string
          setup_wizard_completed?: boolean
          slug?: string
          state_id?: string
          status_id?: string
          timezone?: string
          total_events_created?: number
          total_revenue_brl?: number
          trial_ends_at?: string | null
          updated_at?: string
          website_url?: string | null
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenants_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_primary_segment_id_fkey"
            columns: ["primary_segment_id"]
            isOneToOne: false
            referencedRelation: "business_segments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_profile_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "brazilian_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenants_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "tenant_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          code: string
          description: string | null
          id: string
          permissions: Json
        }
        Insert: {
          code: string
          description?: string | null
          id?: string
          permissions?: Json
        }
        Update: {
          code?: string
          description?: string | null
          id?: string
          permissions?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_tenant_usage: {
        Args: { p_tenant_id: string }
        Returns: Json
      }
      change_tenant_plan: {
        Args: {
          p_changed_by?: string
          p_new_plan_code: string
          p_reason: string
          p_tenant_id: string
        }
        Returns: boolean
      }
      cleanup_old_audit_logs: {
        Args: { retention_months?: number }
        Returns: number
      }
      create_default_tenant_settings: {
        Args: { tenant_uuid: string }
        Returns: undefined
      }
      create_new_tenant: {
        Args: {
          p_cnpj: string
          p_contact_email: string
          p_nome_fantasia: string
          p_organizer_type_code: string
          p_plan_code?: string
          p_razao_social: string
          p_segment_code: string
          p_slug: string
          p_state_code: string
        }
        Returns: string
      }
      decrypt_sensitive_data: {
        Args: { encrypted_input: string; key_input?: string }
        Returns: string
      }
      encrypt_sensitive_data: {
        Args: { data_input: string; key_input?: string }
        Returns: string
      }
      format_cnpj: {
        Args: { cnpj_input: string }
        Returns: string
      }
      generate_monthly_usage_stats: {
        Args: { target_month?: string }
        Returns: number
      }
      get_current_tenant_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      suspend_tenant: {
        Args: { p_reason: string; p_suspended_by?: string; p_tenant_id: string }
        Returns: boolean
      }
      validate_cep: {
        Args: { cep_input: string }
        Returns: boolean
      }
      validate_cnpj: {
        Args: { cnpj_input: string }
        Returns: boolean
      }
      validate_hex_color: {
        Args: { color_input: string }
        Returns: boolean
      }
    }
    Enums: {
      tenant_document_status: "pending" | "verified" | "rejected" | "expired"
      tenant_document_type:
        | "contrato_social"
        | "certidao_negativa"
        | "cartao_cnpj"
        | "procuracao"
        | "alvara_funcionamento"
        | "certificado_digital"
        | "comprovante_endereco"
        | "inscricao_municipal"
        | "outros"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      tenant_document_status: ["pending", "verified", "rejected", "expired"],
      tenant_document_type: [
        "contrato_social",
        "certidao_negativa",
        "cartao_cnpj",
        "procuracao",
        "alvara_funcionamento",
        "certificado_digital",
        "comprovante_endereco",
        "inscricao_municipal",
        "outros",
      ],
    },
  },
} as const

