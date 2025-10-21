"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSubmitting(true)
    setSubmitStatus("sending")

    // Show immediate feedback
    toast.loading("Sending your message...", { id: "contact-form" })

    const form = e.currentTarget as HTMLFormElement
    const formElements = form.elements as HTMLFormControlsCollection
    const data = {
      name: (formElements.namedItem('name') as HTMLInputElement)?.value || '',
      email: (formElements.namedItem('email') as HTMLInputElement)?.value || '',
      subject: (formElements.namedItem('subject') as HTMLInputElement)?.value || '',
      message: (formElements.namedItem('message') as HTMLTextAreaElement)?.value || '',
    }    // Validate form data
    if (!data.name || !data.email || !data.subject || !data.message) {
      toast.error("Please fill in all fields", { id: "contact-form" })
      setIsSubmitting(false)
      setSubmitStatus("error")
      return
    }

    try {
      // Start with optimistic update
      setSubmitStatus("sending")

      const formData = new FormData()
      const publicKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      
      if (!publicKey) {
        throw new Error("Web3Forms access key is not configured")
      }

      // Add required fields
      formData.append('access_key', publicKey)
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('subject', data.subject)
      formData.append('message', data.message)
      formData.append('from_name', 'Portfolio Contact Form')
      formData.append('botcheck', '')
      formData.append('source', typeof window !== 'undefined' ? window.location.href : '')

      // Add anti-spam headers
      const headers = new Headers({
        'Accept': 'application/json',
        'Origin': typeof window !== 'undefined' ? window.location.origin : '',
      })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15s timeout

      let message = 'Message sent successfully!'
      
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
          headers,
          signal: controller.signal,
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Failed to send message')
        }

        if (!result.success) {
          throw new Error(result.message || 'Failed to send message')
        }

        message = result.message || message
      } finally {
        clearTimeout(timeoutId)
      }

      // Success state
      setSubmitStatus("sent")
      toast.success(message, {
        id: "contact-form",
        duration: 5000
      })
      form.reset()

      // Success state
      setSubmitStatus("sent")
      toast.success(message, {
        id: "contact-form",
        duration: 5000
      })
      form.reset()

      // Reset form state after delay
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      // Error state
      setSubmitStatus("error")
      if (error instanceof Error && error.name === 'AbortError') {
        toast.error("Request timed out. Please try again.", { id: "contact-form" })
      } else {
        const msg = error instanceof Error ? error.message : "Failed to send message. Please try again."
        toast.error(msg, { id: "contact-form" })
      }
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "sujitlaware123@gmail.com",
      link: "mailto:sujitlaware123@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "Chennai, India",
      link: "https://maps.google.com/?q=Chennai,India",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "Available on request",
      link: null,
    },
  ]

  return (
    <div className="w-full bg-muted/30">
      <section id="contact" className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or want to discuss opportunities? I'd love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <form 
                      ref={formRef} 
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                      autoComplete="off"
                      noValidate
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" name="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" name="email" type="email" placeholder="Your email" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" name="subject" placeholder="Subject of your message" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          className="min-h-[150px]"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className={`w-full transition-all duration-200 ${
                          submitStatus === "sent" ? "bg-green-500 hover:bg-green-600" : 
                          submitStatus === "error" ? "bg-red-500 hover:bg-red-600" : ""
                        }`} 
                        disabled={isSubmitting}
                      >
                        {submitStatus === "sending" ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : submitStatus === "sent" ? (
                          <>
                            <svg
                              className="-ml-1 mr-3 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            Message Sent!
                          </>
                        ) : submitStatus === "error" ? (
                          "Try Again"
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                      <noscript>
                        <p className="text-sm text-center text-muted-foreground mt-2">
                          Please enable JavaScript to use the form, or email me directly.
                        </p>
                      </noscript>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">{info.icon}</div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.title === "Location" ? "_blank" : undefined}
                            rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Connect with me</h3>
                    <p className="text-sm text-muted-foreground mb-4">Find me on these platforms</p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://github.com/sujitlaware1809" target="_blank" rel="noopener noreferrer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                            <path d="M9 18c-4.51 2-5-2-7-2"></path>
                          </svg>
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://linkedin.com/in/sujit-laware" target="_blank" rel="noopener noreferrer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="mailto:sujitlaware123@gmail.com">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                          <span className="sr-only">Email</span>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
