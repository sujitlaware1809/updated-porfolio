"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpCircle, Download, Github, Linkedin, Mail, Youtube, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { AnimatedBackground } from "./animations/AnimatedBackground"
import { FloatingSkills } from "./animations/FloatingSkills"
import { TypedText } from "./animations/TypedText"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export default function Hero() {
  const socialButtons = [
    { icon: Github, href: "https://github.com/sujitlaware1809", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sujit-laware", label: "LinkedIn" },
    { icon: Mail, href: "mailto:22f3002016@ds.study.iitm.ac.in", label: "Email" },
    { icon: Youtube, href: "https://youtube.com/@sujitlaware", label: "YouTube" },
    { icon: Instagram, href: "https://instagram.com/sujit.bytes", label: "Instagram" },
  ]

  return (
    <section id="home" className="relative py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
      <AnimatedBackground />
      <FloatingSkills />
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            Open to Internship & Freelancing Opportunities
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl block text-muted-foreground">
  
              </span>
             Hi, I&apos;m <span className="gradient-text">Sujit Laware</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
              <span className="js-only">
                <TypedText />
              </span>
              <noscript>
                <span>AI/ML Engineer | Data Scientist | Full Stack Developer | Cloud Engineer</span>
              </noscript>
            </p>
          </div>
          <div className="max-w-[700px] text-muted-foreground">
            <p className="text-lg">Building Scalable Applications in AI, Cloud, & IoT</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="rounded-full group relative overflow-hidden">
                <Link href="#contact" className="relative z-10">
                  <motion.span
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Get In Touch
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg" className="rounded-full group">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="relative z-10">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" /> 
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex gap-4 mt-6"
          >
            <TooltipProvider>
              {socialButtons.map(({ icon: Icon, href, label }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="ghost" size="icon" asChild className="hover:text-primary transition-colors">
                        <Link href={href} target="_blank" rel="noopener noreferrer">
                          <Icon className="h-5 w-5" />
                          <span className="sr-only">{label}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block js-only">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <ArrowUpCircle className="h-10 w-10 text-primary animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  )
}
