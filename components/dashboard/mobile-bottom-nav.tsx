"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, CreditCard, Target, PieChart, BarChart3, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Home",
  },
  {
    href: "/dashboard/transactions",
    icon: CreditCard,
    label: "Transactions",
  },
  {
    href: "/dashboard/budgets",
    icon: PieChart,
    label: "Budgets",
  },
  {
    href: "/dashboard/goals",
    icon: Target,
    label: "Goals",
  },
  {
    href: "/dashboard/reports",
    icon: BarChart3,
    label: "Reports",
  },
  {
    href: "/dashboard/profile",
    icon: User,
    label: "Profile",
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 md:hidden">
      <div className="grid grid-cols-6 gap-2 px-3 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1.5", isActive && "scale-110")} />
              <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
