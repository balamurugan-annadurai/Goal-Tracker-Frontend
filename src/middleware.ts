import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;
  const { nextUrl ,cookies} = req;

  const token = cookies.get("goalTrackerJwtToken")

  // Redirect logged-in user to `/projects` if they visit the root path '/'
  if (token && nextUrl.pathname === '/' || token && nextUrl.pathname === '/signin' || token && nextUrl.pathname === '/signup' ) {
    return NextResponse.redirect(`${siteUrl}/dashboard`);
  }

  // Redirect guest user to home page `/` if they visit specific protected pages
  if (
    !token &&
    ['/dashboard', '/dashboard/creategoal', '/dashboard/mygoals/completed','/dashboard/mygoals/pending','/dashboard/mygoals/notstarted','/dashboard/mygoals/all'].includes(
      nextUrl.pathname
    )
  ) {
    return NextResponse.redirect(`${siteUrl}/`);
  }

  // // Handle dynamic routes for `/projects/{id}`
  // if (!token && nextUrl.pathname.startsWith('/dashboard/mygoals/completed')) {
  //   return NextResponse.redirect(`${siteUrl}/`);
  // }
  // // Handle dynamic routes for `/resources/{id}`
  // if (!token && nextUrl.pathname.startsWith('/dashboard/mygoals/pending')) {
  //   return NextResponse.redirect(`${siteUrl}/`);
  // }
  // if (!token && nextUrl.pathname.startsWith('/dashboard/mygoals/notstarted')) {
  //   return NextResponse.redirect(`${siteUrl}/`);
  // }
  // if (!token && nextUrl.pathname.startsWith('/dashboard/mygoals/all')) {
  //   return NextResponse.redirect(`${siteUrl}/`);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/dashboard/mygoals/completed',
    '/dashboard/mygoals/pending',
    '/dashboard/mygoals/notstarted',
    '/dashboard/mygoals/all',
    '/dashboard',
    '/dashboard/creategoal', 
  ],
};
