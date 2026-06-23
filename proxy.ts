import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  // Jika pengunjung membuka dari subdomain cv
  if (hostname === 'cv.ferdinandsianturi.my.id' || hostname === 'www.cv.ferdinandsianturi.my.id') {
    // Jika mereka berada di halaman utama (root) subdomain tersebut
    if (url.pathname === '/') {
      // Tampilkan isi dari halaman /cv secara diam-diam (rewrite)
      return NextResponse.rewrite(new URL('/cv', request.url));
    }
  }

  return NextResponse.next();
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
