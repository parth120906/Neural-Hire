import { Link, useLocation, useNavigate } from "react-router-dom"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'

const Navbar = () => {

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()


    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/")
    }



    return (
        <header className={location.pathname.includes("/admin") || location.pathname.includes("/recuiter") ? "hidden" : "sticky top-0 z-50 bg-gradient-to-b from-slate-900/80 to-slate-900/60 border-b border-slate-700/50 backdrop-blur-md"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to={"/"} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                            <span className="text-white font-bold text-sm">NH</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">Neural Hire</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {
                            user ? (
                                <>
                                    <Link 
                                        to={user?.isAdmin ? "/admin/dashboard" : user.isRecruiter ? '/recuiter/dashboard' : "/candidate/dashboard"} 
                                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="hidden sm:inline">Welcome {user?.name}</span>
                                    </Link>

                                    <button 
                                        onClick={handleLogout} 
                                        className="px-4 py-2 bg-red-500/20 text-red-300 text-sm font-semibold rounded-full hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 backdrop-blur-sm transform hover:scale-105 active:scale-95"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to={"/login"} 
                                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to={"/register"} 
                                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
