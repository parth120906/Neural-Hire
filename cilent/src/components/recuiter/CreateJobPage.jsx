'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewJob } from '../../features/recruiter/recruiterSlice';
import { Link } from 'react-router-dom';

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  skills: '',
  experience: '',
  location: '',
  salary: '',
};

export default function CreateJobPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Transform skills string to array as used in job model
    const payload = {
      ...formData,
      skills: formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const action = await dispatch(createNewJob(payload));

      if (createNewJob.fulfilled.match(action)) {
        setSuccess('Job posted successfully!');
        setFormData(INITIAL_FORM_STATE);
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
        setError(action.payload || 'Failed to post job. Please try again.');
      }
    } catch (err) {
      console.error('Error posting job:', err);
      setError(
        'An error occurred. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    setFormData(INITIAL_FORM_STATE);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header Section */}
      <div className="border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-md relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center text-sm text-slate-400 font-light">
            <Link to="/recuiter/dashboard" className="hover:text-slate-300 transition-colors">Dashboard</Link>
            <span className="mx-2">/</span>
            <Link to="/recuiter/dashboard" className="hover:text-slate-300 transition-colors">My Jobs</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Create Job</span>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-white tracking-tight">
            Create Job
          </h1>
          <p className="text-slate-300 font-light">
            Post a new job opportunity for candidates
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent p-4 text-sm text-red-400 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-transparent p-4 text-sm text-emerald-300 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex items-start gap-3">
              <span className="text-lg">✓</span>
              <span>{success}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Form Fields */}
          <div className="space-y-6 lg:col-span-2">
            {/* Job Information Card */}
            <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 backdrop-blur-md shadow-xl">
              <h2 className="mb-8 text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded" />
                Job Information
              </h2>

              <div className="space-y-6">
                {/* Job Title Input */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    Job Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    required
                    className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm font-light"
                  />
                </div>

                {/* Job Description Input */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    Job Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="e.g. need Frontend Developer"
                    rows="5"
                    required
                    className="w-full resize-none rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm font-light"
                  />
                </div>

                {/* Required Skills Input */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    Required Skills <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g. react js, nodejs, typescript"
                    required
                    className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm font-light"
                  />
                  <p className="mt-2 text-xs text-slate-400 font-light">
                    Separate skills with commas
                  </p>
                </div>

                {/* Experience Required Input */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    Experience Required <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 2 years"
                    required
                    className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm font-light"
                  />
                </div>

                {/* Salary (optional) */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    Salary (optional)
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g. 8 LPA / $80k"
                    className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm font-light"
                  />
                </div>

                {/* Location Input */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-200 uppercase tracking-wide">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Indore"
                    required
                    className="w-full rounded-xl border border-slate-600/50 bg-slate-700/30 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm font-light"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Job Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 backdrop-blur-md shadow-xl">
              <h3 className="mb-4 text-lg font-bold text-white">
                Job Preview
              </h3>

              <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-sm">
                {/* Title */}
                <div className="mb-3">
                  <h4 className="text-base font-bold text-white">
                    {formData.title || 'Job Title'}
                  </h4>
                </div>

                {/* Location with Icon */}
                {formData.location && (
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    <span className="text-sm text-slate-300">
                      {formData.location}
                    </span>
                  </div>
                )}

                {/* Skills Tags */}
                {formData.skills && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {formData.skills.split(',').map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-purple-500/20 px-2.5 py-1 text-xs font-semibold text-purple-300 border border-purple-500/30"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {formData.experience && (
                  <p className="mb-2 text-sm text-slate-300">
                    <span className="text-slate-400">Experience:</span> {formData.experience}
                  </p>
                )}

                {/* Salary */}
                {formData.salary && (
                  <p className="mb-2 text-sm text-slate-300">
                    <span className="text-slate-400">Salary:</span> {formData.salary}
                  </p>
                )}

                {/* Description */}
                {formData.description && (
                  <p className="line-clamp-3 text-sm text-slate-300 font-light">
                    {formData.description}
                  </p>
                )}
              </div>

              <p className="mt-4 text-center text-xs text-slate-500 font-light">
                Preview updates as you fill the form
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pb-8 lg:col-span-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-full px-6 py-3 border border-slate-600/50 text-slate-300 font-semibold transition hover:border-slate-500 hover:bg-slate-800/50 backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold transition hover:shadow-lg hover:shadow-purple-500/50 disabled:cursor-not-allowed disabled:bg-slate-600/50 transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Posting...
                </span>
              ) : (
                'Post Job'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
