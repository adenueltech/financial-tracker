"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DashboardSidebar } from "./dashboard-sidebar"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { PullToRefresh } from "./pull-to-refresh"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Bell, Search, Menu } from "lucide-react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      console.log("No user found, redirecting to login")
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleRefresh = async () => {
    // Simulate refresh action
    await new Promise((resolve) => setTimeout(resolve, 1000))
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-4">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="lg:pl-64 pb-20 lg:pb-0">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>

              {/* Search - hidden on mobile, visible on desktop */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 pr-4 py-2 w-64 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Mobile search button */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main content with pull-to-refresh */}
        <PullToRefresh onRefresh={handleRefresh}>
          <main className="p-4 sm:p-6">{children}</main>
        </PullToRefresh>

        {/* Footer */}
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
