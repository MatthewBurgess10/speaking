"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  seconds: number
  onComplete: () => void
}

export function Countdown({ seconds, onComplete }: CountdownProps) {
  const [count, setCount] = useState(seconds)

  useEffect(() => {
    if (count <= 0) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-muted-foreground uppercase tracking-widest">Get ready</p>
      <div className="text-8xl font-semibold tabular-nums">{count}</div>
    </div>
  )
}
