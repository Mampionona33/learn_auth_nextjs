"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { ActionTypes, useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { dispatch, appState } = useAppContext();

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
    return null;
  }

  useEffect(() => {
    let mount = true;

    if (session && session.user?.id) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/users/${session.user.id}`);
          const data = await res.json();

          if (mount) {
            setUserData(data);
            setLoading(false);
            if (!appState.user) {
              dispatch({ type: ActionTypes.SET_USER, payload: data.user });
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);

          if (mount) {
            setLoading(false);
          }
        }
      };
      fetchData();
    } else {
      if (mount) {
        setLoading(false);
      }
    }

    // La fonction de nettoyage
    return () => {
      mount = false;
    };
  }, [appState, session]);

  if (isLoading) return <p>Loading...</p>;
  if (!userData) return <p>No profile data</p>;

  if (appState.user) {
    console.log("user", appState.user);
  }

  return (
    <>
      {session ? (
        // <div className="col-md-9 ml-sm-auto col-lg-10 p-4 ml-14">
        <div className="col-md-2 d-none d-md-block">
          <Card />
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
