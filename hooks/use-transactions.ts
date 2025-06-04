"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"

export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  type: "income" | "expense"
  date: Date
  userId: string
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [useFirestore, setUseFirestore] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setTransactions([])
      setLoading(false)
      return
    }

    if (!useFirestore) {
      // Use local storage for persistence when Firestore is not available
      const savedTransactions = localStorage.getItem(`transactions_${user.uid}`)
      if (savedTransactions) {
        try {
          const parsed = JSON.parse(savedTransactions).map((t: any) => ({
            ...t,
            date: new Date(t.date),
          }))
          setTransactions(parsed)
        } catch (error) {
          console.error("Error parsing saved transactions:", error)
          setTransactions([])
        }
      }
      setLoading(false)
      return
    }

    // Try to use Firestore
    const initializeFirestore = async () => {
      try {
        const { collection, query, where, orderBy, onSnapshot } = await import("firebase/firestore")
        const { db } = await import("@/lib/firebase")

        const q = query(collection(db, "transactions"), where("userId", "==", user.uid), orderBy("date", "desc"))

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            console.log("Firestore snapshot received, docs count:", snapshot.docs.length)
            const transactionData = snapshot.docs.map((doc) => {
              const data = doc.data()
              return {
                id: doc.id,
                ...data,
                date: data.date?.toDate() || new Date(data.date) || new Date(),
              }
            }) as Transaction[]

            console.log("Processed transactions:", transactionData)
            setTransactions(transactionData)
            setLoading(false)
          },
          (error) => {
            console.warn("Firestore permission denied, switching to local storage:", error)
            setUseFirestore(false)

            // Load from local storage as fallback
            const savedTransactions = localStorage.getItem(`transactions_${user.uid}`)
            if (savedTransactions) {
              try {
                const parsed = JSON.parse(savedTransactions).map((t: any) => ({
                  ...t,
                  date: new Date(t.date),
                }))
                setTransactions(parsed)
              } catch (error) {
                console.error("Error parsing saved transactions:", error)
                setTransactions([])
              }
            } else {
              setTransactions([])
            }
            setLoading(false)
          },
        )

        return unsubscribe
      } catch (error) {
        console.warn("Failed to initialize Firestore, using local storage:", error)
        setUseFirestore(false)

        // Load from local storage as fallback
        const savedTransactions = localStorage.getItem(`transactions_${user.uid}`)
        if (savedTransactions) {
          try {
            const parsed = JSON.parse(savedTransactions).map((t: any) => ({
              ...t,
              date: new Date(t.date),
            }))
            setTransactions(parsed)
          } catch (error) {
            console.error("Error parsing saved transactions:", error)
            setTransactions([])
          }
        } else {
          setTransactions([])
        }
        setLoading(false)
      }
    }

    initializeFirestore()
  }, [user, useFirestore])

  // Save to local storage whenever transactions change (for local mode)
  useEffect(() => {
    if (!useFirestore && user && transactions.length >= 0) {
      localStorage.setItem(`transactions_${user.uid}`, JSON.stringify(transactions))
    }
  }, [transactions, useFirestore, user])

  const addTransaction = async (transaction: Omit<Transaction, "id" | "userId">) => {
    if (!user) return

    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      userId: user.uid,
      date: new Date(),
    }

    if (!useFirestore) {
      // Add to local state immediately
      setTransactions((prev) => [newTransaction, ...prev])
      return
    }

    try {
      const { addDoc, collection, Timestamp } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      console.log("Adding transaction to Firestore:", newTransaction)

      const docRef = await addDoc(collection(db, "transactions"), {
        description: transaction.description,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
        userId: user.uid,
        date: Timestamp.fromDate(new Date()),
      })

      console.log("Transaction added to Firestore with ID:", docRef.id)
    } catch (error) {
      console.warn("Failed to add transaction to Firestore, switching to local mode:", error)
      setUseFirestore(false)

      // Add to local state as fallback
      setTransactions((prev) => [newTransaction, ...prev])
    }
  }

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    if (!useFirestore) {
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
      return
    }

    try {
      const { updateDoc, doc, Timestamp } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      const updateData = { ...updates }
      if (updates.date) {
        updateData.date = Timestamp.fromDate(updates.date)
      }

      await updateDoc(doc(db, "transactions", id), updateData)
    } catch (error) {
      console.warn("Failed to update transaction in Firestore:", error)
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
    }
  }

  const deleteTransaction = async (id: string) => {
    if (!useFirestore) {
      setTransactions((prev) => prev.filter((t) => t.id !== id))
      return
    }

    try {
      const { deleteDoc, doc } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      await deleteDoc(doc(db, "transactions", id))
    } catch (error) {
      console.warn("Failed to delete transaction from Firestore:", error)
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    }
  }

  return {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
