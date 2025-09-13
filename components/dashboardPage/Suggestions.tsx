'use client'

import React, { useEffect, useState } from 'react'
import { getSuggestions } from '@/actions/suggestions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

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

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">🌱 Personalized Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Getting tips for you...
          </div>
        )}

        {data.error && (
          <p className="text-red-600 dark:text-red-400">{data.error}</p>
        )}

        {data.suggestions && (
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            {data.suggestions.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Suggestions
