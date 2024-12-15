import { Box, Button, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import { IconSortDescending } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReport } from "./library/report";
import React, { useEffect, useState } from "react";
import LoadingPage from "./components/LoadingPage";
import Report from "./components/Report";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


const SearchReports = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noReports, setNoReports] = useState(-1);
  const { getReports } = useReport();
  const [selectedIssueType, setSelectedIssueType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [reports, setReports] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const reports = await getReports();
      const filteredReports = reports.filter((report) => {
        if(report.description.toLowerCase().includes(id.toLowerCase()) ||
            report.issue_type.toLowerCase().includes(id.toLowerCase()) ||
            report.location.toLowerCase().includes(id.toLowerCase()) ||
            report.status.toLowerCase().includes(id.toLowerCase())){ 
          return true
        }
        return false
      })
      setReports(filteredReports)
      setNoReports(filteredReports.length);
    }
    fetchData();
  },[id])
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
      { reports && reports.length > 0 || noReports === 0 ? (
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
                Results For "{id}"
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
              <IconSortDescending size={"5vh"} stroke={1} />
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
              return false;
            })
              .map((report, index) => (
                <Report report={report} reports={reports} index={index} />
              ))
          )}
      </Box>
      ):(
        <LoadingPage/>
      )}
    </Box>
  )
}

export default SearchReports