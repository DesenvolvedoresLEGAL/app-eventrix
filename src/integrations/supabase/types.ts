export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      event_organizers: {
        Row: {
          company: string | null
          created_at: string | null
          full_name: string
          id: string
          main_email: string
          phone_whatsapp: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          main_email: string
          phone_whatsapp?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          main_email?: string
          phone_whatsapp?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      event_team: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          event_id: string
          id: string
          name: string
          permissions: string[] | null
          phone: string | null
          role: string
          status: Database["public"]["Enums"]["staff_status_enum"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          event_id: string
          id?: string
          name: string
          permissions?: string[] | null
          phone?: string | null
          role: string
          status?: Database["public"]["Enums"]["staff_status_enum"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          event_id?: string
          id?: string
          name?: string
          permissions?: string[] | null
          phone?: string | null
          role?: string
          status?: Database["public"]["Enums"]["staff_status_enum"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_team_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          accepted_eventrix_terms: boolean
          accepted_lgpd: boolean
          accepted_privacy_policy: boolean | null
          banner_url: string | null
          broadcast_platform: string | null
          category: Database["public"]["Enums"]["event_category_enum"]
          city: string | null
          country: string | null
          created_at: string | null
          deleted_at: string | null
          end_date: string | null
          end_time: string | null
          estimated_capacity: number | null
          exhibitors_count: number | null
          font_style: Database["public"]["Enums"]["font_style_enum"] | null
          full_address: string | null
          has_accessibility: boolean | null
          has_online_broadcast: boolean | null
          id: string
          is_public_registration: boolean | null
          location: string | null
          logo_url: string | null
          name: string
          notes: string | null
          official_website: string | null
          organizer_id: string
          primary_color: string | null
          secondary_color: string | null
          short_description: string | null
          start_date: string | null
          start_time: string | null
          state: string | null
          status: Database["public"]["Enums"]["event_status_enum"] | null
          tenant_id: string
          total_area: number | null
          updated_at: string | null
          venue_name: string | null
        }
        Insert: {
          accepted_eventrix_terms?: boolean
          accepted_lgpd?: boolean
          accepted_privacy_policy?: boolean | null
          banner_url?: string | null
          broadcast_platform?: string | null
          category?: Database["public"]["Enums"]["event_category_enum"]
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          end_date?: string | null
          end_time?: string | null
          estimated_capacity?: number | null
          exhibitors_count?: number | null
          font_style?: Database["public"]["Enums"]["font_style_enum"] | null
          full_address?: string | null
          has_accessibility?: boolean | null
          has_online_broadcast?: boolean | null
          id?: string
          is_public_registration?: boolean | null
          location?: string | null
          logo_url?: string | null
          name: string
          notes?: string | null
          official_website?: string | null
          organizer_id: string
          primary_color?: string | null
          secondary_color?: string | null
          short_description?: string | null
          start_date?: string | null
          start_time?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["event_status_enum"] | null
          tenant_id: string
          total_area?: number | null
          updated_at?: string | null
          venue_name?: string | null
        }
        Update: {
          accepted_eventrix_terms?: boolean
          accepted_lgpd?: boolean
          accepted_privacy_policy?: boolean | null
          banner_url?: string | null
          broadcast_platform?: string | null
          category?: Database["public"]["Enums"]["event_category_enum"]
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          end_date?: string | null
          end_time?: string | null
          estimated_capacity?: number | null
          exhibitors_count?: number | null
          font_style?: Database["public"]["Enums"]["font_style_enum"] | null
          full_address?: string | null
          has_accessibility?: boolean | null
          has_online_broadcast?: boolean | null
          id?: string
          is_public_registration?: boolean | null
          location?: string | null
          logo_url?: string | null
          name?: string
          notes?: string | null
          official_website?: string | null
          organizer_id?: string
          primary_color?: string | null
          secondary_color?: string | null
          short_description?: string | null
          start_date?: string | null
          start_time?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["event_status_enum"] | null
          tenant_id?: string
          total_area?: number | null
          updated_at?: string | null
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_events_organizer_id"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "event_organizers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_user_id: string
          created_at: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          position: string | null
          updated_at: string
          user_role: Database["public"]["Enums"]["user_role"] | null
          uuid: string
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          position?: string | null
          updated_at?: string
          user_role?: Database["public"]["Enums"]["user_role"] | null
          uuid?: string
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          position?: string | null
          updated_at?: string
          user_role?: Database["public"]["Enums"]["user_role"] | null
          uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_organizer: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      event_category_enum:
        | "conferencia"
        | "workshop"
        | "seminario"
        | "feira/exposicao"
        | "festival"
        | "congresso"
        | "treinamento"
        | "lancamento de produto"
        | "networking"
        | "webinar"
        | "outro"
      event_status_enum: "upcoming" | "in_progress" | "completed"
      font_style_enum:
        | "sans-serif"
        | "roboto"
        | "montserrat"
        | "open_sans"
        | "lato"
        | "nunito"
        | "serif"
        | "script"
        | "monospace"
      staff_status_enum: "Ativo" | "Inativo" | "Suspenso"
      user_role: "admin" | "organizer" | "exhinitors" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_category_enum: [
        "conferencia",
        "workshop",
        "seminario",
        "feira/exposicao",
        "festival",
        "congresso",
        "treinamento",
        "lancamento de produto",
        "networking",
        "webinar",
        "outro",
      ],
      event_status_enum: ["upcoming", "in_progress", "completed"],
      font_style_enum: [
        "sans-serif",
        "roboto",
        "montserrat",
        "open_sans",
        "lato",
        "nunito",
        "serif",
        "script",
        "monospace",
      ],
      staff_status_enum: ["Ativo", "Inativo", "Suspenso"],
      user_role: ["admin", "organizer", "exhinitors", "staff"],
    },
  },
} as const
