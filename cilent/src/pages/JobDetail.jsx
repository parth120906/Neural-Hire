'use client';

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchJobById } from "../features/jobs/jobSlice";
import {
  applyToJob,
  resetApplicationStatus,
} from "../features/application/applicationSlice";

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { job, jobLoading: loadingJob, jobError } = useSelector(
    (state) => state.jobs
  );

  const {
    applyLoading,
    applyError,
    applySuccess,
  } = useSelector((state) => state.application);

  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
    return () => {
      dispatch(resetApplicationStatus());
    };
  }, [id, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setResumeFile(file || null);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.isRecruiter || user.isAdmin) {
      dispatch(resetApplicationStatus());
      // store error directly in slice
      return;
    }

    if (!resumeText && !resumeFile) {
      dispatch(resetApplicationStatus());
      return;
    }

    dispatch(
      applyToJob({
        jobId: id,
        resumeText,
        resumeFile,
      })
    ).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        setResumeText("");
        setResumeFile(null);
        setTimeout(() => {
          dispatch(resetApplicationStatus());
        }, 3000);
      }
    });
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
        {loadingJob && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin">
              <div className="w-8 h-8 border-2 border-slate-700 border-t-gradient-to-r border-t-purple-500 rounded-full" />
            </div>
            <p className="ml-4 text-slate-300 text-lg font-light">Loading job details...</p>
          </div>
        )}

        {jobError && !loadingJob && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent px-6 py-4 text-sm text-red-400 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span>{jobError}</span>
            </div>
          </div>
        )}

        {job && !loadingJob && (
          <>
            {/* Job Header Section */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 p-8 md:p-10 mb-8 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
                    {job.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-4 text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <span className="font-light">{job.location}</span>
                    </div>
                    <div className="hidden sm:block w-px bg-slate-700/30" />
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      <span className="font-light">
                        Posted {new Date(job.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {Array.isArray(job.skills) && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex px-4 py-2 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-slate-200 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Job Description Section */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 p-8 md:p-10 mb-8 backdrop-blur-md shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded" />
                About this position
              </h2>
              <p className="text-slate-300 whitespace-pre-line leading-relaxed font-light text-lg">
                {job.description}
              </p>
            </section>

            {/* Apply Section */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 p-8 md:p-10 backdrop-blur-md shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded" />
                Apply now
              </h2>

              {applyError && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent px-6 py-4 text-sm text-red-400 backdrop-blur-sm animate-in fade-in duration-300">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">⚠️</span>
                    <span>{applyError}</span>
                  </div>
                </div>
              )}

              {applySuccess && (
                <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-transparent px-6 py-4 text-sm text-emerald-300 backdrop-blur-sm animate-in fade-in duration-300">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">✓</span>
                    <span>{applySuccess}</span>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleApply}>
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                    Resume / Cover Letter
                  </label>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    rows={6}
                    placeholder="Paste your resume summary or write a compelling cover letter..."
                    className="w-full rounded-2xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-light leading-relaxed"
                  />
                  <p className="mt-2 text-xs text-slate-400 font-light">
                    💡 Tip: Share your experience and why you're a great fit for this role
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                    Upload Resume (PDF)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="rounded-2xl border-2 border-dashed border-slate-600/50 bg-slate-700/20 px-4 py-8 text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                      <div className="text-3xl mb-2">📄</div>
                      <p className="text-slate-300 font-medium">
                        {resumeFile ? resumeFile.name : "Drop your PDF or click to browse"}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 font-light">
                        PDF files up to 2MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={applyLoading}
                    className="w-full md:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-base hover:shadow-lg hover:shadow-purple-500/50 disabled:bg-slate-600/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:hover:shadow-none disabled:hover:scale-100 uppercase tracking-wide"
                  >
                    {applyLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit application"
                    )}
                  </button>
                </div>
              </form>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

