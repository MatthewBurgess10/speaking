import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { RulesDefinition } from "@/lib/speaking-structures"
import { Database } from "@/lib/supabase/types"


export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: structures, error } = await supabase.from("speaking_structures").select("*").eq("is_active", true).overrideTypes<Database["public"]["Tables"]["speaking_structures"]["Row"][]>()

    if (error) {
      return NextResponse.json({ error: { message: "Failed to fetch structures", code: "DB_ERROR" } }, { status: 500 })
    }
    
    if (!structures || structures.length === 0) {
      return NextResponse.json(
        { error: { message: "No structures available", code: "NO_STRUCTURES" } },
        { status: 404 },
      )
    }

    // Select random structure
    const randomIndex = Math.floor(Math.random() * structures.length)
    const structure = structures[randomIndex]

    // 🔒 TRUST IS DECLARED HERE — ONCE
    return NextResponse.json({
      structure: {
        ...structure,
        rules_definition: structure.rules_definition as RulesDefinition,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: { message: "Internal server error", code: "UNKNOWN" } }, { status: 500 })
  }
}
