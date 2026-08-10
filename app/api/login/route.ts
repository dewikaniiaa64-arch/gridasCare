import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Mengambil URL Strapi dari .env.local (mengarah ke laptop teman)
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

    // Melempar data username & password ke backend Strapi teman untuk divalidasi
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

    // Jika Strapi menolak (username/password salah menurut database temanmu)
    if (!strapiResponse.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: data.error?.message || 'Username atau Password salah!' 
        },
        { status: 400 }
      );
    }

    // Jika BERHASIL dicocokkan oleh backend temanmu
    return NextResponse.json({
      success: true,
      message: 'Login berhasil!',
      jwt: data.jwt,   // Token akses dari backend temanmu
      user: data.user, // Data user dari backend temanmu
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal terhubung ke backend server.' },
      { status: 500 }
    );
  }
}