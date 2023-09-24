import { getSession } from "next-auth/react";

export default async function authMiddleware({ req, res, resolvedUrl }) {
  const session = await getSession({ req });

  // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion ou effectuez une autre action
  if (!session) {
    return {
      redirect: {
        destination: "/", // Remplacez par l'URL de votre page de connexion
        permanent: false,
      },
    };
  }

  // Si l'utilisateur est authentifié, poursuivez le rendu de la page
  return {
    props: {},
  };
}
