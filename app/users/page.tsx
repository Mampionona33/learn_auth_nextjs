"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useGetUserLoggedGroupe from "@hook/useGetUserLoggedGroupe";
import { useAppContext } from "@context/AppContext";
import { useAppDispatch, useAppSelector } from "../hook/store";

const Users = () => {
  const { appState } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const userLogged = useAppSelector((state)=>state.userLogged)

  const {
    userGroupe,
    loading: loadingUserGroupe,
    error: errorOnLoadingUserGroupe,
  } = useGetUserLoggedGroupe();


  useEffect(() => {
    let mount = true;

    if (session) {
      setLoading(false);
    }

    return () => {
      mount = false;
    };
  }, [session]);

  // if(userLogged){
  //   console.log("from user page",userLogged);
  // }

  if (errorOnLoadingUserGroupe)
    return <h1>String(errorOnLoadingUserGroupe)</h1>;

  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
      {isLoading || loadingUserGroupe ? (
        <p>Loading...</p>
      ) : userLogged.groupe && userLogged.groupe!.name === "admin" ? (
        <p>PAGE user liste</p>
      ) : (
        <div className="d-flex">
          <h1>Vous n'êtes pas autorisé à accéder à cette page !</h1>
        </div>
      )}
    </div>
  );
};

export default Users;
