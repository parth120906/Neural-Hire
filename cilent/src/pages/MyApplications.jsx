'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  fetchMyApplications,
  withdrawApplication,
} from "../features/application/applicationSlice";

export default function MyApplicationsPage() {
  const { user } = useSelector((state) => state.auth);
  const { applications, applicationsLoading: loading, applicationsError: error } =
    useSelector((state) => state.application);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all|applied|shortlisted|rejected

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.isRecruiter || user.isAdmin) {
      navigate("/");
      return;
    }
    dispatch(fetchMyApplications());
  }, [user, navigate, dispatch]);

  const handleWithdraw = (id) => {
    if (!window.confirm("Withdraw this application?")) return;
    dispatch(withdrawApplication(id));
  };

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const list = Array.isArray(applications) ? applications : [];
    let next = list;

    if (statusFilter !== "all") {
      next = next.filter((a) => (a.status || "applied") === statusFilter);
    }
    if (term) {
      next = next.filter((a) => {
        const title = (a.jobId?.title || "").toLowerCase();
        const location = (a.jobId?.location || "").toLowerCase();
        return title.includes(term) || location.includes(term);
      });
    }
    return next;
  }, [applications, searchTerm, statusFilter]);

  const getStatusStyles = (status) => {
    const baseStyles = "inline-flex px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all duration-300";
    if (status === "shortlisted") {
      return `${baseStyles} bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:border-emerald-500/60`;
    }
    if (status === "rejected") {
      return `${baseStyles} bg-red-500/20 text-red-300 border-red-500/30 hover:border-red-500/60`;
    }
    return `${baseStyles} bg-blue-500/20 text-blue-300 border-blue-500/30 hover:border-blue-500/60`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            My applications
          </h1>
          <p className="text-lg text-slate-300 font-light">
            Track the status of jobs you have applied for.
          </p>
        </header>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title or location..."
              className="w-full rounded-2xl border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-light"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-light"
            >
              <option value="all" className="bg-slate-900">All status</option>
              <option value="applied" className="bg-slate-900">Applied</option>
              <option value="shortlisted" className="bg-slate-900">Shortlisted</option>
              <option value="rejected" className="bg-slate-900">Rejected</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent px-6 py-4 text-sm text-red-400 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin">
              <div className="w-8 h-8 border-2 border-slate-700 border-t-gradient-to-r border-t-purple-500 rounded-full" />
            </div>
            <p className="ml-4 text-slate-300 text-lg font-light">Loading your applications...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && !error && (
          <div className="text-center py-16">
            <p className="text-slate-300 text-lg font-light">
              No applications found. Start exploring and apply to jobs!
            </p>
          </div>
        )}

        <div className="space-y-4">
          {filtered.map((app) => (
            <article
              key={app._id}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex-1">
                <h2 className="text-xl font-bold text-white mb-2">
                  {app.jobId?.title || "Job removed"}
                </h2>
                <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm">
                  <span>📍</span>
                  <span>{app.jobId?.location}</span>
                </div>
                <p className="text-xs text-slate-500 mb-3 font-light">
                  Applied on {new Date(app.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
                
                {app.aiScore > 0 && (
                  <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30 backdrop-blur-sm">
                    <p className="text-xs text-purple-300 font-semibold">
                      AI Match Score: {app.aiScore}%
                    </p>
                  </div>
                )}
                
                {app.aiFeedback && (
                  <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed">
                    <span className="text-slate-400">AI Feedback:</span> {app.aiFeedback}
                  </p>
                )}
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                <span className={getStatusStyles(app.status || "applied")}>
                  {app.status === "shortlisted" && "✓ "}
                  {app.status === "rejected" && "✕ "}
                  {app.status || "Applied"}
                </span>
                
                {app.jobId?._id && (
                  <Link
                    to={`/jobs/${app.jobId._id}`}
                    className="px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 text-xs font-medium hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300 backdrop-blur-sm text-center"
                  >
                    View job
                  </Link>
                )}
                
                <button
                  type="button"
                  onClick={() => handleWithdraw(app._id)}
                  className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-xs font-medium hover:border-red-500/60 hover:bg-red-500/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Withdraw
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

