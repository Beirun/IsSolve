import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import ProfileSettings from './ProfileSettings'
import MyReports from './MyReports'
import SearchReports from './SearchReports'
import SubmitReport from './SubmitReport'
import ViewReport from './ViewReport'
import LandingPage from './LandingPage'
import AdminDashboard from './Admin/AdminDashboard'
import Reports from './Admin/Reports'
import ResolveReport from './ResolveReport'
import ViewResolve from './ViewResolve'
import NotFound from './NotFound'
function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="/myreports" element={<MyReports />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/search/:id" element={<SearchReports />} />
      <Route path='/submit' element={<SubmitReport/>} />  
      <Route path='/report/:id' element={<ViewReport/>} />
      <Route path='/report/:id/resolution' element={<ViewResolve/>} />
      <Route path='/resolve/:id' element={<ResolveReport/>} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/' element={<LandingPage />} />
      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default App
