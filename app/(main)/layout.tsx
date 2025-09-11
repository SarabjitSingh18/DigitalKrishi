import Sidebar from "@/components/dashboardPage/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="mt-[15%] lg:m-[5%] lg:ml-[30%]">{children}</main>
    </div>
  );
}
