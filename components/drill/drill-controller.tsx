"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Countdown } from "./countdown"
import { TimerDisplay } from "./timer-display"
import { PromptDisplay } from "./prompt-display"
import { TimeSelector } from "./time-selector"
import { useAudioRecorder } from "@/hooks/use-audio-record"
import { Button } from "@/components/ui/button"
import type { SpeakingStructureWithRules } from "@/lib/speaking-structures"

type DrillPhase = "setup" | "countdown" | "recording" | "complete"

const TIME_OPTIONS = [30, 60, 90, 120]

export function DrillController() {
  const [phase, setPhase] = useState<DrillPhase>("setup")
  const [structure, setStructure] = useState<SpeakingStructureWithRules | null>(null)
  // set basic start time.
  const [selectedTime, setSelectedTime] = useState(60)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isLoadingStructure, setIsLoadingStructure] = useState(false)
  const [structureError, setStructureError] = useState<string | null>(null)

  const { startRecording, stopRecording, error: recorderError } = useAudioRecorder()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const fetchRandomStructure = useCallback(async () => {
    setIsLoadingStructure(true)
    setStructureError(null)

    try {
        //access the API which fetches the structure.
      const response = await fetch("/api/structures/random")
      //no data returned error block
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error?.message || "Failed to fetch structure")
      }
      // set the structure
      const { structure: newStructure } = await response.json()
      setStructure(newStructure)
      console.log("Fetched new structure:", newStructure)
    } catch (err) { // catch any error in the entire fetch process
      setStructureError(err instanceof Error ? err.message : "Failed to load structure")
    } finally {
      setIsLoadingStructure(false)
    }
  }, [])

  useEffect(() => {
    fetchRandomStructure()
  }, [fetchRandomStructure])

  //testing.
  if (!structure) {
    console.log("No structure found")
  } else {
    console.log(structure.rules_definition)
  }

  const startDrill = useCallback(() => {
    if (!structure) return
    setPhase("countdown")
  }, [structure])

  const handleCountdownComplete = useCallback(async () => {
    setPhase("recording")
    setElapsedMs(0)
    startTimeRef.current = Date.now()

    await startRecording()

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      setElapsedMs(elapsed)

      if (elapsed >= selectedTime * 1000) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        stopRecording()
        setPhase("complete")
      }
    }, 50)
  }, [selectedTime, startRecording, stopRecording])

  const resetDrill = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setPhase("setup")
    setElapsedMs(0)
    fetchRandomStructure()
  }, [fetchRandomStructure])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const error = structureError || recorderError?.message

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
      {error && <div className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-md">{error}</div>}

      {phase === "setup" && (
        <>
          {structure && (
            <PromptDisplay
              name={structure.name}
              description={structure.description}
              rulesDefinition={structure.rules_definition}
            />
          )}

          {isLoadingStructure && <p className="text-sm text-muted-foreground">Loading structure...</p>}

          <div className="flex flex-col items-center gap-4 mt-4">
            <label className="text-sm text-muted-foreground">Duration</label>
            <TimeSelector
              options={TIME_OPTIONS}
              selected={selectedTime}
              onSelect={setSelectedTime}
              disabled={isLoadingStructure}
            />
          </div>

          <Button onClick={startDrill} disabled={!structure || isLoadingStructure} size="lg" className="mt-4">
            Start Drill
          </Button>
        </>
      )}

      {phase === "countdown" && <Countdown seconds={3} onComplete={handleCountdownComplete} />}

      {phase === "recording" && (
        <>
          {structure && (
            <PromptDisplay
              name={structure.name}
              description={structure.description}
              rulesDefinition={structure.rules_definition}
            />
          )}
          <TimerDisplay elapsedMs={elapsedMs} totalMs={selectedTime * 1000} />
        </>
      )}

      {phase === "complete" && (
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Complete</h2>
            <p className="text-muted-foreground mt-1">Recording finished at {selectedTime} seconds</p>
          </div>
          <Button onClick={resetDrill} variant="secondary">
            New Drill
          </Button>
        </div>
      )}
    </div>
  )
}
