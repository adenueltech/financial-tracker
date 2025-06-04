"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface CreateGoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categories = ["savings", "travel", "technology", "education", "health", "home", "investment", "other"]

export function CreateGoalModal({ open, onOpenChange }: CreateGoalModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.targetAmount || !formData.targetDate || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const targetAmount = Number.parseFloat(formData.targetAmount)
    const currentAmount = Number.parseFloat(formData.currentAmount) || 0

    if (targetAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Target amount must be greater than 0.",
        variant: "destructive",
      })
      return
    }

    if (currentAmount < 0) {
      toast({
        title: "Invalid Amount",
        description: "Current amount cannot be negative.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Here you would save the goal to your backend/database
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Goal Created",
        description: "Your financial goal has been successfully created.",
      })

      setFormData({
        title: "",
        description: "",
        targetAmount: "",
        currentAmount: "",
        targetDate: "",
        category: "",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Financial Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Goal Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Emergency Fund"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetAmount">Target Amount *</Label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.targetAmount}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetAmount: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="currentAmount">Current Amount</Label>
              <Input
                id="currentAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.currentAmount}
                onChange={(e) => setFormData((prev) => ({ ...prev, currentAmount: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="targetDate">Target Date *</Label>
            <Input
              id="targetDate"
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, targetDate: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
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
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600" disabled={loading}>
              {loading ? "Creating..." : "Create Goal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
