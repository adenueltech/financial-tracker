"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, CreditCard, Eye, EyeOff, MoreVertical, Trash2, Edit } from "lucide-react"

// Mock cards data
const mockCards = [
  {
    id: "1",
    name: "Chase Sapphire Preferred",
    type: "credit",
    lastFour: "4532",
    balance: 1250.75,
    limit: 5000,
    expiryDate: "12/26",
    isActive: true,
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "2",
    name: "Bank of America Checking",
    type: "debit",
    lastFour: "8901",
    balance: 3420.5,
    limit: null,
    expiryDate: "08/27",
    isActive: true,
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "3",
    name: "Capital One Venture",
    type: "credit",
    lastFour: "2468",
    balance: 0,
    limit: 3000,
    expiryDate: "03/25",
    isActive: false,
    color: "from-purple-600 to-pink-600",
  },
]

export default function CardsPage() {
  const [showBalances, setShowBalances] = useState(true)
  const [cards] = useState(mockCards)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Cards & Accounts</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage your credit cards and bank accounts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
              className="w-full sm:w-auto"
            >
              {showBalances ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showBalances ? "Hide" : "Show"} Balances
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Card Visual */}
                  <div
                    className={`relative h-48 bg-gradient-to-br ${card.color} rounded-t-lg p-6 text-white overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white/30" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-2 border-white/20" />
                    </div>

                    {/* Card Header */}
                    <div className="relative flex justify-between items-start mb-8">
                      <div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0 mb-2">
                          {card.type.toUpperCase()}
                        </Badge>
                        <h3 className="font-semibold text-lg">{card.name}</h3>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Card Number */}
                    <div className="relative mb-4">
                      <div className="flex items-center space-x-2 text-lg font-mono">
                        <span>••••</span>
                        <span>••••</span>
                        <span>••••</span>
                        <span>{card.lastFour}</span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="relative flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-80">EXPIRES</p>
                        <p className="font-mono">{card.expiryDate}</p>
                      </div>
                      <CreditCard className="w-8 h-8 opacity-80" />
                    </div>

                    {/* Status Indicator */}
                    {!card.isActive && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Inactive</Badge>
                      </div>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {card.type === "credit" ? "Balance" : "Available"}
                      </span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {showBalances ? `$${card.balance.toLocaleString()}` : "••••"}
                      </span>
                    </div>

                    {card.limit && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Credit Limit</span>
                          <span className="text-sm text-slate-900 dark:text-white">
                            {showBalances ? `$${card.limit.toLocaleString()}` : "••••"}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              (card.balance / card.limit) > 0.8
                                ? "bg-red-500"
                                : card.balance / card.limit > 0.6
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min((card.balance / card.limit) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>{((card.balance / card.limit) * 100).toFixed(1)}% used</span>
                          <span>${(card.limit - card.balance).toLocaleString()} available</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <Badge variant={card.isActive ? "default" : "secondary"}>
                        {card.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Add New Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: cards.length * 0.1 }}
          >
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-80 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                  <PlusCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Add New Card</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Connect your credit card or bank account
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Add Card
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
