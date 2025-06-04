"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useBudgets } from "@/hooks/use-budgets"
import { useTransactions } from "@/hooks/use-transactions"
import { CreateBudgetModal } from "@/components/dashboard/create-budget-modal"
import { PlusCircle, Target, AlertTriangle, CheckCircle, Edit, Trash2 } from "lucide-react"

export default function BudgetsPage() {
  const [showCreateBudget, setShowCreateBudget] = useState(false)
  const { budgets, loading, deleteBudget } = useBudgets()
  const { transactions } = useTransactions()

  // Calculate spent amounts for each budget
  const budgetsWithSpent = budgets.map((budget) => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const spent = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category === budget.category &&
          new Date(t.date).getMonth() === currentMonth &&
          new Date(t.date).getFullYear() === currentYear,
      )
      .reduce((sum, t) => sum + t.amount, 0)

    return { ...budget, spent }
  })

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
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Budgets</h1>
            <p className="text-slate-600 dark:text-slate-300">Track your spending against your budget goals</p>
          </div>
          <Button
            onClick={() => setShowCreateBudget(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Budget
          </Button>
        </div>
      </motion.div>

      {/* Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {budgetsWithSpent.length === 0 ? (
            <div className="col-span-full">
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0">
                <CardContent className="text-center py-12">
                  <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No budgets yet</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Create your first budget to start tracking your spending
                  </p>
                  <Button onClick={() => setShowCreateBudget(true)}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Your First Budget
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            budgetsWithSpent.map((budget) => {
              const percentage = (budget.spent / budget.amount) * 100
              const isOverBudget = percentage > 100
              const isNearLimit = percentage > 80 && percentage <= 100

              return (
                <motion.div
                  key={budget.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <Target className="w-5 h-5 mr-2 text-blue-600" />
                          {budget.category}
                        </CardTitle>
                        <div className="flex items-center space-x-1">
                          {isOverBudget ? (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          ) : isNearLimit ? (
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBudget(budget.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          ${budget.spent.toFixed(2)}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          of ${budget.amount.toFixed(2)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <Progress
                          value={Math.min(percentage, 100)}
                          className={`h-3 ${
                            isOverBudget
                              ? "[&>div]:bg-red-500"
                              : isNearLimit
                                ? "[&>div]:bg-yellow-500"
                                : "[&>div]:bg-green-500"
                          }`}
                        />
                        <div className="flex justify-between text-sm">
                          <span
                            className={
                              isOverBudget ? "text-red-600" : isNearLimit ? "text-yellow-600" : "text-green-600"
                            }
                          >
                            {percentage.toFixed(1)}% used
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            ${Math.max(0, budget.amount - budget.spent).toFixed(2)} left
                          </span>
                        </div>
                      </div>

                      {isOverBudget && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                          <p className="text-sm text-red-700 dark:text-red-300">
                            You're ${(budget.spent - budget.amount).toFixed(2)} over budget this month
                          </p>
                        </div>
                      )}

                      {isNearLimit && !isOverBudget && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            You're approaching your budget limit
                          </p>
                        </div>
                      )}

                      <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        {budget.period} budget
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })
          )}
        </div>
      </motion.div>

      <CreateBudgetModal open={showCreateBudget} onOpenChange={setShowCreateBudget} />
    </div>
  )
}
