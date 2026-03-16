'use client';

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  askJobQuestion,
  fetchJobs,
  matchResumeToJobs,
} from "../features/jobs/jobSlice";

export default function JobsPage() {
  const dispatch = useDispatch();
  const {
    jobs,
    listLoading,
    listError,
    totalPages,
    currentPage,
    questionLoading,
    questionError,
    questionAnswer,
    questionJob,
    resumeLoading,
    resumeError,
    resumeAnswer,
    resumeJob,
  } = useSelector((state) => state.jobs);

  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [question, setQuestion] = useState("");
  const [resumeText, setResumeText] = useState("");

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const keywordFromUrl = searchParams.get("keyword") || "";
    setKeyword(keywordFromUrl);
    dispatch(fetchJobs({ page: pageFromUrl, keyword: keywordFromUrl }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (keyword) p.set("keyword", keyword);
      else p.delete("keyword");
      p.set("page", "1");
      return p;
    });
      dispatch(fetchJobs({ page: 1, keyword }));
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > (totalPages || 1)) return;
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", page.toString());
      if (keyword) p.set("keyword", keyword);
      return p;
    });
    dispatch(fetchJobs({ page, keyword }));
  };

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setQuestionError("Please enter your skills or question.");
      return;
    }
    dispatch(askJobQuestion(question));
  };

  const handleMatchResume = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setResumeError("Please paste your resume text first.");
      return;
    }
    dispatch(matchResumeToJobs(resumeText));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Find your next job
          </h1>
          <p className="text-lg text-slate-300 font-light">
            Browse active openings and apply directly with AI-powered recommendations.
          </p>
        </header>

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by job title, skills..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-600/50 bg-slate-800/50 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-light"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Error */}
        {listError && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent px-6 py-4 text-sm text-red-400 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span>{listError}</span>
            </div>
          </div>
        )}

        {/* Loading */}
        {listLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin">
              <div className="w-8 h-8 border-2 border-slate-700 border-t-gradient-to-r border-t-purple-500 rounded-full" />
            </div>
            <p className="ml-4 text-slate-300 text-lg font-light">Loading amazing opportunities...</p>
          </div>
        )}

        {/* Jobs list */}
        {!listLoading && jobs.length === 0 && !listError && (
          <div className="text-center py-16">
            <p className="text-slate-300 text-lg font-light">
              No jobs found. Try adjusting your search or let our AI help you find the perfect match!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {jobs.map((job) => (
            <article
              key={job._id}
              className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 flex flex-col justify-between backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-xl font-bold text-white leading-tight flex-1">
                    {job.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm">
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>
                <p className="text-slate-300 line-clamp-3 mb-4 font-light leading-relaxed">
                  {job.description}
                </p>
                {Array.isArray(job.skills) && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-slate-200 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <span className="text-xs text-slate-500 font-light">
                  Posted {new Date(job.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <Link
                  to={`/jobs/${job._id}`}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  View & Apply
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* AI helper section */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ask AI which job fits */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">🤖</span>
              <h2 className="text-xl font-bold text-white">
                Not sure which job fits you?
              </h2>
            </div>
            <p className="text-slate-300 mb-6 font-light leading-relaxed">
              Describe your skills or ideal role and our AI will recommend one of the active jobs.
            </p>
            <form onSubmit={handleAskAI} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                placeholder="Example: I am a React developer with 2 years of experience in building dashboards."
                className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-light"
              />
              {questionError && (
                <p className="text-xs text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {questionError}
                </p>
              )}
              <button
                type="submit"
                disabled={questionLoading}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/50 disabled:bg-slate-600/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:hover:scale-100 uppercase tracking-wide"
              >
                {questionLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Asking AI...
                  </span>
                ) : (
                  "Ask AI"
                )}
              </button>
            </form>
            {questionAnswer && (
              <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/30 p-4 text-sm text-emerald-300 backdrop-blur-sm animate-in fade-in duration-300">
                <p className="mb-3 font-light leading-relaxed">{questionAnswer}</p>
                {questionJob && (
                  <Link
                    to={`/jobs/${questionJob.id}`}
                    className="inline-flex gap-2 mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <span>✓</span>
                    Open suggested job
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Match resume with jobs */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">📄</span>
              <h2 className="text-xl font-bold text-white">
                Let AI read your resume
              </h2>
            </div>
            <p className="text-slate-300 mb-6 font-light leading-relaxed">
              Paste your resume text and AI will suggest the most suitable job from the current openings.
            </p>
            <form onSubmit={handleMatchResume} className="space-y-4">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={4}
                placeholder="Paste your resume text here..."
                className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm font-light"
              />
              {resumeError && (
                <p className="text-xs text-red-400 flex items-center gap-2">
                  <span>⚠️</span>
                  {resumeError}
                </p>
              )}
              <button
                type="submit"
                disabled={resumeLoading}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 disabled:bg-slate-600/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:hover:scale-100 uppercase tracking-wide"
              >
                {resumeLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Matching...
                  </span>
                ) : (
                  "Match my resume"
                )}
              </button>
            </form>
            {resumeAnswer && (
              <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/30 p-4 text-sm text-blue-300 backdrop-blur-sm animate-in fade-in duration-300">
                <p className="mb-3 font-light leading-relaxed">{resumeAnswer}</p>
                {resumeJob && (
                  <Link
                    to={`/jobs/${resumeJob.id}`}
                    className="inline-flex gap-2 mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <span>✓</span>
                    Open suggested job
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm rounded-lg border border-slate-600/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-light backdrop-blur-sm"
            >
              ← Previous
            </button>
            <span className="text-sm text-slate-400 font-light px-4 py-2 rounded-lg bg-slate-800/30 border border-slate-700/50">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm rounded-lg border border-slate-600/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-light backdrop-blur-sm"
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

