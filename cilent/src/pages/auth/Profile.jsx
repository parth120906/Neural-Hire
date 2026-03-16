import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { fetchMyProfile, updateMyProfile } from "../../features/auth/authSlice";

export default function CandidateProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const isCandidate = useMemo(() => {
    if (!user) return false;
    return !user.isAdmin && !user.isRecruiter;
  }, [user]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localMsg, setLocalMsg] = useState("");

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

    dispatch(fetchMyProfile());
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      setLocalMsg("Profile updated successfully.");
      const t = setTimeout(() => setLocalMsg(""), 2500);
      return () => clearTimeout(t);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalMsg("");

    if (!isCandidate) return;

    if (!form.name.trim() || !form.email.trim()) {
      setLocalMsg("Name and email are required.");
      return;
    }

    if (form.password || form.confirmPassword) {
      if (form.password.length < 6) {
        setLocalMsg("Password must be at least 6 characters.");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setLocalMsg("Passwords do not match.");
        return;
      }
    }

    dispatch(
      updateMyProfile({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password ? form.password : undefined,
      })
    ).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        setForm((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
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

      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            My profile
          </h1>
          <p className="text-lg text-slate-300 font-light">
            Update your personal info and keep your account secure.
          </p>
        </header>

        {(localMsg || (isError && message)) && (
          <div
            className={`mb-8 rounded-2xl border px-6 py-4 text-sm backdrop-blur-sm animate-in fade-in duration-300 ${
              isError && message
                ? "border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent text-red-400"
                : "border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">
                {isError && message ? "⚠️" : "✓"}
              </span>
              <span>{isError && message ? message : localMsg}</span>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden backdrop-blur-md shadow-xl">
          <div className="px-8 py-6 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-800/50 to-transparent">
            <div>
              <p className="text-base font-bold text-white">
                Account details
              </p>
              <p className="text-xs text-slate-400 mt-2 font-light">
                Candidate accounts can edit name, email, and password.
              </p>
            </div>
            <span className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-slate-200 text-xs font-semibold border border-purple-500/30">
              Candidate
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Full name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-light"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm font-light"
                />
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

            <div>
              <h3 className="text-base font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-transparent rounded" />
                Security
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                    New password
                  </label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Leave blank to keep current password"
                    className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                    Confirm new password
                  </label>
                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm font-light"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-600/50 text-slate-300 text-sm font-semibold hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300 backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !isCandidate}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:bg-slate-600/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:hover:scale-100 uppercase tracking-wide"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

