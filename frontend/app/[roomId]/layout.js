import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import { SocketProvider } from "@/context/SocketContext";
import AuthProvider from "@/context/AuthProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RoomLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`w-full h-screen flex flex-col items-center ${inter.variable}`}>
          <main className="w-full h-full">
            {/* <Navbar /> */}
            <SocketProvider>{children}</SocketProvider>
          </main>
          <Toaster richColors closeButton theme="light" />
        </body>
      </AuthProvider>
    </html>
  );
}
