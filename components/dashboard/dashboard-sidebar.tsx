"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { BarChart3, Wallet, Target, PieChart, User, LogOut, DollarSign, X, TrendingUp } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Transactions", href: "/dashboard/transactions", icon: Wallet },
  { name: "Budgets", href: "/dashboard/budgets", icon: Target },
  { name: "Reports", href: "/dashboard/reports", icon: PieChart },
  { name: "Goals", href: "/dashboard/goals", icon: TrendingUp },
]

interface DashboardSidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white/80 lg:dark:bg-slate-900/80 lg:backdrop-blur-md lg:border-r lg:border-slate-200 lg:dark:border-slate-700">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FinanceFlow
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      isActive ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : ""
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Link href="/dashboard/profile">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-700 lg:hidden"
            >
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      FinanceFlow
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.name} href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={`w-full justify-start ${
                            isActive ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </Button>
                      </Link>
                    )
                  })}
                </nav>

                {/* User section */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {user?.displayName || user?.email?.split("@")[0] || "User"}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href="/dashboard/profile">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
