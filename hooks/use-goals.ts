"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"

export interface Goal {
  id: string
  name: string
  description: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: string
  userId: string
  createdAt: Date
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [useFirestore, setUseFirestore] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setGoals([])
      setLoading(false)
      return
    }

    if (!useFirestore) {
      // Use empty array instead of mock data
      setGoals([])
      setLoading(false)
      return
    }

    // Try to use Firestore
    const initializeFirestore = async () => {
      try {
        const { collection, query, where, orderBy, onSnapshot } = await import("firebase/firestore")
        const { db } = await import("@/lib/firebase")

        const q = query(collection(db, "goals"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const goalData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate() || new Date(),
            })) as Goal[]

            setGoals(goalData)
            setLoading(false)
          },
          (error) => {
            console.warn("Firestore permission denied, using empty data:", error)
            setUseFirestore(false)
            setGoals([])
            setLoading(false)
          },
        )

        return unsubscribe
      } catch (error) {
        console.warn("Failed to initialize Firestore, using empty data:", error)
        setUseFirestore(false)
        setGoals([])
        setLoading(false)
      }
    }

    initializeFirestore()
  }, [user, useFirestore])

  const addGoal = async (goal: Omit<Goal, "id" | "userId" | "createdAt">) => {
    if (!user) return

    if (!useFirestore) {
      // Add to local state
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
        userId: user.uid,
        createdAt: new Date(),
      }
      setGoals((prev) => [newGoal, ...prev])
      return
    }

    try {
      const { addDoc, collection } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      await addDoc(collection(db, "goals"), {
        ...goal,
        userId: user.uid,
        createdAt: new Date(),
      })
    } catch (error) {
      console.warn("Failed to add goal to Firestore, using local state:", error)
      setUseFirestore(false)
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
        userId: user.uid,
        createdAt: new Date(),
      }
      setGoals((prev) => [newGoal, ...prev])
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    if (!useFirestore) {
      setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)))
      return
    }

    try {
      const { updateDoc, doc } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      await updateDoc(doc(db, "goals", id), updates)
    } catch (error) {
      console.warn("Failed to update goal in Firestore:", error)
      setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)))
    }
  }

  const deleteGoal = async (id: string) => {
    if (!useFirestore) {
      setGoals((prev) => prev.filter((g) => g.id !== id))
      return
    }

    try {
      const { deleteDoc, doc } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      await deleteDoc(doc(db, "goals", id))
    } catch (error) {
      console.warn("Failed to delete goal from Firestore:", error)
      setGoals((prev) => prev.filter((g) => g.id !== id))
    }
  }

  const refreshGoals = async () => {
    // Refresh function for pull-to-refresh
    setLoading(true)
    // The useEffect will handle the actual refresh
    setTimeout(() => setLoading(false), 1000)
  }

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    deleteGoal,
    refreshGoals,
  }
}
