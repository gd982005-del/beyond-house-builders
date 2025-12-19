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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      form_submissions: {
        Row: {
          created_at: string
          email: string
          form_source: Database["public"]["Enums"]["form_source"]
          full_name: string
          id: string
          message: string | null
          phone: string | null
          preferred_date: string | null
          service_type: string | null
          status: Database["public"]["Enums"]["submission_status"]
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          form_source: Database["public"]["Enums"]["form_source"]
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          preferred_date?: string | null
          service_type?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          form_source?: Database["public"]["Enums"]["form_source"]
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          preferred_date?: string | null
          service_type?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_json: Json | null
          content_key: string
          content_value: string | null
          created_at: string
          id: string
          page: string
          section: string
          updated_at: string
        }
        Insert: {
          content_json?: Json | null
          content_key: string
          content_value?: string | null
          created_at?: string
          id?: string
          page: string
          section: string
          updated_at?: string
        }
        Update: {
          content_json?: Json | null
          content_key?: string
          content_value?: string | null
          created_at?: string
          id?: string
          page?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          before_image_url: string | null
          category: string | null
          created_at: string
          display_order: number
          hover_caption: string | null
          id: string
          image_url: string
          is_before_after: boolean | null
          is_visible: boolean
          title: string | null
          updated_at: string
        }
        Insert: {
          before_image_url?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          hover_caption?: string | null
          id?: string
          image_url: string
          is_before_after?: boolean | null
          is_visible?: boolean
          title?: string | null
          updated_at?: string
        }
        Update: {
          before_image_url?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          hover_caption?: string | null
          id?: string
          image_url?: string
          is_before_after?: boolean | null
          is_visible?: boolean
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          benefits: Json | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          is_visible: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: Json | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_visible?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: Json | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          is_visible?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          company_name: string
          email: string
          id: string
          location: string
          logo_url: string | null
          phone: string
          seo_description: string | null
          seo_title: string | null
          social_image_url: string | null
          updated_at: string
          whatsapp: string
        }
        Insert: {
          company_name?: string
          email?: string
          id?: string
          location?: string
          logo_url?: string | null
          phone?: string
          seo_description?: string | null
          seo_title?: string | null
          social_image_url?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Update: {
          company_name?: string
          email?: string
          id?: string
          location?: string
          logo_url?: string | null
          phone?: string
          seo_description?: string | null
          seo_title?: string | null
          social_image_url?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          client_role: string | null
          content: string
          created_at: string
          display_order: number
          id: string
          is_visible: boolean
          rating: number | null
          updated_at: string
        }
        Insert: {
          client_name: string
          client_role?: string | null
          content: string
          created_at?: string
          display_order?: number
          id?: string
          is_visible?: boolean
          rating?: number | null
          updated_at?: string
        }
        Update: {
          client_name?: string
          client_role?: string | null
          content?: string
          created_at?: string
          display_order?: number
          id?: string
          is_visible?: boolean
          rating?: number | null
          updated_at?: string
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
          role?: Database["public"]["Enums"]["app_role"]
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      form_source: "contact" | "consultation" | "quote"
      submission_status: "unread" | "read" | "contacted"
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
  public: {
    Enums: {
      app_role: ["admin", "user"],
      form_source: ["contact", "consultation", "quote"],
      submission_status: ["unread", "read", "contacted"],
    },
  },
} as const
