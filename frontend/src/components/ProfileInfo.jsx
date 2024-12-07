import { Box, Avatar, Typography, Button } from '@mui/material'
import React from 'react'
import '@fontsource/inter';
import '@fontsource/inter/700.css';


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
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
        width: "27.5vh",
        height: "27.5vh",
        fontSize: "10vh",
        fontWeight: "700",
        fontFamily: "Inter",
        marginLeft: "2.5vw",
        marginRight: "1vw",
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


    

const ProfileInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "10vh",
        width: "80vw",
        height: "150vh",
        // backgroundColor: "#f4f4f4",
      }}
    >
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "95%",
                width: "calc(100% - 1px)",
                borderLeft: "1px solid black",
                gap: "1.5vh",
            }}
        >
            {/* AVATAR SECTION */}
            <Box
                sx={{
                    height: "25%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "red",
                }}
            >
                <Avatar 
                    {...stringAvatar("John Doe")}
                />
                <Typography
                    sx={{
                        fontSize: "clamp(1.5rem, 2.5vw, 3rem)",
                        fontWeight: "700",
                        fontFamily: "Inter",
                    }}
                    >
                Doe
                </Typography>
                <Typography
                    sx={{
                        fontSize: "clamp(1.5rem, 2.5vw, 3rem)",
                        fontWeight: "200",
                        fontFamily: "Inter",
                    }}
                >
                    , John
                </Typography>
            </Box>

            {/* BIO SECTION */}
            <Box
                sx={{
                    height: "25%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        height: "20%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: "blue",
                    }}
                >
                <Typography>Profile Information</Typography>
                </Box>
                <Box
                    sx={{
                        height: "50%",
                        width: "95%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: "yellow",
                    }}
                >
                <Box>
                    <Typography
                        sx={{
                            fontSize: "clamp(.75rem, 1.25vw, 1rem)",
                            fontWeight: "500",
                            fontFamily: "Inter",
                        }}
                    >
                        Name
                    </Typography>
                </Box>
                </Box>
            </Box>
        </Box>
    </Box>  
  )
}

export default ProfileInfo