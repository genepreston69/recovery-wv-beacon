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
      book_chapters: {
        Row: {
          chapter_key: string
          chapter_number: number | null
          content: string
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          chapter_key: string
          chapter_number?: number | null
          content: string
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          chapter_key?: string
          chapter_number?: number | null
          content?: string
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      note_categories: {
        Row: {
          category_name: string
          color: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          category_name: string
          color?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          category_name?: string
          color?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      note_tags: {
        Row: {
          created_at: string
          id: string
          note_id: string | null
          tag_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          note_id?: string | null
          tag_name: string
        }
        Update: {
          created_at?: string
          id?: string
          note_id?: string | null
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_tags_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "user_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_progress: {
        Row: {
          chapter_key: string
          id: string
          last_read_at: string | null
          progress_percentage: number | null
          user_id: string | null
        }
        Insert: {
          chapter_key: string
          id?: string
          last_read_at?: string | null
          progress_percentage?: number | null
          user_id?: string | null
        }
        Update: {
          chapter_key?: string
          id?: string
          last_read_at?: string | null
          progress_percentage?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_statistics: {
        Row: {
          chapters_completed: number | null
          highlights_made: number | null
          id: string
          last_updated: string
          notes_created: number | null
          total_reading_time: number | null
          user_id: string
        }
        Insert: {
          chapters_completed?: number | null
          highlights_made?: number | null
          id?: string
          last_updated?: string
          notes_created?: number | null
          total_reading_time?: number | null
          user_id: string
        }
        Update: {
          chapters_completed?: number | null
          highlights_made?: number | null
          id?: string
          last_updated?: string
          notes_created?: number | null
          total_reading_time?: number | null
          user_id?: string
        }
        Relationships: []
      }
      reading_streaks: {
        Row: {
          created_at: string
          id: string
          last_read_date: string | null
          longest_streak: number | null
          streak_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_read_date?: string | null
          longest_streak?: number | null
          streak_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_read_date?: string | null
          longest_streak?: number | null
          streak_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      table_of_contents: {
        Row: {
          chapter_key: string
          created_at: string
          id: string
          page_number: number | null
          section_title: string
          subsection_order: number | null
        }
        Insert: {
          chapter_key: string
          created_at?: string
          id?: string
          page_number?: number | null
          section_title: string
          subsection_order?: number | null
        }
        Update: {
          chapter_key?: string
          created_at?: string
          id?: string
          page_number?: number | null
          section_title?: string
          subsection_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "table_of_contents_chapter_key_fkey"
            columns: ["chapter_key"]
            isOneToOne: false
            referencedRelation: "book_chapters"
            referencedColumns: ["chapter_key"]
          },
        ]
      }
      user_bookmarks: {
        Row: {
          bookmark_name: string | null
          chapter_key: string
          created_at: string
          id: string
          position_text: string | null
          user_id: string
        }
        Insert: {
          bookmark_name?: string | null
          chapter_key: string
          created_at?: string
          id?: string
          position_text?: string | null
          user_id: string
        }
        Update: {
          bookmark_name?: string | null
          chapter_key?: string
          created_at?: string
          id?: string
          position_text?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_highlights: {
        Row: {
          chapter_key: string
          color: string | null
          created_at: string | null
          end_position: number | null
          highlighted_text: string
          id: string
          start_position: number | null
          user_id: string | null
        }
        Insert: {
          chapter_key: string
          color?: string | null
          created_at?: string | null
          end_position?: number | null
          highlighted_text: string
          id?: string
          start_position?: number | null
          user_id?: string | null
        }
        Update: {
          chapter_key?: string
          color?: string | null
          created_at?: string | null
          end_position?: number | null
          highlighted_text?: string
          id?: string
          start_position?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_highlights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notes: {
        Row: {
          category_id: string | null
          chapter_key: string
          created_at: string | null
          id: string
          is_private: boolean | null
          note_text: string
          position_context: string | null
          selected_text: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          chapter_key: string
          created_at?: string | null
          id?: string
          is_private?: boolean | null
          note_text: string
          position_context?: string | null
          selected_text?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          chapter_key?: string
          created_at?: string | null
          id?: string
          is_private?: boolean | null
          note_text?: string
          position_context?: string | null
          selected_text?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "note_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
