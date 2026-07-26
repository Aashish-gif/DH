export const STATUS_CONFIG = {
  New: {
    label: 'New',
    dot: 'bg-moss-200 shadow-[0_0_8px_rgba(180,224,198,0.55)]',
    pill: 'border-moss-200/40 bg-moss-200/12 text-moss-100',
    menu: 'hover:bg-moss-200/15 hover:text-moss-100',
    active: 'bg-moss-200/20 text-moss-100',
  },
  Contacted: {
    label: 'Contacted',
    dot: 'bg-moss-400 shadow-[0_0_8px_rgba(111,191,142,0.6)]',
    pill: 'border-moss-400/35 bg-moss-400/15 text-moss-200',
    menu: 'hover:bg-moss-400/18 hover:text-moss-200',
    active: 'bg-moss-400/22 text-moss-100',
  },
  Closed: {
    label: 'Closed',
    dot: 'bg-moss-600 shadow-[0_0_8px_rgba(45,122,82,0.6)]',
    pill: 'border-moss-500/35 bg-moss-500/18 text-moss-300',
    menu: 'hover:bg-moss-500/20 hover:text-moss-300',
    active: 'bg-moss-500/25 text-moss-200',
  },
};

export function getStatusOptions() {
  return Object.entries(STATUS_CONFIG).map(([value, cfg]) => ({
    value,
    label: cfg.label,
    dot: cfg.dot,
    menu: cfg.menu,
    active: cfg.active,
    pill: cfg.pill,
  }));
}
