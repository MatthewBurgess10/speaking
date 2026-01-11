import type React from "react"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border h-14 flex items-center px-6">
        <span className="font-medium">Dashboard</span>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
