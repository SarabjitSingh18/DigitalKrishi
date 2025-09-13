'use client'

import React, { useEffect, useState } from 'react'
import { getHighDemandCrops } from '@/actions/suggestions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const HighDemandCrops = () => {
  const [loading, setLoading] = useState(true)
  const [crops, setCrops] = useState<any[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true)
      const res = await getHighDemandCrops()
      if (res.error) setError(res.error)
      else setCrops(res.crops || [])
      setLoading(false)
    }
    fetchCrops()
  }, [])

  return (
    <div className="w-full mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
        📈 High Demand Crops in Your Area
      </h2>

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      )}

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map((crop, idx) => (
            <Card
              key={idx}
              className="border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{crop.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p>Average Price: {crop.avgPrice}</p>
                <p>Season: {crop.season}</p>
                <p>Demand Level: {crop.demand}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default HighDemandCrops
