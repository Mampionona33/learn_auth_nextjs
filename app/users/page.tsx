"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useGetUserLoggedGroupe from "@hook/useGetUserLoggedGroupe";
import { useAppContext } from "@context/AppContext";

const Users = () => {
  const { appState } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const { data: session } = useSession();
  const {
    userGroupe,
    loading: loadingUserGroupe,
    error: errorOnLoadingUserGroupe,
  } = useGetUserLoggedGroupe();

  const user = appState.user;

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);

  if (errorOnLoadingUserGroupe)
    return <h1>String(errorOnLoadingUserGroupe)</h1>;

  console.log(userGroupe);

  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
      {userGroupe && userGroupe?.groupe.name === "admin" ? (
        <p>PAGE user liste</p>
      ) : (
        <div className="d-flex">
          <h1>Vous n'êtes pas autorisé à accéder à cette page !</h1>
        </div>
      )}
      {(isLoading || loadingUserGroupe) && <p>Loading...</p>}
    </div>
  );
};

export default Users;
