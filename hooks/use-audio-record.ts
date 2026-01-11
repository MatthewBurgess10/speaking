"use client"

import { useState, useRef, useCallback } from "react"

interface UseAudioRecorderReturn {
  isRecording: boolean
  startRecording: () => Promise<void>
  stopRecording: () => Promise<Blob | null>
  error: Error | null
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = useCallback(async () => {
    setError(null)
    chunksRef.current = []

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4",
      })

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start(100) // Collect data every 100ms
      setIsRecording(true)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to access microphone"))
    }
  }, [])

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current
      if (!mediaRecorder || mediaRecorder.state === "inactive") {
        setIsRecording(false)
        resolve(null)
        return
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType })

        // Stop all tracks
        mediaRecorder.stream.getTracks().forEach((track) => track.stop())

        setIsRecording(false)
        mediaRecorderRef.current = null
        resolve(blob)
      }

      mediaRecorder.stop()
    })
  }, [])

  return {
    isRecording,
    startRecording,
    stopRecording,
    error,
  }
}
