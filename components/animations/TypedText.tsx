"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

export const TypedText = () => {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "AI/ML Engineer",
        "Cloud Developer",
        "Data Scientist",
        "Full Stack Developer",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      backDelay: 1000,
    })

    return () => typed.destroy()
  }, [])

  return <span ref={el} className="text-primary"></span>
}