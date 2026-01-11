// Error types for user operations
export class UserError extends Error {
  constructor(
    message: string,
    public code: UserErrorCode,
    public cause?: unknown,
  ) {
    super(message)
    this.name = "UserError"
  }
}

export type UserErrorCode =
  | "STORAGE_UNAVAILABLE"
  | "DB_CONNECTION_FAILED"
  | "USER_NOT_FOUND"
  | "USER_CREATE_FAILED"
  | "UNKNOWN"

export function isUserError(error: unknown): error is UserError {
  return error instanceof UserError
}

// Structured error response for API routes
export interface UserErrorResponse {
  error: {
    message: string
    code: UserErrorCode
  }
}

export function toErrorResponse(error: unknown): UserErrorResponse {
  if (isUserError(error)) {
    return {
      error: {
        message: error.message,
        code: error.code,
      },
    }
  }
  return {
    error: {
      message: "An unexpected error occurred",
      code: "UNKNOWN",
    },
  }
}
