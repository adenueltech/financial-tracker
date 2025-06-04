import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinanceFlow - Smart Personal Finance Tracker",
  description:
    "Take control of your finances with our intelligent expense tracking, budgeting tools, and financial insights. Start your journey to financial freedom today.",
  keywords: "personal finance, expense tracker, budgeting, financial planning, money management",
  authors: [{ name: "FinanceFlow Team" }],
  openGraph: {
    title: "FinanceFlow - Smart Personal Finance Tracker",
    description: "Take control of your finances with intelligent tracking and insights",
    type: "website",
    url: "https://financeflow.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceFlow - Smart Personal Finance Tracker",
    description: "Take control of your finances with intelligent tracking and insights",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="financeflow-theme"
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
