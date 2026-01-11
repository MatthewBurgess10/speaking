import { DrillController } from "@/components/drill/drill-controller"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Drill",
  description: "Practice your responses with timed drills",
}

export default function DrillPage() {
  return (
    <main className="container max-w-3xl mx-auto py-12">
      <header className="text-center mb-12">
        <h1>Drill</h1>
        <p className="text-muted-foreground mt-2">Timed response practice</p>
      </header>

      <DrillController />
    </main>
  )
}
