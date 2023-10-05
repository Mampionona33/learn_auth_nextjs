"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { ActionTypes, useAppContext } from "../context/AppContext";
import useGetUserLoggedGroupe from "../hook/useGetUserLoggedGroupe";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { dispatch, appState } = useAppContext();
  const { userGroupe, loading, error } = useGetUserLoggedGroupe();

  useEffect(() => {
    let mount = true;

    const fetchData = async () => {
      try {
        if (session?.user?.id && !appState.user) {
          const res = await fetch(`/api/users/${session.user.id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await res.json();

          if (mount) {
            setUserData(data);
            setLoading(false);
            if (!appState.user) {
              dispatch({ type: ActionTypes.SET_USER, payload: data.user });
            }
          }
        } else {
          if (mount) {
            setLoading(false);
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

    return () => {
      mount = false;
    };
  }, [session, appState, dispatch]);

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
    return null;
  }

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!appState.user) return <p>No profile data</p>;

  return (
    <>
      {session ? (
        <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
          <Card />
          <pre>{JSON.stringify(userGroupe, null, 2)}</pre>
        </div>
      ) : null}
    </>
  );
};


export default Dashboard;
