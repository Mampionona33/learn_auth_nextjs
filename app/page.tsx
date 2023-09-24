"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();

  const handleSignin = () => {
    signIn("google");
  };

  const handleSignout = () => {
    signOut();
  };
  // this if condition will check if the user is authenticated or not
  if (status === "authenticated") {
    return (
      <div>
        <h1>{session.user?.email}</h1>
        <button onClick={handleSignout}>Logout</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleSignin}>Login Button</button>
    </div>
  );
};

export default Home;
