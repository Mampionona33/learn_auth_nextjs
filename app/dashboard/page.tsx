"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/api/auth/signin"); // Utilisez redirect comme une fonction
    return null;
  }
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      {session ? (
        <div>
          <Navbar />
          <h1>Welcome to the dashboard page</h1>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
