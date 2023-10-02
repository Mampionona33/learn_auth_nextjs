"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const origine = window.location.origin;
      console.log(session?.user);

    fetchData();
  }, [session]);

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
    return null;
  }

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
