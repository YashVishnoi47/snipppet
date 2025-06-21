import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl;
  console.log(url.pathname);

  if (token) {
    if (url.pathname === "/signIn" || url.pathname === "/signUp") {
      return NextResponse.redirect(new URL("/userProfile", request.url));
    }
  }
  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/sign"],
};
