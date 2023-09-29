"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function SignIn() {
  const { data: session } = useSession();

  // Vérifiez si l'utilisateur est déjà connecté
  if (session) {
    redirect.push("/"); // Remplacez '/tableau-de-bord' par le chemin de votre choix
    return null; // Assurez-vous de renvoyer null pour éviter le rendu de la page de connexion
  }

  // Le reste du contenu de votre page de connexion par défaut
  return (
    <div>
      <h1>Page de connexion</h1>
      {/* Autres éléments de la page de connexion */}
    </div>
  );
}

export default SignIn;
