import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import ProfileSettings from './ProfileSettings'
import MyReports from './MyReports'
import SearchReports from './SearchReports'
import SubmitReport from './SubmitReport'
import ViewReport from './ViewReport'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="/myreports" element={<MyReports />} />
      <Route path="/search/:id" element={<SearchReports />} />
      <Route path='/submit' element={<SubmitReport/>} />  
      <Route path='/report/:id' element={<ViewReport/>} />

    </Routes>
  )
}

export default App
