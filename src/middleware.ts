import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const AUTH_ROUTES = ["/login"];
const ONBOARDING_ROUTE = "/onboarding";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isOnboarding = pathname === ONBOARDING_ROUTE;

  if (session && isAuthRoute) {
    if (!session.user.name || session.user.name.trim() === "") {
      return NextResponse.redirect(new URL(ONBOARDING_ROUTE, request.url));
    }
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    session &&
    !isOnboarding &&
    (!session.user.name || session.user.name.trim() === "")
  ) {
    return NextResponse.redirect(new URL(ONBOARDING_ROUTE, request.url));
  }

  if (
    session &&
    isOnboarding &&
    session.user.name &&
    session.user.name.trim() !== ""
  ) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon).*)"],
};
