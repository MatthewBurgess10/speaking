import type { SpeakingStructure } from "@/lib/supabase/types"

// This file describes what YOUR APP expects,
// not what the database allows.

export type RulesDefinition = {
  sections: {
    id: string
    label: string
    requirement: string
  }[]
  evaluation_criteria: string[]
  target_duration_seconds: number
}


export type SpeakingStructureWithRules = Omit<
  SpeakingStructure,
  "rules_definition"
> & {
  rules_definition: RulesDefinition
}
