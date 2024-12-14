import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import Navbar from "./components/Navbar";
import React, { useMemo } from "react";
import {IconCamera, IconCameraFilled} from '@tabler/icons-react'
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "17.25vh",
      height: "17.25vh",
      fontSize: "2vh",
      fontWeight: "500",
      fontFamily: "Inter",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ProfileSettings = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        paddingTop: "10vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          height: "80.136vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "62.435vw",
            height: "23.129vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width:'11.393vw',
              justifyContent:'center',
              flexDirection:'row',
              alignItems: 'right'
            }}
          >
          <Avatar {...stringAvatar("John Doe")} />
          <Box
            sx={{
              display: 'flex',
              height:'100%',
              position:'relative',
              flexDirection:'column',
              justifyContent:'flex-end',
              marginLeft:'-17.5%',
              zIndex:'2',

            }}
          >
          <IconCamera
            stroke='1'
            size={'5vh'}
            color="rgba(255,255,255,.7)"
            style={{
              position:"relative",
              bottom:'-29%',
              left:'-1%'
            }}
          />
          <IconCameraFilled
            stroke='1'
            size={'5vh'}
            color="#1d1d1d"
          />
          </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: "regular",
              fontFamily: "Inter",
              marginTop: "1.5vh",
            }}
          >
            Bernard Jay Orillo
          </Typography>
        </Box>
        <Box
          sx={{
            width: "62.435vw",
            height: "29.252vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "#252525",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "55.729vw",
              height: "4.082vh",
              marginY: "2.4vh",
            }}
          >
            <Typography>PROFILE INFORMATION</Typography>
            <Button
              variant="contained"
              size="small"
              color="info"
              sx={{
                width: "5.859vw",
              }}
            >
              EDIT
            </Button>
          </Box>
          <Box
            sx={{
              width: "55.729vw",
              height: "5.442vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "calc(55.729vw - 25.911vw - 25.911vw)",
              marginBottom: "2.4vh",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              label="Firstname"
              disabled="true"
              sx={{
                width: "25.911vw",
              }}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Username"
              disabled="true"
              sx={{
                width: "25.911vw",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "55.729vw",
              height: "5.442vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "calc(55.729vw - 25.911vw - 25.911vw)",
              marginY: "3.2vh",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              label="Lastname"
              disabled="true"
              sx={{
                width: "25.911vw",
              }}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Email"
              disabled="true"
              sx={{
                width: "25.911vw",
              }}
            />
          </Box>
        </Box>


        <Box
          sx={{
            width: "62.435vw",
            height: "19.864vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "#252525",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "55.729vw",
              height: "4.082vh",
              marginY: "2.4vh",
            }}
          >
            <Typography>CHANGE PASSWORD</Typography>
            <Button
              variant="outlined"
              size="small"
              color="info"
              sx={{
                width: "5.859vw",
              }}
            >
              CHANGE
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "55.729vw",
              height: "4.082vh",
              marginY: "2.4vh",
            }}
          >
            <TextField
              type="password"
              variant="outlined"
              size="small"
              label="Current Password"
              disabled="true"
              sx={{
                width: "17.6431vw",
              }}
            />
            <TextField
              type="password"
              variant="outlined"
              size="small"
              label="Current Password"
              disabled="true"
              sx={{
                width: "17.6431vw",
              }}
            />
            <TextField
              type="password"
              variant="outlined"
              size="small"
              label="Current Password"
              disabled="true"
              sx={{
                width: "17.6431vw",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
