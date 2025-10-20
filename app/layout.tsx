import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@/components/analytics"
import ClientLayout from "./client"
import { Suspense } from "react"

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
    <>
      <Suspense>
        <ClientLayout>{children}</ClientLayout>
      </Suspense>
      <Analytics />
    </>
  )
}


import './globals.css'