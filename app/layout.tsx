"use client";
import { Poppins } from "next/font/google";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { AppContextProvider } from "./context/AppContext";

const inter = Poppins({
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <AuthProvider>
            <AppContextProvider>
              <Navbar />
              {children}
            </AppContextProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
