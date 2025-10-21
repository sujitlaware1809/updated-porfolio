import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://sujitlaware.com'),
  title: "Sujit Laware | AI/ML Engineer & Cloud Developer",
  description:
    "Portfolio of Sujit Laware, a Data Science and AI/ML Engineer specializing in Python, Machine Learning, Cloud Technologies, and Full Stack Development.",
  keywords: [
    "Sujit Laware",
    "AI Engineer",
    "ML Engineer",
    "Data Science",
    "Python",
    "AWS",
    "Google Cloud",
    "Full Stack Developer",
    "IIT Madras",
  ],
  authors: [{ name: "Sujit Laware" }],
  creator: "Sujit Laware",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nihalmaskey.com",
    title: "Sujit Laware | AI/ML Engineer & Cloud Developer",
    description:
      "Portfolio of Sujit Laware, an AI/ML Engineer and Cloud Developer specializing in Python, Machine Learning, Cloud Technologies, and Full Stack Development.",
    siteName: "Sujit Laware Portfolio",
    images: [
      {
        url: "/favicon.jpg",
        width: 512,
        height: 512,
        alt: "Sujit Laware Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujit Laware | AI/ML Engineer & Cloud Developer",
    description:
      "Portfolio of Sujit Laware, an AI/ML Engineer and Cloud Developer specializing in Python, Machine Learning, Cloud Technologies, and Full Stack Development.",
    creator: "@sujitlaware",
    images: ["/favicon.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-mono antialiased")}> 
        {/* Client providers and site chrome */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <AnimatedBackground />
            <Header />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}