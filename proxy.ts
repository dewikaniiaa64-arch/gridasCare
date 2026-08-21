import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Hanya lindungi semua halaman yang berada di /adm
    if (pathname.startsWith("/adm")) {
        const token = request.cookies.get("admin_token")?.value;

        // Tidak ada token → kembali ke login
        if (!token) {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

            if (!strapiUrl) {
                console.error("NEXT_PUBLIC_STRAPI_URL belum diset");
                const loginUrl = new URL("/login", request.url);
                return NextResponse.redirect(loginUrl);
            }

            // Validasi token langsung ke Strapi
            const response = await fetch(`${strapiUrl}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            });

            // Token tidak valid / sudah expired
            if (!response.ok) {
                const loginUrl = new URL("/login", request.url);

                const redirectResponse =
                    NextResponse.redirect(loginUrl);

                redirectResponse.cookies.delete("admin_token");

                return redirectResponse;
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Gagal memvalidasi token:", error);

            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/adm/:path*"],
};