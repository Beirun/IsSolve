import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "./components/Navbar";
import "@fontsource/inter";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/400.css";
import { IconFlameFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        paddingTop: "10vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          width: "88vw",
          height: "81.75vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "88vw",
            height: "10vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "20vw",
              height: "10vh",
              borderRadius: "4px",
              backgroundColor: "#252525",
            }}
          />
          <Button
            variant="contained"
            color="info"
            size="large"
            onClick={() => navigate("/submit")}
            sx={{
              height: "10vh",
              width: "42.23vw",
            }}
          >
            <img
              src="../src/resources/LOGO-BLACK.png"
              width="82px"
              alt="Logo"
            />
            REPORT AN ISSUE
          </Button>
          <Box
            sx={{
              display: "flex",
              width: "20vw",
              height: "10vh",
              backgroundColor: "#252525",
              borderRadius: "4px",
            }}
          />
        </Box>

        {/* TRENDS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "88vw",
            height: "68.30vh",
          }}
        >
          {/* TRENDING */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
              width: "50vw",
              height: "68.30vh",
              borderRadius: "20px",
              backgroundColor: "#252525",
              paddingX: "3.06vw",
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                height: "10vh",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  fontFamily: "Inter",
                }}
              >
                Trending
              </Typography>
              <IconFlameFilled size="6.5vh" color="#29B6F6" />
            </Box>

            {/* CONTENT */}
            <Box
              sx={{
                backgroundImage: "url(../src/resources/loginBG.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "45.45vh",
              }}
            />
            <Box
              sx={{
                height: "10vh",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                gap: "0.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "0.75rem",
                  height: "50%",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.45rem",
                    fontWeight: "600",
                    fontFamily: "Inter",
                  }}
                >
                  Pothole in Sanciangko Street, Cebu City
                </Typography>
                <Button size="small" variant="outlined" color="info">
                  See more
                </Button>
              </Box>
            </Box>
          </Box>

          {/* RECENT */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35.61vw",
              height: "68.30vh",
              backgroundColor: "#252525",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "left",
                width: "30.8vw",
                height: "60.78vh",
              }}
            >
              <Box
                sx={{
                  height: "10vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    fontFamily: "Inter",
                  }}
                >
                  Recent Reports
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "30.8vw",
                  height: "70.43vh",
                  overflow: "hidden",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <Box>
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "14vh",
                        gap: "2vw",
                        // width: "6.7vw",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "6.7vw",
                          height: "100%",
                          backgroundImage: "url(../src/resources/loginBg.png)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <Box
                        sx={{
                          width: "calc(100% - 6.7vw)",
                          height: "95%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "left",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "600",
                            fontFamily: "Inter",
                          }}
                        >
                          Broken Street Light in Colon St.
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "left",
                            flexDirection: "column",
                            width: "100%",
                            height: "70%",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "white",
                              fontSize: "0.85rem",
                              fontWeight: "regular",
                              fontFamily: "Inter",
                              textAlign: "justify",
                            }}
                          >
                            The flickering glow of the broken street light cast
                            eerie shadows on the cracked pavement, a reminder of
                            the neglected neighborhood.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {i > [1, 2, 3].length - 1 ? null : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "4.05vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "white",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
