"use client"

import type React from "react"

// This is now a no-op wrapper reserved for true client-only contexts if needed later.
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
