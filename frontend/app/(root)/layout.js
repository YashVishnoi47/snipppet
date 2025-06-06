import "../globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from 'next/font/google';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "Snippet",
  description: "Seamless Real-Time Code Collaboration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`antialiased ${inter.variable}`}>
          {children}
          <Toaster richColors closeButton theme="light" />
        </body>
      </AuthProvider>
    </html>
  );
}
