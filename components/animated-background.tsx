"use client"

import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="animated-background js-only" aria-hidden="true">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
    </div>
  )
}
