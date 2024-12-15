import { Box, Button, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import Navbar from "./components/Navbar";
import { IconSortDescending } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReport } from "./library/report";
import { useCurrent } from "./library/current";
import Report from "./components/Report";
import LoadingPage from "./components/LoadingPage";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const MyReports = () => {
  const navigate = useNavigate();
  const [noReports, setNoReports] = useState(-1);
  const [reports, setReports] = useState([]);
  const [selectedIssueType, setSelectedIssueType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { getUserReports } = useReport();
  const { signedInAccount } = useCurrent();
  if (!signedInAccount) {
    navigate("/");
  }
  useEffect(() => {
    async function fetchData() {
      const userReports = await getUserReports(signedInAccount.ctzn_id);
      setReports(userReports);
      setNoReports(userReports.length);
    }
    fetchData();
  }, []);

  const status = ["PENDING", "IN PROGRESS", "RESOLVED"];

  const issueTypes = [
    "POTHOLE",
    "STREETLIGHT",
    "LITTERING",
    "VANDALISM",
    "WATER LEAKAGE",
    "PARKING ISSUE",
    "SIDEWALK",
    "FIRE ISSUE",
    "OTHER",
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      {reports && reports.length > 0 || noReports===0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "87.97vw",
            minHeight: "90vh",
            paddingTop: "8.7vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
                fonttFamily: "Inter",
              }}
            >
              MY REPORTS
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "white",
              marginY: "3vh",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "5.71vh",
            }}
          >
            {issueTypes.map((index, i) => {
              return (
                <Button
                  key={i}
                  size="small"
                  color="info"
                  onClick={() =>
                    selectedIssueType === index
                      ? setSelectedIssueType("")
                      : setSelectedIssueType(index)
                  }
                  variant={
                    selectedIssueType === index ? "contained" : "outlined"
                  }
                  sx={{
                    width: "8.79vw",
                    height: "5.714vh",
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
              {status.map((i, index) => {
                return (
                  <input
                    key={i}
                    type="button"
                    value={i}
                    onClick={() =>
                      selectedStatus === i
                        ? setSelectedStatus("")
                        : setSelectedStatus(i)
                    }
                    onMouseOver={(e) => {
                      e.target.style.filter = "brightness(1.3) saturate(1.3)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.filter = "brightness(1) saturate(1)";
                    }}
                    style={{
                      cursor: "pointer",
                      width: "8.91vw",
                      height: "5.71vh",
                      transition: "filter 0.3s ease-in-out",
                      border:
                        index == 0
                          ? "1px solid #FDD835"
                          : index === 1
                          ? "1px solid #FF9800"
                          : "1px solid #66BB6A",
                      borderRadius: "100px",
                      background:
                        selectedStatus === i
                          ? index == 0
                            ? "#FDD835"
                            : index === 1
                            ? "#FF9800"
                            : "#66BB6A"
                          : "none",
                      color:
                        selectedStatus === i
                          ? "#1d1d1d"
                          : index == 0
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
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <IconSortDescending size={"5vh"} stroke={1} />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    const sortedReports = [...reports].sort((a, b) => new Date(b.rprt_date) - new Date(a.rprt_date));
                    setReports(sortedReports);
                    handleClose();
                  }}
                >Newest</MenuItem>
                <MenuItem
                  onClick={() => {
                    const sortedReports = [...reports].sort((a, b) => new Date(a.rprt_date) - new Date(b.rprt_date));
                    setReports(sortedReports);
                    handleClose();
                  }}
                >Oldest</MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "white",
              marginY: ".3vh",
            }}
          />
          {reports.filter((report) => {
            if (selectedIssueType === "" && selectedStatus === "") return true;
            if(selectedIssueType === report.issue_type && selectedStatus === report.status)
              return true
            if (
              selectedIssueType !== "" && selectedStatus === "" &&
              report.issue_type === selectedIssueType 
            )
              return true;
            if (selectedStatus !== "" && selectedIssueType === "" && report.status === selectedStatus)
              return true;
            if(selectedIssueType === "OTHER")
              if(!issueTypes.includes(report.issue_type))
                return true
            return false;
          }).length === 0 ? ( 
            <Typography
              sx={{
                fontSize: "7.5vh",
                fontWeight: "600",
                fontFamily: "Inter",
                color: "white",
                marginTop: "15vh",
                textAlign: "center",
              }}
            >
              NO REPORTS FOUND
            </Typography>
          ) : (
            reports.filter((report) => {
              if (selectedIssueType === "" && selectedStatus === "") return true;
              if(selectedIssueType === report.issue_type && selectedStatus === report.status)
                return true
              if (
                selectedIssueType !== "" && selectedStatus === "" &&
                report.issue_type === selectedIssueType 
              )
                return true;
              if (selectedStatus !== "" && selectedIssueType === "" && report.status === selectedStatus)
                return true;
              if(selectedIssueType === "OTHER")
                if(!issueTypes.includes(report.issue_type))
                  return true
              return false;
            })
              .map((report, index) => (
                <Report report={report} reports={reports.filter((report) => {
                  if (selectedIssueType === "" && selectedStatus === "") return true;
                  if(selectedIssueType === report.issue_type && selectedStatus === report.status)
                    return true
                  if (
                    selectedIssueType !== "" && selectedStatus === "" &&
                    report.issue_type === selectedIssueType 
                  )
                    return true;
                  if (selectedStatus !== "" && selectedIssueType === "" && report.status === selectedStatus)
                    return true;
                  if(selectedIssueType === "OTHER")
                    if(!issueTypes.includes(report.issue_type))
                      return true
                  return false;
                })} index={index} />
              ))
          )}
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default MyReports;
