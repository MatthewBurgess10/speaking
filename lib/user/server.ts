import { getSupabaseServerClient } from "@/lib/supabase/server"
import { UserError } from "./errors"
import type { Profile } from "@/lib/supabase/types"

/**
 * Get profile by their anonymous ID
 */
export async function getProfileById(profileId: string): Promise<Profile | null> {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from("profiles").select("*").eq("id", profileId).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new UserError("Failed to fetch profile", "DB_CONNECTION_FAILED", error)
    }

    return data
  } catch (error) {
    if (error instanceof UserError) throw error
    throw new UserError("Failed to fetch profile", "DB_CONNECTION_FAILED", error)
  }
}

/**
 * Create a new anonymous profile with a specific ID
 */
export async function createProfile(profileId: string): Promise<Profile> {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from("profiles").insert({ id: profileId, auth_id: null }).select().single()

    if (error) {
      throw new UserError("Failed to create profile", "USER_CREATE_FAILED", error)
    }

    return data
  } catch (error) {
    if (error instanceof UserError) throw error
    throw new UserError("Failed to create profile", "USER_CREATE_FAILED", error)
  }
}

/**
 * Get or create profile - ensures profile exists in database
 */
export async function getOrCreateProfile(profileId: string): Promise<Profile> {
  const existingProfile = await getProfileById(profileId)
  if (existingProfile) {
    return existingProfile
  }
  return createProfile(profileId)
}

/**
 * Link anonymous profile to authenticated account
 */
export async function linkProfileToAuth(profileId: string, authId: string): Promise<Profile> {
  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from("profiles")
      .update({ auth_id: authId, updated_at: new Date().toISOString() })
      .eq("id", profileId)
      .select()
      .single()

    if (error) {
      throw new UserError("Failed to link profile", "USER_CREATE_FAILED", error)
    }

    return data
  } catch (error) {
    if (error instanceof UserError) throw error
    throw new UserError("Failed to link profile", "USER_CREATE_FAILED", error)
  }
}
