"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
}

export function PullToRefresh({ children, onRefresh, threshold = 80 }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isPulling, setIsPulling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, threshold], [0, 1])
  const rotate = useTransform(y, [0, threshold], [0, 180])

  const handlePanStart = useCallback(() => {
    if (window.scrollY === 0) {
      setIsPulling(true)
    }
  }, [])

  const handlePan = useCallback(
    (event: any, info: any) => {
      if (!isPulling || window.scrollY > 0) return

      const newY = Math.max(0, Math.min(info.point.y - info.offset.y, threshold * 1.5))
      y.set(newY)
    },
    [isPulling, threshold, y],
  )

  const handlePanEnd = useCallback(
    async (event: any, info: any) => {
      if (!isPulling) return

      setIsPulling(false)

      if (y.get() >= threshold && !isRefreshing) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
        }
      }

      y.set(0)
    },
    [isPulling, threshold, y, isRefreshing, onRefresh],
  )

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull indicator */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 bg-blue-50 dark:bg-blue-900/20 z-10"
      >
        <motion.div style={{ rotate }} className="flex items-center space-x-2 text-blue-600">
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="text-sm font-medium">{isRefreshing ? "Refreshing..." : "Pull to refresh"}</span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  )
}
