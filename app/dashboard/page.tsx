"use client";

import Card from "../components/Card";
import ResponsableDashboard from "../components/ResponsableDashboard";
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

  if (errorLoadingUserData) {
    return <p>${errorLoadingUserData}</p>;
  }

  if (errorOnGetUserGroupe) {
    return <p>${errorOnGetUserGroupe}</p>;
  }

  console.log(userGroupe);

  return (
    <>
      {userData ? (
        <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
          {/* <Card /> */}
          {userGroupe && userGroupe!.groupe.name === "responsable" ? (
            <ResponsableDashboard />
          ) : null}
          {/* <pre>{userGroupe ? JSON.stringify(userGroupe, "", 2) : ""}</pre> */}
          {loadingUserData || loadingUserloggedGroupe ? <p>Loading ...</p> : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
