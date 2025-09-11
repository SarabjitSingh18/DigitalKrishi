
import FAQSection from "@/components/homePage/Faq";
import FeaturesSection from "@/components/homePage/FeaturesSection";
import Footer from "@/components/homePage/Footer";
import HeroSection from "@/components/homePage/HeroPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col  bg-background text-foreground transition-colors">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />
      {/* Faq section */}
      <FAQSection />

      {/* Footer */}
      <Footer/>
    </main>
  );
}
