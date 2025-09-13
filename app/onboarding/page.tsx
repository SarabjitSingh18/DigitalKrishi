'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'
import { Loader2 } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function OnboardingPage() {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError('')

    try {
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-3xl">
            Welcome 👋
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Let’s set up your farming preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-5">
            {/* Crops */}
            <div className="space-y-2">
              <Label htmlFor="crops">Crops You Grow</Label>
              <Input
                type="text"
                name="crops"
                placeholder="e.g. wheat, rice, maize"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter multiple crops separated by commas
              </p>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Input
                type="text"
                name="language"
                placeholder="e.g. Hindi, English"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="Enter your city or village"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 p-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full flex items-center justify-center',
                loading && 'cursor-not-allowed opacity-80'
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
