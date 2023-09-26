"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ResponsableHomePage = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/api/auth/signin"); // Utilisez redirect comme une fonction
    return null;
  }
  const handleLogout = () => {
    signOut();
  };
  console.log(JSON.stringify(session));
  return (
    <>
      {session ? (
        <div>
          <h1>Welcome to the ResponsableHomePage page</h1>
          <p>{session.user!.email}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            type="button"
            onClick={handleLogout}
          >
            sign out
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ResponsableHomePage;
