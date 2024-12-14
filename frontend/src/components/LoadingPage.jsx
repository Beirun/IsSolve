import React from 'react'
import { Box, Typography } from '@mui/material'

const LoadingPage = () => {
  return (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          paddingTop: '20vh',
          paddingBottom: '20vh',
          color: "#29B6F6"
        }}
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        >
          <path opacity="0.3">
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q9 2.2 7.3 7 Q6.5 9.5 6.5 12 Q6.5 15 7.3 17 Q9 22 12 22;M12 2 Q6.5 2.2 3.3 7 Q2 9.5 2 12 Q2 15 3.4 17 Q6.5 22 12 22;"
            />
          </path>
          <path opacity="0.3">
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q12 2.2 12 7 Q12 9.5 12 12 Q12 15 12 17 Q12 22 12 22;M12 2 Q9 2.2 7.3 7 Q6.5 9.5 6.5 12 Q6.5 15 7.3 17 Q9 22 12 22;"
            />
          </path>
          <path opacity="0.3">
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q15 2.2 16.6 7 Q17.5 9.5 17.5 12 Q17.5 15 16.7 17 Q15 22 12 22;M12 2 Q12 2.2 12 7 Q12 9.5 12 12 Q12 15 12 17 Q12 22 12 22;"
            />
          </path>
          <path opacity="0.3">
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q17.5 2.2 20.7 7 Q22 9.5 22 12 Q22 15 20.6 17 Q17.5 22 12 22;M12 2 Q15 2.2 16.6 7 Q17.5 9.5 17.5 12 Q17.5 15 16.7 17 Q15 22 12 22;"
            />
          </path>

          <circle cx="12" cy="12" r="10" />
          <path d="M2.4 8.6 Q6 7.1 12 7 Q18 7.1 21.6 8.6" />
          <path d="M2.4 15.2 Q6 17.1 12 17.2 Q17 17.1 21.6 15.2" />

          <path>
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q6.5 2.2 3.3 7 Q2 9.5 2 12 Q2 15 3.4 17 Q6.5 22 12 22;M12 2 Q9 2.2 7.3 7 Q6.5 9.5 6.5 12 Q6.5 15 7.3 17 Q9 22 12 22;"
            />
          </path>
          <path>
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q9 2.2 7.3 7 Q6.5 9.5 6.5 12 Q6.5 15 7.3 17 Q9 22 12 22;M12 2 Q12 2.2 12 7 Q12 9.5 12 12 Q12 15 12 17 Q12 22 12 22;"
            />
          </path>
          <path>
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q12 2.2 12 7 Q12 9.5 12 12 Q12 15 12 17 Q12 22 12 22;M12 2 Q15 2.2 16.6 7 Q17.5 9.5 17.5 12 Q17.5 15 16.7 17 Q15 22 12 22;"
            />
          </path>
          <path>
            <animate
              attributeName="d"
              dur="1s"
              repeatCount="indefinite"
              values="M12 2 Q15 2.2 16.6 7 Q17.5 9.5 17.5 12 Q17.5 15 16.7 17 Q15 22 12 22;M12 2 Q17.5 2.2 20.7 7 Q22 9.5 22 12 Q22 15 20.6 17 Q17.5 22 12 22;"
            />
          </path>
        </svg>
        <Typography  variant="h2" sx={{ marginTop: "1vh" }} fontWeight={"700"} fontFamily={"Inter"} >LOADING</Typography>
      </Box>
  )
}

export default LoadingPage