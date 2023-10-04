"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Users = () => {
  const { appState } = useAppContext();
  const [isLoading, setLoading] = useState(true);

  const user = appState.user;

  useEffect(() => {
    let mount = true;

    if (user) {
      setLoading(false);
    }

    return () => {
      mount = false;
    };
  }, [user]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {user ? (
        <>
          <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
            <p>user list</p>
            {appState.user ? <div>hello</div> : <p>No user data available</p>}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Users;
