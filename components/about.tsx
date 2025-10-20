import { Card, CardContent } from "@/components/ui/card"
import { Code2, Globe, Server, Users } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "AI Solutions",
      description: "Expertise in building advanced AI systems with LLMs, Agent-based architectures, and Generative AI for enterprise applications",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "IoT Solutions",
      description: "Developing scalable IoT platforms with real-time data processing, edge computing, and smart device integration",
    },
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: "Full Stack Development",
      description: "Expertise in JavaScript, TypeScript, React.js, Node.js, and Laravel",
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "Cloud Solutions",
      description: "Proficient with AWS services including SQS, EventBridge, Lambda, and Step Functions",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Team Leadership",
      description: "Led diverse teams of 15+ members across development, design, DevOps, and QA",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global Collaboration",
      description: "Coordinated with remote teams across the US, France, and UAE",
    },
  ]

  return (
    <div className="w-full bg-muted/30">
      <section id="about" className="py-20 w-full">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hello | नमस्कार | नमस्ते | Vanakkam
                <br />
                Innovative AI & Cloud Engineer with hands-on experience in developing end-to-end intelligent systems, IoT-driven solutions, and full-stack web platforms.
              </p>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Skilled in Python, FastAPI, Next.js, AWS, and machine learning frameworks including PyTorch and TensorFlow. Proven track record of deploying scalable, production-grade ML and cloud applications through internships and research at IIT Madras, RuTAG, and Runverve. Demonstrated leadership as Technical Lead at Zeex AI and President of AWS Cloud Club IIT Madras, mentoring peers and managing large-scale technical events. Passionate about building impactful AI systems that bridge research and real-world applications in agriculture, healthcare, and education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="animate-in">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
