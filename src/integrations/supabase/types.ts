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
      ai_insights: {
        Row: {
          confidence: number | null
          content: string
          created_at: string
          id: string
          insight_type: string
          student_id: string
          visibility: Database["public"]["Enums"]["visibility"] | null
        }
        Insert: {
          confidence?: number | null
          content: string
          created_at?: string
          id?: string
          insight_type: string
          student_id: string
          visibility?: Database["public"]["Enums"]["visibility"] | null
        }
        Update: {
          confidence?: number | null
          content?: string
          created_at?: string
          id?: string
          insight_type?: string
          student_id?: string
          visibility?: Database["public"]["Enums"]["visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_insights_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          location: string | null
          status: string | null
          student_id: string
          syv_id: string
          time: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          location?: string | null
          status?: string | null
          student_id: string
          syv_id: string
          time: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          status?: string | null
          student_id?: string
          syv_id?: string
          time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_syv_id_fkey"
            columns: ["syv_id"]
            isOneToOne: false
            referencedRelation: "syv_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_history: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          student_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          student_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_history_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      discussion_questions: {
        Row: {
          created_at: string
          id: string
          question: string
          student_id: string | null
          syv_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          question: string
          student_id?: string | null
          syv_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          question?: string
          student_id?: string | null
          syv_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussion_questions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_questions_syv_id_fkey"
            columns: ["syv_id"]
            isOneToOne: false
            referencedRelation: "syv_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      educational_programs: {
        Row: {
          created_at: string
          kategori: string | null
          program_id: number
          program_namn: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          kategori?: string | null
          program_id: number
          program_namn: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          kategori?: string | null
          program_id?: number
          program_namn?: string
          updated_at?: string
        }
        Relationships: []
      }
      external_data_imports: {
        Row: {
          file_reference: string | null
          id: string
          import_date: string
          import_type: Database["public"]["Enums"]["import_type"]
          municipality_id: string | null
          notes: string | null
          source_system: string
          status: Database["public"]["Enums"]["import_status"] | null
        }
        Insert: {
          file_reference?: string | null
          id?: string
          import_date?: string
          import_type: Database["public"]["Enums"]["import_type"]
          municipality_id?: string | null
          notes?: string | null
          source_system: string
          status?: Database["public"]["Enums"]["import_status"] | null
        }
        Update: {
          file_reference?: string | null
          id?: string
          import_date?: string
          import_type?: Database["public"]["Enums"]["import_type"]
          municipality_id?: string | null
          notes?: string | null
          source_system?: string
          status?: Database["public"]["Enums"]["import_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "external_data_imports_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["municipalities_id"]
          },
        ]
      }
      external_student_map: {
        Row: {
          external_id: string
          id: string
          municipality_id: string
          student_id: string | null
        }
        Insert: {
          external_id: string
          id?: string
          municipality_id: string
          student_id?: string | null
        }
        Update: {
          external_id?: string
          id?: string
          municipality_id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_student_map_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["municipalities_id"]
          },
          {
            foreignKeyName: "external_student_map_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      external_syv_map: {
        Row: {
          external_id: string
          id: string
          municipality_id: string
          syv_id: string | null
        }
        Insert: {
          external_id: string
          id?: string
          municipality_id: string
          syv_id?: string | null
        }
        Update: {
          external_id?: string
          id?: string
          municipality_id?: string
          syv_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_syv_map_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipalities"
            referencedColumns: ["municipalities_id"]
          },
          {
            foreignKeyName: "external_syv_map_syv_id_fkey"
            columns: ["syv_id"]
            isOneToOne: false
            referencedRelation: "syv_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_schools: {
        Row: {
          created_at: string
          id: string
          program: string | null
          school_id: string | null
          school_name: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          program?: string | null
          school_id?: string | null
          school_name: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          program?: string | null
          school_id?: string | null
          school_name?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_schools_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_schools_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      important_dates: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          student_id: string | null
          syv_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          student_id?: string | null
          syv_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          student_id?: string | null
          syv_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "important_dates_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "important_dates_syv_id_fkey"
            columns: ["syv_id"]
            isOneToOne: false
            referencedRelation: "syv_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      municipalities: {
        Row: {
          contact_email: string | null
          created_at: string
          external_system: string | null
          municipalities_id: string
          name: string
          region_id: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          external_system?: string | null
          municipalities_id?: string
          name: string
          region_id?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          external_system?: string | null
          municipalities_id?: string
          name?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "municipalities_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_profiles: {
        Row: {
          contact_phone: string | null
          created_at: string
          id: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          contact_phone?: string | null
          created_at?: string
          id?: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          contact_phone?: string | null
          created_at?: string
          id?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_student_relationships: {
        Row: {
          created_at: string
          id: string
          parent_id: string
          relationship_type: string | null
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          parent_id: string
          relationship_type?: string | null
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          parent_id?: string
          relationship_type?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_student_relationships_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parent_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parent_student_relationships_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          language: string | null
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          language?: string | null
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          language?: string | null
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      program_inriktningar: {
        Row: {
          inriktning: string | null
          inriktningskod: string
          kategori: string | null
          program_id: number
          program_namn: string
        }
        Insert: {
          inriktning?: string | null
          inriktningskod: string
          kategori?: string | null
          program_id: number
          program_namn: string
        }
        Update: {
          inriktning?: string | null
          inriktningskod?: string
          kategori?: string | null
          program_id?: number
          program_namn?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_inriktningar_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "educational_programs"
            referencedColumns: ["program_id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          created_at: string
          id: string
          options: Json | null
          question_text: string
          question_type: string | null
          quiz_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          options?: Json | null
          question_text: string
          question_type?: string | null
          quiz_id: string
        }
        Update: {
          created_at?: string
          id?: string
          options?: Json | null
          question_text?: string
          question_type?: string | null
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_results: {
        Row: {
          answer: string | null
          confidence: number | null
          created_at: string
          id: string
          question_id: string
          quiz_id: string
          student_id: string
        }
        Insert: {
          answer?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          question_id: string
          quiz_id: string
          student_id: string
        }
        Update: {
          answer?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          question_id?: string
          quiz_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_results_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      saved_programs: {
        Row: {
          created_at: string
          id: string
          merit: string | null
          program_name: string
          school_name: string
          specialization: string | null
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          merit?: string | null
          program_name: string
          school_name: string
          specialization?: string | null
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          merit?: string | null
          program_name?: string
          school_name?: string
          specialization?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_programs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          contact_email: string | null
          created_at: string
          id: string
          municipalities_id: string | null
          name: string
          skol_enhets_kod: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          municipalities_id?: string | null
          name: string
          skol_enhets_kod?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          created_at?: string
          id?: string
          municipalities_id?: string | null
          name?: string
          skol_enhets_kod?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      schools_programs: {
        Row: {
          admission_score: number | null
          average_admission_score: number | null
          inriktningskod: string | null
          program_id: string
          program_name: string | null
          school_id: string
          school_name: string | null
        }
        Insert: {
          admission_score?: number | null
          average_admission_score?: number | null
          inriktningskod?: string | null
          program_id: string
          program_name?: string | null
          school_id: string
          school_name?: string | null
        }
        Update: {
          admission_score?: number | null
          average_admission_score?: number | null
          inriktningskod?: string | null
          program_id?: string
          program_name?: string | null
          school_id?: string
          school_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_school"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      student_documents: {
        Row: {
          created_at: string
          description: string | null
          file_url: string
          id: string
          student_id: string
          title: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_url: string
          id?: string
          student_id: string
          title?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          file_url?: string
          id?: string
          student_id?: string
          title?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_documents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_interests: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          interest: string
          source: Database["public"]["Enums"]["data_source"]
          student_id: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          interest: string
          source: Database["public"]["Enums"]["data_source"]
          student_id: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          interest?: string
          source?: Database["public"]["Enums"]["data_source"]
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_interests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_notes: {
        Row: {
          content: string
          created_at: string
          edited_by: string | null
          id: string
          student_id: string
          syv_id: string | null
          updated_at: string
          visibility: Database["public"]["Enums"]["visibility"] | null
        }
        Insert: {
          content: string
          created_at?: string
          edited_by?: string | null
          id?: string
          student_id: string
          syv_id?: string | null
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility"] | null
        }
        Update: {
          content?: string
          created_at?: string
          edited_by?: string | null
          id?: string
          student_id?: string
          syv_id?: string | null
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "student_notes_edited_by_fkey"
            columns: ["edited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_notes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_notes_syv_id_fkey"
            columns: ["syv_id"]
            isOneToOne: false
            referencedRelation: "syv_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          created_at: string
          grade: string | null
          id: string
          notes: string | null
          profile_id: string
          program: string | null
          quiz_completed: boolean | null
          school_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          grade?: string | null
          id?: string
          notes?: string | null
          profile_id: string
          program?: string | null
          quiz_completed?: boolean | null
          school_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          grade?: string | null
          id?: string
          notes?: string | null
          profile_id?: string
          program?: string | null
          quiz_completed?: boolean | null
          school_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          id: string
          stage: string
          student_id: string
          updated_at: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          stage: string
          student_id: string
          updated_at?: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          stage?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_reflections: {
        Row: {
          created_at: string
          id: string
          reflection: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reflection: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reflection?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_reflections_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_strengths: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          source: Database["public"]["Enums"]["data_source"]
          strength: string
          student_id: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          source: Database["public"]["Enums"]["data_source"]
          strength: string
          student_id: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          source?: Database["public"]["Enums"]["data_source"]
          strength?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_strengths_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_syv_assignments: {
        Row: {
          assigned_at: string
          id: string
          is_active: boolean | null
          notes: string | null
          student_id: string
          syv_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          student_id: string
          syv_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          student_id?: string
          syv_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_syv_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_syv_assignments_syv_id_fkey"
            columns: ["syv_id"]
            isOneToOne: false
            referencedRelation: "syv_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_values: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          source: Database["public"]["Enums"]["data_source"]
          student_id: string
          value: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          source: Database["public"]["Enums"]["data_source"]
          student_id: string
          value: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          source?: Database["public"]["Enums"]["data_source"]
          student_id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_values_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      syv_profiles: {
        Row: {
          bio: string | null
          contact_info: string | null
          created_at: string
          id: string
          profile_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          contact_info?: string | null
          created_at?: string
          id?: string
          profile_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          contact_info?: string | null
          created_at?: string
          id?: string
          profile_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "syv_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      syv_school_assignments: {
        Row: {
          assigned_at: string
          id: string
          is_active: boolean | null
          notes: string | null
          school_id: string
          syv_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          school_id: string
          syv_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          school_id?: string
          syv_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "syv_school_assignments_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "syv_school_assignments_syv_id_fkey"
            columns: ["syv_id"]
            isOneToOne: false
            referencedRelation: "syv_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          id: string
          profile_id: string
          role: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          assigned_at?: string
          id?: string
          profile_id: string
          role: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          assigned_at?: string
          id?: string
          profile_id?: string
          role?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_roles: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_type"][]
      }
      get_student_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_syv_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: { role_to_check: Database["public"]["Enums"]["user_type"] }
        Returns: boolean
      }
    }
    Enums: {
      data_source: "quiz" | "chat" | "syv" | "manual" | "import"
      import_status: "pending" | "processed" | "failed"
      import_type: "student" | "syv" | "school"
      user_type: "student" | "syv" | "parent" | "admin"
      visibility: "private" | "syv" | "parent" | "public"
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
      data_source: ["quiz", "chat", "syv", "manual", "import"],
      import_status: ["pending", "processed", "failed"],
      import_type: ["student", "syv", "school"],
      user_type: ["student", "syv", "parent", "admin"],
      visibility: ["private", "syv", "parent", "public"],
    },
  },
} as const
