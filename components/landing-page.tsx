"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight,
  BarChart3,
  Shield,
  Smartphone,
  TrendingUp,
  CheckCircle,
  DollarSign,
  PieChart,
  Target,
  Zap,
  Menu,
  X,
  Github,
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function LandingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FinanceFlow
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#blog"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-9 w-9"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto"
            >
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#features"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#blog"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </a>
                <a
                  href="#contact"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs sm:text-sm">
              🚀 New: AI-Powered Financial Insights
            </Badge>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
              Master Your Money,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Shape Your Future
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Take control of your financial journey with intelligent expense tracking, smart budgeting tools, and
              personalized insights that help you achieve your goals faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-500 mr-2" />
                Free 14-day trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-500 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-500 mr-2" />
                Cancel anytime
              </div>
            </div>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12 sm:mt-16"
            style={{ y }}
          >
            <div className="relative max-w-6xl mx-auto px-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl sm:rounded-3xl blur-3xl"></div>
              <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-4 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 rounded"></div>
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 rounded w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
                        <PieChart className="w-12 sm:w-16 h-12 sm:h-16 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="h-6 sm:h-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded flex items-center px-3 sm:px-4">
                        <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 text-green-600 mr-2" />
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">+12.5%</span>
                      </div>
                      <div className="h-6 sm:h-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded flex items-center px-3 sm:px-4">
                        <Target className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600 mr-2" />
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">Goal: 85%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 px-4 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Powerful Features for Smart Money Management
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Everything you need to take control of your finances, make informed decisions, and achieve your financial
              goals.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description:
                  "Get detailed insights into your spending patterns with interactive charts and AI-powered recommendations.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description: "Your financial data is protected with enterprise-grade encryption and security measures.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Access your finances anywhere with our responsive design and upcoming mobile app.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: TrendingUp,
                title: "Goal Tracking",
                description: "Set and track financial goals with personalized milestones and progress indicators.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: PieChart,
                title: "Budget Management",
                description: "Create custom budgets and get alerts when you're approaching your limits.",
                color: "from-teal-500 to-cyan-500",
              },
              {
                icon: Zap,
                title: "Real-time Sync",
                description: "All your data syncs instantly across devices so you're always up to date.",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <div
                      className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Join thousands of users who have already taken control of their financial future with FinanceFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link href="/auth/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 text-lg px-6 sm:px-8 py-4 sm:py-6"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FinanceFlow</span>
              </div>
              <p className="text-slate-400 mb-4 text-sm sm:text-base">
                Empowering individuals to take control of their financial future with intelligent tools and insights.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/auth/signup" className="hover:text-white transition-colors">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="/auth/login" className="hover:text-white transition-colors">
                    Login
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm sm:text-base">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <p className="text-slate-400 text-sm sm:text-base text-center sm:text-left">
                &copy; 2024 FinanceFlow. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-sm">Developed by</span>
                <a
                  href="https://github.com/adenueltech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">AdeNuelTech</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
