import Link from "next/link";
import { Button } from "@/components/ui/button";

import React from 'react'

const HeroSection = () => {
    return (
        <div>
            <section className="w-full bg-green-600 dark:bg-green-700 text-white py-30 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    🌱 Digital Krishi Officer
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    Get instant, reliable, and personalized farming advice in your own
                    language. Ask about crops, pests, weather, subsidies, and more.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild variant="secondary" size="lg">
                        <Link href="/dashboard">Ask a Question</Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg" className="text-white border-white">
                        <Link href="/about">Learn More</Link>
                    </Button>
                </div>
            </section>

        </div>
    )
}

export default HeroSection
