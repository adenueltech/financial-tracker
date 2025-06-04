"use client"

import { DollarSign, Github } from "lucide-react"

export function Footer() {
  return (
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
  )
}
