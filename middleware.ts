import { NextRequest, NextResponse } from 'next/server'

// Public routes that never require auth
const PUBLIC_PATHS = ['/', '/api/generate', '/api/audio']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths and all static/Next internals
  const isPublic =
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/')) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')

  if (isPublic) {
    return NextResponse.next()
  }

  // /studio and anything else: pass through for now.
  // When Clerk or another auth provider is added, gate here.
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
