"use client"

import type { Json } from "@/lib/supabase/types"
import type { RulesDefinition } from "@/lib/speaking-structures"

interface PromptDisplayProps {
  name: string
  description?: string | null
  rulesDefinition?: RulesDefinition
}

export function PromptDisplay({ name, description, rulesDefinition }: PromptDisplayProps) {
  return (
    <div className="flex flex-col gap-3 text-center max-w-2xl">
      <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>

      {description && <p className="text-base text-muted-foreground leading-relaxed text-balance">{description}</p>}

      {/* {rulesDefinition && typeof rulesDefinition === "object" && (
        <div className="text-sm text-muted-foreground/80 mt-2">
          <span className="uppercase tracking-widest text-xs">Structure Rules</span>
        </div>
      )} */}
      {rulesDefinition && (
        <div className="mt-4 space-y-4 text-left">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">
            Structure
          </span>

          <div className="space-y-2">
            {rulesDefinition.sections.map((section) => (
              <div key={section.id} className="rounded-md border p-3">
                <div className="font-medium">{section.label}</div>
                <div className="text-sm text-muted-foreground">
                  {section.requirement}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Evaluation Criteria
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {rulesDefinition.evaluation_criteria.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
