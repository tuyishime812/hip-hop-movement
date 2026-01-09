import { NextRequest, NextResponse } from 'next/server';

// Define the public paths that don't require authentication
const publicPaths = ['/admin/login'];

export function middleware(request: NextRequest) {
  // Check if the requested path is under /admin
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminPath && !publicPaths.includes(request.nextUrl.pathname)) {
    // For now, just allow all admin paths to be handled by the client-side app
    // Authentication will be handled in the component
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static (static files)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|static).*)',
      missing: [
        { type: 'header', key: 'next-action' }, // Skip middleware for server actions
      ],
    },
  ],
};