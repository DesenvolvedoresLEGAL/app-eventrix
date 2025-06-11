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
      access_logs: {
        Row: {
          action: string | null
          device: string | null
          event_id: string | null
          id: string
          ip: string | null
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action?: string | null
          device?: string | null
          event_id?: string | null
          id?: string
          ip?: string | null
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action?: string | null
          device?: string | null
          event_id?: string | null
          id?: string
          ip?: string | null
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      activities: {
        Row: {
          capacity: number | null
          created_at: string
          duration: string | null
          end_time: string | null
          event_id: string
          id: string
          instructor: string | null
          location: string | null
          name: string
          registered: number | null
          start_time: string | null
          status: string | null
          type: string | null
          updated_at: string
          venue_id: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          duration?: string | null
          end_time?: string | null
          event_id: string
          id?: string
          instructor?: string | null
          location?: string | null
          name: string
          registered?: number | null
          start_time?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string
          venue_id?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          duration?: string | null
          end_time?: string | null
          event_id?: string
          id?: string
          instructor?: string | null
          location?: string | null
          name?: string
          registered?: number | null
          start_time?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interactions: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          module: string | null
          request: string | null
          response: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: string
          module?: string | null
          request?: string | null
          response?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          module?: string | null
          request?: string | null
          response?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      api_endpoints: {
        Row: {
          avg_response_time: number | null
          created_at: string
          description: string | null
          error_rate: number | null
          id: string
          method: string | null
          path: string | null
          request_count: number | null
          updated_at: string
        }
        Insert: {
          avg_response_time?: number | null
          created_at?: string
          description?: string | null
          error_rate?: number | null
          id?: string
          method?: string | null
          path?: string | null
          request_count?: number | null
          updated_at?: string
        }
        Update: {
          avg_response_time?: number | null
          created_at?: string
          description?: string | null
          error_rate?: number | null
          id?: string
          method?: string | null
          path?: string | null
          request_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          active: boolean | null
          api_key: string
          created_at: string
          id: string
          last_used: string | null
          name: string | null
          request_count: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          api_key: string
          created_at?: string
          id?: string
          last_used?: string | null
          name?: string | null
          request_count?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          api_key?: string
          created_at?: string
          id?: string
          last_used?: string | null
          name?: string | null
          request_count?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      api_logs: {
        Row: {
          api_key_id: string | null
          endpoint_id: string | null
          id: string
          response_code: number | null
          response_time: number | null
          timestamp: string | null
        }
        Insert: {
          api_key_id?: string | null
          endpoint_id?: string | null
          id?: string
          response_code?: number | null
          response_time?: number | null
          timestamp?: string | null
        }
        Update: {
          api_key_id?: string | null
          endpoint_id?: string | null
          id?: string
          response_code?: number | null
          response_time?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_api_logs_endpoint"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "api_endpoints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_api_logs_key"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      checkins: {
        Row: {
          checkin_at: string | null
          checkout_at: string | null
          created_at: string
          device: string | null
          event_id: string
          id: string
          method: string | null
          staff_id: string | null
          status: string | null
          updated_at: string
          visitor_id: string | null
        }
        Insert: {
          checkin_at?: string | null
          checkout_at?: string | null
          created_at?: string
          device?: string | null
          event_id: string
          id?: string
          method?: string | null
          staff_id?: string | null
          status?: string | null
          updated_at?: string
          visitor_id?: string | null
        }
        Update: {
          checkin_at?: string | null
          checkout_at?: string | null
          created_at?: string
          device?: string | null
          event_id?: string
          id?: string
          method?: string | null
          staff_id?: string | null
          status?: string | null
          updated_at?: string
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checkins_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkins_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkins_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "visitors"
            referencedColumns: ["id"]
          },
        ]
      }
      checklists: {
        Row: {
          category: string | null
          completed_tasks: number | null
          created_at: string
          due_date: string | null
          event_id: string
          id: string
          priority: string | null
          progress: number | null
          responsible: string | null
          status: string | null
          title: string
          total_tasks: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          completed_tasks?: number | null
          created_at?: string
          due_date?: string | null
          event_id: string
          id?: string
          priority?: string | null
          progress?: number | null
          responsible?: string | null
          status?: string | null
          title: string
          total_tasks?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          completed_tasks?: number | null
          created_at?: string
          due_date?: string | null
          event_id?: string
          id?: string
          priority?: string | null
          progress?: number | null
          responsible?: string | null
          status?: string | null
          title?: string
          total_tasks?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklists_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      document_validations: {
        Row: {
          created_at: string
          document_url: string | null
          event_id: string | null
          id: string
          result: Json | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_url?: string | null
          event_id?: string | null
          id?: string
          result?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_url?: string | null
          event_id?: string | null
          id?: string
          result?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_validations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      dynamic_pricing_rules: {
        Row: {
          adjusted_price: number | null
          base_price: number | null
          created_at: string
          criteria: Json | null
          event_id: string | null
          id: string
          updated_at: string
        }
        Insert: {
          adjusted_price?: number | null
          base_price?: number | null
          created_at?: string
          criteria?: Json | null
          event_id?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          adjusted_price?: number | null
          base_price?: number | null
          created_at?: string
          criteria?: Json | null
          event_id?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dynamic_pricing_rules_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          click_rate: number | null
          created_at: string
          event_id: string | null
          id: string
          name: string | null
          open_rate: number | null
          recipients: number | null
          sent_at: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          click_rate?: number | null
          created_at?: string
          event_id?: string | null
          id?: string
          name?: string | null
          open_rate?: number | null
          recipients?: number | null
          sent_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          click_rate?: number | null
          created_at?: string
          event_id?: string | null
          id?: string
          name?: string | null
          open_rate?: number | null
          recipients?: number | null
          sent_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      entity_logs: {
        Row: {
          action: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          new_value: Json | null
          old_value: Json | null
          performed_by: string | null
          timestamp: string
          updated_at: string
        }
        Insert: {
          action?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          performed_by?: string | null
          timestamp?: string
          updated_at?: string
        }
        Update: {
          action?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          performed_by?: string | null
          timestamp?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          accessibility: boolean | null
          accessibility_info: string | null
          address: string | null
          banner_url: string | null
          capacity: number | null
          category: string | null
          city: string | null
          color_scheme: string | null
          company: string | null
          country: string | null
          created_at: string
          description: string | null
          end_date: string | null
          end_time: string | null
          font_style: string | null
          id: string
          is_hybrid: boolean | null
          logo_url: string | null
          name: string
          organizer_email: string | null
          organizer_name: string | null
          phone: string | null
          primary_color: string | null
          public_registration: boolean | null
          secondary_color: string | null
          special_requirements: string | null
          start_date: string | null
          start_time: string | null
          state: string | null
          streaming_platform: string | null
          total_area: number | null
          updated_at: string
          venue_name: string | null
          website: string | null
        }
        Insert: {
          accessibility?: boolean | null
          accessibility_info?: string | null
          address?: string | null
          banner_url?: string | null
          capacity?: number | null
          category?: string | null
          city?: string | null
          color_scheme?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          font_style?: string | null
          id?: string
          is_hybrid?: boolean | null
          logo_url?: string | null
          name: string
          organizer_email?: string | null
          organizer_name?: string | null
          phone?: string | null
          primary_color?: string | null
          public_registration?: boolean | null
          secondary_color?: string | null
          special_requirements?: string | null
          start_date?: string | null
          start_time?: string | null
          state?: string | null
          streaming_platform?: string | null
          total_area?: number | null
          updated_at?: string
          venue_name?: string | null
          website?: string | null
        }
        Update: {
          accessibility?: boolean | null
          accessibility_info?: string | null
          address?: string | null
          banner_url?: string | null
          capacity?: number | null
          category?: string | null
          city?: string | null
          color_scheme?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          font_style?: string | null
          id?: string
          is_hybrid?: boolean | null
          logo_url?: string | null
          name?: string
          organizer_email?: string | null
          organizer_name?: string | null
          phone?: string | null
          primary_color?: string | null
          public_registration?: boolean | null
          secondary_color?: string | null
          special_requirements?: string | null
          start_date?: string | null
          start_time?: string | null
          state?: string | null
          streaming_platform?: string | null
          total_area?: number | null
          updated_at?: string
          venue_name?: string | null
          website?: string | null
        }
        Relationships: []
      }
      exhibitors: {
        Row: {
          category: string | null
          contact_email: string | null
          contact_name: string | null
          created_at: string
          event_id: string
          id: string
          name: string
          phone: string | null
          stand: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string
          event_id: string
          id?: string
          name: string
          phone?: string | null
          stand?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string
          event_id?: string
          id?: string
          name?: string
          phone?: string | null
          stand?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exhibitors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      heatmap_data: {
        Row: {
          area: string | null
          captured_at: string
          created_at: string
          event_id: string | null
          id: string
          updated_at: string
          visitor_id: string | null
        }
        Insert: {
          area?: string | null
          captured_at?: string
          created_at?: string
          event_id?: string | null
          id?: string
          updated_at?: string
          visitor_id?: string | null
        }
        Update: {
          area?: string | null
          captured_at?: string
          created_at?: string
          event_id?: string | null
          id?: string
          updated_at?: string
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "heatmap_data_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "heatmap_data_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "visitors"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          enabled: boolean | null
          icon_url: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          enabled?: boolean | null
          icon_url?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          enabled?: boolean | null
          icon_url?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      landing_pages: {
        Row: {
          content: string | null
          conversions: number | null
          created_at: string
          event_id: string | null
          id: string
          slug: string | null
          status: string | null
          title: string | null
          updated_at: string
          visits: number | null
        }
        Insert: {
          content?: string | null
          conversions?: number | null
          created_at?: string
          event_id?: string | null
          id?: string
          slug?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          visits?: number | null
        }
        Update: {
          content?: string | null
          conversions?: number | null
          created_at?: string
          event_id?: string | null
          id?: string
          slug?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          visits?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_pages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      lectures: {
        Row: {
          attendees: number | null
          created_at: string
          description: string | null
          end_time: string | null
          event_id: string
          id: string
          speaker: string | null
          start_time: string | null
          status: string | null
          title: string
          track_id: string | null
          updated_at: string
          venue_id: string | null
        }
        Insert: {
          attendees?: number | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_id: string
          id?: string
          speaker?: string | null
          start_time?: string | null
          status?: string | null
          title: string
          track_id?: string | null
          updated_at?: string
          venue_id?: string | null
        }
        Update: {
          attendees?: number | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_id?: string
          id?: string
          speaker?: string | null
          start_time?: string | null
          status?: string | null
          title?: string
          track_id?: string | null
          updated_at?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lectures_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lectures_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "tracks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lectures_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_documents: {
        Row: {
          ai_summary: string | null
          content: string | null
          created_at: string
          event_id: string | null
          id: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_summary?: string | null
          content?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_summary?: string | null
          content?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_documents_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          read: boolean | null
          sent_at: string | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean | null
          sent_at?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          read?: boolean | null
          sent_at?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          description: string | null
          id: string
          module_id: number | null
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          module_id?: number | null
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          module_id?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          billing_cycle: string
          created_at: string
          features: string[] | null
          id: string
          name: string
          popular: boolean | null
          price: number
          updated_at: string
        }
        Insert: {
          billing_cycle: string
          created_at?: string
          features?: string[] | null
          id?: string
          name: string
          popular?: boolean | null
          price: number
          updated_at?: string
        }
        Update: {
          billing_cycle?: string
          created_at?: string
          features?: string[] | null
          id?: string
          name?: string
          popular?: boolean | null
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          position: string | null
          preferences: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          position?: string | null
          preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          color: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          event_id: string | null
          id: string
          name: string
          phone: string | null
          role_id: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          event_id?: string | null
          id?: string
          name: string
          phone?: string | null
          role_id?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          event_id?: string | null
          id?: string
          name?: string
          phone?: string | null
          role_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_staff_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_staff_role"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_roles: {
        Row: {
          role_id: string
          staff_id: string
        }
        Insert: {
          role_id: string
          staff_id: string
        }
        Update: {
          role_id?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_roles_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      status_codes: {
        Row: {
          code: string
          context: string
          id: number
          label: string
        }
        Insert: {
          code: string
          context: string
          id?: number
          label: string
        }
        Update: {
          code?: string
          context?: string
          id?: number
          label?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          category: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          event_id: string
          id: string
          last_event: string | null
          name: string
          phone: string | null
          rating: number | null
          services: string[] | null
          status: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          event_id: string
          id?: string
          last_event?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          services?: string[] | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          event_id?: string
          id?: string
          last_event?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          services?: string[] | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string | null
          checklist_id: string | null
          completed: boolean | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          team: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          checklist_id?: string | null
          completed?: boolean | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          team?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          checklist_id?: string | null
          completed?: boolean | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          team?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          staff_id: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          staff_id: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          staff_id?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      tracks: {
        Row: {
          attendees: number | null
          color: string | null
          coordinator_id: string | null
          created_at: string
          description: string | null
          duration: string | null
          end_time: string | null
          event_id: string
          id: string
          location: string | null
          name: string
          sessions: number | null
          speakers: number | null
          start_time: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          attendees?: number | null
          color?: string | null
          coordinator_id?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          end_time?: string | null
          event_id: string
          id?: string
          location?: string | null
          name: string
          sessions?: number | null
          speakers?: number | null
          start_time?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          attendees?: number | null
          color?: string | null
          coordinator_id?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          end_time?: string | null
          event_id?: string
          id?: string
          location?: string | null
          name?: string
          sessions?: number | null
          speakers?: number | null
          start_time?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracks_coordinator_id_fkey"
            columns: ["coordinator_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracks_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          amenities: string[] | null
          area: number | null
          capacity: number | null
          created_at: string
          description: string | null
          event_id: string
          id: string
          location: string | null
          name: string
          price_per_hour: number | null
          status: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          area?: number | null
          capacity?: number | null
          created_at?: string
          description?: string | null
          event_id: string
          id?: string
          location?: string | null
          name: string
          price_per_hour?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          area?: number | null
          capacity?: number | null
          created_at?: string
          description?: string | null
          event_id?: string
          id?: string
          location?: string | null
          name?: string
          price_per_hour?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "venues_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      visitors: {
        Row: {
          check_in: boolean | null
          company: string | null
          email: string | null
          event_id: string
          id: string
          name: string
          phone: string | null
          position: string | null
          qr_code: string | null
          registration_date: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          check_in?: boolean | null
          company?: string | null
          email?: string | null
          event_id: string
          id?: string
          name: string
          phone?: string | null
          position?: string | null
          qr_code?: string | null
          registration_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          check_in?: boolean | null
          company?: string | null
          email?: string | null
          event_id?: string
          id?: string
          name?: string
          phone?: string | null
          position?: string | null
          qr_code?: string | null
          registration_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_visitors_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_subscriptions: {
        Row: {
          created_at: string
          event_name: string
          updated_at: string
          webhook_id: string
        }
        Insert: {
          created_at?: string
          event_name: string
          updated_at?: string
          webhook_id: string
        }
        Update: {
          created_at?: string
          event_name?: string
          updated_at?: string
          webhook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_subscriptions_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          created_at: string
          events_subscribed: string[] | null
          id: string
          last_delivery: string | null
          last_success: string | null
          status: string | null
          updated_at: string
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          events_subscribed?: string[] | null
          id?: string
          last_delivery?: string | null
          last_success?: string | null
          status?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          events_subscribed?: string[] | null
          id?: string
          last_delivery?: string | null
          last_success?: string | null
          status?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
