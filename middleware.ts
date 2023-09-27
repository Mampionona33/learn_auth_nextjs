import { withAuth } from "next-auth/middleware";
import redirectToResponsableHomepage from "@lib/middleware/redirectToResponsableHomepage";

export default withAuth(function middleware(req) {
  //   console.log(req.nextauth.token);
  redirectToResponsableHomepage(req);
});

// export const config = {
//   matcher: ["/:path*"],
// };
