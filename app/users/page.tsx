"use client";
import { useAppContext } from "../context/AppContext";

const Users = () => {
  const { appState } = useAppContext();

  const user = appState.user;
  console.log(appState.user);

  return (
    <>
      <p>user list</p>
      {user ? (
        <div>
          hello
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </>
  );
};

export default Users;
