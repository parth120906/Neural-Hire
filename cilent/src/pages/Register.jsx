import { Link } from "react-router-dom";

export default function RegisterSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Choose your path
          </h1>
          <p className="text-lg text-slate-300 max-w-lg mx-auto lg:mx-0 font-light mb-8">
            Sign up as a candidate to explore opportunities or register as a recruiter to start posting jobs and discover top talent.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <Link
              to="/register-candidate"
              className="px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Register as Candidate
            </Link>
            <Link
              to="/register-recruiter"
              className="px-10 py-4 bg-slate-800/60 border border-slate-700/50 text-white rounded-full font-semibold hover:bg-slate-700/60 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Register as Recruiter
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Choose your journey</p>
                <p className="text-3xl font-bold text-white">Candidate or Recruiter</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                NH
              </div>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p className="rounded-xl p-4 bg-slate-800/40 border border-slate-700/50">
                <span className="font-semibold">Candidate</span> - Browse jobs, apply with one click, and manage applications.
              </p>
              <p className="rounded-xl p-4 bg-slate-800/40 border border-slate-700/50">
                <span className="font-semibold">Recruiter</span> - Post jobs, review talent, and build your hiring pipeline.
              </p>
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
