"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #1a1a1a 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #1a1a1a 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #1a1a1a 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute h-56 w-56 rounded-full bg-primary/30 blur-3xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "spring", damping: 10, stiffness: 50 }}
      />
    </div>
  )
}