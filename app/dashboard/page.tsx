"use client";

import Card from "../components/Card";
import useGetUserLoggedGroupe from "../hook/useGetUserLoggedGroupe";
import useGetUserData from "../hook/useGetUserData";

const Dashboard = () => {
  const {
    userData,
    error: errorLoadingUserData,
    loading: loadingUserData,
  } = useGetUserData();
  const {
    userGroupe,
    loading: loadingUserloggedGroupe,
    error: errorOnGetUserGroupe,
  } = useGetUserLoggedGroupe();

  // if (loadingUserData || loadingUserloggedGroupe) {
  //   return <p>Loading ...</p>;
  // }

  if (errorLoadingUserData) {
    return <p>${errorLoadingUserData}</p>;
  }

  if (errorOnGetUserGroupe) {
    return <p>${errorOnGetUserGroupe}</p>;
  }

  return (
    <>
      {userData ? (
        <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
          <Card />
          <pre>{userGroupe ? JSON.stringify(userGroupe, "", 2) : ""}</pre>
          {loadingUserData || loadingUserloggedGroupe ? <p>Loading ...</p> : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
