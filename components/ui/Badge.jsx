import clsx from 'clsx';

const TONES = {
  default: 'bg-line/60 text-ink',
  brand: 'bg-burgundy text-white',
  success: 'bg-green-100 text-green-800',
  info: 'bg-burgundy-tint text-burgundy',
  danger: 'bg-red-100 text-red-800',
};

export default function Badge({ tone = 'default', className, children }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
