import clsx from 'clsx';

export default function Input({ label, error, id, className, ref, ...props }) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error || undefined}
        className={clsx(
          'min-h-11 w-full rounded-lg border bg-surface px-3 text-sm text-ink placeholder:text-ink-soft',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy',
          error ? 'border-red-500' : 'border-line',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
