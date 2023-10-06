"use client";

import ResponsableDashboard from "../components/ResponsableDashboard";
import AdminDashboard from "../components/AdminDashboard";
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
    return <p>{String(errorOnGetUserGroupe)}</p>;
  }
  
  

  return (
    <>
      {userData ? (
        <div className="col-md-9 ml-sm-auto col-lg-10 p-4">
          {userGroupe && userGroupe.groupe.name === "responsable" ? (
            <ResponsableDashboard />
          ) : userGroupe && userGroupe.groupe.name === "admin" ? (
            <AdminDashboard />
          ) : null}
          <pre>{userGroupe ? JSON.stringify(userGroupe, null, 2) : ""}</pre>
          {loadingUserData || loadingUserloggedGroupe ? <p>Loading ...</p> : ""}
        </div>
      ) : (
        null
      )}
    </>
  );
  
};

export default Dashboard;
