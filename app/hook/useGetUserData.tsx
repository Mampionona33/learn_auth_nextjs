import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "../context/AppContext";
import { useSession } from "next-auth/react";

const useGetUserData = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch, appState } = useAppContext();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user?.id && !appState.user) {
          const res = await fetch(`/api/users/${session.user.id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
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

  return { userInfo, loading, error };
};

export default useGetUserData;
