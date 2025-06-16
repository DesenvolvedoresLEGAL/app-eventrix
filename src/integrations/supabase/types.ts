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
          event_id: string
          full_name: string
          id: string
          main_email: string
          phone_whatsapp: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          event_id: string
          full_name: string
          id?: string
          main_email: string
          phone_whatsapp?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          event_id?: string
          full_name?: string
          id?: string
          main_email?: string
          phone_whatsapp?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_organizers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_team: {
        Row: {
          created_at: string | null
          email: string
          event_id: string
          id: string
          name: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          event_id: string
          id?: string
          name: string
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          event_id?: string
          id?: string
          name?: string
          role?: string
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
          category: Database["public"]["Enums"]["event_category_enum"] | null
          city: string | null
          country: string | null
          created_at: string | null
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
          category?: Database["public"]["Enums"]["event_category_enum"] | null
          city?: string | null
          country?: string | null
          created_at?: string | null
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
          category?: Database["public"]["Enums"]["event_category_enum"] | null
          city?: string | null
          country?: string | null
          created_at?: string | null
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
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      event_category_enum:
        | "fair"
        | "congress"
        | "symposium"
        | "festival"
        | "other"
      event_status_enum: "upcoming" | "in_progress" | "completed"
      font_style_enum:
        | "arial"
        | "roboto"
        | "montserrat"
        | "open_sans"
        | "lato"
        | "nunito"
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
        "fair",
        "congress",
        "symposium",
        "festival",
        "other",
      ],
      event_status_enum: ["upcoming", "in_progress", "completed"],
      font_style_enum: [
        "arial",
        "roboto",
        "montserrat",
        "open_sans",
        "lato",
        "nunito",
      ],
    },
  },
} as const
