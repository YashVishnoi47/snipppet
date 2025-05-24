import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import "../globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`w-full min-h-screen flex flex-col items-center`}>
          <Navbar />
          <main className="w-full h-full">{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
};

export default Layout;
