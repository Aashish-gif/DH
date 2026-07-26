import { Link, NavLink, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { clearToken } from '../utils/auth';

export default function Layout({ children, variant = 'default', showLogout = false }) {
  const navigate = useNavigate();
  const isLanding = variant === 'landing';

  function handleLogout() {
    clearToken();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-xl ${
          isLanding
            ? 'border-white/[0.06] bg-ink-950/70'
            : 'border-white/10 bg-ink-950/85'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-xs font-bold text-ink-950 shadow-glow-soft transition group-hover:scale-105">
              LD
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="gradient-text">LeadDesk</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'text-moss-300'
                    : 'text-sand-200/60 hover:text-sand-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `btn-ghost text-xs sm:text-sm ${isActive ? 'border-moss-400/40 text-moss-300' : ''}`
              }
            >
              Admin
            </NavLink>
            {showLogout && (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition hover:border-red-400/40 hover:bg-red-500/15 sm:text-sm"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
