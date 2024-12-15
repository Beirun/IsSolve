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
import {
  IconMessage,
  IconHeart,
  IconHeartFilled,
  IconSend2,
  IconX,
  IconFileUpload,
} from "@tabler/icons-react";

const ResolveReport = () => {
  const { id } = useParams();
  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  const { enqueueSnackbar } = useSnackbar();
  const { signedInAccount, isAdmin } = useCurrent();
  const [report, setReport] = useState([]);
  const commentRef = useRef(null);
  const { resolveReport, addResolve } = useResolve();
  const [resolvedReport, setResolvedReport] = useState({
    rprt_id: id,
    resolve_description: "",
    resolve_date: formatDate(new Date()),
    resolve_proofimage: "",
    ctzn_id: signedInAccount.ctzn_id,
  });

  const { getViewReport } = useReport();
  const navigate = useNavigate();
  const {
    addNotification,
  } = useNotification();
 

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [errors, setErrors] = useState({
    resolve_description: "",
    resolve_proofimage: false,
  });

  const resizeFile = (file, width, height) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      displaySnackbar("Invalid image format!", "error");
      return;
    }
    setErrors((errors) => ({ ...errors, resolve_proofimage: false }));
    const image = await resizeFile(file, 1200, 500);
    setResolvedReport((resolvedReport) => ({
      ...resolvedReport,
      resolve_proofimage: image,
    }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onChangeProofImage = async (event) => {
    const file = event.target.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      displaySnackbar("Invalid image format!", "error");
      return;
    }
    setErrors((errors) => ({ ...errors, resolve_proofimage: false }));
    const image = await resizeFile(file, 1200, 500);
    setResolvedReport((resolvedReport) => ({
      ...resolvedReport,
      resolve_proofimage: image,
    }));
  };

  const handleDescriptionOnChange = (e) => {
    setResolvedReport((resolvedReport) => ({
      ...resolvedReport,
      resolve_description: e.target.value,
    }));
    setErrors((errors) => ({ ...errors, resolve_description: "" }));
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getViewReport(id, signedInAccount.ctzn_id);
      setReport(data);
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

  const handleResolveReportNotification = async () => {
    const data = await addNotification({
      notification_sender: signedInAccount.ctzn_id,
      notification_message: `Your report has been resolved.`,
      notification_date: formatDate(new Date()),
      notification_status: "unread",
      rprt_id: report.rprt_id,
      ctzn_id: report.ctzn_id,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleResolveReport = async () => {
      const newErrors = { ...errors };
      if (resolvedReport.resolve_description.trim() === "") {
        newErrors.resolve_description = "Please enter a valid description";
      }
      if (!resolvedReport.resolve_proofimage) {
        newErrors.resolve_proofimage = true;
        displaySnackbar("Please upload a proof image!", "error");
      }
      setErrors(newErrors);
      if(newErrors.resolve_description || newErrors.resolve_proofimage) return;
      const data = await resolveReport(id)
      const resolvedData = await addResolve(resolvedReport) 
      if(data && resolvedData) {
        displaySnackbar("Report resolved!", "success");
        handleResolveReportNotification();
        navigate(`/report/${id}`);
      }

  }
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
      <AdminNavbar />
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
              justifyContent: "space-between",
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
              SUBMIT PROOF OF RESOLUTION
            </Typography>
            <Box>
              <Button
                variant="outlined"
                fullWidth
                color={errors.resolve_proofimage ? "error" : "inherit"}
                component="label"
                role={undefined}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onChange={onChangeProofImage}
                sx={{
                  opacity: resolvedReport.resolve_proofimage
                    ? "100%"
                    : errors.resolve_proofimage
                    ? "100%"
                    : "23%",
                  width: "29.362vw",
                  height: "24.626vh",
                  overflow: "hidden",
                  ...(resolvedReport.resolve_proofimage
                    ? { padding: "0" }
                    : null),
                }}
              >
                {resolvedReport.resolve_proofimage ? (
                  <Box
                    sx={{
                      width: "29.362vw",
                      height: "24.626vh",
                      backgroundImage: `url(${resolvedReport.resolve_proofimage})`,
                      zIndex: "1",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconFileUpload size={105} stroke={1} />
                    <Box
                      sx={{
                        height: "10.884vh",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        marginLeft: "2vw",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "justify",
                        }}
                      >
                        <Typography
                          sx={{ fontFamily: "Roboto", fontWeight: "400" }}
                        >
                          DRAG AND DROP
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "35%",
                            height: "1px",
                            backgroundColor: "white",
                          }}
                        />
                        <Typography
                          sx={{ fontFamily: "Roboto", fontWeight: "400" }}
                        >
                          OR
                        </Typography>
                        <Box
                          sx={{
                            width: "35%",
                            height: "1px",
                            backgroundColor: "white",
                          }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography
                          sx={{ fontFamily: "Roboto", fontWeight: "400" }}
                        >
                          UPLOAD AN IMAGE
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={onChangeProofImage}
                />
              </Button>
            </Box>
            <Box sx={{ marginBottom:'-5vh', height: "24.626vh", display: "flex", flexDirection:'column', justifyContent:'flex-start', }}>
            <TextField
              multiline
              rows={5}
              label="Description"
              onChange={handleDescriptionOnChange}
              onKeyDown={handleKeyDown}
              value={resolvedReport.resolve_description}
              error = {errors.resolve_description !== ""}
              helperText={errors.resolve_description}
              variant="outlined"
              fullWidth
              
            />
            </Box>
            <Button
              sx={{ height: "7.483vh" }}
              fullWidth
              color="info"
              variant="contained"
              onClick={handleResolveReport}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default ResolveReport;
