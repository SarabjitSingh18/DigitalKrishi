'use client'

import React, { useEffect, useState } from 'react'
import { getSuggestions } from '@/actions/suggestions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const SKELETON_LINES = 4 // Number of skeleton lines to show

const Suggestions = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{ suggestions?: string; error?: string }>({})

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true)
      const res = await getSuggestions()
      setData(res)
      setLoading(false)
    }
    fetchSuggestions()
  }, [])

  // Limit number of suggestions lines (e.g., first 5)
  const displayedSuggestions = data.suggestions
    ? data.suggestions
        .split('\n')
        .filter((line) => line.trim() !== '')
        .slice(0, 5)
    : []

  return (
    <Card className="w-full mt-4 mb-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">🌱 Personalized Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          // Skeleton UI instead of loader
          <div className="space-y-2">
            {Array.from({ length: SKELETON_LINES }).map((_, idx) => (
              <div
                key={idx}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"
              />
            ))}
          </div>
        ) : data.error ? (
          <p className="text-red-600 dark:text-red-400">{data.error}</p>
        ) : (
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            {displayedSuggestions.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
            
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Suggestions
