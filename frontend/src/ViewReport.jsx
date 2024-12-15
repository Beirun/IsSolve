import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
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
} from "@mui/material";
import { useNotification } from "./library/notification";
import { useReport } from "./library/report";
import { useCurrent } from "./library/current";
import { useComment } from "./library/comment";
import { useReact } from "./library/react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import moment from "moment";
import Navbar from "./components/Navbar";
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
} from "@tabler/icons-react";

const ViewReport = () => {
  const { id } = useParams();
  const commentRef = useRef(null);
  const [openLocation, setOpenLocation] = useState(false);
  const navigate = useNavigate();
  const { addNotification, addNotificationCommentReact, getNotificationTime, getNotificationCommentReactTime } = useNotification();
  const {
    createCommentReact,
    deleteCommentReact,
    createReportReact,
    deleteReportReact,
  } = useReact();
  const markerIcon = new Icon({
    iconUrl: "../src/resources/location.png",
    iconSize: [45, 90],
  });
  const timeoutId = useRef(null);
  const timeoutId2 = useRef(null);

  const { signedInAccount } = useCurrent();
  const [report, setReport] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    comment_message: "",
    rprt_id: id,
    ctzn_id: signedInAccount.ctzn_id,
    ctzn_firstname: signedInAccount.ctzn_firstname,
    ctzn_lastname: signedInAccount.ctzn_lastname,
    ctzn_profileimage: signedInAccount.ctzn_profileimage,
    comment_date: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    total_reacts: 0,
    reactor_id: null,
  });
  const { getViewReport, getReportLocation } = useReport();
  const { getReportComments, createComment } = useComment();
  useEffect(() => {
    async function fetchData() {
      const data = await getViewReport(id, signedInAccount.ctzn_id);
      const comments = await getReportComments(id, signedInAccount.ctzn_id);
      setComments(comments);
      setReport(data);
    }
    fetchData();
  }, [id]);

  const handleOpenLocation = () => {
    setOpenLocation(true);
  };

  const handleCloseLocation = () => {
    setOpenLocation(false);
  };

  const handleAddCommentNotification = async () => {
    if (signedInAccount.ctzn_id === report.ctzn_id) return;
    const data = await addNotification({
      notification_sender: signedInAccount.ctzn_id,
      notification_message: `${signedInAccount.ctzn_firstname} ${signedInAccount.ctzn_lastname} commented on your report.`,
      notification_date: formatDate(new Date()),
      notification_status: "unread",
      rprt_id: report.rprt_id,
      ctzn_id: report.ctzn_id,
    });
  };

  const handleAddCommentReactNotification = async (comment) => {
    if (signedInAccount.ctzn_id === comment.ctzn_id) return;
    const notification = {
      notification_sender: signedInAccount.ctzn_id,
      notification_message: `${signedInAccount.ctzn_firstname} ${signedInAccount.ctzn_lastname} reacted to your comment.`,
      notification_date: formatDate(new Date()),
      notification_status: "unread",
      rprt_id: comment.rprt_id,
      comment_id: comment.comment_id,
      ctzn_id: comment.ctzn_id,
    };
    const time = await getNotificationCommentReactTime(notification);
    console.log(dateDifferenceInSeconds(new Date(time.notification_date), new Date()) < 60)
    if (dateDifferenceInSeconds(new Date(time.notification_date), new Date()) < 60) {
        return;
      }
    const data = await addNotificationCommentReact(notification);
  };

  const handleAddReportReactNotification = async () => {
    if (signedInAccount.ctzn_id === report.ctzn_id) return;
    const notification = {
      notification_sender: signedInAccount.ctzn_id,
      notification_message: `${signedInAccount.ctzn_firstname} ${signedInAccount.ctzn_lastname} reacted to your report.`,
      notification_date: formatDate(new Date()),
      notification_status: "unread",
      rprt_id: report.rprt_id,
      ctzn_id: report.ctzn_id,
    };
    const time = await getNotificationTime(notification);
    
    if (dateDifferenceInSeconds(new Date(time.notification_date), new Date()) < 60) {
      return;
    }
    const data = await addNotification(notification);
  };
  const formatDate = (date) => {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
  }
  const dateDifferenceInSeconds = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 1_000;

  const handleAddComment = async () => {
    const newComment = { ...comment };
    if(newComment.comment_message.trim() === "") return;
    const data = await createComment(newComment);
    console.log("data", data);
    setComments([{ ...newComment, comment_id: data.comment_id }, ...comments]);
    setComment({
      comment_message: "",
      rprt_id: id,
      ctzn_id: signedInAccount.ctzn_id,
      ctzn_firstname: signedInAccount.ctzn_firstname,
      ctzn_lastname: signedInAccount.ctzn_lastname,
      ctzn_profileimage: signedInAccount.ctzn_profileimage,
      comment_date: formatDate(new Date()),
      total_reacts: 0,
      reactor_id: null,
    });
    setReport((report) => ({
      ...report,
      total_comments: parseInt(report.total_comments) + 1,
    }));
    await handleAddCommentNotification();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddComment();
    }
  };
  const handleReportLike = async () => {
    await createReportReact({ rprt_id: id, ctzn_id: signedInAccount.ctzn_id });
    handleAddReportReactNotification();
  };

  const handleReportDislike = async () => {
    await deleteReportReact(id, signedInAccount.ctzn_id);
  };

  const handleLike = async (comment) => {
    await createCommentReact({
      comment_id: comment.comment_id,
      ctzn_id: signedInAccount.ctzn_id,
    });
    await handleAddCommentReactNotification(comment);
  };

  const handleDislike = async (comment) => {
    await deleteCommentReact(comment.comment_id, signedInAccount.ctzn_id);
  };

  const handleCommentChange = (event) => {
    setComment({
      ...comment,
      comment_message: event.target.value,
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
      <Navbar />
      {report && report.ctzn_id && comments ? (
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
                marginTop: "2.5vh",
                marginBottom: "4vh",
                width: "52.148vw",
                height: "56.735vh",
                backgroundImage: `url(${report.img_proof})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "4px",
              }}
            >
              <Box
                sx={{
                  width: "52.148vw",
                  height: "56.735vh",
                  backgroundImage:
                    "linear-gradient(to top, rgba(37,37,37), rgba(37,37,37,0),rgba(37,37,37,0))",
                }}
              />
            </Box>
            <Box
              sx={{
                height: "6.395vh",
                width: "52.148vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "3.1vh",
                fontWeight: "600",
                fontFamily: "Inter",
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
              {report.status && (
                <Box
                  sx={{
                    width: "13.874vw",
                    height: "6.395vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    border:
                      report.status === "PENDING"
                        ? "2px solid #FDD835"
                        : report.status === "IN PROGRESS"
                        ? "2px solid #FF9800"
                        : "2px solid #66BB6A",
                    color:
                      report.status === "PENDING"
                        ? "#FDD835"
                        : report.status === "IN PROGRESS"
                        ? "#FF9800"
                        : "#66BB6A",
                  }}
                >
                  {report.status}
                </Box>
              )}
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
                  fontSize: "3.1vh",
                  fontWeight: "600",
                  fontFamily: "Inter",
                  marginRight: "2.5vw",
                }}
              >
                {report.location}
              </Typography>
              <Button
                size="small"
                variant="contained"
                color="info"
                sx={{
                  height: "4.898vh",
                }}
                onClick={handleOpenLocation}
              >
                VIEW LOCATION
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "33vw",
              height: "81.75vh",
              backgroundColor: "#2a2a2a",
              paddingX: "1.9vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "4vh",
              }}
            >
              {signedInAccount.ctzn_profileimage ? (
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
                marginTop: "1.2vh",
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
            <Box
              sx={{
                marginTop: "3.4vh",
                borderBottom: "1px solid white",
                borderTop: "1px solid white",
                height: "5.578vh",
                display: "flex",
                width: "29.362vw",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  height: "5.578vh",
                  width: "9.6vw",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: "2.2vh",
                    marginRight: ".4vw",
                  }}
                >
                  {report.total_reacts}
                </Typography>
                <IconButton
                  onClick={() => {
                    if (report.reactor_id) {
                      setReport((report) => ({
                        ...report,
                        total_reacts: parseInt(report.total_reacts) - 1,
                        reactor_id: null,
                      }));
                      handleReportDislike();
                    } else {
                      setReport((report) => ({
                        ...report,
                        total_reacts: parseInt(report.total_reacts) + 1,
                        reactor_id: signedInAccount.ctzn_id,
                      }));
                      handleReportLike();
                    }
                  }}
                >
                  {report.reactor_id ? (
                    <IconHeartFilled color="red" size={30} />
                  ) : (
                    <IconHeart size={30} />
                  )}
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  height: "5.578vh",
                  width: "12vw",
                }}
              >
                {" "}
                <Typography
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: "400",
                    fontSize: "2.2vh",
                    marginRight: ".4vw",
                  }}
                >
                  {report.total_comments}
                </Typography>
                <IconButton onClick={() => commentRef.current.focus()}>
                  <IconMessage size={30} />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "32.208vh",
                width: "29.362vw",
                paddingY: "2vh",
                overflow: "hidden",
                overflowY: "scroll",
                borderBottom: "1px solid white",
              }}
            >
              {comments && comments.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <Box
                      key={comment.comment_id}
                      sx={{ marginBottom: "2.5vh" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "1vh",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {comment.ctzn_profileimage ? (
                            <Avatar
                              src={comment.ctzn_profileimage}
                              sx={{ width: "3vw", height: "3vw" }}
                            />
                          ) : (
                            <Avatar sx={{ width: "3vw", height: "3vw" }} />
                          )}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: ".8vw",
                            }}
                          >
                            <Typography fontSize="1.9vh">
                              {comment.ctzn_firstname +
                                " " +
                                comment.ctzn_lastname}
                            </Typography>
                            <Typography fontSize="1.685vh">
                              {moment(new Date(comment.comment_date)).fromNow()}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "flex-end",
                          }}
                        >
                          {/* <Typography>{comment.comment_likes}</Typography> */}
                          <Typography
                            fontSize="1.7vh"
                            marginRight="1vw"
                            fontFamily={"Inter"}
                            fontWeight={"400"}
                          >
                            {comment.total_reacts}
                          </Typography>
                          <IconButton
                            onClick={async () => {
                              if (
                                comment.reactor_id === signedInAccount.ctzn_id
                              ) {
                                setComments(
                                  comments.map((c) => {
                                    if (c.comment_id === comment.comment_id) {
                                      return {
                                        ...c,
                                        reactor_id: "",
                                        total_reacts:
                                          parseInt(comment.total_reacts) - 1,
                                      };
                                    }
                                    return c;
                                  })
                                );
                                await handleDislike(comment);
                              } else {
                                setComments(
                                  comments.map((c) => {
                                    if (c.comment_id === comment.comment_id) {
                                      return {
                                        ...c,
                                        reactor_id: signedInAccount.ctzn_id,
                                        total_reacts:
                                          parseInt(comment.total_reacts) + 1,
                                      };
                                    }
                                    return c;
                                  })
                                );
                                await handleLike(comment);
                              }
                            }}
                          >
                            {comment.reactor_id ? (
                              <IconHeartFilled
                                // onClick={() =>{
                                //     setComments(comments.map((c) => {
                                //         if (c.comment_id === comment.comment_id) {
                                //           return { ...c, reactor_id: '' };
                                //         }
                                //         return c;
                                //       }));
                                // }}
                                color="red"
                                size={30}
                              />
                            ) : (
                              <IconHeart
                                // onClick={() => {
                                //     setComments(comments.map((c) => {
                                //       if (c.comment_id === comment.comment_id) {
                                //         return { ...c, reactor_id: signedInAccount.ctzn_id };
                                //       }
                                //       return c;
                                //     }));
                                //   }}

                                size={30}
                              />
                            )}
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography fontSize="1.7vh">
                        {comment.comment_message}
                      </Typography>
                    </Box>
                  );
                })
              ) : (
                <Box sx={{ marginLeft: "8.5vw", marginTop: "10vh" }}>
                  <Typography
                    fontSize={"3.2vh"}
                    fontWeight={"400"}
                    fontFamily={"Inter"}
                  >
                    No Commments
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={signedInAccount.ctzn_profileimage}
                sx={{ width: "3.1vw", height: "3.1vw", marginRight: "1vw" }}
              />
              <TextField
                multiline
                rows={3}
                label="Comment"
                onChange={handleCommentChange}
                onKeyDown={handleKeyDown}
                value={comment.comment_message}
                inputRef={commentRef}
                variant="outlined"
                fullWidth
                sx={{
                  marginTop: "2vh",
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleAddComment}
                          sx={{ cursor: "pointer" }}
                        >
                          <IconSend2 />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>
          <Modal
            open={openLocation}
            onClose={handleCloseLocation}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            slots={{ backdrop: Backdrop }}
          >
            <Fade in={openLocation}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  height: "80%",
                  bgcolor: "#252525",
                  boxShadow: 24,
                  borderRadius: "15px",
                  p: 4,
                }}
              >
                <IconButton
                  onClick={handleCloseLocation}
                  sx={{ position: "absolute", top: "0", right: "0" }}
                >
                  <IconX />
                </IconButton>
                <MapContainer
                  center={[report.latitude, report.longitude]}
                  zoom={17}
                  style={{ height: "70vh" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <Marker
                    position={[report.latitude, report.longitude]}
                    icon={markerIcon}
                  ></Marker>
                </MapContainer>
              </Box>
            </Fade>
          </Modal>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default ViewReport;
