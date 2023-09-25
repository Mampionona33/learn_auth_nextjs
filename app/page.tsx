"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>Welcome to the home page</h1>
      {status === "authenticated" ? (
        <p>{session.user?.email}</p>
      ) : (
        <button onClick={() => signIn("google")}>Login Button</button>
      )}
    </div>
  );
};

export default Home;
