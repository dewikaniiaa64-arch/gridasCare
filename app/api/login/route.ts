import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Mengambil URL Strapi dari .env.local
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

    // Melempar data username & password ke backend Strapi untuk divalidasi
    const strapiResponse = await fetch(`${strapiUrl}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: username, // Strapi menggunakan 'identifier' untuk username/email
        password: password,
      }),
    });

    const data = await strapiResponse.json();

    // Jika Strapi menolak (username/password salah)
    if (!strapiResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.error?.message || 'Username atau Password salah!'
        },
        { status: 400 }
      );
    }

    // Buat objek response sukses
    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil!',
      jwt: data.jwt,   // Token akses dari backend Strapi
      user: data.user, // Data user dari backend Strapi
    });

    // --- PERBAIKAN UTAMA: Set Cookie langsung dari HTTP Response Header ---
    response.cookies.set('admin_token', data.jwt || 'true', {
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Otomatis aktif HTTPS di Vercel
      sameSite: 'lax',
      maxAge: 86400, // Berlaku selama 24 jam (dalam detik)
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