import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import OpenSource from "./open-source"

export default function Projects() {
  const projects = [
    {
      title: "FinsightAI",
      description:
        "A modular multi-agent financial assistant using Google ADK and Gemini LLMs to deliver personalized financial insights from real-time FI MCP data. Selected for the final round of the world's largest Agentic AI Hackathon 2025 by Google.",
      tags: ["Python", "Google ADK", "Gemini LLM", "Vertex AI", "Flask", "Vue.js", "GCP"],
      codeLink: "https://github.com/sujitlaware1809/finsight-ai",
      liveLink: "https://finsight-ai.demo.com",
    },
    {
      title: "Smart Crop Health Monitoring",
      description:
        "Built an IoT + ML system to monitor crop health using sensor data and computer vision for early disease detection. Deployed CNN model on Raspberry Pi achieving 92% accuracy in real-time crop condition classification.",
      tags: ["Python", "PyTorch", "OpenCV", "Raspberry Pi", "IoT", "AWS", "Next.js", "FastAPI"],
      codeLink: "https://github.com/sujitlaware1809/smart-crop-health",
      liveLink: "https://smart-crop-health.demo.com",
    },
    {
      title: "Architecture Academics Platform",
      description:
        "Full-stack web platform for architecture students and professionals, offering courses, jobs, competitions, workshops, publications, and discussion forums. Implemented ML models for personalized recommendations.",
      tags: ["Next.js", "FastAPI", "AWS", "Docker", "Python", "TensorFlow"],
      codeLink: "https://github.com/sujitlaware1809/arch-academics",
      liveLink: "https://arch-academics.com",
    }
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my personal and professional projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="project-content flex-1 flex flex-col p-5">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 flex-1">{project.description}</p>
                    <div className="project-tags mt-3">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links mt-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.codeLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1 h-4 w-4" /> Code
                        </Link>
                      </Button>
                      {project.liveLink && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 h-4 w-4" /> Live
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Include Open Source section directly under Projects */}
          <div className="mt-20">
            <OpenSource />
          </div>
        </div>
      </div>
    </section>
  )
}
