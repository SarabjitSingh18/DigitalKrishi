import { BackgroundBeams } from "@/components/ui/background-beams";




export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (



        <div className="min-h-screen flex items-center justify-center mt-10 p-4">
            <BackgroundBeams />

            {children}
        </div>





    );
}
