import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;
  const basedUrl = req.nextUrl;

  // console.log("req:", basedUrl);
  // console.log(token);
  // if (token && token._id && /^(\/api\/auth\/signin)/gi.test(pathname)) {
  //   const respHomePage = new URL("/responsable", req.url);
  //   return NextResponse.redirect(respHomePage);
  // }

  try {
    if (token) {
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

      const userLogged = user.user;
      if (userLogged && userLogged.length > 0) {
        const groupeId = userLogged[0].groupe;

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
