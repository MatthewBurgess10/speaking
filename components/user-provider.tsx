"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAnonymousUser } from "@/hooks/use-anonymous-user"
import type { Profile } from "@/lib/supabase/types"

interface UserContextValue {
  profile: Profile | null
  profileId: string | null
  isLoading: boolean
  error: Error | null
  retry: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const userState = useAnonymousUser()

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
