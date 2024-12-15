import { Box, Typography } from "@mui/material";
import { PieChart, BarChart, axisClasses, LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useReport } from "../library/report";
import LoadingPage from "../components/LoadingPage";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

const AdminDashboard = () => {
  const { getAllReports, getIssueStatusCount, getIssueTypeCount, getReportCount } = useReport();
  const [statusCount, setStatusCount] = useState([]);
  const [reportCount, setReportCount] = useState([]);
  const monthCounts = [0,0,0,0,0,0,0,0,0,0,0,0];
  const issueTypes = [
    "POTHOLE",
    "STREETLIGHT",
    "LITTERING",
    "VANDALISM",
    "WATER LEAKAGE",
    "PARKING ISSUE",
    "SIDEWALK",
    "FIRE ISSUE",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [issueTypeCount, setIssueTypeCount] = useState([
    { issue_type: "POTHOLE", count: 0 },
    { issue_type: "STREETLIGHT", count: 0 },
    { issue_type: "LITTERING", count: 0 },
    { issue_type: "VANDALISM", count: 0 },
    { issue_type: "WATER LEAKAGE", count: 0 },
    { issue_type: "PARKING ISSUE", count: 0 },
    { issue_type: "SIDEWALK", count: 0 },
    { issue_type: "FIRE ISSUE", count: 0 },
    { issue_type: "OTHER", count: 0 },
  ]);


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const count = await getIssueStatusCount();
        const issue = await getIssueTypeCount();
        const report = await getReportCount();
        const reportCountTemp = monthCounts;
        report.forEach((element) => {
          reportCountTemp[new Date(element.month).getMonth()] = parseInt(element.count);
        })
        setReportCount(reportCountTemp);
        setStatusCount(count);
        const issueTypeCountTemp = issueTypeCount;
        for (let i = 0; i < issueTypeCountTemp.length; i++) {
          issue.forEach((element) => {
            if (element.issue_type === issueTypeCountTemp[i].issue_type) {
              issueTypeCountTemp[i].count = parseInt(element.count);
            }
          });
        }
        let otherCount = 0;
        issue.forEach((element) => {
          if (issueTypes.includes(element.issue_type) === false) {
            otherCount += parseInt(element.count);
          }
        });
        issueTypeCountTemp[8].count = otherCount;
        setIssueTypeCount(issueTypeCountTemp);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);
  console.log('issueTypeCount', issueTypeCount);
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
      <AdminNavbar isDashboard={true} />
      {statusCount ? (
        <Box
          sx={{
            width: "70.117vw",
            height: "80.952vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "70.117vw",
              height: "40.136vh",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                borderRadius: "20px",
                width: "30.273vw",
                height: "40.136vh",
                background: "#252525",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "left",
              }}
            >
              <Typography 
                    fontFamily={"Inter"} 
                    fontSize={23} 
                    color={"white"} 
                    fontWeight={600} 
                    sx={{marginTop: '2vh', marginLeft: '2.5vw',}}
                >
                    ISSUE STATUSES
                </Typography>
              <PieChart
                  colors={["#FF9800","#FDD835","#66BB6A"]}
                  
                series={[
                  {
                    data: statusCount,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={220}
                sx={{
                  marginLeft: "-2.5vw",
                }}
              />
            </Box>
            <Box
              sx={{
                borderRadius: "20px",
                width: "38.411vw",
                height: "40.136vh",
                background: "#252525",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "left",
              }}
            >
                <Typography 
                    fontFamily={"Inter"} 
                    fontSize={23} 
                    color={"white"} 
                    fontWeight={600} 
                    sx={{marginTop: '2vh', marginLeft: '2.5vw'}}
                >
                    REPORTED ISSUES
                </Typography>
              <LineChart
                  colors={["rgb(46, 150, 255)"]}

                width={700}
                height={300}
                series={[{ data: reportCount }]}
                xAxis={[{ scaleType: "point", data: months }]}
                sx={{marginLeft: '-7.5vw'}}
              />
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: "20px",
              width: "70.117vw",
              height: "36.19vh",
              background: "#252525",
            }}
          >
            <Typography 
                    fontFamily={"Inter"} 
                    fontSize={23} 
                    color={"white"} 
                    fontWeight={600} 
                    sx={{marginTop: '2vh', marginLeft: '2.5vw'}}
                >
                    ISSUE TYPES
                </Typography>
            <BarChart
                  colors={["rgb(46, 150, 255)"]}

              dataset={issueTypeCount}
              xAxis={[
                {
                  tickFontSize: ".75vw",
                  scaleType: "band",
                  dataKey: "issue_type",
                },
              ]}
              yAxis={[
                {
                  label: "Count",
                },
              ]}
              series={[{ dataKey: "count" }]}
              height={250}
              sx={{
                marginTop: "-5vh", 
                marginLeft: "2.5vw",
                [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                  transform: "translateX(-10px)",
                  color: "white",
                },
                fontSize: "12px",
              }}
            />
          </Box>
        </Box>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default AdminDashboard;
