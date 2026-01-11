"use client"

interface TimerDisplayProps {
  elapsedMs: number
  totalMs: number
}

export function TimerDisplay({ elapsedMs, totalMs }: TimerDisplayProps) {
  const remainingMs = Math.max(0, totalMs - elapsedMs)
  const remainingSec = Math.ceil(remainingMs / 1000)
  const progress = Math.min(100, (elapsedMs / totalMs) * 100)

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="text-6xl font-semibold tabular-nums tracking-tight">{formatTime(remainingMs)}</div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-muted-foreground">{remainingSec > 0 ? "Recording" : "Complete"}</p>
    </div>
  )
}
