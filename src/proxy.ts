"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : undefined,
  });

  const protectedRoutes = ["/feed"];
  const authRoutes = ["/", "/accounts/password/reset"];

  /**  Неавторизован → пытается попасть в feed */
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**  Авторизован → пытается попасть на логин */
  if (token && authRoutes.some((route) => pathname === route)) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/accounts/password/reset", "/feed/:path*"],
};
