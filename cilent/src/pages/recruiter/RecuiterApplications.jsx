import React, { useEffect, useMemo, useState } from 'react';
import { Search, MapPin, Briefcase, Calendar, Download, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight, Users, Clock } from 'lucide-react';
import RecruiterSidebar from '../../components/RecuiterSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getApplications, getRecruiterApplications, getResume, updateRecruiterApplicationStatus } from '../../features/recruiter/recruiterSlice';

function ViewApplications() {
  const { user } = useSelector((state) => state.auth);
  const {
    applications,
    applicationsLoading,
    applicationsError,
    allApplications,
    allApplicationsLoading,
    allApplicationsError,
  } = useSelector((state) => state.recruiter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobId } = useParams();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!user.isRecruiter) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.isRecruiter) return;
    if (jobId) dispatch(getApplications(jobId));
    else dispatch(getRecruiterApplications());
  }, [user, jobId, dispatch]);

  const list = jobId ? applications : allApplications;
  const loading = jobId ? applicationsLoading : allApplicationsLoading;
  const error = jobId ? applicationsError : allApplicationsError;

  // filters + paging (client-side; backend returns full list)
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | applied | shortlisted | rejected
  const [sortBy, setSortBy] = useState('newest'); // newest | oldest
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [selectedId, setSelectedId] = useState(null);

  const filteredList = useMemo(() => {
    const base = Array.isArray(list) ? list : [];
    const term = searchTerm.trim().toLowerCase();

    let next = base;

    if (statusFilter !== 'all') {
      next = next.filter((a) => (a.status || 'applied') === statusFilter);
    }

    if (term) {
      next = next.filter((a) => {
        const candidateName = (a.candidateId?.name || '').toLowerCase();
        const candidateEmail = (a.candidateId?.email || '').toLowerCase();
        const jobTitle = (a.jobId?.title || '').toLowerCase();
        const jobLocation = (a.jobId?.location || '').toLowerCase();
        const jobSkills = (a.jobId?.skills || []).join(' ').toLowerCase();
        return (
          candidateName.includes(term) ||
          candidateEmail.includes(term) ||
          jobTitle.includes(term) ||
          jobLocation.includes(term) ||
          jobSkills.includes(term)
        );
      });
    }

    next = [...next].sort((a, b) => {
      const at = new Date(a.createdAt || 0).getTime();
      const bt = new Date(b.createdAt || 0).getTime();
      return sortBy === 'oldest' ? at - bt : bt - at;
    });

    return next;
  }, [list, searchTerm, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedList = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, safePage]);

  useEffect(() => {
    // reset paging when list changes (new jobId / refetch)
    setPage(1);
    setSearchTerm('');
    setStatusFilter('all');
    setSortBy('newest');
    setSelectedId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  useEffect(() => {
    // ensure selection is valid for current filtered list
    if (!selectedId && filteredList.length > 0) {
      setSelectedId(filteredList[0]._id);
      return;
    }
    if (selectedId && !filteredList.some((a) => a._id === selectedId)) {
      setSelectedId(filteredList[0]?._id || null);
    }
  }, [filteredList, selectedId]);

  const selectedApp = useMemo(() => {
    if (!selectedId) return null;
    return filteredList.find((a) => a._id === selectedId) || null;
  }, [filteredList, selectedId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'applied':
      default:
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <RecruiterSidebar/>   
      <div className="flex-1 lg:ml-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 pt-16 lg:pt-8">
            <div className="flex items-center text-sm text-slate-400 mb-3">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Dashboard</span>
              <span className="mx-2">/</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">My Jobs</span>
              <span className="mx-2">/</span>
              <span className="text-white font-medium">Applications</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Job Applications</h1>
            <p className="text-slate-300 font-light">Review candidates who applied for this job</p>
          </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {jobId ? "Applications for selected job" : "All applications"}
              </h2>
              <p className="text-lg text-slate-300 mb-3 font-light">
                {jobId ? `Job ID: ${jobId}` : "Across all jobs you posted"}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>—</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">Recruiter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Updated live</span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-start lg:items-end gap-3">
              <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-lg border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 font-semibold">Active</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold text-white">{(list || []).length}</span>
                <span className="text-slate-400">Total Applicants</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search candidate by name or skill"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm bg-slate-800/50 text-white placeholder-slate-400 backdrop-blur-sm font-light transition-all duration-300"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full px-3 py-2.5 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm bg-slate-800/50 text-white backdrop-blur-sm font-light transition-all duration-300"
              >
                <option value="all" className="bg-slate-900">All status</option>
                <option value="applied" className="bg-slate-900">Applied</option>
                <option value="shortlisted" className="bg-slate-900">Shortlisted</option>
                <option value="rejected" className="bg-slate-900">Rejected</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full px-3 py-2.5 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm bg-slate-800/50 text-white backdrop-blur-sm font-light transition-all duration-300"
              >
                <option value="newest" className="bg-slate-900">Sort by: Newest</option>
                <option value="oldest" className="bg-slate-900">Sort by: Oldest</option>
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between h-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-300 backdrop-blur-sm">
                <span className="font-semibold">Results</span>
                <span className="text-white font-bold">{filteredList.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-6 w-full items-start">
          {/* Table */}
          <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700/30">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {loading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-6 text-sm text-slate-400">
                      Loading applications...
                    </td>
                  </tr>
                )}
                {error && !loading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-6 text-sm text-red-400">
                      {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && pagedList.map((app) => (
                  <tr
                    key={app._id}
                    onClick={() => setSelectedId(app._id)}
                    className={`cursor-pointer transition-colors duration-150 ${
                      selectedId === app._id ? "bg-purple-500/10 border-l-2 border-purple-500" : "hover:bg-slate-700/20"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                          {app.candidateId?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-white">{app.candidateId?.name}</div>
                          <div className="text-sm text-slate-400">{app.jobId?.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">{app.candidateId?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300 font-medium">—</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {(app.jobId?.skills || []).slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                        {(app.jobId?.skills || []).length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50">
                            +{app.jobId.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-slate-300">
                        <Clock className="w-4 h-4 mr-1.5 text-slate-500" />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border backdrop-blur-sm ${
                        (app.status || 'applied') === 'shortlisted'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : (app.status || 'applied') === 'rejected'
                          ? 'bg-red-500/20 text-red-300 border-red-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {app.status || 'applied'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={async () => {
                          const res = await dispatch(getResume(app._id));
                          const url = res.payload?.resumeUrl;
                          if (url) window.open(url, "_blank");
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-slate-600/50 shadow-sm text-xs font-medium rounded-lg text-slate-300 bg-slate-800/50 hover:bg-slate-800 hover:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-150 backdrop-blur-sm"
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        Download
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedId(app._id)}
                          className={`inline-flex items-center px-3 py-1.5 border shadow-sm text-xs font-medium rounded-lg transition-all duration-150 ${
                            selectedId === app._id
                              ? "border-purple-500 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                              : "border-slate-600/50 text-slate-300 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500"
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </button>
                        {(app.status || 'applied') !== 'shortlisted' && (
                          <button
                            type="button"
                            onClick={() => dispatch(updateRecruiterApplicationStatus({ applicationId: app._id, status: "shortlisted" }))}
                            className="inline-flex items-center px-3 py-1.5 border border-emerald-500/30 shadow-sm text-xs font-medium rounded-lg text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-150 backdrop-blur-sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                            Shortlist
                          </button>
                        )}
                        {(app.status || 'applied') !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => dispatch(updateRecruiterApplicationStatus({ applicationId: app._id, status: "rejected" }))}
                            className="inline-flex items-center px-3 py-1.5 border border-red-500/30 shadow-sm text-xs font-medium rounded-lg text-red-300 bg-red-500/20 hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-150 backdrop-blur-sm"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>

            <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-400">
                  Showing{" "}
                  <span className="font-semibold text-slate-300">
                    {filteredList.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-300">
                    {Math.min(safePage * pageSize, filteredList.length)}
                  </span>{" "}
                  of <span className="font-semibold text-slate-300">{filteredList.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="inline-flex items-center px-3 py-2 border border-slate-600/50 shadow-sm text-sm font-medium rounded-lg text-slate-300 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <span className="px-3 py-2 text-sm text-slate-300">
                    Page <span className="font-semibold">{safePage}</span> /{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </span>
                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details panel (sticky, not fixed) */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row w-full">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-8 text-white md:w-1/3 flex flex-col justify-center">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center text-blue-700 text-xl font-bold shadow">
                      {selectedApp?.candidateId?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight">
                        {selectedApp?.candidateId?.name || "Select an application"}
                      </h3>
                      <p className="text-blue-100 text-sm mt-1">
                        {selectedApp?.jobId?.title || "—"}
                      </p>
                    </div>
                  </div>
                  {selectedApp && (
                    <span
                      className={`px-3 py-1 mt-4 rounded-full text-xs font-semibold self-start ${getStatusColor(
                        selectedApp.status || "applied"
                      )}`}
                    >
                      {selectedApp.status || "applied"}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 md:w-2/3 flex flex-col justify-center">
                {!selectedApp ? (
                  <p className="text-sm text-gray-600">
                    Click <span className="font-semibold">View</span> on any row to see candidate
                    details here.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Email
                      </label>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedApp.candidateId?.email || "—"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Applied date
                        </label>
                        <p className="text-sm text-gray-900 mt-1">
                          {selectedApp.createdAt
                            ? new Date(selectedApp.createdAt).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Location
                        </label>
                        <p className="text-sm text-gray-900 mt-1">
                          {selectedApp.jobId?.location || "—"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Job skills
                      </label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(selectedApp.jobId?.skills || []).slice(0, 8).map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {(selectedApp.jobId?.skills || []).length === 0 && (
                          <span className="text-sm text-gray-500">—</span>
                        )}
                      </div>
                    </div>

                    {selectedApp.resumeText && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Resume text
                        </label>
                        <p className="text-sm text-gray-900 mt-1 whitespace-pre-line line-clamp-6">
                          {selectedApp.resumeText}
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={async () => {
                          const res = await dispatch(getResume(selectedApp._id));
                          const url = res.payload?.resumeUrl;
                          if (url) window.open(url, "_blank");
                        }}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2 transition-colors duration-150"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Open Resume
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateRecruiterApplicationStatus({
                                applicationId: selectedApp._id,
                                status: "shortlisted",
                              })
                            )
                          }
                          className="inline-flex items-center justify-center px-4 py-2.5 border border-green-300 shadow-sm text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                        >
                          <CheckCircle className="w-4 h-4 mr-1.5" />
                          Shortlist
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateRecruiterApplicationStatus({
                                applicationId: selectedApp._id,
                                status: "rejected",
                              })
                            )
                          }
                          className="inline-flex items-center justify-center px-4 py-2.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                        >
                          <XCircle className="w-4 h-4 mr-1.5" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ViewApplications;
