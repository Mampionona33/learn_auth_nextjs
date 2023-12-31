"use client";

import React, { useEffect } from "react";
import ResponsableDashboard from "../components/ResponsableDashboard";
import AdminDashboard from "../components/AdminDashboard";
import {
  getUserLogged,
  getUserLoggedGroupe,
} from "../store/userLogged/userLoggedActions";
import { useSession } from "next-auth/react";
import useGetUserData from "../hook/useGetUserData";
import useGetUserLoggedGroupe from "../hook/useGetUserLoggedGroupe";
import { useAppDispatch, useAppSelector } from "../hook/store";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const userLogged = useAppSelector((state) => state.userLogged);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mount = true;
    const fetchData = async () => {
      if (session && session.user) {
        try {
          if (!userLogged.generalInfo) {
            await dispatch(getUserLogged(session.user.id));
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur:",
            error,
          );
        }
      }
    };
    if (mount) {
      fetchData();
    }
    return () => {
      mount = false;
    };
  }, [dispatch, session]);

  useEffect(() => {
    let mount = true;

    const initializeUserGroupe = async () => {
      try {
        await dispatch(getUserLoggedGroupe(userLogged.generalInfo.groupe));
      } catch (error) {
        console.log(
          "Erreur lors de la récupération du groupe de l'utilisateur:",
          error,
        );
      }
    };

    if (
      mount &&
      userLogged &&
      userLogged?.generalInfo?.groupe &&
      !userLogged.groupe
    ) {
      initializeUserGroupe();
    }

    return () => {
      mount = false;
    };
  }, [userLogged]);

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

  // console.log("userLogged in dashboard", userLogged);

  return (
    <>
      {userLogged ? (
        <div className="flex justify-start w-100 gap-4">
          {userGroupe && userGroupe.name === "responsable" ? (
            <ResponsableDashboard />
          ) : userGroupe && userGroupe.name === "admin" ? (
            <AdminDashboard />
          ) : null}
          <pre>{userGroupe ? JSON.stringify(userGroupe, null, 2) : ""}</pre>
          {loadingUserData || loadingUserloggedGroupe ? (
            <p>Loading ...</p>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
