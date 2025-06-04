"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTransactions } from "@/hooks/use-transactions"
import { PieChart, BarChart3, TrendingUp, Download, Calendar, DollarSign } from "lucide-react"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("thisMonth")
  const [reportType, setReportType] = useState("overview")
  const { transactions } = useTransactions()

  const filteredTransactions = useMemo(() => {
    const now = new Date()
    let startDate: Date

    switch (timeRange) {
      case "thisWeek":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        break
      case "thisMonth":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case "lastMonth":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        break
      case "thisYear":
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    return transactions.filter((t) => new Date(t.date) >= startDate)
  }, [transactions, timeRange])

  const reportData = useMemo(() => {
    const income = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const expenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    const categoryBreakdown = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount
          return acc
        },
        {} as Record<string, number>,
      )

    const topCategories = Object.entries(categoryBreakdown)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    return {
      income,
      expenses,
      netIncome: income - expenses,
      categoryBreakdown,
      topCategories,
      transactionCount: filteredTransactions.length,
    }
  }, [filteredTransactions])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Financial Reports</h1>
            <p className="text-slate-600 dark:text-slate-300">Analyze your financial data and trends</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 mt-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisWeek">This Week</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="categories">Categories</SelectItem>
                    <SelectItem value="trends">Trends</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${reportData.income.toLocaleString()}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {timeRange.replace(/([A-Z])/g, " $1").toLowerCase()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${reportData.expenses.toLocaleString()}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {timeRange.replace(/([A-Z])/g, " $1").toLowerCase()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Income</CardTitle>
              <BarChart3 className={`h-4 w-4 ${reportData.netIncome >= 0 ? "text-green-600" : "text-red-600"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${reportData.netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${reportData.netIncome.toLocaleString()}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {reportData.netIncome >= 0 ? "Surplus" : "Deficit"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{reportData.transactionCount}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Total transactions</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                Top Expense Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reportData.topCategories.length === 0 ? (
                <div className="text-center py-8">
                  <PieChart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-300">No expense data available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reportData.topCategories.map(([category, amount], index) => {
                    const percentage = (amount / reportData.expenses) * 100
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Spending Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                Spending Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    ${(reportData.expenses / Math.max(1, reportData.transactionCount)).toFixed(2)}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Average per transaction</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-sm">Savings Rate</span>
                    <span className={`font-semibold ${reportData.netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {reportData.income > 0 ? ((reportData.netIncome / reportData.income) * 100).toFixed(1) : 0}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-sm">Largest Expense</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {reportData.topCategories.length > 0 ? reportData.topCategories[0][0] : "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-sm">Transaction Frequency</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {(reportData.transactionCount / 30).toFixed(1)}/day
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
