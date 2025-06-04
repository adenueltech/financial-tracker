"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransactions } from "@/hooks/use-transactions"
import { AddTransactionModal } from "@/components/dashboard/add-transaction-modal"
import { PlusCircle, Search, DollarSign, Trash2, Edit, Calendar, Filter } from "lucide-react"

export default function TransactionsPage() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const { transactions, loading, deleteTransaction } = useTransactions()

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    const matchesType = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesCategory && matchesType
  })

  const categories = [...new Set(transactions.map((t) => t.category))]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Transactions</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage all your income and expenses</p>
          </div>
          <Button
            onClick={() => setShowAddTransaction(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 mt-6">
          <CardContent className="p-4">
            {/* Mobile: Search + Filter Toggle */}
            <div className="flex gap-2 sm:hidden mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-blue-100 dark:bg-blue-900/20" : ""}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile: Collapsible Filters */}
            {showFilters && (
              <div className="grid grid-cols-2 gap-2 sm:hidden">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Desktop: All filters in one row */}
            <div className="hidden sm:flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              All Transactions ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <DollarSign className="w-12 sm:w-16 h-12 sm:h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
                  {transactions.length === 0 ? "No transactions yet" : "No transactions match your filters"}
                </p>
                <Button variant="outline" onClick={() => setShowAddTransaction(true)}>
                  Add Your First Transaction
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div
                        className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          transaction.type === "income"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-red-100 dark:bg-red-900/20"
                        }`}
                      >
                        <DollarSign
                          className={`w-5 sm:w-6 h-5 sm:h-6 ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-slate-900 dark:text-white text-sm sm:text-base truncate">
                          {transaction.description}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center">
                          <span className="truncate">{transaction.category}</span>
                          <span className="mx-2 hidden sm:inline">•</span>
                          <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div
                        className={`font-semibold text-sm sm:text-lg whitespace-nowrap ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hidden sm:flex">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTransaction(transaction.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <AddTransactionModal open={showAddTransaction} onOpenChange={setShowAddTransaction} />
    </div>
  )
}
