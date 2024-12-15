import Resizer from "react-image-file-resizer";
import "leaflet/dist/leaflet.css";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Modal,
  Backdrop,
  Fade,
  styled,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNotification } from "./library/notification";
import { useReport } from "./library/report";
import { useCurrent } from "./library/current";
import { useComment } from "./library/comment";
import { useReact } from "./library/react";
import { useResolve } from "./library/resolve";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import moment from "moment";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import "@fontsource/inter";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const ViewResolve = () => {
  const { id } = useParams();
 
  const { enqueueSnackbar } = useSnackbar();
  const { signedInAccount, isAdmin } = useCurrent();
  const [report, setReport] = useState([]);
  const commentRef = useRef(null);
  const { getResolve } = useResolve();
  const [resolvedReport, setResolvedReport] = useState({});

  const { getViewReport } = useReport();
 

  useEffect(() => {
    async function fetchData() {
      const data = await getViewReport(id, signedInAccount.ctzn_id);
      setReport(data);
      const resolve = await getResolve(id);
      setResolvedReport(resolve);
    }
    fetchData();
  }, [id]);

  const displaySnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  
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
      {isAdmin ? <AdminNavbar logoRoute={true} /> : <Navbar logoRoute={true} />}
      {report && report.ctzn_id ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "87.891vw",
            height: "80.952vh",
            backgroundColor: "#252525",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "1vh",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                height: "20vh",
                marginTop: "20vh",
                flexDirection: "column",
                paddingLeft: "1.2vw",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "4vh",
                }}
              >
                {report.ctzn_profileimage ? (
                  <Avatar
                    src={report.ctzn_profileimage}
                    sx={{ width: "4.2vw", height: "4.2vw" }}
                  />
                ) : (
                  <Avatar sx={{ width: "4.2vw", height: "4.2vw" }} />
                )}
                <Box>
                  <Typography
                    sx={{
                      fontSize: "3.1vh",
                      fontWeight: "600",
                      fontFamily: "Inter",
                      marginLeft: "1vw",
                    }}
                  >
                    {report.ctzn_firstname + " " + report.ctzn_lastname}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.75vh",
                      fontWeight: "400",
                      fontFamily: "Inter",
                      marginLeft: "1vw",
                    }}
                  >
                    {moment(new Date(report.rprt_date)).fromNow()}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: "2.7vh",
                  minHeight: "8.3vh",
                  maxHeight: "8.3vh",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.86vh",
                    textAlign: "justify",
                    fontWeight: "400",
                    fontFamily: "Inter",
                  }}
                >
                  {report.description}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "54.891vw",
                height: "80.952vh",
                backgroundColor: "#252525",
              }}
            >
              <Box
                sx={{
                  marginTop: "7.3vh",
                  marginBottom: "4vh",
                  width: "52.148vw",
                  height: "38.735vh",
                  backgroundImage: `url(${report.img_proof})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px",
                }}
              >
                <Box
                  sx={{
                    width: "52.148vw",
                    height: "38.735vh",
                    backgroundImage:
                      "linear-gradient(to top, rgba(37,37,37), rgba(37,37,37,0),rgba(37,37,37,0))",
                  }}
                />
              </Box>

              <Box
                sx={{
                  height: "4.898vh",
                  width: "52.148vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "1vh",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "3.35vh",
                    fontWeight: "600",
                    fontFamily: "Inter",
                    color: "#29B6F6",
                    marginRight: "1vw",
                  }}
                >
                  {report.issue_type}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "3.1vh",
                    fontWeight: "600",
                    fontFamily: "Inter",
                    marginRight: "2.5vw",
                  }}
                >
                  {report.location}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "33vw",
              height: "81.75vh",
              backgroundColor: "#2a2a2a",

              paddingX: "1.9vw",
              paddingY: "6.4vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "3.1vh",
                fontWeight: "600",
                textAlign: "left",
              }}
            >
               PROOF OF RESOLUTION
            </Typography>
            <Box>
                <Box
                    sx={{
                      width: "29.362vw",
                      height: "41.1vh",
                      backgroundImage: `url(${resolvedReport.resolve_proofimage})`,
                      zIndex: "1",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "4px",
                      marginTop: "3.5vh",
                    }}
                  />
                
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: "2.5vh",
              }}
            >
              <Typography
                  sx={{
                    fontSize: "1.86vh",
                    textAlign: "justify",
                    fontWeight: "400",
                    fontFamily: "Inter",
                  }}
                >
                  {resolvedReport.resolve_description}
                </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default ViewResolve;
