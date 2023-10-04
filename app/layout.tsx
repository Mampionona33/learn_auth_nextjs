"use client";
import { Poppins } from "next/font/google";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AppContextProvider } from "./context/AppContext";
// import { useState } from "react";

const inter = Poppins({
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isLoginPage, setLoginPage] = useState(false);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <AuthProvider>
            <AppContextProvider>
            <div className="d-flex flex-col h-screen">
              <Navbar />
              <div className="container-fluid">
                <div className="row ">
                  <div className="col-md-2 d-none d-md-block p-0">
                    <Sidebar />
                  </div>
                  {children}
                </div>
              </div>
            </div>
            </AppContextProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
