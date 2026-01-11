"use client"

import { useEffect, useState, useCallback } from "react"
import { getOrCreateLocalUserId, getStoredUserId } from "@/lib/user/client"
import type { Profile } from "@/lib/supabase/types"

interface UseAnonymousUserReturn {
  profile: Profile | null
  profileId: string | null
  isLoading: boolean
  error: Error | null
  retry: () => void
}

export function useAnonymousUser(): UseAnonymousUserReturn {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileId, setProfileId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const initProfile = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const localId = getOrCreateLocalUserId()
      setProfileId(localId)

      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: localId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Failed to sync profile")
      }

      const { profile: dbProfile } = await response.json()
      setProfile(dbProfile)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
      const storedId = getStoredUserId()
      if (storedId) {
        setProfileId(storedId)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    initProfile()
  }, [initProfile])

  return {
    profile,
    profileId,
    isLoading,
    error,
    retry: initProfile,
  }
}
