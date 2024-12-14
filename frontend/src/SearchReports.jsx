import { Box, Button, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import { IconSortDescending } from "@tabler/icons-react";
import React from "react";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const SearchReports = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        paddingTop: "10vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "87.97vw",
          minHeight: "90vh",
          paddingTop: "4vh",
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "9.388vh",
            borderRadius: "20px",
            backgroundColor: "#252525",
            marginBottom: "6.25vh",
          }}
        >
            <Typography
                sx={{
                    fontFamily:"Inter",
                    fontWeight:"600",
                    fontSize: "3.05vh",
                }}
            >
                Results For "Road"
            </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "5.71vh",
          }}
        >
          {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((index) => {
            return (
              <Button
                size="large"
                color="info"
                variant="outlined"
                sx={{
                  width: "8.79vw",
                }}
              >
                {index}
              </Button>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "5.71vh",
            marginY: "1rem",
          }}
        >
          <Box
            sx={{
              width: "28.581vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {["PENDING", "IN PROGRESS", "RESOLVED"].map((i, index) => {
              return (
                <input
                  type="button"
                  value={i}
                  style={{
                    width: "8.91vw",
                    height: "5.71vh",
                    border:
                      index == 0
                        ? "1px solid #FDD835"
                        : index === 1
                        ? "1px solid #FF9800"
                        : "1px solid #66BB6A",
                    borderRadius: "100px",
                    color:
                      index == 0
                        ? "#FDD835"
                        : index === 1
                        ? "#FF9800"
                        : "#66BB6A",
                    fontSize: "1rem",
                    fontWeight: "600",
                    fontFamily: "Inter",
                  }}
                />
              );
            })}
          </Box>
          <Box
            sx={{
              width: "calc(100% - 28.581vw)",
              height: "5.71vh",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: "300",
                fontFamily: "Inter",
                marginRight: ".5rem",
              }}
            >
              SORT BY
            </Typography>
            <IconSortDescending size={"5vh"} stroke={1} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "white",
            marginY: ".3vh",
            overflow: "scroll"
          }}
        />
        {[1, 1, 1, 1, 1].map((i,index) => {
          return (
            <Box>
                <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "19.048vh",
                marginY: "5vh",
              }}
            >
              <Box
                sx={{
                  height: "19.048vh",
                  width: "18.424vw",
                  background: "url(../src/resources/loginBg.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px",
                }}
              />
              <Box
                sx={{
                  width: "63.672vw",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "1.5vw",
                    width: "100%",
                    height: "5.71vh",
                  }}
                >
                  <Typography>Pothole</Typography>
                  <Box
                    sx={{
                      width: "8.919vw",
                      height: "4.082vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100px",
                      border: "1px solid #FDD835",
                    }}
                  >
                    IN PROGRESS
                  </Box>
                </Box>
                <Box
                    sx={{
                      width: "100%",
                      height: "9vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",

                    }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.05rem",
                      fontWeight: "regular",
                      fontFamily: "Roboto",
                      textAlign: "justify",
                    }}
                  >
                  Potholes are a common road hazard, often 
                  caused by water damage and freezing temperatures. 
                  They can lead to vehicle damage, accidents, 
                  and increased traffic congestion.
                  </Typography>
                </Box>
                <Box
                    sx={{
                      width: "100%",
                      maxHeight: "5.71vh",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                          fontSize: "1.05rem",
                          fontWeight: "regular",
                          fontFamily: "Roboto",
                        }}
                    >
                    Cebu City  -  Barangay Hall  -  Osmeña Blvd 
                    </Typography>
                    <Button
                      variant="contained"
                      color="info"
                      size="medium"
                      sx={{
                        width: "9.245vw"
                      }}
                    >
                        View Report
                    </Button>
                </Box>
              </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: index == [1, 1, 1, 1, 1].length -1 ? "transparent" : "white",
                    marginY: "1vh",
                }}
            />
            </Box>
          );
        })}
      </Box>
    </Box>
  )
}

export default SearchReports