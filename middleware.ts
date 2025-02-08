
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  // Clerk's JWT cookies
  const clerkJwt = cookieStore.get("__clerk_db_jwt");

  // If Clerk's JWT cookie is available, it indicates user is authenticated
  const isAuthenticated = clerkJwt?.value;

  // URLs for sign-up and sign-in
  const isSignUpPage = request.nextUrl.pathname.includes("/sign-up");
  const isSignInPage = request.nextUrl.pathname.includes("/sign-in");

  // Prevent infinite redirect loop by checking the "redirected" cookie
  const isRedirected = cookieStore.get("redirected");

  // If user is not authenticated and trying to access any page other than sign-up or sign-in
  if (!isAuthenticated && !isSignUpPage && !isSignInPage && !isRedirected) {
    // Set a "redirected" cookie to prevent infinite loop
    const redirectUrl = new URL(request.url);
    redirectUrl.searchParams.set("redirected", "true");

    // Redirect to sign-in page
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If user is authenticated and trying to access the sign-in page, redirect them home
  if (isAuthenticated && isSignInPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user was redirected, remove the "redirected" flag
  if (isRedirected) {
    const response = NextResponse.next();
    response.cookies.delete("redirected"); // Remove the redirected flag
    return response;
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
    matcher: [
             // Skip Next.js internals and all static files, unless found in search params
             '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
             // Always run for API routes
             '/(api|trpc)(.*)',
           ],
};