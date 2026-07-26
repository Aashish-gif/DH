export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-sm text-sand-200/55 sm:flex-row sm:text-left">
        <p>
          Built for{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-moss-300 underline decoration-moss-400/30 underline-offset-4 transition hover:text-moss-200 hover:decoration-moss-300"
          >
            Digital Heroes Training Task
          </a>
        </p>
        <p className="text-xs text-sand-200/30">LeadDesk Mini · 2026</p>
      </div>
    </footer>
  );
}
