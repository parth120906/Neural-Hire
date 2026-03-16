import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllApplications, getAllJobs, getAllUsers } from "../../features/admin/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {


    const { user } = useSelector((state) => state.auth)
  const { adminLoading, adminSucces, adminError, adminErrorMessage, allUsers ,allJobs,allApplications} = useSelector(
    (state) => state.admin,
  )

    const dispatch =useDispatch()
  const navigate =useNavigate()

    useEffect(()=>{
        if(user?.isAdmin){
        dispatch(getAllUsers(),
      getAllJobs(),
    getAllApplications())}

          if (!user?.isAdmin) {
      navigate("/login")
    }
    },
    [
user
    ])

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Sidebar */}
<AdminSidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50 px-8 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <div className="flex items-center gap-6">
              {/* Search Bar */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-600/50 backdrop-blur-sm">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search..." className="bg-transparent text-sm text-white placeholder-slate-400 outline-none w-48 font-light" />
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Profile Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold flex items-center justify-center shadow-lg">
                {user?.name?.[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Welcome Message */}
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight">Welcome Back, {user?.name}</h2>
              <p className="text-slate-300 mt-2 font-light">Here's what's happening with Neural Hire today.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Users */}
              <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Total Users</p>
                    <p className="text-4xl font-bold text-white mt-3">{allUsers?.count}</p>
                    <p className="text-purple-400 text-sm mt-2 font-light">+8.2% from last month</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Recruiters */}
              <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Total Recruiters</p>
                    <p className="text-4xl font-bold text-white mt-3">
                      {allUsers?.users?.filter(u => u.isRecruiter).length || 0}
                    </p>
                    <p className="text-blue-400 text-sm mt-2 font-light">+12.5% from last month</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M7 20H2v-2a3 3 0 015.856-1.487M15 6a3 3 0 11-6 0 3 3 0 016 0zM16 16a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Jobs */}
              <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Total Jobs</p>
                    <p className="text-4xl font-bold text-white mt-3">{allJobs?.count}</p>
                    <p className="text-emerald-400 text-sm mt-2 font-light">+5.3% from last month</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m0 0l8-4m0 0l8 4m0 0v10l-8 4m0-10L4 7m0 0v10l8 4m8-4v-10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Total Applications */}
              <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Total Applications</p>
                    <p className="text-4xl font-bold text-white mt-3">{allApplications?.count}</p>
                    <p className="text-rose-400 text-sm mt-2 font-light">+15.2% from last month</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-xl overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-transparent">
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-900/50 border-b border-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-slate-300 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-300 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
              
                
         {
  allUsers?.users?.map((user) => {
    return (
      <tr key={user._id} className="hover:bg-slate-700/20 transition-colors duration-300 border-b border-slate-700/30">
        <td className="px-6 py-4 text-white font-medium">
          {user.name}
        </td>
        <td className="px-6 py-4 text-slate-300">
          {user.isRecruiter ? "Recruiter" : user.isAdmin ? "Admin" : "User"}
        </td>
        <td className="px-6 py-4 text-slate-400">
          {new Date(user.createdAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
              user.isActive
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border-red-500/30"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </span>
        </td>
      </tr>
    );
  })
}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
