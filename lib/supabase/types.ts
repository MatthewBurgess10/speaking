// Generated types from Supabase CLI: npx supabase gen types typescript
// Adapted to match the actual database schema

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"


export type AttemptStatus = "queued" | "processing" | "completed" | "failed"

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          auth_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      speaking_structures: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          rules_definition: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          rules_definition: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          rules_definition?: Json
          is_active?: boolean
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          profile_id: string
          stripe_customer_id: string
          stripe_subscription_id: string | null
          status: SubscriptionStatus
          price_id: string | null
          quantity: number | null
          cancel_at_period_end: boolean
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          stripe_customer_id: string
          stripe_subscription_id?: string | null
          status: SubscriptionStatus
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean
          current_period_start: string
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string | null
          status?: SubscriptionStatus
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
      attempts: {
        Row: {
          id: string
          profile_id: string
          structure_id: string
          status: AttemptStatus
          transcript: string | null
          evaluation: Json | null
          duration_seconds: number | null
          error_log: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          profile_id: string
          structure_id: string
          status?: AttemptStatus
          transcript?: string | null
          evaluation?: Json | null
          duration_seconds?: number | null
          error_log?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string
          structure_id?: string
          status?: AttemptStatus
          transcript?: string | null
          evaluation?: Json | null
          duration_seconds?: number | null
          error_log?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      audio_assets: {
        Row: {
          id: string
          attempt_id: string
          storage_path: string
          file_size_bytes: number | null
          mime_type: string | null
          retention_until: string | null
          created_at: string
        }
        Insert: {
          id?: string
          attempt_id: string
          storage_path: string
          file_size_bytes?: number | null
          mime_type?: string | null
          retention_until?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          attempt_id?: string
          storage_path?: string
          file_size_bytes?: number | null
          mime_type?: string | null
          retention_until?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_status: SubscriptionStatus
      attempt_status: AttemptStatus
    }
  }
}

// Convenience type aliases
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type SpeakingStructure = Database["public"]["Tables"]["speaking_structures"]["Row"]
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"]
export type Attempt = Database["public"]["Tables"]["attempts"]["Row"]
export type AudioAsset = Database["public"]["Tables"]["audio_assets"]["Row"]


