'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Badge from '@/components/ui/Badge';
import { formatDateShort } from '@/lib/format';
import { ADMIN_USERS } from '@/lib/data/admin';

const ROLE_TABS = ['all', 'renter', 'owner', 'admin'];
const ROLE_LABEL = { renter: 'Renter', owner: 'Owner', admin: 'Admin' };
const ROLE_TONE = { renter: 'info', owner: 'brand', admin: 'default' };

export default function UsersPage() {
  const [query, setQuery] = useState('');
  const [roleTab, setRoleTab] = useState('all');
  const [suspendedIds, setSuspendedIds] = useState(
    () => new Set(ADMIN_USERS.filter((u) => u.status === 'suspended').map((u) => u.id)),
  );

  const users = ADMIN_USERS.filter((u) => {
    if (roleTab !== 'all' && u.role !== roleTab) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return u.name.toLowerCase().includes(q) || u.identifier.toLowerCase().includes(q);
  });

  function toggleSuspended(id) {
    setSuspendedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-xl font-bold text-ink">Users</h1>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          className="min-h-9 w-64 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {ROLE_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setRoleTab(tab)}
            className={clsx(
              'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
              roleTab === tab ? 'bg-burgundy text-white' : 'bg-line/60 text-ink hover:bg-line',
            )}
          >
            {tab === 'all' ? 'All' : `${ROLE_LABEL[tab]}s`}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs text-ink-soft">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">Activity</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const suspended = suspendedIds.has(user.id);
              return (
                <tr key={user.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{user.name}</p>
                    <p className="text-xs text-ink-soft">{user.identifier}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={ROLE_TONE[user.role]}>{ROLE_LABEL[user.role]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{formatDateShort(user.joined)}</td>
                  <td className="px-4 py-3 text-ink-soft">{user.stat}</td>
                  <td className="px-4 py-3">
                    <Badge tone={suspended ? 'danger' : 'success'}>
                      {suspended ? 'Suspended' : 'Active'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {user.role !== 'admin' && (
                      <button
                        type="button"
                        onClick={() => toggleSuspended(user.id)}
                        className={clsx(
                          'inline-flex min-h-8 items-center justify-center rounded-lg border px-3 text-xs font-semibold transition-colors',
                          suspended
                            ? 'border-burgundy text-burgundy hover:bg-burgundy hover:text-white'
                            : 'border-ink text-ink hover:bg-ink hover:text-white',
                        )}
                      >
                        {suspended ? 'Reactivate' : 'Suspend'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-ink-soft">
                  No users match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
