import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;

  try {
    if (token) {
      // Vous devrez ajuster l'URL de votre API utilisateur en fonction de votre configuration
      const userResponse = await fetch(
        `${process.env.NEXTAUTH_URL}/api/users/${token._id}`,
      );

      if (!userResponse.ok) {
        console.error(
          `Fetching user role failed with status ${userResponse.status}`,
        );
        return NextResponse.error();
      }

      const user = await userResponse.json();

      // Assurez-vous que userLogged est un tableau non vide avant d'accéder à ses propriétés
      const userLogged = user.user;
      if (userLogged && userLogged.length > 0) {
        const groupeId = userLogged[0].groupe;

        // Vous devrez ajuster l'URL de votre API groupe en fonction de votre configuration
        const groupeResponse = await fetch(
          `${process.env.NEXTAUTH_URL}/api/groupe/${groupeId}`,
        );

        if (!groupeResponse.ok) {
          console.error(
            `Fetching groupe failed with status ${groupeResponse.status}`,
          );
          return NextResponse.error();
        }

        const groupe = await groupeResponse.json();

        const groupeName = await groupe.groupes[0].name;

        console.log("user logged:", groupeName);
        console.log("pathname:", pathname);

        // Vous pouvez maintenant vérifier si le groupe correspond à un rôle responsable et rediriger en conséquence
        if (groupeName.match(/responsable/gi) && pathname === "/") {
          const respHomePage = new URL("/responsable", req.url);
          return NextResponse.redirect(respHomePage);
        }
      }
    }
  } catch (error) {
    console.error("Error while fetching user role:", error);
    return NextResponse.error();
  }
});
