// DEV-ONLY mock — see app/api/mock/store.js. Mirrors the shape the real
// backend's POST /auth/register is expected to return, per lib/auth.js.
import { NextResponse } from 'next/server';
import { mockUsers } from '../../store';
import { ROLES } from '@/lib/constants';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  const identifier = body?.identifier?.trim();
  const password = body?.password;
  const role = body?.role === ROLES.OWNER ? ROLES.OWNER : ROLES.RENTER;

  if (!name || !identifier || !password) {
    return NextResponse.json(
      { message: 'Name, email/phone and password are required.' },
      { status: 422 },
    );
  }

  if (mockUsers.some((u) => u.identifier === identifier)) {
    return NextResponse.json(
      { errors: { identifier: 'An account with this email or phone already exists.' } },
      { status: 409 },
    );
  }

  const user = { id: `mock-${Date.now()}`, name, identifier, password, role };
  mockUsers.push(user);

  return NextResponse.json({
    user: { id: user.id, name: user.name, role: user.role },
    accessToken: `mock-token-${user.id}`,
  });
}
