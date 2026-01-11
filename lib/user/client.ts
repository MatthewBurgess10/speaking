import { ANON_USER_KEY } from "./constants"
import { UserError } from "./errors"

/**
 * Check if localStorage is available
 */
function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * Generate a UUID v4
 */
function generateUUID(): string {
  return crypto.randomUUID()
}

/**
 * Get the anonymous user ID from localStorage
 * Returns null if not found
 */
export function getStoredUserId(): string | null {
  if (!isStorageAvailable()) {
    return null
  }
  return localStorage.getItem(ANON_USER_KEY)
}

/**
 * Store the anonymous user ID in localStorage
 */
export function setStoredUserId(userId: string): void {
  if (!isStorageAvailable()) {
    throw new UserError("localStorage is not available", "STORAGE_UNAVAILABLE")
  }
  localStorage.setItem(ANON_USER_KEY, userId)
}

/**
 * Get or generate anonymous user ID
 * Generates new UUID if none exists
 */
export function getOrCreateLocalUserId(): string {
  const existingId = getStoredUserId()
  if (existingId) {
    return existingId
  }

  const newId = generateUUID()
  setStoredUserId(newId)
  return newId
}

/**
 * Clear the stored user ID (for logout/reset)
 */
export function clearStoredUserId(): void {
  if (isStorageAvailable()) {
    localStorage.removeItem(ANON_USER_KEY)
  }
}
