import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const expiresIn6hrs = new Date(new Date().getTime() + 6 * 60 * 60 * 1000);
  const isAuth = request.cookies.get('access_token')?.value;
  const refresh_token = request.cookies.get('refresh_token')?.value;
  // const provider_id = request.cookies.get('provider_id')?.value;
  const pathname = request.nextUrl.pathname;
  const isAuthPage =
    pathname.startsWith('/auth') &&
    !pathname.includes('/auth/verify-email') &&
    !pathname.includes('/auth/create-business');

  if (isAuthPage) {
    if (isAuth) {
      return Response.redirect(new URL('/', request.url));
    }
    return null;
  }

  if (!isAuth && !refresh_token) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    return Response.redirect(
      new URL(
        `/auth/sign-in?redirectUrl=${encodeURIComponent(from)}`,
        request.url
      )
    );
  }
  let token = null;
  if (!isAuth && refresh_token) {
    await fetch(
      `${process.env.API_BASE_URL}/auth/access-token?refreshToken=${refresh_token}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        // console.log(response);
        if (response.ok) {
          // console.log(response);
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data);
        if (data) {
          token = data?.accessToken;
        }
      })
      .catch((error) => {
        if (error) console.error(error);
      });
  }

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  if (token) {
    response.headers.set('Authorization', `Bearer ${token}`);
    response.cookies.set({
      name: 'access_token',
      value: token,
      expires: expiresIn6hrs,
    });
  }

  return response;
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|.*\\.svg$).*)', // '/.(.*)$/',
  ],
};
