import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Skills from "./skills-content"

export default function Experience() {
  const experiences = [
    {
      title: "Research Intern (AI & IOT)",
      company: "RuTAG (Rural Technology Action Group), IIT Madras",
      period: "May 2025 - Present",
      location: "Chennai, India",
      achievements: [
        "Designed and implemented a smart heat pump dryer controller using IoT sensors for real-time monitoring, control and automation of drying operations",
        "Filed a provisional patent for the developed smart heat pump dryer system",
        "Developed computer vision models to classify cardamom quality and estimate moisture content with 95% accuracy",
        "Significantly improved efficiency and consistency in rural agro-processing units through AI/ML solutions",
      ],
    },
    {
      title: "AI/ML and Cloud Engineering Intern",
      company: "Runverve",
      period: "Dec 2024 - Apr 2025",
      location: "Chennai, India",
      achievements: [
        "Built and deployed AI features in Verve Coach and Verve Doc for personalized coaching and healthcare",
        "Integrated ML models into production APIs using Flask/FastAPI",
        "Led backend deployment and performance optimization on AWS (EC2, Lambda, S3)",
        "Developed scalable, real-world solutions using cloud technologies",
      ],
    },
    {
      title: "Technical Lead (AI & Cloud Team)",
      company: "Zeex AI (Student-based Startup)",
      period: "Apr 2025 - Sept 2025",
      location: "Chennai, India",
      achievements: [
        "Led the technical development of an AI-powered startup backed by Nirmaan",
        "Pre-incubated at IIT Madras, focusing on innovative AI solutions",
        "Managed cloud infrastructure and AI model deployment",
        "Collaborated with cross-functional teams to deliver product features",
      ],
    },
    {
      title: "President/Captain",
      company: "AWS Cloud Club IIT Madras",
      period: "Feb 2025 - Present",
      location: "Chennai, India",
      achievements: [
        "Led a community of 1,000+ members focused on cloud computing and AI",
        "Organized technical workshops and hackathons to foster learning",
        "Managed the executive board and mentored students on cloud and AI projects",
        "Coordinated sponsorships for Paradox, IIT Madras Fest",
        "Contributed as crew member at TechXConf 2024 and Google Developer Groups Cloud Community Day",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My professional journey and key accomplishments
            </p>
          </div>

          <div className="space-y-8 mt-12">
            {experiences.map((experience, index) => (
              <div key={index} className="timeline-item">
                <Card className="border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{experience.title}</h3>
                        <p className="text-muted-foreground">{experience.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                        <Badge variant="outline" className="mb-1 md:mb-0">
                          {experience.period}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{experience.location}</span>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mt-20" id="skills">
            <Skills />
          </div>
        </div>
      </div>
    </section>
  )
}
