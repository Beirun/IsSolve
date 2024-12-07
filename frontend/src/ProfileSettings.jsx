import { Box } from '@mui/material'
import SidebarSettings from './components/SidebarSettings'
import Navbar from './components/Navbar'
import React from 'react'
import ProfileInfo from './components/ProfileInfo'

const ProfileSettings = () => {
  return (
    <Box 
    sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100vw",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Navbar />
      <SidebarSettings />
      <ProfileInfo />
    </Box>
  )
}

export default ProfileSettings