import Badge from '@/components/ui/Badge';
import { formatNaira, formatDateShort } from '@/lib/format';

const STATUS_TONE = { paid: 'success', processing: 'info' };
const STATUS_LABEL = { paid: 'Paid', processing: 'Processing' };

/** Payout history — date, amount, method, status and reference. */
export default function PayoutTable({ payouts }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs text-ink-soft">
            <th className="pb-2 font-medium">Date</th>
            <th className="pb-2 font-medium">Amount</th>
            <th className="pb-2 font-medium">Method</th>
            <th className="pb-2 font-medium">Reference</th>
            <th className="pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id} className="border-b border-line last:border-0">
              <td className="py-2.5 font-medium text-ink">{formatDateShort(payout.date)}</td>
              <td className="py-2.5 text-ink-soft">{formatNaira(payout.amount)}</td>
              <td className="py-2.5 text-ink-soft">{payout.method}</td>
              <td className="py-2.5 text-ink-soft">{payout.reference}</td>
              <td className="py-2.5">
                <Badge tone={STATUS_TONE[payout.status]}>{STATUS_LABEL[payout.status]}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
