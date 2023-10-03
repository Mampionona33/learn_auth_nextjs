"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
    return null;
  }

  useEffect(() => {
    if (session && session.user?.id) {
      fetch(`/api/users/${session.user.id}`)
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
  }, [session, session?.user]);

  if (isLoading) return <p>Loading...</p>;
  if (!userData) return <p>No profile data</p>;

  console.log("userData", userData);

  return (
    <>
      {session ? (
        <div>
          <Navbar />
          <div className="container-sm max-vh-100 p-3">
            <Card />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
