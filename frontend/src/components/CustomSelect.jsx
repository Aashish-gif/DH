import { useEffect, useRef, useState } from 'react';

function Chevron({ open }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-sand-200/50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 shrink-0 animate-spin text-moss-400"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
  );
}

export default function CustomSelect({
  value,
  onChange,
  options,
  disabled = false,
  loading = false,
  placeholder = 'Select…',
  ariaLabel,
  variant = 'default',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);
  const isDisabled = disabled || loading;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        setActiveIndex(-1);
      }
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i < options.length - 1 ? i + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : options.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0) {
          onChange(options[activeIndex].value);
          setOpen(false);
          setActiveIndex(-1);
        }
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, activeIndex, options, onChange]);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  }, [open, options, value]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => !isDisabled && setOpen((v) => !v)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border border-white/15 bg-ink-800/80 px-3.5 py-2.5 text-left text-sm font-medium text-sand-100 outline-none transition-all duration-200
          focus-visible:ring-2 focus-visible:ring-moss-400/40
          hover:border-white/25
          ${open ? 'ring-2 ring-moss-400/30 border-moss-400/40' : ''}
          ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <span className="flex min-w-0 items-center gap-2.5 truncate">
          {variant === 'status' && selected?.dot && (
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${selected.dot}`} />
          )}
          {variant === 'status' && !selected?.dot && value && (
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-moss-400" />
          )}
          <span className="truncate">{selected?.label || placeholder}</span>
        </span>
        {loading ? <Spinner /> : <Chevron open={open} />}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/15 bg-ink-800/98 p-1.5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl animate-scale-in max-h-64 overflow-y-auto"
        >
          {options.map((opt, idx) => {
            const isActive = opt.value === value;
            const isHighlighted = idx === activeIndex;
            return (
              <li key={opt.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setActiveIndex(-1);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150
                    ${isActive ? opt.active || 'bg-white/10 text-sand-50' : 'text-sand-200'}
                    ${opt.menu || 'hover:bg-white/10 hover:text-sand-50'}
                    ${isHighlighted && !isActive ? 'bg-white/[0.07]' : ''}`}
                >
                  {variant === 'status' && opt.dot && (
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${opt.dot}`} />
                  )}
                  <span className="flex-1">{opt.label}</span>
                  {isActive && (
                    <svg
                      className="ml-auto h-4 w-4 text-moss-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
