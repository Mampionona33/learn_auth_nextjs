"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LoginForm from "../../../components/LoginForm";

function SignIn() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
    return null;
  }
  // Custom Login Page in Next-Auth and Next.js 13 Authentication : Complete Step-by-Step Tutorial
  // https://www.youtube.com/watch?v=hADeo48SATU
  return (
    <>
      <LoginForm />
    </>
  );
}

export default SignIn;
