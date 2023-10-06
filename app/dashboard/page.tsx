"use client"

import React, { useEffect } from "react";
import ResponsableDashboard from "../components/ResponsableDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { getUserLogged } from "../store/userLogged/userLoggedActions";
import { useSession } from "next-auth/react";
import useGetUserData from "../hook/useGetUserData";
import useGetUserLoggedGroupe from "../hook/useGetUserLoggedGroupe";
import { useAppDispatch, useAppSelector } from "../hook/store";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const userLogged = useAppSelector((state) => state.userLogged);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        try {
          await dispatch(getUserLogged(session.user.id));
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, session]);

  

  const {
    userData,
    error: errorLoadingUserData,
    loading: loadingUserData,
  } = useGetUserData();

  const {
    userGroupe,
    loading: loadingUserloggedGroupe,
    error: errorOnGetUserGroupe,
  } = useGetUserLoggedGroupe();

  if (errorLoadingUserData) {
    return <p>{errorLoadingUserData}</p>;
  }

  if (errorOnGetUserGroupe) {
    return <p>{String(errorOnGetUserGroupe)}</p>;
  }

  console.log("userLogged in dashboard", userLogged);

  return (
    <>
      {userData ? (
        <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
          {userGroupe && userGroupe.name === "responsable" ? (
            <ResponsableDashboard />
          ) : userGroupe && userGroupe.name === "admin" ? (
            <AdminDashboard />
          ) : null}
          <pre>{userGroupe ? JSON.stringify(userGroupe, null, 2) : ""}</pre>
          {loadingUserData || loadingUserloggedGroupe ? <p>Loading ...</p> : null}
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
