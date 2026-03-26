'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);

  const primaryCta = user
    ? user.isAdmin
      ? { to: '/admin/dashboard', label: 'Go to admin dashboard' }
      : user.isRecruiter
        ? { to: '/recuiter/dashboard', label: 'Go to recruiter dashboard' }
        : { to: '/jobs', label: 'Browse jobs' }
    : { to: '/jobs', label: 'Browse jobs' };

  const secondaryCta = user
    ? user.isAdmin
      ? { to: '/admin/jobs', label: 'Manage Jobs' }
      : user.isRecruiter
        ? { to: '/recuiter/create-job', label: 'Post a new job' }
        : { to: '/applications/me', label: 'View my applications' }
    : { to: '/login', label: 'Post a job' };

  return (
    <div className="w-full bg-white overflow-hidden">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="min-h-[85vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="w-full max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 w-fit mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
                <span className="text-sm font-medium text-slate-200">AI-powered smart recruitment</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Hire smarter. <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Get hired faster.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-light">
                Neural Hire connects candidates and recruiters using AI—helping you discover the right role or talent in seconds, not weeks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to={primaryCta.to}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-center transform hover:scale-105 active:scale-95"
                >
                  {primaryCta.label}
                </Link>
                <Link
                  to={secondaryCta.to}
                  className="px-8 py-4 bg-slate-800/50 text-white border border-slate-700/50 rounded-full font-semibold hover:bg-slate-700/50 transition-all duration-300 text-center backdrop-blur-sm transform hover:scale-105 active:scale-95"
                >
                  {secondaryCta.label}
                </Link>
              </div>

              {!user && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register-candidate"
                    className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 text-center transform hover:scale-105 active:scale-95"
                  >
                    Register as Candidate
                  </Link>
                  <Link
                    to="/register-recruiter"
                    className="px-8 py-4 bg-slate-800/50 text-white border border-slate-700/50 rounded-full font-semibold hover:bg-slate-700/50 transition-all duration-300 text-center backdrop-blur-sm transform hover:scale-105 active:scale-95"
                  >
                    Register as Recruiter
                  </Link>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-transparent rounded" />
                  <span>Trusted by 1000+ recruiters and candidates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-transparent rounded" />
                  <span>AI matching for better outcomes</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-md space-y-4 relative">
                {/* Main card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 p-6 backdrop-blur-md shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Live openings</p>
                      <p className="text-3xl font-bold text-white">200+</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      NH
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                      <span className="font-medium text-slate-200">Frontend Developer</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                        Hiring
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                      <span className="font-medium text-slate-200">Full Stack Engineer</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                        Remote
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                      <span className="font-medium text-slate-200">Product Designer</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                        Hot
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-4 text-center backdrop-blur-md hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
                    <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">Active jobs</p>
                    <p className="text-2xl font-bold text-white">200+</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-4 text-center backdrop-blur-md hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
                    <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">Companies</p>
                    <p className="text-2xl font-bold text-white">50+</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-4 text-center backdrop-blur-md hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105">
                    <p className="text-xs text-slate-400 mb-2 font-semibold uppercase">Candidates</p>
                    <p className="text-2xl font-bold text-white">1k+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Why Neural Hire</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Experience a recruitment platform built for modern tech teams, recruiters, and candidates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Job Matching</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  AI-powered matching algorithm connects you with the most relevant jobs and candidates based on skills and preferences.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Easy Hiring Process</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Streamlined hiring workflow with intuitive tools for posting jobs, reviewing applications, and managing candidates efficiently.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Secure & Fast</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Enterprise-grade security protects your data while our platform delivers lightning-fast performance and reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">How it works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Get started in three simple steps and begin your journey today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-2xl flex items-center justify-center font-bold text-4xl mb-8 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-110">
                1
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Create Account</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Sign up as a candidate or recruiter. Complete your profile with relevant information and preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center font-bold text-4xl mb-8 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-110">
                2
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Apply or Post Jobs</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Browse job listings and apply or create job postings to attract qualified candidates from our community.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 text-white rounded-2xl flex items-center justify-center font-bold text-4xl mb-8 shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300 transform group-hover:scale-110">
                3
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Get Hired / Hire Talent</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Connect with opportunities and talented professionals. Complete interviews and start your new journey.
              </p>
            </div>
          </div>

          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-12 inset-x-0">
            <div className="max-w-6xl mx-auto px-4">
              <div className="h-1 bg-gradient-to-r from-transparent via-gradient-to-r from-purple-500 via-blue-500 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      {!user && (
        <section className="py-24 px-4 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
          </div>
          
          <div className="w-full max-w-4xl mx-auto relative z-10">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-12 md:p-16 text-center border border-slate-700/50 backdrop-blur-md">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Ready to transform your <br className="hidden sm:block" /> career or hiring?
              </h2>
              <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-light">
                Join thousands of professionals and companies already using our platform to find success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register-candidate"
                  className="px-8 py-4 bg-gradient-to-r from-white to-slate-100 text-slate-900 rounded-full font-bold hover:shadow-lg transition-all duration-300 text-lg text-center transform hover:scale-105 active:scale-95"
                >
                  Register as Candidate
                </Link>
                <Link
                  to="/register-recruiter"
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-2 border-transparent rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-lg text-center transform hover:scale-105 active:scale-95"
                >
                  Register as Recruiter
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Neural Hire</h3>
              <p className="text-sm text-slate-500">Smart recruitment for modern teams.</p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/jobs" className="hover:text-white transition-colors duration-300">Browse jobs</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors duration-300">Post a job</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="cursor-default text-slate-600">About</span></li>
                <li><span className="cursor-default text-slate-600">Contact</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="cursor-default text-slate-600">Privacy Policy</span></li>
                <li><span className="cursor-default text-slate-600">Terms of Service</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Neural Hire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
