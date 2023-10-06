import { useState, useEffect, use } from "react";
import { ActionTypes, useAppContext } from "../context/AppContext";
import { IGroupe } from "../context/interfaceGroupe";
import { useSession } from "next-auth/react";
import useGetUserData from "./useGetUserData";

const useGetUserLoggedGroupe = () => {
  const [userGroupe, setUserGroupe] = useState<IGroupe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const { dispatch, appState } = useAppContext();
  const { data: session } = useSession();

  useEffect(() => {
    let mount = true;

    async function fetchData() {
      try {
        if (!appState?.userGroupe) {

          if (session && session.user?.id) {
            const userFetch = await fetch(`/api/users/${session.user.id}`);

            if (!userFetch.ok) {
              throw new Error("Failed to fetch user data");
            }

            const userData = await userFetch.json();

            if (userData) {
              const res = await fetch(`/api/groupe/${userData.user.groupe}`);

              if (!res.ok) {
                throw new Error("Failed to fetch user data");
              }

              const groupe = await res.json();
              // console.log("groupe",groupe.groupe);
              
              if (mount) {
                setUserGroupe(groupe.groupe);
                setLoading(false);
              }
            }

          }
        } else {
          if (mount) {
            setUserGroupe(appState.userGroupe);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user group data:", error);
        if (mount) {
          setError(error);
        }
      }
    }

    fetchData();

    return () => {
      mount = false;
    };
  }, [session,appState, dispatch]);

  return { userGroupe, loading, error };
};

export default useGetUserLoggedGroupe;
