import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const useGetUserLoggedGroupe = () => {
  const [userGroupe, setUserGroupe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    let mount = true;
    async function fetchData() {
      try {
        if (session && session.user?.groupe) {
          const resp = await fetch(`/api/groupe/${session.user.groupe}`);
          const data = await res.json();
          if (mount) {
            setUserGroupe(data);
            setLoading(false);
          }
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
    return () => {
      mount = false;
    };
  }, [session, appState, dispatch]);
};

export default useGetUserLoggedGroupe;
