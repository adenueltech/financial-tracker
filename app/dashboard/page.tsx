"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTransactions } from "@/hooks/use-transactions"
import { useBudgets } from "@/hooks/use-budgets"
import { useAuth } from "@/lib/auth-context"
import { DollarSign, TrendingUp, TrendingDown, PlusCircle, Target, Wallet, PieChart } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { AddTransactionModal } from "@/components/dashboard/add-transaction-modal"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DashboardPage() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const { user } = useAuth()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const { budgets, loading: budgetsLoading } = useBudgets()

  // Debug logging
  useEffect(() => {
    console.log("Dashboard - Transactions updated:", transactions.length, transactions)
  }, [transactions])

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date)
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
    })

    const monthlyIncome = monthlyTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)

    const totalBalance = transactions.reduce((sum, t) => {
      return t.type === "income" ? sum + t.amount : sum - t.amount
    }, 0)

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savingsGoal: 10000,
      currentSavings: Math.max(0, totalBalance * 0.6), // Assume 60% of balance is savings
    }
  }, [transactions])

  if (transactionsLoading || budgetsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading your financial data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back, {user?.displayName || user?.email?.split("@")[0] || "User"}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-300">Here's what's happening with your finances today.</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total transactions: {transactions.length}</p>
          </div>
          <Button
            onClick={() => setShowAddTransaction(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <motion.div variants={fadeInUp}>
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                ${stats.totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Current balance
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                ${stats.monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                ${stats.monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                ${stats.currentSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="mt-2">
                <Progress value={(stats.currentSavings / stats.savingsGoal) * 100} className="h-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {Math.round((stats.currentSavings / stats.savingsGoal) * 100)}% of $
                  {stats.savingsGoal.toLocaleString()} goal
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                Expense Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                <div className="text-center">
                  <PieChart className="w-12 sm:w-16 h-12 sm:h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                    {transactions.length === 0 ? "No transactions yet" : "Interactive charts coming soon"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Budget Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Budget Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {budgets.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Target className="w-10 sm:w-12 h-10 sm:h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">No budgets set yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Create Budget
                  </Button>
                </div>
              ) : (
                budgets.slice(0, 4).map((budget, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium truncate">{budget.category}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap ml-2">
                        ${budget.spent} / ${budget.amount}
                      </span>
                    </div>
                    <Progress value={(budget.spent / budget.amount) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{Math.round((budget.spent / budget.amount) * 100)}% used</span>
                      <span>${budget.amount - budget.spent} left</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-green-600" />
                Recent Transactions ({transactions.length})
              </div>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <Wallet className="w-10 sm:w-12 h-10 sm:h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">No transactions yet</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowAddTransaction(true)}>
                  Add Your First Transaction
                </Button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-slate-900 dark:text-white text-sm sm:text-base truncate">
                          {transaction.description}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                          {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold text-sm sm:text-base whitespace-nowrap ml-2 ${
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Transaction Modal */}
      <AddTransactionModal open={showAddTransaction} onOpenChange={setShowAddTransaction} />
    </div>
  )
}
