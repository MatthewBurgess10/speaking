"use client"

import { cn } from "@/lib/utils"

interface TimeSelectorProps {
  options: number[]
  selected: number
  onSelect: (seconds: number) => void
  disabled?: boolean
}

export function TimeSelector({ options, selected, onSelect, disabled }: TimeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      {options.map((seconds) => (
        <button
          key={seconds}
          onClick={() => onSelect(seconds)}
          disabled={disabled}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            selected === seconds
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {seconds}s
        </button>
      ))}
    </div>
  )
}
