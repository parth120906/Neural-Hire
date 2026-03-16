import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRecruiterJob } from "../../features/recruiter/recruiterSlice";

const INITIAL = {
  title: "",
  description: "",
  skills: "",
  experience: "",
  location: "",
  salary: "",
};

export default function EditJobModal({ open, onClose, job }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const jobId = job?._id;

  const skillsString = useMemo(() => {
    if (!job?.skills) return "";
    return Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills);
  }, [job]);

  useEffect(() => {
    if (!open) return;
    setError("");
    setSaving(false);
    setFormData({
      title: job?.title || "",
      description: job?.description || "",
      skills: skillsString,
      experience: job?.experience || "",
      location: job?.location || "",
      salary: job?.salary || "",
    });
  }, [open, job, skillsString]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!jobId) {
      setError("Missing job id.");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      experience: formData.experience.trim(),
      location: formData.location.trim(),
      salary: formData.salary.trim(),
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (!payload.title || !payload.description || payload.skills.length === 0) {
      setError("Title, description, and skills are required.");
      return;
    }

    try {
      setSaving(true);
      const action = await dispatch(
        updateRecruiterJob({ jobId, jobData: payload })
      );
      if (updateRecruiterJob.fulfilled.match(action)) {
        onClose?.();
      } else {
        setError(action.payload || "Failed to update job.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-700/50">
        <div className="flex items-start justify-between p-8 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit job</h2>
            <p className="mt-2 text-sm text-slate-400 font-light">
              Update your job posting details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-all duration-300"
          >
            <span className="sr-only">Close</span>✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                Skills (comma separated)
              </label>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                Experience
              </label>
              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm font-light"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm font-light"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                Salary (optional)
              </label>
              <input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm font-light"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-semibold text-slate-300 bg-slate-800/50 border border-slate-600/50 rounded-full hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 disabled:bg-slate-600/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              {saving ? (
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
    </div>
  );
}

