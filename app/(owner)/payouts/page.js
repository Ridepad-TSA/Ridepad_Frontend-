import StatTile from '@/components/dashboard/StatTile';
import EarningsChart from '@/components/owner/EarningsChart';
import PayoutTable from '@/components/owner/PayoutTable';
import WithdrawButton from '@/components/owner/WithdrawButton';
import { WALLET_BALANCE, PAYOUT_STATS, EARNINGS_PER_MONTH, PAYOUT_HISTORY } from '@/lib/data/owner';

export default function PayoutsPage() {
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-xl font-bold text-ink">Payouts</h1>
        <WithdrawButton amount={WALLET_BALANCE} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PAYOUT_STATS.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-display text-sm font-bold text-ink">Earnings over time</h2>
        <div className="mt-4">
          <EarningsChart data={EARNINGS_PER_MONTH} />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-display text-sm font-bold text-ink">Payout history</h2>
        <div className="mt-3">
          <PayoutTable payouts={PAYOUT_HISTORY} />
        </div>
      </div>
    </div>
  );
}
