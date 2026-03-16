import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllJobs } from "../../features/admin/adminSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


export default function ManageJobs() {

    const { user } = useSelector((state) => state.auth)
  const { adminLoading, adminSucces, adminError, adminErrorMessage, allJobs } = useSelector(
    (state) => state.admin,
  )


    const dispatch =useDispatch()


    useEffect(()=>{
        if(user?.isAdmin){
        dispatch(getAllJobs())}

          if (!user?.isAdmin) {
      Navigate("/login")
    }
    },
    [
user
    ])
     

  const jobs =allJobs?.jobs
  console.log(jobs)


  const getJobTypeColor = (type) => {
    switch (type) {
      case 'Full-Time':
        return 'bg-blue-100 text-blue-800';
      case 'Part-Time':
        return 'bg-amber-100 text-amber-800';
      case 'Remote':
        return 'bg-green-100 text-green-800';
      case 'Internship':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Rejected':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <AdminSidebar />
      <div className="w-full lg:ml-20 flex-1 p-4 sm:p-5 lg:p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Manage Jobs</h1>
              <p className="text-slate-300 font-light">View, monitor, and manage all job postings</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
              <button className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95">
                Post New Job
              </button>
              <button className="px-6 py-3 text-sm font-semibold text-slate-300 border border-slate-600/50 rounded-full hover:border-slate-500 hover:bg-slate-800/50 transition-all duration-300 backdrop-blur-sm">
                Export Jobs
              </button>
            </div>
          </div>

          {/* Stats Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {jobs?.map((job, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">TOTAL JOBS</p>
                <p className="text-4xl font-bold text-white mt-3">{allJobs?.count}</p>
              </div>
            ))}
          </div>

          {/* Filter & Search Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md p-6 mb-8 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="sm:col-span-2 lg:col-span-1">
                <input
                  type="text"
                  placeholder="Search by job title..."
                  className="w-full px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                />
              </div>

              {/* Location Filter */}
              <select className="px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                <option className="bg-slate-900">All Locations</option>
                <option className="bg-slate-900">Remote</option>
                <option className="bg-slate-900">San Francisco</option>
                <option className="bg-slate-900">New York</option>
                <option className="bg-slate-900">Los Angeles</option>
              </select>

              {/* Job Type Filter */}
              <select className="px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                <option className="bg-slate-900">All Types</option>
                <option className="bg-slate-900">Full-Time</option>
                <option className="bg-slate-900">Part-Time</option>
                <option className="bg-slate-900">Remote</option>
                <option className="bg-slate-900">Internship</option>
              </select>

              {/* Status Filter */}
              <select className="px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                <option className="bg-slate-900">All Status</option>
                <option className="bg-slate-900">Active</option>
                <option className="bg-slate-900">Pending</option>
                <option className="bg-slate-900">Expired</option>
                <option className="bg-slate-900">Rejected</option>
              </select>

              {/* Sort Dropdown */}
              <select className="px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                <option className="bg-slate-900">Newest</option>
                <option className="bg-slate-900">Oldest</option>
                <option className="bg-slate-900">Most Applications</option>
              </select>
            </div>
          </div>

          {/* Jobs Table Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs?.map((job) => (
                  <tr
                    key={job._id}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-300 last:border-b-0"
                  >
                    {/* Job Title */}
                    <td className="px-6 py-4 text-sm font-medium text-white">{job.title}</td>

                    {/* Company */}
                    <td className="px-6 py-4 text-sm text-slate-300">{job.experience}</td>

                    {/* Location */}
                    <td className="px-6 py-4 text-sm text-slate-300">{job.location}</td>

                    {/* Job Type Badge */}
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-200 border border-slate-600/50">
                        {job.skills}
                      </span>
                    </td>

                    {/* Applications Count */}
                    <td className="px-6 py-4 text-sm font-medium text-white">{job.applications}</td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                        job.isActive 
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" 
                          : "bg-red-500/20 text-red-300 border-red-500/30"
                      }`}>
                        {job.isActive ? "Active" : "InActive"}
                      </span>
                    </td>

                    {/* Posted Date */}
                    <td className="px-6 py-4 text-sm text-slate-400">{formatDate(job.createdAt)}</td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {job.isActive ? (
                        <button className="rounded-lg px-4 py-2 font-semibold text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all duration-300">
                          Deactivate
                        </button>
                      ) : (
                        <button className="rounded-lg px-4 py-2 font-semibold text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all duration-300">
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-slate-400">
              Showing <span className="font-semibold text-slate-300">1</span> to <span className="font-semibold text-slate-300">8</span> of{' '}
              <span className="font-semibold text-slate-300">125</span> jobs
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600/50 rounded-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600/50 rounded-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                2
              </button>
              <button className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600/50 rounded-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                3
              </button>
              <span className="text-slate-500">...</span>
              <button className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600/50 rounded-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                15
              </button>
              <button className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600/50 rounded-lg hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
