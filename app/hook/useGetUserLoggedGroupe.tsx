import { useState, useEffect } from "react";
import { ActionTypes, useAppContext } from "../context/AppContext";

const useGetUserLoggedGroupe = () => {
  const [userGroupe, setUserGroupe] = useState<IGroupe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
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
            if (!appState.userGroupe) {
              dispatch({
                type: ActionTypes.SET_USER_GROUPE,
                payload: data.groupe,
              });
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
  }, [appState, dispatch]);

  return { userGroupe, loading, error };
};

export default useGetUserLoggedGroupe;
