'use server'

import { auth } from '@clerk/nextjs/server'
import Farmer from '@/models/Farmer'
import { connectToDatabase } from '@/lib/db'
import { GoogleGenAI } from '@google/genai'

export async function getSuggestions() {
    const { userId } = await auth()
    if (!userId) return { error: 'Not authenticated' }

    await connectToDatabase()
    const farmer = await Farmer.findOne({ clerkId: userId })
    if (!farmer) return { error: 'Farmer profile not found' }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

    const prompt = `You are an agricultural assistant. 
  The farmer speaks ${farmer.preferredLanguage}. 
  They grow these crops: ${farmer.crops.join(', ')}. 
  Provide short, clear suggestions in ${farmer.preferredLanguage} 
  about crop care, seasonal planning, and productivity improvements.`

    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        })

        return { suggestions: result.text }
    } catch (err) {
        console.error('Gemini Error:', err)
        return { error: 'Failed to fetch suggestions' }
    }
}
