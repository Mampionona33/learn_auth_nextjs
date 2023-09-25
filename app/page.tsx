// Using server components
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

// const Home = async () => {
//   const data = await getServerSession(authOptions);

//   if (data == null) {
//     redirect("/api/auth/signin");
//   }
//   return (
//     <div>
//       <div>{JSON.stringify(data)}</div>
//     </div>
//   );
// };

// export default Home;

// IF using client component
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/api/auth/signin"); // Utilisez redirect comme une fonction
    return null;
  }
  const handleLogout = () => {
    signOut();
  };
  console.log(JSON.stringify(session));
  return (
    <div>
      <h1>Welcome to the home page</h1>
      {session ? session.user.email : null}
      <button type="button" onClick={handleLogout}>
        sign out
      </button>
    </div>
  );
};

export default Home;
