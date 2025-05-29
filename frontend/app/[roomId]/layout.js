import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import { SocketProvider } from "@/context/SocketContext";
import AuthProvider from "@/context/AuthProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default function RoomLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`w-full h-screen flex flex-col items-center`}>
          <main className="w-full h-full">
            {/* <Navbar /> */}
            <SocketProvider>{children}</SocketProvider>
          </main>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
