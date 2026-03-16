import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function RegisterPage() {

 const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error("Please fill all fields")
      return
    }

    dispatch(registerUser(formData))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate("/")
    }

  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <h1 className="text-center text-6xl">Loading...</h1>
  }







  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 relative z-10">
        {/* Left Section - Desktop Only */}
        <div className="hidden lg:flex flex-col justify-center items-start px-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-l-2xl py-12 border border-r border-slate-700/50">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">NH</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">Neural</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Hire</span>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6 text-balance tracking-tight">
              Start your journey with smarter hiring
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed space-y-4 font-light">
              <span className="block mb-4">
                Find jobs faster and connect with the right opportunities tailored to your skills and career goals.
              </span>
              <span className="block">
                Hire better candidates with AI-powered matching and streamlined recruitment workflows.
              </span>
            </p>

            <div className="mt-12 flex gap-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-1"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-1"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-1"></div>
            </div>
          </div>
        </div>

        {/* Right Section - Register Card */}
        <div className="flex flex-col justify-center lg:px-12 lg:bg-gradient-to-br lg:from-slate-800 lg:to-slate-900 lg:rounded-r-2xl">
          <div className="w-full max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-slate-800 to-slate-900 lg:bg-transparent rounded-2xl lg:rounded-none border border-slate-700/50 lg:border-none backdrop-blur-md lg:backdrop-blur-none shadow-xl lg:shadow-none p-8 lg:p-0">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create your account</h1>
            <p className="text-slate-400 text-sm mb-8 font-light">Join Neural Hire and get started</p>

            {/* Register Form */}
            <form className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-slate-600/50 rounded-xl bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={handleChange}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-slate-600/50 rounded-xl bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
                  Password
                </label>
                <input
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-600/50 rounded-xl bg-slate-700/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm font-light"
                />
              </div>

              {/* Terms & Privacy */}
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Terms
                </a>
                {' '}& {' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Privacy Policy
                </a>
              </p>

              {/* Register Button */}
              <button onClick={handleSubmit}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/50 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 mt-6 transform hover:scale-105 active:scale-95"
              >
                Register
              </button>
            </form>

            {/* Divider */}
            <div className="relative mt-8 mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500">or</span>
              </div>
            </div>

            {/* Social Auth Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-slate-600/50 hover:bg-slate-700/50 text-slate-300 font-medium py-3 px-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-slate-600/50 hover:bg-slate-700/50 text-slate-300 font-medium py-3 px-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.474-2.23-1.659-2.23-1.004 0-1.602.678-1.864 1.334-.096.231-.12.554-.12.879v5.586h-3.554s.047-9.141 0-10.095h3.554v1.428c.445-.687 1.241-1.663 3.016-1.663 2.202 0 3.852 1.438 3.852 4.531v5.799zM5.337 8.855c-1.142 0-1.88-.758-1.88-1.704 0-.951.738-1.704 1.92-1.704 1.18 0 1.879.753 1.882 1.704 0 .946-.7 1.704-1.922 1.704zm1.682 11.597H3.655V9.357h3.364v11.095zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
                Continue with LinkedIn
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-400 mt-8 font-light">
              Already have an account?{' '}
              <a href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
