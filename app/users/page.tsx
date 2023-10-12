"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useGetUserLoggedGroupe from "@hook/useGetUserLoggedGroupe";
import { useAppContext } from "@context/AppContext";
import { useAppDispatch, useAppSelector } from "../hook/store";
import { redirect } from "next/navigation";
import { fetchUsers } from "../store/users/userActions";

const Users = () => {
  const { appState } = useAppContext();
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const userLogged = useAppSelector((state) => state.userLogged);
  const userList = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  const users = [userList!.liste!.users].flat();

  const {
    userGroupe,
    loading: loadingUserGroupe,
    error: errorOnLoadingUserGroupe,
  } = useGetUserLoggedGroupe();

  useEffect(() => {
    let mount = true;

    const fetchUserList = async () => {
      try {
        await dispatch(fetchUsers());
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
      }
    };

    if (!userList.liste) {
      fetchUserList();
    }

    return () => {
      mount = false;
    };
  }, [userList]);

  useEffect(() => {
    let mount = true;

    if (session) {
      setLoading(false);
    }

    return () => {
      mount = false;
    };
  }, [session]);

  // users.map((el) => console.log(el));

  const Table = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénoms</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0
            ? users.map((el, index) => {
              console.log(el)
                return (
                  <tr key={index}>
                    <td>{el.name.firstname}</td>
                    <td>{el.name.lastname}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    );
  };

  if (errorOnLoadingUserGroupe)
    return <h1>String(errorOnLoadingUserGroupe)</h1>;

  if (userLogged.groupe && userLogged.groupe!.name !== "admin") {
    redirect("/unauthorized");
    return null;
  }

  return (
    <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
      {isLoading || loadingUserGroupe ? (
        <p>Loading...</p>
      ) : userLogged.groupe && userLogged.groupe!.name === "admin" ? (
        <>
          <p>PAGE user liste</p>
          <Table />
        </>
      ) : (
        <div className="d-flex">
          <h1>Vous n'êtes pas autorisé à accéder à cette page !</h1>
        </div>
      )}
    </div>
  );
};

export default Users;
