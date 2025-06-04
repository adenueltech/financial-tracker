"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"

export interface Budget {
  id: string
  category: string
  amount: number
  spent: number
  period: "monthly" | "weekly" | "yearly"
  userId: string
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [useFirestore, setUseFirestore] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setBudgets([])
      setLoading(false)
      return
    }

    if (!useFirestore) {
      // Use empty array instead of mock data
      setBudgets([])
      setLoading(false)
      return
    }

    // Try to use Firestore
    const initializeFirestore = async () => {
      try {
        const { collection, query, where, onSnapshot } = await import("firebase/firestore")
        const { db } = await import("@/lib/firebase")

        const q = query(collection(db, "budgets"), where("userId", "==", user.uid))

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const budgetData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Budget[]

            setBudgets(budgetData)
            setLoading(false)
          },
          (error) => {
            console.warn("Firestore permission denied, using empty data:", error)
            setUseFirestore(false)
            setBudgets([])
            setLoading(false)
          },
        )

        return unsubscribe
      } catch (error) {
        console.warn("Failed to initialize Firestore, using empty data:", error)
        setUseFirestore(false)
        setBudgets([])
        setLoading(false)
      }
    }

    initializeFirestore()
  }, [user, useFirestore])

  const addBudget = async (budget: Omit<Budget, "id" | "userId" | "spent">) => {
    if (!user) return

    if (!useFirestore) {
      // Add to local state
      const newBudget: Budget = {
        ...budget,
        id: Date.now().toString(),
        spent: 0,
        userId: user.uid,
      }
      setBudgets((prev) => [...prev, newBudget])
      return
    }

    try {
      const { addDoc, collection } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      await addDoc(collection(db, "budgets"), {
        ...budget,
        spent: 0,
        userId: user.uid,
      })
    } catch (error) {
      console.warn("Failed to add budget to Firestore, using local state:", error)
      setUseFirestore(false)
      const newBudget: Budget = {
        ...budget,
        id: Date.now().toString(),
        spent: 0,
        userId: user.uid,
      }
      setBudgets((prev) => [...prev, newBudget])
    }
  }

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    if (!useFirestore) {
      setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
      return
    }

    try {
      const { updateDoc, doc } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      await updateDoc(doc(db, "budgets", id), updates)
    } catch (error) {
      console.warn("Failed to update budget in Firestore:", error)
      setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
    }
  }

  const deleteBudget = async (id: string) => {
    if (!useFirestore) {
      setBudgets((prev) => prev.filter((b) => b.id !== id))
      return
    }

    try {
      const { deleteDoc, doc } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      await deleteDoc(doc(db, "budgets", id))
    } catch (error) {
      console.warn("Failed to delete budget from Firestore:", error)
      setBudgets((prev) => prev.filter((b) => b.id !== id))
    }
  }

  return {
    budgets,
    loading,
    addBudget,
    updateBudget,
    deleteBudget,
  }
}
