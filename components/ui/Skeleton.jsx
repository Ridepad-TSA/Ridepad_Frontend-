import clsx from 'clsx';

export default function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={clsx('animate-pulse rounded-lg bg-line/70', className)}
      {...props}
    />
  );
}
