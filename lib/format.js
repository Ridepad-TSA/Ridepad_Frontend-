import { format, isValid, parseISO } from 'date-fns';

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

const nairaKoboFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats an amount in naira, e.g. 45000 -> "₦45,000". Pass { kobo: true } to show decimals. */
export function formatNaira(amount, { kobo = false } = {}) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return '';
  return (kobo ? nairaKoboFormatter : nairaFormatter).format(value);
}

function toDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === 'string') return parseISO(value);
  if (typeof value === 'number') return new Date(value);
  return null;
}

/** "12 Mar" */
export function formatDateShort(value) {
  const date = toDate(value);
  return date && isValid(date) ? format(date, 'd MMM') : '';
}

/** "Thursday, 12 March 2026" */
export function formatDateLong(value) {
  const date = toDate(value);
  return date && isValid(date) ? format(date, 'EEEE, d MMMM yyyy') : '';
}

/** "12 Mar, 2:30 pm" */
export function formatDateTime(value) {
  const date = toDate(value);
  return date && isValid(date) ? format(date, 'd MMM, h:mm aaa') : '';
}

/** "12 – 15 Mar" or "28 Mar – 2 Apr" */
export function formatDateRange(start, end) {
  const a = toDate(start);
  const b = toDate(end);
  if (!a || !b || !isValid(a) || !isValid(b)) return '';
  if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
    return `${format(a, 'd')} – ${format(b, 'd MMM')}`;
  }
  return `${format(a, 'd MMM')} – ${format(b, 'd MMM')}`;
}

/** Normalises a Nigerian plate to "ABC 123 XY"; returns input uppercased if it does not match. */
export function formatPlate(value) {
  if (!value) return '';
  const compact = String(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
  const match = compact.match(/^([A-Z]{3})(\d{3})([A-Z]{2})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]}` : String(value).toUpperCase().trim();
}
