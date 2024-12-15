import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import Resizer from "react-image-file-resizer";

import { IconFileUpload } from "@tabler/icons-react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useCurrent } from "./library/current";
import { useReport } from "./library/report";
import "@fontsource/inter";
import "@fontsource/inter/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const SubmitReport = () => {
  const navigate = useNavigate();
  const { createReport, getReportLocation } = useReport();
  const { signedInAccount } = useCurrent();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
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
  const markerIcon = new Icon({
    iconUrl: "../src/resources/location.png",
    iconSize: [45, 90],
  });

  const [errors, setErrors] = useState({
    issueType: "",
    description: "",
    otherissueType: "",
    proofImage: false,
    location: false,
  });

  const [selectedIssueType, setSelectIssueType] = useState("");
  const [typedIssueType, setTypedIssueType] = useState("");
  const [userReport, setUserReport] = useState({
    ctzn_id: signedInAccount.ctzn_id,
    issueType: "",
    description: "",
    lat: "",
    lng: "",
    proofImage: "",
    status: "PENDING",
    date: new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
    location: "",
  });
  const displaySnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      displaySnackbar("Invalid image format!", "error");
      return;
    }
    setErrors((errors) => ({ ...errors, proofImage: false }));
    const image = await resizeFile(file, 1200, 500);
    setUserReport((userReport) => ({
      ...userReport,
      proofImage: image,
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
    setErrors((errors) => ({ ...errors, proofImage: false }));
    const image = await resizeFile(file, 1200, 500);
    setUserReport((userReport) => ({
      ...userReport,
      proofImage: image,
    }));
  };
  const handleIssueTypeOnChange = (event, value) => {
    setSelectIssueType(value);
    setUserReport((userReport) => ({
      ...userReport,
      issueType: value === "OTHER" ? typedIssueType : value,
    }));
    setErrors((errors) => ({ ...errors, issueType: "", otherissueType: "" }));
  };
  const handleOtherOnChange = (e) => {
    setTypedIssueType(e.target.value);
    setUserReport((userReport) => ({
      ...userReport,
      issueType: e.target.value,
    }));
    setErrors((errors) => ({ ...errors, otherissueType: "" }));
  };
  const handleDescriptionOnChange = (e) => {
    setUserReport((userReport) => ({
      ...userReport,
      description: e.target.value,
    }));
    setErrors((errors) => ({ ...errors, description: "" }));
  };
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setUserReport((userReport) => ({ ...userReport, lat: lat, lng: lng }));
    setErrors((errors) => ({ ...errors, location: false }));
  };

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

  const MapEventsHandler = ({ handleMapClick }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return null;
  };

  const handleSubmitReport = async () => {
    const newErrors = { ...errors };
    if (selectedIssueType === "OTHER") {
      if (!typedIssueType) {
        newErrors.otherissueType = "Please enter a valid issue type";
      }
    }
    if (!userReport.issueType && selectedIssueType !== "OTHER") {
      newErrors.issueType = "Please select an issue type";
    }
    if (!userReport.description) {
      newErrors.description = "Please enter a valid description";
    }
    if (!userReport.proofImage) {
      newErrors.proofImage = true;
    }

    if (!userReport.lat || !userReport.lng) {
      newErrors.location = true;
    }
    setErrors(newErrors);

    if (newErrors.location) {
      displaySnackbar("Please select a location on the map!", "error");
    }
    if (newErrors.proofImage) {
      displaySnackbar("Please upload a proof image!", "error");
    }

    if (
      newErrors.otherissueType ||
      newErrors.issueType ||
      newErrors.description ||
      newErrors.proofImage ||
      newErrors.location
    ) {
      return;
    }
    setLoading(true);
    const newLocation = await getReportLocation(userReport.lat, userReport.lng);

    if(!newLocation.display_name.includes('Cebu City')){
      displaySnackbar("Please select within Cebu City only!", "error");
      setLoading(false);
      return
    }
    const display =newLocation.display_name.split(', ')

    const location = display.slice(display.indexOf('Cebu City') -2, display.indexOf('Cebu City')+1);
    const newReport = {
      ...userReport,
      location: location.reverse().join(" - "),
    };
    const report = await createReport(newReport);
    if (report) {
      setLoading(false);
      displaySnackbar("Report created successfully!", "success");
      navigate("/dashboard");
    }
  };

  const issueType = [
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        paddingTop: "10vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: "87.891vw",
          height: "80.952vh",
          backgroundColor: "#252525",
          borderRadius: "20px",
          paddingY: "5.25vh",
          paddingX: "2.246vw",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            // backgroundColor: "red",
            width: "39.583vw",
            height: "69.252vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "1.4rem",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            REPORT AN ISSUE
          </Typography>

          <Box
            sx={{
              height: "24.626vh",
              // width: '21.224vw',
              width: "39.583vw",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Button
                variant="outlined"
                color={errors.proofImage ? "error" : "inherit"}
                component="label"
                role={undefined}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onChange={onChangeProofImage}
                sx={{
                  opacity: userReport.proofImage
                    ? "100%"
                    : errors.proofImage
                    ? "100%"
                    : "23%",
                  width: "21.224vw",
                  height: "24.626vh",
                  overflow: "hidden",
                  ...(userReport.proofImage ? { padding: "0" } : null),
                }}
              >
                {userReport.proofImage ? (
                  <Box
                    sx={{
                      width: "21.224vw",
                      height: "24.626vh",
                      backgroundImage: `url(${userReport.proofImage})`,
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
                    <IconFileUpload size={100} stroke={1} />
                    <Box
                      sx={{
                        height: "10.884vh",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "Roboto", fontWeight: "400" }}
                      >
                        DRAG AND DROP
                      </Typography>
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
                          UPLOAD A FILE
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
            <Box
              sx={{
                width: "16.081vw",
                height: "24.626vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Autocomplete
                options={issueType}
                sx={{ width: "16.081vw" }}
                renderInput={(params) => (
                  <TextField
                    error={errors.issueType !== ""}
                    helperText={errors.issueType}
                    {...params}
                    color="inherit"
                    label="ISSUE TYPE"
                  />
                )}
                onChange={handleIssueTypeOnChange}
              />
              <Box sx={{ height: "10.483vh", width: "16.081vw" }}>
                <TextField
                  onChange={handleOtherOnChange}
                  disabled={selectedIssueType !== "OTHER"}
                  color="inherit"
                  sx={{ width: "16.081vw", marginBottom: "2vh" }}
                  label="Other Please Specify"
                  helperText={errors.otherissueType}
                  error={errors.otherissueType !== ""}
                />
              </Box>
            </Box>
          </Box>
          <TextField
            multiline
            color="inherit"
            rows={5}
            onChange={handleDescriptionOnChange}
            label="Description"
            sx={{
              height: "19.456vh",
              width: "39.583vw",
              marginBottom: "3vh",
            }}
            error={errors.description !== ""}
            helperText={errors.description}
          />
          <Button
            disabled={loading}
            variant="contained"
            color="info"
            onClick={handleSubmitReport}
            sx={{
              height: "7.483vh",
              width: "39.583vw",
            }}
          >
            {loading ? "Submitting Report..." : "Submit"}
          </Button>
        </Box>
        <Box
          sx={{
            width: "1px",
            height: "69.252vh",
            backgroundColor: "white",
          }}
        />
        <Box
          sx={{
            width: "39.583vw",
            height: "69.252vh",
            border: errors.location
              ? "3px solid #F44336"
              : "3px solid transparent",
          }}
        >
          <MapContainer
            center={[10.296939927155103, 123.89691254931093]}
            zoom={15}
            style={{ height: "calc(69.252vh - 6px)" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {userReport.lat && userReport.lng && (
              <Marker
                position={[userReport.lat, userReport.lng]}
                icon={markerIcon}
              ></Marker>
            )}
            <MapEventsHandler handleMapClick={handleMapClick} />
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default SubmitReport;
