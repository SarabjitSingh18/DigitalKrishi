'use client'

import React, { useEffect, useState } from 'react'
import { getHighDemandCrops } from '@/actions/suggestions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'



interface Crop {
  name: string
  average_market_price_inr: number
  season: string
  demand_level: string
}

const demandColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'very high':
      return 'text-red-600 dark:text-red-400'
    case 'high':
      return 'text-orange-600 dark:text-orange-400'
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400'
    default:
      return 'text-green-600 dark:text-green-400'
  }
}

const HighDemandCrop = () => {
  const [loading, setLoading] = useState(true)
  const [crops, setCrops] = useState<Crop[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true)
      const res = await getHighDemandCrops()
      if ('crops' in res) {
        setCrops(res.crops ?? [])
      } else if ('error' in res) {
        setError(res.error)
      }
      setLoading(false)
    }
    fetchCrops()
  }, [])

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold">
          🌾 High Demand Crops in Your Area
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-28 w-full rounded-xl" />
          ))}

        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

        {!loading &&
          crops.map((crop, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 cursor-pointer transform hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-md sm:text-lg font-bold text-green-700 dark:text-green-400">
                  {crop.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base space-y-1">
                <p>
                  <span className="font-medium">Avg Price:</span> ₹{crop.average_market_price_inr.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Season:</span> {crop.season}
                </p>
                <p className={`${demandColor(crop.demand_level)} font-semibold`}>
                  <span className="font-medium">Demand Level:</span> {crop.demand_level}
                </p>
              </CardContent>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

export default HighDemandCrop
