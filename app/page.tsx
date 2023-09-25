// Using server components
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Home = async () => {
  const data = await getServerSession(authOptions);

  if (data == null) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <a href="/api/auth/logout">Sign out</a>
    </div>
  );
};

export default Home;

// IF using client component
// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";

// const Home = () => {
//   const { data: session, status } = useSession();
//   return (
//     <div>
//       <h1>Welcome to the home page</h1>
//       {status === "authenticated" ? (
//         <div>
//           <p>{session.user?.email}</p>
//           <button onClick={() => signOut()}>Singn Out</button>
//         </div>
//       ) : (
//         <button onClick={() => signIn()}>Login Button</button>
//       )}
//     </div>
//   );
// };

// export default Home;
