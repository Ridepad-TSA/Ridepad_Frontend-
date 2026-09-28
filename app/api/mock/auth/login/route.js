// DEV-ONLY mock — see app/api/mock/store.js. Mirrors the shape the real
// backend's POST /auth/login is expected to return, per lib/auth.js.
import { NextResponse } from 'next/server';
import { mockUsers } from '../../store';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const identifier = body?.identifier?.trim();
  const password = body?.password;

  const user = mockUsers.find((u) => u.identifier === identifier && u.password === password);
  if (!user) {
    return NextResponse.json({ message: 'Invalid email/phone or password.' }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: user.id, name: user.name, role: user.role },
    accessToken: `mock-token-${user.id}`,
  });
}
