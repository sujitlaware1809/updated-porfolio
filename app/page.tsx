import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sujit Laware | AI & Full Stack Engineer",
  description:
    "Portfolio of Sujit Laware, an AI and Full Stack Engineer specializing in Python, FastAPI, Next.js, PyTorch, AWS, and IoT-based ML systems.",
};


export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Blog />
      <Contact />
    </div>
  )
}
