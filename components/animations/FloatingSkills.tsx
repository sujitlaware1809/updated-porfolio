"use client"

import { motion } from "framer-motion"
import { Badge } from "../ui/badge"

const skills = [
  "Python",
  "Machine Learning",
  "Cloud Computing",
  "Deep Learning",
  "IoT",
  "React",
  "Next.js",
  "Data Science",
]

export const FloatingSkills = () => {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.3,
            scale: 1,
            x: Math.cos(index * (Math.PI * 2) / skills.length) * 150,
            y: Math.sin(index * (Math.PI * 2) / skills.length) * 150,
          }}
          transition={{
            duration: 2,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Badge variant="outline" className="text-xs">
            {skill}
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}