"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>Welcome to the home page</h1>
      {status === "authenticated" ? (
        <div>
          <p>{session.user?.email}</p>
          <button onClick={() => signOut()}>Singn Out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Login Button</button>
      )}
    </div>
  );
};

export default Home;
