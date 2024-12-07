import { AppBar, Box } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <AppBar position='static'
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "flex-start",
        backgroundImage: "linear-gradient(to right, #185854, #009087)",
        alignItems: "center",
        flexDirection: "row",
        width: "100vw",
        height: "10vh",
        boxShadow: "none"
      }}
    >
        <img src="../src/resources/navbar-logo.png" alt="IsSolve" style={{width: "12.5vh"}}/>
    </AppBar>
  )
}

export default Navbar