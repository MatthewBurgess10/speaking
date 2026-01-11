// lib/user/attempts.ts
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export async function uploadDrillAttempt({
  blob,
  profileId,
  structureId,
  duration
}: {
  blob: Blob
  profileId: string
  structureId: string
  duration: number
}) {
  const supabase = getSupabaseBrowserClient()
  const fileName = `${profileId}/${Date.now()}.webm`
  
  // 1. Upload to Private Storage
  const { data: storageData, error: storageError } = await supabase.storage
    .from("recordings")
    .upload(fileName, blob, {
      contentType: "audio/webm",
      cacheControl: "3600",
      upsert: false,
    })

  if (storageError) throw storageError

  // 2. Log entry in the attempts table
  const { error: dbError } = await supabase.from("attempts").insert({
    profile_id: profileId,
    structure_id: structureId,
    storage_path: storageData.path,
    duration_seconds: duration,
  })

  if (dbError) throw dbError
  
  return storageData.path
}