import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import RegisterPage from './pages/Register'
import Login from './pages/Login'
import JobsPage from './pages/Jobs'
import JobDetailPage from './pages/JobDetail'
import MyApplicationsPage from './pages/MyApplications'
import CandidateProfilePage from './pages/auth/Profile'
import CandidateDashboard from './pages/candidate/CandidateDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAllUsers from './pages/admin/AdminAllUsers'
import ManageJobs from './pages/admin/AdminJobs'
import ManageApplicationsPage from './pages/admin/AdminApplications'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import RecuiterJob from './pages/recruiter/RecruiterJob'
import CreateJobPage from './components/recuiter/CreateJobPage'
import ViewApplications from './pages/recruiter/RecuiterApplications'
import BackButton from './components/BackButton'

function App() {
  return (
    <>
      <BackButton />

    <Routes>
      <Route path='/' element ={<HomePage/>}/>
      <Route path='/register' element ={<RegisterPage/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/jobs/:id' element={<JobDetailPage />} />
      <Route path='/applications/me' element={<MyApplicationsPage />} />
      <Route path='/auth/profile' element={<CandidateProfilePage />} />
      <Route path='/candidate/dashboard' element={<CandidateDashboard />} />
    </Routes>
    <Routes>

      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/admin/users' element={<AdminAllUsers/>}/>
      <Route path='/admin/jobs' element={<ManageJobs/>}/>
      <Route path='/admin/application' element={<ManageApplicationsPage/>}/>

    </Routes>
    <Routes>


      <Route path='/recuiter/dashboard' element={<RecruiterDashboard/>}/>
      <Route path='/recuiter/job' element={<RecuiterJob/>}/>
      <Route path='/recuiter/application' element={<ViewApplications/>}/>
      <Route path='/recuiter/job/:jobId/applications' element={<ViewApplications/>}/>
      <Route path='/recuiter/create-job' element={<CreateJobPage/>}/>

    </Routes>
    
    
    </>
  )
}

export default App