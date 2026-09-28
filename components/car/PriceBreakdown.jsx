import { formatNaira } from '@/lib/format';

/** Rate x days, service charge, refundable deposit and total. */
export default function PriceBreakdown({ car, breakdown }) {
  const { nights, rentalFee, serviceCharge, deposit, total } = breakdown;

  return (
    <dl className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <dt className="text-ink-soft">
          {formatNaira(car.pricePerDay)} x {nights} {nights === 1 ? 'day' : 'days'}
        </dt>
        <dd className="font-medium text-ink">{formatNaira(rentalFee)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-ink-soft">Service charge</dt>
        <dd className="font-medium text-ink">{formatNaira(serviceCharge)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-ink-soft">Refundable deposit</dt>
        <dd className="font-medium text-ink">{formatNaira(deposit)}</dd>
      </div>
      <div className="flex items-center justify-between border-t border-line pt-2 text-base">
        <dt className="font-semibold text-ink">Total</dt>
        <dd className="font-bold text-ink">{formatNaira(total)}</dd>
      </div>
    </dl>
  );
}
