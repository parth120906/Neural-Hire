import React, { useEffect, useMemo, useState } from 'react'
import RecruiterSidebar from '../../components/RecuiterSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Edit2, Eye, Trash2 } from 'lucide-react'
import { closeRecruiterJob, deleteRecruiterJob, getAllJobs, getApplications, getRecruiterApplications } from '../../features/recruiter/recruiterSlice'
import { useNavigate } from 'react-router-dom'
import EditJobModal from '../../components/recuiter/EditJobModal'

const RecuiterJob = () => {


    const { user } = useSelector((state) => state.auth)

const { jobs, jobsLoading, jobsError, allApplications, allApplicationsLoading } = useSelector((state) => state.recruiter)

  const jobsData = jobs
  const [editingJob, setEditingJob] = useState(null)
const dispatch = useDispatch()
const navigate = useNavigate()
  useEffect(() => {
  if (!user) return
  
  
  if (!user?.isRecruiter) {
    navigate("/login")
    return
  }
  
  dispatch(getAllJobs())
  dispatch(getRecruiterApplications())
  
  
  }, [user, dispatch, navigate])

  const handleViewApplications = (jobId) => {
    dispatch(getApplications(jobId))
    navigate(`/recuiter/job/${jobId}/applications`)
  }

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Delete this job?')) {
      dispatch(deleteRecruiterJob(jobId))
    }
  }

  const handleCloseJob = (jobId) => {
    if (window.confirm('Close this job? Candidates will no longer see it.')) {
      dispatch(closeRecruiterJob(jobId))
    }
  }

  const applicationCountByJobId = useMemo(() => {
    const map = new Map()
    for (const app of allApplications || []) {
      const id = app?.jobId?._id || app?.jobId
      if (!id) continue
      map.set(id, (map.get(id) || 0) + 1)
    }
    return map
  }, [allApplications])

  const totalApplications = (allApplications || []).length

  const totalJobs = jobsData?.length || 0
  const activeJobs = (jobsData || []).filter((j) => j.isActive).length
  const closedJobs = totalJobs - activeJobs
  const stats = [
    { title: 'Total Jobs Posted', value: String(totalJobs), color: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'Active Jobs', value: String(activeJobs), color: 'bg-green-50', textColor: 'text-green-600' },
    { title: 'Closed Jobs', value: String(closedJobs), color: 'bg-red-50', textColor: 'text-red-600' },
    { title: 'Total Applications', value: allApplicationsLoading ? '…' : String(totalApplications), color: 'bg-purple-50', textColor: 'text-purple-600' },
  ]

  const getStatusBadgeColor = (isActive) =>
    isActive ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Sidebar */}
        <RecruiterSidebar />
    

      {/* Main Content */}
      <div className="flex-1 ml-0 overflow-y-auto relative z-10">
        <div className="p-8">

          {/* Header Section */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">My Jobs</h1>
              <p className="text-slate-300 font-light">Manage and monitor all jobs you have posted</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-slate-800/50 text-slate-300 border border-slate-600/50 rounded-full hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 font-semibold text-sm backdrop-blur-sm">
                Filter Jobs
              </button>
              <button onClick={() => navigate("/recuiter/create-job")} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-semibold text-sm transform hover:scale-105 active:scale-95">
                Create New Job
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => {
              const gradients = [
                'from-purple-500/5 to-transparent',
                'from-blue-500/5 to-transparent',
                'from-red-500/5 to-transparent',
                'from-emerald-500/5 to-transparent'
              ];
              const textColors = ['text-purple-300', 'text-blue-300', 'text-red-300', 'text-emerald-300'];
              return (
                <div key={idx} className={`group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">{stat.title}</p>
                    <p className={`${textColors[idx]} text-4xl font-bold mt-3`}>{stat.value}</p>
                    <p className="text-slate-500 text-xs mt-2 font-light">Last 30 days</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Jobs Table */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Applications</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Posted</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
               <tbody>
                {jobsLoading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-6 text-sm text-slate-400">
                      Loading jobs...
                    </td>
                  </tr>
                )}
                {jobsError && !jobsLoading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-6 text-sm text-red-400">
                      {jobsError}
                    </td>
                  </tr>
                )}
                {!jobsLoading && !jobsError && jobsData?.map((job) => (
                  <tr key={job._id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-300">
                    <td className="px-6 py-4 text-sm font-medium text-white">{job.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{job.experience}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{job.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-slate-700/50 text-slate-200 rounded-full text-xs font-medium border border-slate-600/50">
                        {job.salary || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {allApplicationsLoading ? "…" : (applicationCountByJobId.get(job._id) ?? 0)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                        job.isActive 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {job.isActive ? "Active" : "Closed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleViewApplications(job._id)} className="p-2 text-slate-400 hover:bg-slate-700/50 hover:text-purple-400 rounded-lg transition-all duration-300">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => setEditingJob(job)} className="p-2 text-slate-400 hover:bg-slate-700/50 hover:text-blue-400 rounded-lg transition-all duration-300">
                          <Edit2 size={16} />
                        </button>
                        {job.isActive && (
                          <button
                            onClick={() => handleCloseJob(job._id)}
                            className="px-3 py-2 text-xs font-semibold text-amber-400 bg-amber-500/20 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition-all duration-300 backdrop-blur-sm"
                          >
                            Close
                          </button>
                        )}
                        <button onClick={() => handleDeleteJob(job._id)} className="p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-300">
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

        </div>
      </div>

      <EditJobModal
        open={Boolean(editingJob)}
        job={editingJob}
        onClose={() => setEditingJob(null)}
      />
    </div>
  )
}

export default RecuiterJob
