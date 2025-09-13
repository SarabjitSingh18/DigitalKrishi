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

export async function getHighDemandCrops() {
  const { userId } = await auth()
  if (!userId) return { error: 'Not authenticated' }

  await connectToDatabase()
  const farmer = await Farmer.findOne({ clerkId: userId })
  if (!farmer) return { error: 'Farmer profile not found' }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  const prompt = `You are an agricultural assistant. 
The farmer is located in ${farmer.location} and grows these crops: ${farmer.crops.join(', ')}. 
Generate a list of the top 5 high demand crops in ${farmer.location} currently. 
Include the crop name, average market price in INR, season, and demand level in a JSON array. 
Only output valid JSON.`

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    // Safely parse result.text
    let crops: any[] = []
    if (result.text) {
      try {
        crops = JSON.parse(result.text)
      } catch (err) {
        console.error('Failed to parse AI response as JSON:', result.text, err)
      }
    } else {
      console.error('AI returned undefined text:', result)
    }

    return { crops }
  } catch (err) {
    console.error('Gemini Error:', err)
    return { error: 'Failed to fetch high-demand crops' }
  }
}