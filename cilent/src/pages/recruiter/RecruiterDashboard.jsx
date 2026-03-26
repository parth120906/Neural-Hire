'use client'

import React, { useEffect } from 'react'
import { Bell, Search, Plus, Eye, Trash2, Download, CheckCircle, XCircle } from 'lucide-react'
import {
getAllJobs,
deleteRecruiterJob,
getRecruiterApplications,
getResume,
updateRecruiterApplicationStatus
} from '../../features/recruiter/recruiterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RecruiterSidebar from '../../components/RecuiterSidebar'

const RecruiterDashboard = () => {

const { user } = useSelector((state) => state.auth)

const {
jobs,
jobsLoading,
jobsError,
allApplications,
allApplicationsLoading,
allApplicationsError,
} = useSelector((state) => state.recruiter)

const dispatch = useDispatch()
const navigate = useNavigate()

// ================= AUTH + LOAD JOBS =================
useEffect(() => {
if (!user) return


if (!user?.isRecruiter) {
  navigate("/login")
  return
}

dispatch(getAllJobs())
dispatch(getRecruiterApplications())


}, [user, dispatch, navigate])

// ================= FUNCTIONS =================

// delete job
const handleDeleteJob = (jobId) => {
if (window.confirm("Delete this job?")) {
dispatch(deleteRecruiterJob(jobId))
}
}

// view applications
const handleViewApplications = (jobId) => {
navigate(`/recuiter/job/${jobId}/applications`)
}

// resume open
const handleResume = async (applicationId) => {
const res = await dispatch(getResume(applicationId))


if (res.payload?.resumeUrl) {
  window.open(res.payload.resumeUrl, "_blank")
}

}

const handleShortlist = (id) => {
dispatch(updateRecruiterApplicationStatus({ applicationId: id, status: "shortlisted" }))
}

const handleReject = (id) => {
dispatch(updateRecruiterApplicationStatus({ applicationId: id, status: "rejected" }))
}

const applications = allApplications || []

const applicationCountByJobId = React.useMemo(() => {
  const map = new Map()
  for (const app of applications) {
    const id = app?.jobId?._id || app?.jobId
    if (!id) continue
    map.set(id, (map.get(id) || 0) + 1)
  }
  return map
}, [applications])

const navItems = [
{ label: 'Dashboard', icon: '📊' },
{ label: 'My Jobs', icon: '💼' },
{ label: 'Create Job', icon: '➕' },
{ label: 'Applications', icon: '📬' },
{ label: 'Shortlisted Candidates', icon: '⭐' },
{ label: 'Profile', icon: '👤' },
{ label: 'Settings', icon: '⚙️' },
]

  return ( <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-950">
{/* Sidebar */}
<RecruiterSidebar/>

  {/* Main Content */}
  <div className="flex-1 flex flex-col overflow-hidden relative">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
    </div>

    {/* Top Navbar */}
    <header className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50 px-8 py-4 backdrop-blur-md relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search jobs, candidates..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm bg-slate-800/50 text-white placeholder-slate-400 backdrop-blur-sm font-light"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 ml-8">
          <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors duration-300">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-slate-300">{user?.name || 'Recruiter'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Content */}
    <main className="flex-1 overflow-y-auto relative z-10">
      <div className="p-8">

        {/* Jobs Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-xl mb-8 overflow-hidden">
          <div className="flex items-center justify-between p-8 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-transparent">
            <h3 className="text-2xl font-bold text-white">My Jobs</h3>
            <button onClick={() => navigate("/recuiter/create-job")} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold">
              <Plus size={18} />
              Create New Job
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Applications</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Posted</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobsLoading && (
                  <tr>
                    <td className="px-6 py-6 text-sm text-slate-400" colSpan={7}>
                      Loading jobs...
                    </td>
                  </tr>
                )}
                {jobsError && !jobsLoading && (
                  <tr>
                    <td className="px-6 py-6 text-sm text-red-400" colSpan={7}>
                      {jobsError}
                    </td>
                  </tr>
                )}
                {!jobsLoading && !jobsError && jobs?.map((job) => (
                  <tr key={job._id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-300">
                    <td className="px-6 py-4 text-sm font-medium text-white">{job.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{job.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-slate-700/50 text-slate-200 rounded-full text-xs font-medium border border-slate-600/50 backdrop-blur-sm">
                        {job.experience}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {allApplicationsLoading ? "…" : (applicationCountByJobId.get(job._id) ?? 0)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {job.isActive ? (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium border border-emerald-500/30 backdrop-blur-sm">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium border border-red-500/30 backdrop-blur-sm">
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleViewApplications(job._id)} className="p-2 text-slate-400 hover:bg-slate-700/50 rounded-lg transition-colors duration-300">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => handleDeleteJob(job._id)} className="p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors duration-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-transparent">
            <h3 className="text-2xl font-bold text-white">Recent Applications</h3>
          </div>

          <div className="divide-y divide-slate-700/30">
            {allApplicationsLoading && (
              <div className="p-8 text-sm text-slate-400 flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-slate-700 border-t-purple-500 rounded-full mr-3" />
                Loading applications...
              </div>
            )}
            {allApplicationsError && !allApplicationsLoading && (
              <div className="p-8 text-sm text-red-400">{allApplicationsError}</div>
            )}
            {!allApplicationsLoading && !allApplicationsError && applications?.slice(0, 8).map((app) => (
              <div key={app._id} className="p-6 hover:bg-slate-700/20 transition-colors duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                      {app.candidateId?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{app.candidateId?.name}</p>
                      <p className="text-sm text-slate-400">Applied for: {app.jobId?.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => handleResume(app._id)} className="flex items-center gap-2 px-4 py-2 text-slate-300 border border-slate-600/50 rounded-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 text-sm font-medium backdrop-blur-sm">
                      <Download size={16} />
                      Resume
                    </button>

                    <button onClick={() => handleShortlist(app._id)} className="flex items-center justify-center w-10 h-10 rounded-lg border border-emerald-500/30 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-all duration-300 backdrop-blur-sm">
                      <CheckCircle size={18} />
                    </button>

                    <button onClick={() => handleReject(app._id)} className="flex items-center justify-center w-10 h-10 rounded-lg border border-red-500/30 bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300 backdrop-blur-sm">
                      <XCircle size={18} />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </main>
  </div>
</div>

)
}

export default RecruiterDashboard
