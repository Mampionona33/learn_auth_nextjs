import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ActionTypes, useAppContext } from "../context/AppContext";
import { IUser } from "../context/interfaceUser";

const useGetUserData = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch, appState } = useAppContext();
  const { data: session, status } = useSession();

  useEffect(() => {
    let mount = true;
    const fetchData = async () => {
      try {

        if(!appState.user){

          if (session?.user?.id) {
            if (!appState.user) {
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
            } 
            
          }
          
        } else {
          if (mount) {
            setUserData(appState.user);
            setLoading(false);
          }
        }
      } catch (error:any) {
        setError(error)
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

  return { userData, loading, error };
};

export default useGetUserData;
