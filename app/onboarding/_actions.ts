'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { connectToDatabase } from '@/lib/db'
import Farmer from '@/models/Farmer'

export const completeOnboarding = async (formData: FormData) => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    // Parse crops back from JSON string
    const cropsRaw = formData.get('crops') as string
    const crops = cropsRaw ? JSON.parse(cropsRaw) : []

    const language = formData.get('language') as string
    const location = formData.get('location') as string

    // 1️⃣ Update Clerk metadata
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        crops,
        language,
        location,
      },
    })

    // 2️⃣ Update Farmer in MongoDB
    await connectToDatabase()
    await Farmer.findOneAndUpdate(
      { clerkId: userId }, // match the Clerk user
      {
        $set: {
          crops,
          language,
          location,
          onboardingComplete: true,
        },
      },
      { new: true }
    )

    return { message: res.publicMetadata }
  } catch (err) {
    console.error(err)
    return { error: 'There was an error updating the user metadata.' }
  }
}
