export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      accessories: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      big_counter: {
        Row: {
          active: boolean
          background_url: string | null
          caption: string | null
          id: number
          number_value: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          background_url?: string | null
          caption?: string | null
          id?: number
          number_value?: string
          title?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          background_url?: string | null
          caption?: string | null
          id?: number
          number_value?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      differentials: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          icon: string | null
          id: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          active: boolean
          answer: string
          category: string | null
          created_at: string
          id: string
          position: number
          question: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          position?: number
          question: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          position?: number
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_columns: {
        Row: {
          created_at: string
          id: string
          position: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          position?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          position?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          column_id: string
          created_at: string
          external: boolean
          id: string
          label: string
          link: string
          position: number
          updated_at: string
        }
        Insert: {
          column_id: string
          created_at?: string
          external?: boolean
          id?: string
          label: string
          link?: string
          position?: number
          updated_at?: string
        }
        Update: {
          column_id?: string
          created_at?: string
          external?: boolean
          id?: string
          label?: string
          link?: string
          position?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "footer_links_column_id_fkey"
            columns: ["column_id"]
            isOneToOne: false
            referencedRelation: "footer_columns"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_slides: {
        Row: {
          active: boolean
          created_at: string
          cta_label: string | null
          cta_link: string | null
          id: string
          image_url: string | null
          position: number
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          id?: string
          image_url?: string | null
          position?: number
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          id?: string
          image_url?: string | null
          position?: number
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      history_events: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          position: number
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          position?: number
          title: string
          updated_at?: string
          year: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          position?: number
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      home_layout: {
        Row: {
          id: number
          sections: Json
          updated_at: string
        }
        Insert: {
          id?: number
          sections?: Json
          updated_at?: string
        }
        Update: {
          id?: number
          sections?: Json
          updated_at?: string
        }
        Relationships: []
      }
      materials: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          position: number
          segment_slug: string
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          position?: number
          segment_slug?: string
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          position?: number
          segment_slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          id: string
          mime_type: string | null
          name: string
          path: string
          size: number | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          mime_type?: string | null
          name: string
          path: string
          size?: number | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          mime_type?: string | null
          name?: string
          path?: string
          size?: number | null
          url?: string
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          created_at: string
          external: boolean
          id: string
          label: string
          link: string
          parent_id: string | null
          position: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          external?: boolean
          id?: string
          label: string
          link?: string
          parent_id?: string | null
          position?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          external?: boolean
          id?: string
          label?: string
          link?: string
          parent_id?: string | null
          position?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          read: boolean
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          read?: boolean
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          read?: boolean
          subject?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: Json
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      segments: {
        Row: {
          active: boolean
          age_range: string | null
          color: string | null
          created_at: string
          id: string
          image_url: string | null
          link: string | null
          long_description: string | null
          name: string
          position: number
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          age_range?: string | null
          color?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          link?: string | null
          long_description?: string | null
          name: string
          position?: number
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          age_range?: string | null
          color?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          link?: string | null
          long_description?: string | null
          name?: string
          position?: number
          short_description?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string
          email: string
          facebook_url: string | null
          id: number
          instagram_url: string | null
          name: string
          phone: string
          phone_raw: string
          portal_url: string
          short_name: string
          updated_at: string
          whatsapp: string
          whatsapp_label: string
          youtube_url: string | null
        }
        Insert: {
          address: string
          email: string
          facebook_url?: string | null
          id?: number
          instagram_url?: string | null
          name: string
          phone: string
          phone_raw: string
          portal_url: string
          short_name: string
          updated_at?: string
          whatsapp: string
          whatsapp_label: string
          youtube_url?: string | null
        }
        Update: {
          address?: string
          email?: string
          facebook_url?: string | null
          id?: number
          instagram_url?: string | null
          name?: string
          phone?: string
          phone_raw?: string
          portal_url?: string
          short_name?: string
          updated_at?: string
          whatsapp?: string
          whatsapp_label?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          active: boolean
          created_at: string
          id: string
          label: string
          position: number
          suffix: string | null
          updated_at: string
          value: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          label: string
          position?: number
          suffix?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          label?: string
          position?: number
          suffix?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
