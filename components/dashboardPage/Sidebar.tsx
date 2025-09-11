"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, Bot, CloudSun, BadgePercent } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat Agent", href: "/dashboard/chat", icon: Bot },
  { name: "Weather", href: "/dashboard/weather", icon: CloudSun },
  { name: "Subsidies", href: "/dashboard/subsidies", icon: BadgePercent },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen(!open)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full lg:w-[18%] w-[70%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg p-6 transition-transform z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-10 tracking-tight">
          🌱 Krishi
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
