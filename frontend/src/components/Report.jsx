import { Box, Button, Typography } from "@mui/material";
import { IconSortDescending } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../library/report";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Report = ({ report, reports, index }) => {
  const navigate = useNavigate();

  return (
    <Box key={report.rprt_id}>
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
            background: `url(${report.img_proof})`,
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
              alignItems: "center",
              gap: "1.5vw",
              width: "100%",
              height: "5.71vh",
            }}
          >
            <Typography>{report.issue_type}</Typography>
            <Box
              sx={{
                width: "8.919vw",
                height: "4.082vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "100px",
                border: report.status === "PENDING" ? "1px solid #FDD835" : report.status === "IN PROGRESS" ? "1px solid #FF9800" : "1px solid #66BB6A",
                color: report.status === "PENDING" ? "#FDD835" : report.status === "IN PROGRESS" ? "#FF9800" : "#66BB6A",
              }}
            >
              {report.status}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "9vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "left",
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
              {report.description}
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
            {report.location && (
                <Typography
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: "regular",
                  fontFamily: "Roboto",
                }}
              >
                {report.location}
                {/* {address.city + ' - ' + (address.quarter ? address.quarter : address.neighbourhood) + ' - ' + address.road} */}
              </Typography>
            )}
            <Button
              variant="contained"
              color="info"
              size="medium"
              onClick={() => navigate(`/report/${report.rprt_id}`)}
              sx={{
                width: "9.245vw",
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
          backgroundColor:
            index == reports.length - 1 ? "transparent" : "white",
          marginY: "1vh",
        }}
      />
    </Box>
  );
};

export default Report;
