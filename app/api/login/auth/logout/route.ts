import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: 'Berhasil logout',
    });

    // Menghapus cookie admin_token di browser via HTTP response
    response.cookies.set('admin_token', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
    });

    return response;
}