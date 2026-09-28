'use client';

import Link from 'next/link';
import { Check, X } from 'lucide-react';
import RoleGuard from '@/components/layout/RoleGuard';
import Badge from '@/components/ui/Badge';
import useAuth from '@/hooks/useAuth';
import { formatDateShort } from '@/lib/format';
import { ROLES } from '@/lib/constants';
import { MOCK_TRIPS } from '@/lib/data/cars';
import { RENTER_VERIFICATION, SELF_DRIVE_TRIPS_REQUIRED } from '@/lib/data/renter';
import { OWNER_VERIFICATION, OWNER_LISTINGS } from '@/lib/data/owner';

const STATUS_LABEL = { verified: 'Verified', pending: 'Pending review', not_started: 'Not verified' };
const STATUS_TONE = { verified: 'success', pending: 'info', not_started: 'default' };

export default function VerificationStatusPage() {
  return (
    <RoleGuard allow={[ROLES.RENTER, ROLES.OWNER]}>
      <VerificationContent />
    </RoleGuard>
  );
}

function VerificationContent() {
  const { role } = useAuth();
  const isOwner = role === ROLES.OWNER;
  const verification = isOwner ? OWNER_VERIFICATION : RENTER_VERIFICATION;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-ink">Verification</h1>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-bold text-ink">Identity</h2>
          <Badge tone={STATUS_TONE[verification.status]}>{STATUS_LABEL[verification.status]}</Badge>
        </div>

        {verification.status === 'not_started' ? (
          <>
            <p className="mt-2 text-sm text-ink-soft">
              {isOwner
                ? 'Verify your identity so renters can trust who they’re dealing with.'
                : 'Verify your identity to book faster and start working toward self drive.'}
            </p>
            <Link
              href="/verify"
              className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright"
            >
              Verify your identity
            </Link>
          </>
        ) : (
          <>
            <p className="mt-1 text-xs text-ink-soft">Submitted {formatDateShort(verification.submittedOn)}</p>
            <ul className="mt-3 space-y-2">
              <ChecklistItem label="NIN or BVN" done={verification.ninVerified} />
              <ChecklistItem label="Selfie check" done={verification.selfieVerified} />
              {isOwner && (
                <>
                  <ChecklistItem label="Vehicle papers" done={verification.vehiclePapersVerified} />
                  <ChecklistItem label="Proof of address" done={verification.addressVerified} />
                </>
              )}
            </ul>
          </>
        )}
      </div>

      {isOwner ? <ListingsStatus /> : <SelfDriveStatus />}
    </div>
  );
}

function SelfDriveStatus() {
  const cleanTrips = MOCK_TRIPS.filter((t) => t.status === 'settled').length;
  const unlocked = cleanTrips >= SELF_DRIVE_TRIPS_REQUIRED;
  const remaining = SELF_DRIVE_TRIPS_REQUIRED - cleanTrips;
  const progressPct = Math.min(100, Math.round((cleanTrips / SELF_DRIVE_TRIPS_REQUIRED) * 100));

  return (
    <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-bold text-ink">Self drive</h2>
        {unlocked && <Badge tone="success">Unlocked</Badge>}
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        {unlocked
          ? 'Self drive is unlocked. Look for "Self drive" on any car that offers it.'
          : `${cleanTrips} of ${SELF_DRIVE_TRIPS_REQUIRED} clean trips completed. Finish ${remaining} more with no damage claims to unlock self drive.`}
      </p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-burgundy transition-all" style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );
}

function ListingsStatus() {
  const live = OWNER_LISTINGS.filter((l) => l.status === 'live').length;

  return (
    <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
      <h2 className="font-display text-sm font-bold text-ink">Listings</h2>
      <p className="mt-1 text-sm text-ink-soft">
        {live} of {OWNER_LISTINGS.length} listings live. The rest are waiting on admin approval.
      </p>
      <Link
        href="/listings"
        className="mt-3 inline-flex text-sm font-semibold text-burgundy hover:text-burgundy-bright"
      >
        Manage listings →
      </Link>
    </div>
  );
}

function ChecklistItem({ label, done }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={`flex size-5 items-center justify-center rounded-full ${
          done ? 'bg-burgundy-tint text-burgundy' : 'bg-line text-ink-soft'
        }`}
      >
        {done ? <Check className="size-3" aria-hidden="true" /> : <X className="size-3" aria-hidden="true" />}
      </span>
      <span className="text-ink">{label}</span>
    </li>
  );
}
