import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`w-full min-h-screen flex flex-col items-center`}>
        <Navbar />
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
