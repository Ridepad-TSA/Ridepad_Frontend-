'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts((items) => items.filter((item) => item.id !== id)), []);
  const show = useCallback((message, tone = 'success') => { const id = Date.now() + Math.random(); setToasts((items) => [...items, { id, message, tone }]); window.setTimeout(() => remove(id), 4500); }, [remove]);
  const value = useMemo(() => ({ toast: show, dismiss: remove }), [show, remove]);
  return <ToastContext.Provider value={value}>{children}<div className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-end gap-2 sm:left-auto sm:w-96" aria-live="polite" aria-atomic="true">{toasts.map((item) => <div key={item.id} className={'pointer-events-auto flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-sm shadow-lg ' + (item.tone === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-burgundy/20 bg-surface text-ink')} role={item.tone === 'error' ? 'alert' : 'status'}><span className="min-w-0 break-words">{item.message}</span><button type="button" onClick={() => remove(item.id)} aria-label="Dismiss notification" className="shrink-0 text-ink-soft hover:text-ink"><X className="size-4" /></button></div>)}</div></ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
