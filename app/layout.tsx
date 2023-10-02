"use client";
import { Poppins } from "next/font/google";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import("bootstrap/dist/js/bootstrap");

const inter = Poppins({
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
