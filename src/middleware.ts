import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/profile', '/home']
const authPaths = ['/sign-in', '/sign-up', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log("Middleware running...");
  console.log("Cookies received:", request.cookies.getAll());

  const sessionToken = request.cookies.get("sessionToken")?.value;
  console.log("sessionToken in middleware:", sessionToken);

  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/home', '/profile/:path*', '/sign-in', '/sign-up'/* ,'/forgot-password' */]
}
