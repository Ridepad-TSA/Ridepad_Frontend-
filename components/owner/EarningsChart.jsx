import BarChart from '@/components/dashboard/BarChart';

/** Owner earnings over time — thin currency-formatted wrapper around the shared BarChart. */
export default function EarningsChart({ data }) {
  return <BarChart data={data} valueFormat="currency" />;
}
