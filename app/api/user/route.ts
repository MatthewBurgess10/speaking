import { NextResponse } from "next/server"
import { getOrCreateProfile } from "@/lib/user/server"
import { toErrorResponse } from "@/lib/user/errors"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId: profileId } = body

    if (!profileId || typeof profileId !== "string") {
      return NextResponse.json(
        { error: { message: "userId is required", code: "USER_CREATE_FAILED" } },
        { status: 400 },
      )
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(profileId)) {
      return NextResponse.json(
        { error: { message: "Invalid userId format", code: "USER_CREATE_FAILED" } },
        { status: 400 },
      )
    }

    const profile = await getOrCreateProfile(profileId)
    return NextResponse.json({ profile })
  } catch (error) {
    const errorResponse = toErrorResponse(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
