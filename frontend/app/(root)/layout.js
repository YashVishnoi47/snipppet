import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "My Next.js App",
  description: "A collaborative code editor with WebSockets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`antialiased`}>
          <Navbar />
          {children}
          <Toaster richColors closeButton theme="light" />
        </body>
      </AuthProvider>
    </html>
  );
}
