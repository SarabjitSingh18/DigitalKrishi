'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'

export default function OnboardingPage() {
  const [error, setError] = React.useState('')
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    // Convert crops string -> array
    const cropsInput = formData.get('crops') as string
    const cropsArray = cropsInput
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0)

    // Build new FormData for server action
    const newFormData = new FormData()
    newFormData.append('crops', JSON.stringify(cropsArray))
    newFormData.append('language', formData.get('language') as string)
    newFormData.append('location', formData.get('location') as string)

    const res = await completeOnboarding(newFormData)

    if (res?.message) {
      await user?.reload()
      router.push('/')
    }
    if (res?.error) {
      setError(res.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700">
          Welcome 👋
        </h1>
        <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
          Let’s get you set up with your farming preferences
        </p>

        {/* Form */}
        <form action={handleSubmit} className="mt-6 space-y-5">
          {/* Crops */}
          <div>
            <label className="block font-medium text-gray-700">Crops You Grow</label>
            <input
              type="text"
              name="crops"
              placeholder="e.g. wheat, rice, maize"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter multiple crops separated by commas
            </p>
          </div>

          {/* Language */}
          <div>
            <label className="block font-medium text-gray-700">Preferred Language</label>
            <input
              type="text"
              name="language"
              placeholder="e.g. Hindi, English"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your city or village"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
