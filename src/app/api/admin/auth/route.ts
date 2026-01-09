// src/app/api/admin/auth/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // This is a placeholder API route to ensure /admin routes are recognized
  // In a real implementation, this would verify the authentication token
  return NextResponse.json({ authenticated: true });
}