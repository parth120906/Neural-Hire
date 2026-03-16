import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'

function RecruiterSidebar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/")

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-white hover:border-l-2 hover:border-purple-500"
    }`

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/")
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl border-r border-slate-700/50 backdrop-blur-sm">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">NH</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Neural</span>
            <span className="text-xs text-slate-400 font-light">Recruiter</span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link to={"/recuiter/dashboard"} className={linkClass("/recuiter/dashboard")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 5h4" />
          </svg>
          Dashboard
        </Link>
        <Link to={"/recuiter/job"} className={linkClass("/recuiter/job")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          Manage Jobs
        </Link>
        <Link to={"/recuiter/create-job"} className={linkClass("/recuiter/create-job")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Job
        </Link>
        <Link to={"/recuiter/application"} className={linkClass("/recuiter/application")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m0 0l8-4m0 0l8 4m0 0v10l-8 4m0-10L4 7m0 0v10l8 4m8-4v-10" />
          </svg>
          Manage Applications
        </Link>
        
        <Link to={'/'} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white font-medium transition-all duration-300 mt-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Back to home
        </Link>
      </nav>
      
      <div className="p-4 border-t border-slate-700/50">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/20 hover:text-red-400 font-medium transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
)
}

export default RecruiterSidebar
