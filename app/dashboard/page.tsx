"use client";

import {  useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";


const Dashboard =  () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  
  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
    return null;
  }

  useEffect(() => {
      if (session) {
      // Check if user's email is available
      if (session.user?.email) {
        fetch(`/api/users/65127ffde4e55c82c6ada8e7`)
          .then((res) => res.json())
          .then((data) => {
            setUserData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [session]);

  if (isLoading) return <p>Loading...</p>
  if (!userData) return <p>No profile data</p>

  // console.log(userData);
 
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
