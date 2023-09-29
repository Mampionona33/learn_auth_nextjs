"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

const ResponsableHomePage = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/api/auth/signin"); // Utilisez redirect comme une fonction
    return null;
  }
  const handleLogout = () => {
    signOut();
  };
  // console.log(JSON.stringify(session));
  return (
    <>
      {session ? (
        <div>
          <Navbar />
          <h1>Welcome to the ResponsableHomePage page</h1>
          
        </div>
      ) : null}
    </>
  );
};

export default ResponsableHomePage;
