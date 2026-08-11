import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('admin_token')?.value;
    const { pathname } = request.nextUrl;

    // Cek apakah token benar-benar valid (bukan string 'undefined', 'null', atau kosong)
    const isValidToken = Boolean(
        token &&
        token !== 'undefined' &&
        token !== 'null' &&
        token.trim() !== ''
    );

    // Cek apakah user mengakses rute admin (/adm atau sub-routenya)
    if (pathname.startsWith('/adm')) {
        if (!isValidToken) {
            // Redirect ke halaman login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

// Menentukan rute yang diproteksi oleh middleware
export const config = {
    // Menambahkan '/adm' agar rute persis /adm juga ikut terproteksi
    matcher: ['/adm', '/adm/:path*'],
};