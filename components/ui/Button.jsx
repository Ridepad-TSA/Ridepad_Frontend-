import clsx from 'clsx';

const VARIANTS = {
  primary:
    'bg-burgundy text-white hover:bg-burgundy-bright active:bg-burgundy disabled:bg-burgundy/50',
  secondary:
    'border border-ink bg-transparent text-ink hover:bg-ink hover:text-white disabled:border-line disabled:text-ink-soft disabled:hover:bg-transparent',
  ghost: 'bg-transparent text-ink hover:bg-burgundy-tint disabled:text-ink-soft',
};

const SIZES = {
  sm: 'px-3 text-sm',
  md: 'px-5 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  children,
  ref,
  ...props
}) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(
        // 44px minimum touch target at every size.
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-semibold transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy',
        'disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
