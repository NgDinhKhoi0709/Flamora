import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Temporarily disabled to debug redirect loop
    return null;
  },
  {
    callbacks: {
      authorized: () => true,
    },
    secret: process.env.NEXTAUTH_SECRET || "flamora_secret_key_1234567890",
  }
);



export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/orders/:path*", "/login", "/register"],
};
