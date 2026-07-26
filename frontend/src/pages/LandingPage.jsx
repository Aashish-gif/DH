import { useState } from 'react';
import Layout from '../components/Layout';
import CustomSelect from '../components/CustomSelect';
import { useToast } from '../components/Toast';
import { BUDGET_RANGES, createLead } from '../api/leads';
import { validateLeadForm } from '../utils/validation';

const INITIAL = {
  name: '',
  email: '',
  budgetRange: '',
  message: '',
};

const budgetOptions = BUDGET_RANGES.map((range) => ({
  value: range,
  label: range,
  menu: 'hover:bg-moss-500/15 hover:text-sand-50',
  active: 'bg-moss-500/20 text-sand-50',
}));

export default function LandingPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState(INITIAL);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleBudgetChange(value) {
    setForm((prev) => ({ ...prev, budgetRange: value }));
    if (fieldErrors.budgetRange) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.budgetRange;
        return next;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { valid, errors } = validateLeadForm(form);
    setFieldErrors(errors);

    if (!valid) {
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await createLead({
        name: form.name.trim(),
        email: form.email.trim(),
        budgetRange: form.budgetRange,
        message: form.message.trim(),
      });
      setForm(INITIAL);
      setFieldErrors({});
      showToast('You\'re in! We\'ll be in touch soon 🎉');
    } catch (err) {
      if (err.errors?.length) {
        const mapped = {};
        err.errors.forEach((item) => {
          if (item.field) mapped[item.field] = item.message;
        });
        setFieldErrors(mapped);
      }
      showToast(err.message || 'Could not submit your inquiry', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout variant="landing">
      <section className="relative min-h-[calc(100vh-8.5rem)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" aria-hidden="true" />
        <div
          className="animate-float pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-moss-400/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-shimmer pointer-events-none absolute -left-20 bottom-32 h-72 w-72 rounded-full bg-moss-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pt-16">
          <div className="max-w-xl">
            <div className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-moss-400/25 bg-moss-500/10 px-4 py-1.5 text-xs font-semibold text-moss-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss-400" />
              Now accepting new projects
            </div>

            <h1 className="animate-fade-up font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="gradient-text">LeadDesk</span>
            </h1>

            <p className="animate-fade-up-delay mt-5 text-xl font-medium leading-snug text-sand-100 sm:text-2xl">
              Turn curious visitors into booked clients.
            </p>

            <p className="animate-fade-up-late mt-4 max-w-md text-base leading-relaxed text-sand-200/60">
              A sleek intake flow built for modern agencies — capture budget-ready
              leads and move them from first hello to closed deal.
            </p>

            <div className="animate-fade-up-late mt-6 flex flex-wrap gap-2.5">
              {['No spam', '24hr reply', 'Budget-qualified'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-sand-200/60"
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-up-late">
            <form onSubmit={handleSubmit} noValidate className="glass-card space-y-4 p-6 sm:p-8">
              <div>
                <h2 className="font-display text-xl font-bold text-sand-50">
                  Let&apos;s build something
                </h2>
                <p className="mt-1 text-sm text-sand-200/50">
                  Drop your details — we&apos;ll reach out within one business day.
                </p>
              </div>

              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={fieldErrors.name}
                placeholder="Alex Rivera"
                autoComplete="name"
              />

              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={fieldErrors.email}
                placeholder="alex@studio.co"
                autoComplete="email"
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-sand-200/80">
                  Budget Range
                </label>
                <CustomSelect
                  value={form.budgetRange}
                  onChange={handleBudgetChange}
                  options={budgetOptions}
                  placeholder="Pick your range"
                  ariaLabel="Budget range"
                />
                {fieldErrors.budgetRange && (
                  <p className="mt-1 text-xs text-red-300">{fieldErrors.budgetRange}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-sand-200/80">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us your vision, timeline, and vibe…"
                  className={`input-field resize-y ${fieldErrors.message ? 'border-red-400/50' : ''}`}
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-xs text-red-300">{fieldErrors.message}</p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send it →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, error, type = 'text', ...props }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-sand-200/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`input-field ${error ? 'border-red-400/50' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  );
}
