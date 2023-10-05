import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "../context/AppContext";

const useGetUserLoggedGroupe = () => {
  const [userGroupe, setUserGroupe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const { dispatch, appState } = useAppContext();

  useEffect(() => {
    let mount = true;

    async function fetchData() {
      try {
        if (appState?.user?.groupe) {
          const resp = await fetch(`/api/groupe/${appState.user.groupe}`);
          const data = await resp.json();

          if (mount) {
            setUserGroupe(data);
            setLoading(false);
          }
        } else {
          if (mount) {
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
  }, [appState, dispatch]);

  return { userGroupe, loading, error };
};

export default useGetUserLoggedGroupe;
