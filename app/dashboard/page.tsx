"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import prisma from "@/lib/prisma/prisma";



const Dashboard = () => {
  const { data: session, status } = useSession();
  console.log(session?.user)

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
    return null;
  }
 
  return (
    <>
      {session ? (
        <div>
          <Navbar />
          <h1>Welcome to the dashboard page</h1>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
