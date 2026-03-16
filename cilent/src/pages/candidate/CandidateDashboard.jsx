import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { fetchMyApplications } from "../../features/application/applicationSlice";

export default function CandidateDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { applications, applicationsLoading, applicationsError } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.isAdmin) {
      navigate("/admin/dashboard");
      return;
    }
    if (user.isRecruiter) {
      navigate("/recuiter/dashboard");
      return;
    }
    dispatch(fetchMyApplications());
  }, [user, dispatch, navigate]);

  const stats = useMemo(() => {
    const list = Array.isArray(applications) ? applications : [];
    const applied = list.filter((a) => (a.status || "applied") === "applied")
      .length;
    const shortlisted = list.filter((a) => a.status === "shortlisted").length;
    const rejected = list.filter((a) => a.status === "rejected").length;
    return {
      total: list.length,
      applied,
      shortlisted,
      rejected,
    };
  }, [applications]);

  const recent = useMemo(() => {
    const list = Array.isArray(applications) ? applications : [];
    return [...list]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }, [applications]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>
            <p className="text-lg text-slate-300 font-light">
              Track your applications and find your next role.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/jobs"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Browse jobs
            </Link>
            <Link
              to="/auth/profile"
              className="px-6 py-3 rounded-full border border-slate-600/50 bg-slate-800/50 text-slate-300 text-sm font-semibold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
            >
              Edit profile
            </Link>
            <Link
              to="/applications/me"
              className="px-6 py-3 rounded-full border border-slate-600/50 bg-slate-800/50 text-slate-300 text-sm font-semibold hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
            >
              My applications
            </Link>
          </div>
        </header>

        {applicationsError && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent px-6 py-4 text-sm text-red-400 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span>{applicationsError}</span>
            </div>
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Total applications</p>
              <p className="text-4xl font-bold text-white mt-3">
                {applicationsLoading ? "…" : stats.total}
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Applied</p>
              <p className="text-4xl font-bold text-blue-300 mt-3">
                {applicationsLoading ? "…" : stats.applied}
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Shortlisted</p>
              <p className="text-4xl font-bold text-emerald-300 mt-3">
                {applicationsLoading ? "…" : stats.shortlisted}
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">Rejected</p>
              <p className="text-4xl font-bold text-red-300 mt-3">
                {applicationsLoading ? "…" : stats.rejected}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-800/50 to-transparent">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Recent applications
              </h2>
              <p className="text-sm text-slate-400 mt-2 font-light">
                Your latest job applications and their status.
              </p>
            </div>
            <Link
              to="/applications/me"
              className="text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors duration-300 whitespace-nowrap"
            >
              View all →
            </Link>
          </div>

          <div className="p-8">
            {applicationsLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin">
                  <div className="w-8 h-8 border-2 border-slate-700 border-t-gradient-to-r border-t-purple-500 rounded-full" />
                </div>
                <p className="ml-4 text-slate-300 font-light">Loading your applications…</p>
              </div>
            )}

            {!applicationsLoading && recent.length === 0 && !applicationsError && (
              <div className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/30 to-transparent p-8 text-center backdrop-blur-sm">
                <p className="text-slate-300 font-light mb-4">
                  You haven't applied to any jobs yet.
                </p>
                <Link
                  to="/jobs"
                  className="inline-flex gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Find jobs
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recent.map((app) => (
                <article
                  key={app._id}
                  className="group relative rounded-2xl border border-slate-700/50 p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm transform hover:scale-102 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Applied for</p>
                        <h3 className="text-lg font-bold text-white mt-2">
                          {app.jobId?.title || "Job removed"}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                          <span>📍</span>
                          <span>{app.jobId?.location || "—"}</span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap backdrop-blur-sm border transition-all duration-300 ${
                          app.status === "shortlisted"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:border-emerald-500/60"
                            : app.status === "rejected"
                            ? "bg-red-500/20 text-red-300 border-red-500/30 hover:border-red-500/60"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:border-blue-500/60"
                        }`}
                      >
                        {app.status === "shortlisted" && "✓ "}
                        {app.status === "rejected" && "✕ "}
                        {app.status || "Applied"}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-slate-600/30 flex items-center justify-between">
                      <p className="text-xs text-slate-500 font-light">
                        {app.createdAt
                          ? `Applied on ${new Date(app.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}`
                          : ""}
                      </p>
                      {app.jobId?._id && (
                        <Link
                          to={`/jobs/${app.jobId._id}`}
                          className="text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors duration-300"
                        >
                          View →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

