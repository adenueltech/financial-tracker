"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, TrendingUp, Calendar, DollarSign } from "lucide-react"
import { CreateGoalModal } from "@/components/dashboard/create-goal-modal"
import { useGoals } from "@/hooks/use-goals"
import { PullToRefresh } from "@/components/dashboard/pull-to-refresh"

export default function GoalsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { goals, loading, refreshGoals } = useGoals()

  const handleRefresh = async () => {
    await refreshGoals()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Financial Goals</h1>
            <p className="text-slate-600 dark:text-slate-400">Track your progress towards financial milestones</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Goal</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Financial Goals</h1>
            <p className="text-slate-600 dark:text-slate-400">Track your progress towards financial milestones</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {goals.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Goals Yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Start setting financial goals to track your progress and achieve your dreams. Whether it's saving for a
                vacation, emergency fund, or a new car, we'll help you stay on track.
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Goals Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Goals</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{goals.length}</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Completed</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {goals.filter((goal) => goal.currentAmount >= goal.targetAmount).length}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">In Progress</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {goals.filter((goal) => goal.currentAmount < goal.targetAmount).length}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Target</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        ${goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Goals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {goals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100
                const isCompleted = progress >= 100
                const daysLeft = Math.ceil(
                  (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{goal.name}</CardTitle>
                          <CardDescription className="mt-1">{goal.description}</CardDescription>
                        </div>
                        <Badge variant={isCompleted ? "default" : "secondary"} className="ml-2">
                          {isCompleted ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600 dark:text-slate-400">Progress</span>
                            <span className="font-medium">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="text-slate-600 dark:text-slate-400">Current</p>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              ${goal.currentAmount.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-600 dark:text-slate-400">Target</p>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              ${goal.targetAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                          <div>
                            <p className="text-slate-600 dark:text-slate-400">Target Date</p>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {new Date(goal.targetDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-600 dark:text-slate-400">
                              {isCompleted ? "Completed!" : daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        <CreateGoalModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      </div>
    </PullToRefresh>
  )
}
