import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => dismiss(id), 3500);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(100%-2rem,22rem)] flex-col gap-2.5"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto animate-scale-in rounded-xl border px-4 py-3.5 text-sm font-medium shadow-lg backdrop-blur-xl ${
              toast.type === 'error'
                ? 'border-red-400/30 bg-red-950/90 text-red-100 shadow-red-500/10'
                : 'border-moss-400/30 bg-ink-800/95 text-sand-50 shadow-glow'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="shrink-0 rounded-md p-0.5 text-sand-200/50 transition hover:bg-white/10 hover:text-sand-50"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
