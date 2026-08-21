import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    if (!strapiUrl) {
      return Response.json(
        { error: "NEXT_PUBLIC_STRAPI_URL belum diset" },
        { status: 500 }
      );
    }

    // Fetch ke Strapi
    const strapiResponse = await fetch(`${strapiUrl}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tunnel-Skip-Browser-Warning': 'true', // Mencegah pemblokiran oleh Devtunnels
      },
      body: JSON.stringify({
        identifier: username,
        password: password,
      }),
    });

    const data = await strapiResponse.json();

    // Jika username/password salah atau JWT tidak ditemukan
    if (!strapiResponse.ok || !data.jwt) {
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message || 'Username atau Password salah!'
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil!',
      user: data.user,
    });

    // --- PERBAIKAN KEAMANAN: SET HTTP-ONLY COOKIE ---
    response.cookies.set('admin_token', data.jwt, {
      httpOnly: true, // WAJIB! Dilarang diakses oleh JavaScript (bebas dari jebolan F12 console)
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Otomatis aktif HTTPS saat ter-deploy
      sameSite: 'lax',
      maxAge: 86400, // 24 jam
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal terhubung ke backend server.' },
      { status: 500 }
    );
  }
}