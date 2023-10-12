"use client";
import { Poppins } from "next/font/google";
import AuthProvider from "./components/AuthProvider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AppContextProvider } from "./context/AppContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { usePathname } from "next/navigation";

const inter = Poppins({
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showNavbar = pathname === "/api/auth/signin" ? false : true;
  const showSidebar = pathname === "/api/auth/signin" ? false : true;

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <AuthProvider>
            <Provider store={store}>
              <AppContextProvider>
                <div className="d-flex flex-col min-h-screen h-screen">
                  {showNavbar && <Navbar />}
                  <div className="container-fluid p-0">
                    <div className="flex h-full">
                      {showSidebar && (
                        <div className="col-md-2 d-none d-md-block p-0">
                          <Sidebar />
                        </div>
                      )}
                      <div className="flex p-3.5 w-full justify-between">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </AppContextProvider>
            </Provider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
