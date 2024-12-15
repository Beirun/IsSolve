import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",

        }}
    >
        <Typography variant="h1" sx={{ fontSize: "12rem", fontWeight: "bold" }} color='info'>404</Typography>
        <Typography variant="h4" sx={{ fontSize: "3rem", fontWeight: "bold" }} color='info'  >Page Not Found</Typography>
    </Box>
  )
}

export default NotFound