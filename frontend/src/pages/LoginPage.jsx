import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useToast } from '../components/Toast';
import { login } from '../api/auth';
import { isAuthenticated, setToken } from '../utils/auth';

export default function LoginPage() {
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  if (isAuthenticated()) {
    return <Navigate to={from} replace />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate() {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address';
    }
    if (!form.password) next.password = 'Password is required';
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) return;

    setSubmitting(true);
    try {
      const res = await login(form.email.trim(), form.password);
      setToken(res.token);
      showToast('Welcome back 👋');
      navigate(from, { replace: true });
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="pointer-events-none absolute inset-0 bg-admin-mesh" aria-hidden="true" />

      <section className="relative mx-auto flex min-h-[calc(100vh-8.5rem)] max-w-md flex-col justify-center px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 p-8 shadow-card backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-moss-400/15 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-moss-500/15 blur-2xl" aria-hidden="true" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss-400/80">
              Admin access
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold text-sand-50">
              Sign in to <span className="gradient-text">LeadDesk</span>
            </h1>
            <p className="mt-2 text-sm text-sand-200/55">
              Your lead inbox is one login away.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-sand-200/80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@leaddesk.com"
                  className={`input-field ${errors.email ? 'border-red-400/50' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-sand-200/80">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`input-field ${errors.password ? 'border-red-400/50' : ''}`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-300">{errors.password}</p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign in →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
