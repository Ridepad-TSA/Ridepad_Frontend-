/** label + value + optional delta caption, per the dataviz stat-tile contract. */
export default function StatTile({ label, value, change }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <p className="text-xs font-medium text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-ink">{value}</p>
      {change && <p className="mt-1 text-xs text-ink-soft">{change}</p>}
    </div>
  );
}
