"use server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken, GetTokenParams } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let params: GetTokenParams = {
    req: request,
    secret: process.env.AUTH_SECRET ?? "secret",
  };

  if (process.env.NODE_ENV === "production") {
    params = {
      ...params,
      cookieName: "__Secure-authjs.session-token",
    };
  }

  const token = await getToken(params);

  const protectedRoutes = ["/feed"];

  if (
    protectedRoutes.some((route) =>
      pathname.startsWith(route.replace(":path*", ""))
    )
  ) {
    if (!token) {
      const url = new URL("/error", request.url);
      url.searchParams.set("message", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/feed"],
};
