import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: {
    default: "SaaS App",
    template: "%s | SaaS App",
  },
  description: "Production SaaS application",
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
