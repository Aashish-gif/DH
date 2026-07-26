import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CustomSelect from '../components/CustomSelect';
import { useToast } from '../components/Toast';
import { fetchLeads, updateLeadStatus } from '../api/leads';
import { getStatusOptions, STATUS_CONFIG } from '../utils/statusConfig';

const statusOptions = getStatusOptions();

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function SkeletonRows() {
  return Array.from({ length: 4 }).map((_, i) => (
    <tr key={i} className="border-b border-white/[0.04]">
      {Array.from({ length: 6 }).map((__, j) => (
        <td key={j} className="px-4 py-4">
          <div className="skeleton h-4 w-full max-w-[8rem]" />
        </td>
      ))}
    </tr>
  ));
}

export default function AdminPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const stats = useMemo(() => {
    const counts = { New: 0, Contacted: 0, Closed: 0 };
    leads.forEach((l) => {
      if (counts[l.status] !== undefined) counts[l.status]++;
    });
    return counts;
  }, [leads]);

  const loadLeads = useCallback(
    async (query) => {
      try {
        setLoading(true);
        const res = await fetchLeads(query);
        setLeads(res.data || []);
      } catch (err) {
        if (err.status === 401) {
          navigate('/admin/login', { replace: true });
          return;
        }
        showToast(err.message || 'Failed to load leads', 'error');
      } finally {
        setLoading(false);
      }
    },
    [showToast, navigate]
  );

  useEffect(() => {
    const handle = window.setTimeout(() => loadLeads(search), 280);
    return () => window.clearTimeout(handle);
  }, [search, loadLeads]);

  async function handleStatusChange(id, status) {
    const previous = leads;
    setLeads((prev) =>
      prev.map((lead) => (lead._id === id ? { ...lead, status } : lead))
    );
    setUpdatingId(id);

    try {
      await updateLeadStatus(id, status);
      showToast(`Moved to ${status} ✓`);
    } catch (err) {
      setLeads(previous);
      if (err.status === 401) {
        navigate('/admin/login', { replace: true });
        return;
      }
      showToast(err.message || 'Could not update status', 'error');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <Layout showLogout>
      <div className="pointer-events-none absolute inset-0 bg-admin-mesh" aria-hidden="true" />

      <section className="relative mx-auto max-w-6xl px-4 py-10 sm:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-moss-400/80">
              Dashboard
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="gradient-text">Lead inbox</span>
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-sand-200/55">
              Track every inquiry, update status in one click, close deals faster.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-200/35"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              id="search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email…"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Stats pills */}
        {!loading && leads.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2.5">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <span key={key} className={`stat-pill ${cfg.pill}`}>
                <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                {stats[key]} {key}
              </span>
            ))}
            <span className="stat-pill border-white/10 bg-white/[0.04] text-sand-200/70">
              {leads.length} total
            </span>
          </div>
        )}

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-widest text-sand-200/40">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Budget</th>
                  <th className="px-5 py-4">Message</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <SkeletonRows />
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto max-w-xs">
                        <p className="text-3xl">📭</p>
                        <p className="mt-3 font-medium text-sand-100">
                          {search.trim() ? 'No matches found' : 'Inbox is empty'}
                        </p>
                        <p className="mt-1 text-sm text-sand-200/45">
                          {search.trim()
                            ? 'Try a different search term.'
                            : 'New leads from the landing page show up here.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="table-row-hover">
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-semibold text-sand-50">{lead.name}</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-sand-200/75 transition hover:text-moss-300"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-sand-200/80">
                          {lead.budgetRange}
                        </span>
                      </td>
                      <td className="max-w-[14rem] px-5 py-4 text-sand-200/60">
                        <span className="line-clamp-2" title={lead.message}>
                          {lead.message}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sand-200/45">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <CustomSelect
                          value={lead.status}
                          onChange={(status) => handleStatusChange(lead._id, status)}
                          options={statusOptions}
                          disabled={updatingId === lead._id}
                          loading={updatingId === lead._id}
                          variant="status"
                          ariaLabel={`Status for ${lead.name}`}
                          className="min-w-[10.5rem]"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {!loading && leads.length > 0 && (
          <p className="mt-4 text-center text-xs text-sand-200/30 sm:text-left">
            Showing {leads.length} lead{leads.length === 1 ? '' : 's'}
          </p>
        )}
      </section>
    </Layout>
  );
}
