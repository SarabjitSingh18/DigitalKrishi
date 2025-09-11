// components/dashboardPage/DashboardPageServices.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MessageCircle, CloudSun, BadgeDollarSign } from "lucide-react";

const services = [
  {
    name: "Chat Agent",
    description: "Get instant farming advice from AI.",
    href: "/dashboard/chat",
    icon: <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />,
    badge: "AI Powered",
  },
  {
    name: "Weather Updates",
    description: "Localized forecasts for your crops.",
    href: "/dashboard/weather",
    icon: <CloudSun className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    badge: "Live",
  },
  {
    name: "Subsidy Info",
    description: "Check eligibility and government schemes.",
    href: "/dashboard/subsidies",
    icon: <BadgeDollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
    badge: "New",
  },
];

export default function DashboardPageServices() {
  return (
    <section className="p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
        Welcome to Your Dashboard 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Link href={service.href} key={service.name}>
            <Card className="group relative flex flex-col justify-between min-h-[200px] border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 rounded-2xl shadow-md hover:shadow-xl cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <div>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {service.name}
                    </CardTitle>
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                      {service.badge}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors line-clamp-2">
                    {service.description}
                  </p>
                </CardContent>
              </div>
              {/* Gradient hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-200/0 via-green-200/5 to-green-200/0 dark:from-green-900/0 dark:via-green-900/10 dark:to-green-900/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
