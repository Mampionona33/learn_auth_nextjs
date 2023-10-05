import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppContext } from "../context/AppContext";

const useGetUserData = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch, appState } = useAppContext();

  useEffect(()=>{
    
  })

};

export default useGetUserData;
