import Logo from '@/components/layout/Logo';
import Skeleton from '@/components/ui/Skeleton';

export default function BrandLoader({ label = 'Getting your ride ready...', skeleton = false }) {
  if (skeleton) return <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6" role="status" aria-label={label}><Skeleton className="h-8 w-48" /><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="overflow-hidden rounded-2xl border border-line bg-surface"><Skeleton className="aspect-video rounded-none" /><div className="space-y-3 p-4"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2" /><Skeleton className="h-4 w-1/3" /></div></div>)}</div><span className="sr-only">{label}</span></div>;
  return <div className="flex min-h-[45vh] flex-col items-center justify-center gap-4 px-6 text-center" role="status" aria-live="polite"><Logo /><span aria-hidden="true" className="size-5 animate-spin rounded-full border-2 border-burgundy/20 border-t-burgundy" /><p className="text-sm text-ink-soft">{label}</p></div>;
}
