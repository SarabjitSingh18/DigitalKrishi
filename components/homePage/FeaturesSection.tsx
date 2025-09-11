import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 dark:text-green-400 mb-12">
        How Can We Help Farmers?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl hover:scale-105 transition rounded-2xl border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">🌾 Crop Guidance</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            Get tailored advice for your crops based on location, season, and challenges.
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl hover:scale-105 transition rounded-2xl border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">🐛 Pest Control</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            Instantly know the best pesticide and prevention measures for crop diseases.
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl hover:scale-105 transition rounded-2xl border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">🌦️ Weather Alerts</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            Stay updated with localized weather forecasts and farming recommendations.
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
