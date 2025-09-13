'use client'

import React, { useEffect, useState } from 'react'
import { getHighDemandCrops } from '@/actions/suggestions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface Crop {
  name: string
  averagePrice: number
  season: string
  demandLevel: string
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
      setCrops(res.crops ?? []) // default to empty array if undefined
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
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-lg" />
          ))}

        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

        {!loading &&
          crops.map((crop, idx) => (
            <Card
              key={idx}
              className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 p-4 rounded-lg shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-md sm:text-lg font-semibold">
                  {crop.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base space-y-1">
                <p>
                  <span className="font-medium">Avg Price:</span> ₹{crop.averagePrice}
                </p>
                <p>
                  <span className="font-medium">Season:</span> {crop.season}
                </p>
                <p>
                  <span className="font-medium">Demand Level:</span> {crop.demandLevel}
                </p>
              </CardContent>
            </Card>
          ))}
      </CardContent>
    </Card>
  )
}

export default HighDemandCrop
