"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBudgets } from "@/hooks/use-budgets"
import { useToast } from "@/hooks/use-toast"

interface CreateBudgetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categories = [
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Other",
]

export function CreateBudgetModal({ open, onOpenChange }: CreateBudgetModalProps) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    period: "monthly" as "monthly" | "weekly" | "yearly",
  })
  const [loading, setLoading] = useState(false)
  const { addBudget } = useBudgets()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.category || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(formData.amount)
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Budget amount must be greater than 0.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await addBudget({
        category: formData.category,
        amount,
        period: formData.period,
      })

      toast({
        title: "Budget Created",
        description: "Your budget has been successfully created.",
      })

      setFormData({
        category: "",
        amount: "",
        period: "monthly",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create budget. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Budget Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="period">Period</Label>
            <Select
              value={formData.period}
              onValueChange={(value: "monthly" | "weekly" | "yearly") =>
                setFormData((prev) => ({ ...prev, period: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600" disabled={loading}>
              {loading ? "Creating..." : "Create Budget"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
