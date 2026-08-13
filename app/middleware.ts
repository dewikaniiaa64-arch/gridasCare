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
            // Redirect ke halaman login jika token tidak valid
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // JIKA TOKEN VALID:
        // Ambil response normal Next.js
        const response = NextResponse.next();

        // Tambahkan Header Anti-Cache agar browser TIDAK MENYIMPAN MEMORI halaman admin
        response.headers.set(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
        );
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    }

    return NextResponse.next();
}

// Menentukan rute yang diproteksi oleh middleware
export const config = {
    matcher: ['/adm', '/adm/:path*'],
};