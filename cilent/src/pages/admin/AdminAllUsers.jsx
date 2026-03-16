
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { getAllUsers, userUpdate } from "../../features/admin/adminSlice";
import { useEffect } from "react";

export default function ManageUsers() {

  
    const { user } = useSelector((state) => state.auth)
  const { adminLoading, adminSucces, adminError, adminErrorMessage, allUsers } = useSelector(
    (state) => state.admin,
  )

    const dispatch =useDispatch()


    useEffect(()=>{
        if(user?.isAdmin){
        dispatch(getAllUsers())}

          if (!user?.isAdmin) {
      navigate("/login")
    }
    },
    [
user
    ])
     const handleUpdateUser=(userDetails)=>{
    dispatch(userUpdate(userDetails))
  }
  const users = allUsers.users

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <AdminSidebar />
      <div className="w-full lg:ml-10 flex-1 p-4 sm:p-5 lg:p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Manage Users
              </h1>
              <p className="text-slate-300 mt-2 font-light">
                View and manage all registered users
              </p>
            </div>
            <button className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap">
              Add User
            </button>
          </div>

          {/* Filter & Search Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md p-6 mb-8 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Search Users
                </label>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                />
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Role
                </label>
                <select className="w-full px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                  <option className="bg-slate-900">All Roles</option>
                  <option className="bg-slate-900">Admin</option>
                  <option className="bg-slate-900">Employer</option>
                  <option className="bg-slate-900">Candidate</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                  <option className="bg-slate-900">All Status</option>
                  <option className="bg-slate-900">Active</option>
                  <option className="bg-slate-900">Blocked</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Sort By
                </label>
                <select className="w-full px-4 py-3 border border-slate-600/50 rounded-xl text-sm bg-slate-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm">
                  <option className="bg-slate-900">Newest</option>
                  <option className="bg-slate-900">Oldest</option>
                  <option className="bg-slate-900">A - Z</option>
                  <option className="bg-slate-900">Z - A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-700/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                  
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-300 last:border-b-0"
                    >
                      {/* User Avatar & Name */}
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold flex items-center justify-center flex-shrink-0 shadow-lg">
                            {user.name?.charAt(0) || user.avatar}
                          </div>
                          <span className="font-medium text-white">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {user.email}
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {user.isAdmin ? "Admin" : user.isRecruiter ? "Recruiter" : "Candidate"}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
                          user.isActive 
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" 
                            : "bg-red-500/20 text-red-300 border-red-500/30"
                        }`}>
                          {user.isActive ? "Active" : "InActive"}
                        </span>
                      </td>
                    

                      {/* Actions */}
                      <td className="px-6 py-4">
                        {user.isActive ? (
                          <button onClick={() => handleUpdateUser({user: user._id, isActive: false})} className="rounded-lg px-4 py-2 font-semibold text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all duration-300">
                            Deactivate
                          </button>
                        ) : (
                          <button onClick={() => handleUpdateUser({user: user._id, isActive: true})} className="rounded-lg px-4 py-2 font-semibold text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all duration-300">
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Section */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-slate-400">
              Showing <span className="font-semibold text-slate-300">1</span> to{" "}
              <span className="font-semibold text-slate-300">8</span> of{" "}
              <span className="font-semibold text-slate-300">124</span> users
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-slate-600/50 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                1
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-slate-600/50 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                2
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-slate-600/50 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                3
              </button>
              <span className="px-2 text-slate-500">...</span>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-slate-600/50 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                16
              </button>
              <button className="px-4 py-2 border border-slate-600/50 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
