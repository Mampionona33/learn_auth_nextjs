"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Layout from "layout.tsx";

const SignIn = () => {
  const { data: session, status } = useSession();
  console.log("session", session);

  // Vérifiez si l'utilisateur est déjà connecté
  if (session && session.user) {
    redirect("/");
    return null; // Assurez-vous de renvoyer null pour éviter le rendu de la page de connexion
  }

  // Le reste du contenu de votre page de connexion par défaut
  return (
    <div>
      <Layout>
        <h1>Page de connexion</h1>
      </Layout>
    </div>
  );
};

export default SignIn;
