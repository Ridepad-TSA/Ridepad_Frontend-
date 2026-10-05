import { Inbox } from 'lucide-react';

export default function EmptyState({ title, body, action, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line bg-surface px-6 py-14 text-center">
      <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-burgundy-tint text-burgundy"><Icon className="size-5" aria-hidden="true" /></span>
      <h3 className="font-display text-base font-bold text-ink">{title}</h3>
      {body && <p className="max-w-sm text-sm text-ink-soft">{body}</p>}
      {action}
    </div>
  );
}
