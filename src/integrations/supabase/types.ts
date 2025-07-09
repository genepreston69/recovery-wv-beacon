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
      intakes: {
        Row: {
          address: string | null
          allergies: string[] | null
          children_custody: string | null
          city: string | null
          completed_steps: number[] | null
          court_dates: string[] | null
          created_at: string
          current_legal_issues: string | null
          current_living_situation: string | null
          current_medications: string[] | null
          current_mental_health_treatment: string | null
          custody_details: string | null
          date_of_birth: string | null
          dependent_details: string | null
          dependents: number | null
          detox_needed: string | null
          disability_details: string | null
          disability_status: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          facility: string
          family_contact_person: string | null
          family_contact_phone: string | null
          family_substance_abuse_history: string | null
          family_support: string | null
          first_name: string | null
          form_status: string | null
          frequency_of_use: string | null
          hospitalization_details: string | null
          housing_history: string | null
          housing_stability: string | null
          id: string
          last_name: string | null
          last_use_date: string | null
          legal_details: string | null
          medical_conditions: string[] | null
          medication_allergies: string[] | null
          medication_compliance: string | null
          mental_health_conditions: string[] | null
          mental_health_history: string | null
          mental_health_provider: string | null
          pending_charges: string | null
          phone_number: string | null
          prescription_medications: Json | null
          previous_leaving_reason: string | null
          previous_residency_date: string | null
          previous_resident: string | null
          previous_treatment: string | null
          previous_treatment_details: string | null
          primary_substance: string | null
          probation_officer_contact: string | null
          probation_officer_name: string | null
          probation_parole: string | null
          recent_hospitalizations: string | null
          referral_date: string | null
          referral_other_source: string | null
          referral_source: string | null
          sex_offender: string | null
          signature_data: string | null
          signature_date: string | null
          social_security: string | null
          state: string | null
          submitted_at: string | null
          substances_used: string[] | null
          suicide_details: string | null
          suicide_history: string | null
          trauma_details: string | null
          trauma_history: string | null
          updated_at: string
          user_id: string | null
          violent_crime: string | null
          violent_crime_details: string | null
          withdrawal_history: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          children_custody?: string | null
          city?: string | null
          completed_steps?: number[] | null
          court_dates?: string[] | null
          created_at?: string
          current_legal_issues?: string | null
          current_living_situation?: string | null
          current_medications?: string[] | null
          current_mental_health_treatment?: string | null
          custody_details?: string | null
          date_of_birth?: string | null
          dependent_details?: string | null
          dependents?: number | null
          detox_needed?: string | null
          disability_details?: string | null
          disability_status?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          facility: string
          family_contact_person?: string | null
          family_contact_phone?: string | null
          family_substance_abuse_history?: string | null
          family_support?: string | null
          first_name?: string | null
          form_status?: string | null
          frequency_of_use?: string | null
          hospitalization_details?: string | null
          housing_history?: string | null
          housing_stability?: string | null
          id?: string
          last_name?: string | null
          last_use_date?: string | null
          legal_details?: string | null
          medical_conditions?: string[] | null
          medication_allergies?: string[] | null
          medication_compliance?: string | null
          mental_health_conditions?: string[] | null
          mental_health_history?: string | null
          mental_health_provider?: string | null
          pending_charges?: string | null
          phone_number?: string | null
          prescription_medications?: Json | null
          previous_leaving_reason?: string | null
          previous_residency_date?: string | null
          previous_resident?: string | null
          previous_treatment?: string | null
          previous_treatment_details?: string | null
          primary_substance?: string | null
          probation_officer_contact?: string | null
          probation_officer_name?: string | null
          probation_parole?: string | null
          recent_hospitalizations?: string | null
          referral_date?: string | null
          referral_other_source?: string | null
          referral_source?: string | null
          sex_offender?: string | null
          signature_data?: string | null
          signature_date?: string | null
          social_security?: string | null
          state?: string | null
          submitted_at?: string | null
          substances_used?: string[] | null
          suicide_details?: string | null
          suicide_history?: string | null
          trauma_details?: string | null
          trauma_history?: string | null
          updated_at?: string
          user_id?: string | null
          violent_crime?: string | null
          violent_crime_details?: string | null
          withdrawal_history?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          children_custody?: string | null
          city?: string | null
          completed_steps?: number[] | null
          court_dates?: string[] | null
          created_at?: string
          current_legal_issues?: string | null
          current_living_situation?: string | null
          current_medications?: string[] | null
          current_mental_health_treatment?: string | null
          custody_details?: string | null
          date_of_birth?: string | null
          dependent_details?: string | null
          dependents?: number | null
          detox_needed?: string | null
          disability_details?: string | null
          disability_status?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          facility?: string
          family_contact_person?: string | null
          family_contact_phone?: string | null
          family_substance_abuse_history?: string | null
          family_support?: string | null
          first_name?: string | null
          form_status?: string | null
          frequency_of_use?: string | null
          hospitalization_details?: string | null
          housing_history?: string | null
          housing_stability?: string | null
          id?: string
          last_name?: string | null
          last_use_date?: string | null
          legal_details?: string | null
          medical_conditions?: string[] | null
          medication_allergies?: string[] | null
          medication_compliance?: string | null
          mental_health_conditions?: string[] | null
          mental_health_history?: string | null
          mental_health_provider?: string | null
          pending_charges?: string | null
          phone_number?: string | null
          prescription_medications?: Json | null
          previous_leaving_reason?: string | null
          previous_residency_date?: string | null
          previous_resident?: string | null
          previous_treatment?: string | null
          previous_treatment_details?: string | null
          primary_substance?: string | null
          probation_officer_contact?: string | null
          probation_officer_name?: string | null
          probation_parole?: string | null
          recent_hospitalizations?: string | null
          referral_date?: string | null
          referral_other_source?: string | null
          referral_source?: string | null
          sex_offender?: string | null
          signature_data?: string | null
          signature_date?: string | null
          social_security?: string | null
          state?: string | null
          submitted_at?: string | null
          substances_used?: string[] | null
          suicide_details?: string | null
          suicide_history?: string | null
          trauma_details?: string | null
          trauma_history?: string | null
          updated_at?: string
          user_id?: string | null
          violent_crime?: string | null
          violent_crime_details?: string | null
          withdrawal_history?: string | null
          zip_code?: string | null
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
          created_at: string | null
          email: string
          id: string
          profile: Json | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          profile?: Json | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          profile?: Json | null
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
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
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
