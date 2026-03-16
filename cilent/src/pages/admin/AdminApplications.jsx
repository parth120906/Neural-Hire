'use client'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../components/AdminSidebar'
import { getAllApplications } from '../../features/admin/adminSlice'
import { useEffect } from 'react'

export default function ManageApplicationsPage() {
   const { user } = useSelector((state) => state.auth)

    const { adminLoading, adminSucces, adminError, adminErrorMessage, allApplications } = useSelector(
    (state) => state.admin,
  )
 


   const dispatch =useDispatch()


    useEffect(()=>{
        if(user?.isAdmin){
        dispatch(getAllApplications())}

          if (!user?.isAdmin) {
      navigate("/login")
    }
    },
    [
user
    ])
  console.log(allApplications)
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-10 flex-1 relative z-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50 backdrop-blur-md">
          <div className="px-8 py-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">Applications</h1>
                <p className="mt-2 text-slate-300 font-light">View, monitor, and manage all applications</p>
              </div>
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95">
                Export Applications
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="px-8 py-8">
          {/* Total Applications Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700/50 backdrop-blur-md shadow-lg">
            <p className="text-slate-400 text-sm font-semibold tracking-wide uppercase">TOTAL APPLICATIONS</p>
            <p className="text-5xl font-bold text-white mt-3">{allApplications?.count}</p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-8 border border-slate-700/50 backdrop-blur-md shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <input
                  type="text"
                  placeholder="Search by candidate name..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-600/50 text-sm bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                />
              </div>

              {/* Job Filter */}
              <div>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-600/50 text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                  <option className="bg-slate-900">All Jobs</option>
                  <option className="bg-slate-900">Senior Product Designer</option>
                  <option className="bg-slate-900">Full Stack Developer</option>
                  <option className="bg-slate-900">Data Scientist</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-600/50 text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                  <option className="bg-slate-900">All Status</option>
                  <option className="bg-slate-900">Under Review</option>
                  <option className="bg-slate-900">Shortlisted</option>
                  <option className="bg-slate-900">Rejected</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-600/50 text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                  <option className="bg-slate-900">Newest</option>
                  <option className="bg-slate-900">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications Table Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Applied For</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Resume</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allApplications?.applications?.map((app) => (
                    <tr key={app.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-white">{app?.candidateId?.name}</p>
                          <p className="text-xs text-slate-400">{app?.candidateId?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{app?.jobId?.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{app?.resumeText}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                          app?.status === 'shortlisted'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : app?.status === 'rejected'
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}>
                          {app?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{app.updatedAt}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-300">
                          {app.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/50 flex justify-between items-center text-sm">
              <span className="text-slate-400">Showing 1 to 3 of 847 applications</span>
              <div className="flex gap-2 items-center">
                <button className="px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                  Previous
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                  1
                </button>
                <button className="px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                  2
                </button>
                <button className="px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                  3
                </button>
                <span className="px-2 text-slate-500">...</span>
                <button className="px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                  847
                </button>
                <button className="px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
