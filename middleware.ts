export { default } from "next-auth/middleware";

// this code will protect any attempts from unauthorize users that will try to access protected route.
export const config = { matcher: ["/protected/:path*"] };
