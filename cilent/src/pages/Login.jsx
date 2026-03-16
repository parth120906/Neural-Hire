import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {  loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";


export default function Login() {
const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Please fill all fields")
      return
    }

    dispatch(loginUser(formData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  
    if (isSuccess || user) {
      navigate("/")
    }


  }, [user, isError, isSuccess, message, dispatch, navigate])

  if (isLoading) {
    return (
      <h1 className="text-center text-6xl">
        Loading...
      </h1>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
        {/* Left Section - Desktop Only */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-8 py-12 border-r border-slate-700/50">
          <div className="max-w-md text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">NH</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">Neural</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Hire</span>
              </div>
            </div>

            {/* Tagline */}
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Hire smarter. Apply faster.</h1>

            {/* Description */}
            <p className="text-slate-300 text-lg leading-relaxed font-light">
              Find your next opportunity or discover top talent with AI-powered matching. Neural Hire connects ambitious professionals with innovative companies.
            </p>
          </div>
        </div>

        {/* Right Section - Login Card */}
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NH</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-bold text-white">Neural</span>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Hire</span>
              </div>
            </div>

            {/* Card Container */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 backdrop-blur-md p-8 shadow-xl">
              {/* Heading */}
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Login to your account</h2>
              <p className="text-slate-400 text-sm mb-8 font-light">Welcome back! Please enter your details</p>

              {/* Form */}
              <form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                    Email address
                  </label>
                  <input
                    name='email'
                    value={email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    name='password'
                    value={password}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/50 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Login
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500">or</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="space-y-3">
                {/* Google Button */}
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-600/50 rounded-xl text-slate-300 font-medium hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* LinkedIn Button */}
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-600/50 rounded-xl text-slate-300 font-medium hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.42-.648 1.36-1.573 3.322-1.573 2.432 0 4.261 1.588 4.261 5.004v6.867zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.921-1.715 1.147 0 1.918.76 1.918 1.715 0 .953-.771 1.715-1.924 1.715zm1.582 11.597H3.635V9.861h3.286v10.591zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  Continue with LinkedIn
                </button>
              </div>

              {/* Register Link */}
              <p className="text-center text-slate-400 text-sm mt-8 font-light">
                Don't have an account?{' '}
                <a href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
