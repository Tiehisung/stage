import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const pathname = request.nextUrl.pathname;
    console.log("pathname", pathname);
    const token = request.nextauth.token;
    console.log("token@midware", token);
    //When accessing admin pages
    if (pathname.startsWith("/admin")) {
      if (token?.role == "admin")
        return NextResponse.rewrite(new URL("/admin", request.url));
      else return NextResponse.rewrite(new URL("/", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
