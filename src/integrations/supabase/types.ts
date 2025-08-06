export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_staff: boolean | null
          message_type: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_staff?: boolean | null
          message_type?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_staff?: boolean | null
          message_type?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          assigned_to: string | null
          created_at: string
          id: string
          priority: string | null
          status: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          priority?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          id?: string
          priority?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string
          created_at: string
          email: string
          first_name: string
          id: string
          is_sponsor: boolean
          last_name: string
          phone: string | null
          sobriety_date: string | null
          state: string
          street_address: string
          updated_at: string
          zip_code: string
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          first_name: string
          id: string
          is_sponsor?: boolean
          last_name: string
          phone?: string | null
          sobriety_date?: string | null
          state: string
          street_address: string
          updated_at?: string
          zip_code: string
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_sponsor?: boolean
          last_name?: string
          phone?: string | null
          sobriety_date?: string | null
          state?: string
          street_address?: string
          updated_at?: string
          zip_code?: string
        }
        Relationships: []
      }
      routes_data: {
        Row: {
          account_code: string | null
          created_at: string | null
          dropoff_address: string | null
          dropoff_city: string | null
          dropoff_name: string | null
          dropoff_zip: string | null
          first_name: string | null
          id: number
          last_name: string | null
          miles: number | null
          pickup_address: string | null
          pickup_city: string | null
          pickup_name: string | null
          pickup_zip: string | null
          ride_date: string
          ride_time: number | null
          sheet_year: string | null
          total: number | null
          trip_number: number | null
        }
        Insert: {
          account_code?: string | null
          created_at?: string | null
          dropoff_address?: string | null
          dropoff_city?: string | null
          dropoff_name?: string | null
          dropoff_zip?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          miles?: number | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_name?: string | null
          pickup_zip?: string | null
          ride_date: string
          ride_time?: number | null
          sheet_year?: string | null
          total?: number | null
          trip_number?: number | null
        }
        Update: {
          account_code?: string | null
          created_at?: string | null
          dropoff_address?: string | null
          dropoff_city?: string | null
          dropoff_name?: string | null
          dropoff_zip?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          miles?: number | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_name?: string | null
          pickup_zip?: string | null
          ride_date?: string
          ride_time?: number | null
          sheet_year?: string | null
          total?: number | null
          trip_number?: number | null
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          author_name: string
          author_title: string | null
          content: string
          created_at: string | null
          created_by: string
          featured_image_url: string | null
          id: string
          is_published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_name: string
          author_title?: string | null
          content: string
          created_at?: string | null
          created_by: string
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          author_title?: string | null
          content?: string
          created_at?: string | null
          created_by?: string
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transportation_requests: {
        Row: {
          additional_info: string | null
          appointment_date: string
          appointment_time: string
          assigned_driver_id: string | null
          created_at: string
          dest_address: string
          dest_name: string
          dest_phone: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          medicaid_id: string | null
          notes: string | null
          phone: string
          pickup_address: string
          pickup_name: string | null
          pickup_phone: string | null
          request_date: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          additional_info?: string | null
          appointment_date: string
          appointment_time: string
          assigned_driver_id?: string | null
          created_at?: string
          dest_address: string
          dest_name: string
          dest_phone?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          medicaid_id?: string | null
          notes?: string | null
          phone: string
          pickup_address: string
          pickup_name?: string | null
          pickup_phone?: string | null
          request_date: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          additional_info?: string | null
          appointment_date?: string
          appointment_time?: string
          assigned_driver_id?: string | null
          created_at?: string
          dest_address?: string
          dest_name?: string
          dest_phone?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          medicaid_id?: string | null
          notes?: string | null
          phone?: string
          pickup_address?: string
          pickup_name?: string | null
          pickup_phone?: string | null
          request_date?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          azure_id: string | null
          created_at: string | null
          display_name: string | null
          email: string
          id: string
          last_login: string | null
          profile: Json | null
        }
        Insert: {
          azure_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id?: string
          last_login?: string | null
          profile?: Json | null
        }
        Update: {
          azure_id?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: string
          last_login?: string | null
          profile?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      v_account_summary: {
        Row: {
          account_code: string | null
          active_months: number | null
          avg_miles_per_ride: number | null
          avg_revenue_per_ride: number | null
          first_ride_date: string | null
          last_ride_date: string | null
          total_miles: number | null
          total_revenue: number | null
          total_rides: number | null
          unique_riders: number | null
        }
        Relationships: []
      }
      v_city_metrics: {
        Row: {
          city: string | null
          city_type: string | null
          total_miles: number | null
          total_revenue: number | null
          trip_count: number | null
          unique_accounts: number | null
        }
        Relationships: []
      }
      v_daily_metrics: {
        Row: {
          avg_miles: number | null
          avg_revenue: number | null
          ride_count: number | null
          ride_date: string | null
          total_miles: number | null
          total_revenue: number | null
          unique_accounts: number | null
        }
        Relationships: []
      }
      v_dashboard_mtd: {
        Row: {
          miles_mtd: number | null
          revenue_mtd: number | null
          rides_mtd: number | null
          unique_accounts_mtd: number | null
          unique_riders_mtd: number | null
        }
        Relationships: []
      }
      v_dashboard_today: {
        Row: {
          active_accounts_today: number | null
          avg_miles_per_ride: number | null
          avg_revenue_per_ride: number | null
          avg_ride_time: number | null
          miles_today: number | null
          revenue_today: number | null
          rides_today: number | null
        }
        Relationships: []
      }
      v_dashboard_week: {
        Row: {
          active_accounts_week: number | null
          days_with_rides: number | null
          miles_week: number | null
          revenue_week: number | null
          rides_week: number | null
        }
        Relationships: []
      }
      v_efficiency_metrics: {
        Row: {
          avg_speed_mph: number | null
          revenue_per_mile: number | null
          revenue_per_minute: number | null
          ride_date: string | null
          total_miles: number | null
          total_rides: number | null
          total_time_minutes: number | null
        }
        Relationships: []
      }
      v_hourly_distribution: {
        Row: {
          avg_revenue: number | null
          hour_of_day: number | null
          ride_count: number | null
        }
        Relationships: []
      }
      v_kpi_summary: {
        Row: {
          avg_revenue_per_ride_all_time: number | null
          earliest_ride_date: string | null
          latest_ride_date: string | null
          total_accounts: number | null
          total_dropoff_cities: number | null
          total_miles_all_time: number | null
          total_pickup_cities: number | null
          total_revenue_all_time: number | null
          total_rides_all_time: number | null
          total_unique_riders: number | null
        }
        Relationships: []
      }
      v_monthly_trends: {
        Row: {
          active_days: number | null
          avg_miles_per_ride: number | null
          avg_revenue: number | null
          avg_ride_time: number | null
          month: string | null
          month_date: string | null
          ride_count: number | null
          sheet_year: string | null
          total_miles: number | null
          total_revenue: number | null
          unique_accounts: number | null
        }
        Relationships: []
      }
      v_popular_pickups: {
        Row: {
          active_days: number | null
          common_destinations: string[] | null
          pickup_address: string | null
          pickup_city: string | null
          pickup_count: number | null
          pickup_name: string | null
          pickup_zip: string | null
          total_revenue: number | null
          unique_accounts: number | null
        }
        Relationships: []
      }
      v_recent_rides: {
        Row: {
          account_code: string | null
          dropoff_city: string | null
          dropoff_name: string | null
          miles: number | null
          pickup_city: string | null
          pickup_name: string | null
          ride_date: string | null
          ride_time: number | null
          rider_name: string | null
          total: number | null
          trip_number: number | null
        }
        Relationships: []
      }
      v_rider_summary: {
        Row: {
          account_codes_used: number | null
          accounts: string[] | null
          avg_miles_per_ride: number | null
          first_name: string | null
          first_ride: string | null
          last_name: string | null
          last_ride: string | null
          rider_name: string | null
          total_cost: number | null
          total_miles: number | null
          total_rides: number | null
        }
        Relationships: []
      }
      v_route_analysis: {
        Row: {
          avg_miles: number | null
          avg_revenue: number | null
          avg_ride_time: number | null
          dropoff_city: string | null
          pickup_city: string | null
          route: string | null
          total_miles: number | null
          total_revenue: number | null
          trip_count: number | null
          unique_accounts: number | null
        }
        Relationships: []
      }
      v_top_accounts_current_month: {
        Row: {
          account_code: string | null
          miles_this_month: number | null
          revenue_rank: number | null
          revenue_this_month: number | null
          rides_this_month: number | null
        }
        Relationships: []
      }
      v_trip_efficiency: {
        Row: {
          account_code: string | null
          distance_category: string | null
          miles: number | null
          revenue_per_mile: number | null
          ride_date: string | null
          ride_time: number | null
          speed_mph: number | null
          total: number | null
          trip_number: number | null
        }
        Insert: {
          account_code?: string | null
          distance_category?: never
          miles?: number | null
          revenue_per_mile?: never
          ride_date?: string | null
          ride_time?: number | null
          speed_mph?: never
          total?: number | null
          trip_number?: number | null
        }
        Update: {
          account_code?: string | null
          distance_category?: never
          miles?: number | null
          revenue_per_mile?: never
          ride_date?: string | null
          ride_time?: number | null
          speed_mph?: never
          total?: number | null
          trip_number?: number | null
        }
        Relationships: []
      }
      v_weekly_metrics: {
        Row: {
          avg_revenue_per_ride: number | null
          ride_count: number | null
          total_miles: number | null
          total_revenue: number | null
          unique_accounts: number | null
          unique_riders: number | null
          week_start: string | null
        }
        Relationships: []
      }
      v_yoy_comparison: {
        Row: {
          month_name: string | null
          month_number: number | null
          revenue_2023: number | null
          revenue_2024: number | null
          revenue_2025: number | null
          rides_2023: number | null
          rides_2024: number | null
          rides_2025: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      log_data_access: {
        Args: { action_type: string; table_name: string; record_id?: string }
        Returns: undefined
      }
      sync_azure_user: {
        Args: { p_azure_id: string; p_email: string; p_display_name: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    },
  },
} as const
