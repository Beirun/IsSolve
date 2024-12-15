import { Box, Avatar, Typography, TextField, Button,IconButton, styled } from "@mui/material";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import { useSnackbar } from "notistack";
import React, { useMemo, useState } from "react";
import { IconCamera, IconCameraFilled, IconCheck, IconX } from "@tabler/icons-react";
import { useCitizen } from "./library/citizen";
import { useNavigate } from "react-router-dom";
import { useCurrent } from "./library/current";
import Resizer from "react-image-file-resizer";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { signedInAccount, setSignedInAccount, isAdmin } = useCurrent();
  const { updateCitizen, getCitizenUsername, getCitizenEmail } = useCitizen();
  const [citizenAccount, setCitizenAccount] = useState(signedInAccount);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [editProfileImage, setEditProfileImage] = useState(false);
  const [errorProfileText, setErrorProfileText] = useState({
    ctzn_firstname: "",
    ctzn_lastname: "",
    ctzn_username: "",
    ctzn_email: "",
  });

  const [citizenPassword, setCitizenPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorPasswordText, setErrorPasswordText] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
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
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setCitizenAccount((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setErrorProfileText((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleEditProfile = async () => {
    const errorText = { ...errorProfileText };
    const username = await getCitizenUsername(
      citizenAccount.ctzn_username.trim().toLowerCase()
    );
    const email = await getCitizenEmail(
      citizenAccount.ctzn_email.toLowerCase()
    );

    if (
      email &&
      citizenAccount.ctzn_email.toLowerCase() !==
        signedInAccount.ctzn_email.toLowerCase()
    ) {
      errorText.ctzn_email = "Email already exists";
    }
    if (
      username &&
      citizenAccount.ctzn_username.trim().toLowerCase() !==
        signedInAccount.ctzn_username.trim().toLowerCase()
    ) {
      errorText.ctzn_username = "Username already exists";
    }
    if (
      citizenAccount.ctzn_firstname.trim() === "" ||
      citizenAccount.ctzn_lastname.trim() === "" ||
      citizenAccount.ctzn_email.trim() === "" ||
      citizenAccount.ctzn_username.trim() === ""
    ) {
      if (citizenAccount.ctzn_firstname.trim() === "") {
        errorText.ctzn_firstname = "Please enter Firstname";
      }
      if (citizenAccount.ctzn_lastname.trim() === "") {
        errorText.ctzn_lastname = "Please enter Lastname";
      }
      if (citizenAccount.ctzn_email.trim() === "") {
        errorText.ctzn_email = "Please enter Email";
      }
      if (citizenAccount.ctzn_username.trim() === "") {
        errorText.ctzn_username = "Please enter Username";
      }
    }
   

    setErrorProfileText(errorText);
    if (Object.values(errorText).some((value) => value !== "")) return;
    if (
      citizenAccount.ctzn_firstname === signedInAccount.ctzn_firstname &&
      citizenAccount.ctzn_lastname === signedInAccount.ctzn_lastname &&
      citizenAccount.ctzn_email === signedInAccount.ctzn_email &&
      citizenAccount.ctzn_username === signedInAccount.ctzn_username
    ) {
      setEditProfile(false);
      return;
    }
    await updateCitizen(citizenAccount);
    setSignedInAccount(citizenAccount);
    displaySnackbar("Profile updated successfully.", "success");
    setEditProfile(false);
  };

  const handlePasswordSubmit = async () => {
    const errorText = { ...errorPasswordText };
    if (
      signedInAccount.ctzn_password !== citizenPassword.currentPassword &&
      signedInAccount.ctzn_password !== ""
    ) {
      errorText.currentPassword = "Incorrect Password";
    }
    if (
      citizenPassword.currentPassword === "" ||
      citizenPassword.newPassword === "" ||
      citizenPassword.confirmPassword === ""
    ) {
      if (
        citizenPassword.currentPassword === "" &&
        signedInAccount.ctzn_password !== ""
      ) {
        errorText.currentPassword = "Please enter Current Password";
      }
      if (citizenPassword.newPassword === "") {
        errorText.newPassword = "Please enter New Password";
      }
      if (citizenPassword.confirmPassword === "") {
        errorText.confirmPassword = "Please enter Confirm Password";
      }
    }
    
    if (citizenPassword.newPassword !== citizenPassword.confirmPassword) {
      errorText.newPassword = "Passwords do not match";
      errorText.confirmPassword = "Passwords do not match";
    }
    setErrorPasswordText(errorText);
    if (Object.values(errorText).some((value) => value !== "")) return;
    const newPasswordCitizen = {
      ...citizenAccount,
      ctzn_password: citizenPassword.newPassword,
    };
    await updateCitizen(newPasswordCitizen);
    setSignedInAccount(newPasswordCitizen);
    setCitizenAccount(newPasswordCitizen);
    displaySnackbar("Password updated successfully.", "success");
    setChangePassword(false);
    setCitizenPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setErrorPasswordText((prevError) => ({
      ...prevError,
      [name]: "",
    }));

    setCitizenPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const displaySnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const onChangeProfileImage = async (event) => {
    const file = event.target.files[0];
    const fileType = file.name.slice(-4).split(".");
    const filetypes = ["png", "jpeg", "jpg"];
    if (!filetypes.includes(fileType[fileType.length - 1])) {
      displaySnackbar("Invalid image format!", "error");
      return;
    }
    const image = await resizeFile(file, 500, 500);
    setProfileImage(image);
  };

  const updateProfileImage = async () => {
    const newCitizen = { ...signedInAccount, ctzn_profileimage: profileImage };
    console.log('newCitizen', newCitizen);
    console.log('profileImage', profileImage);
    console.log('signedInAccount', signedInAccount);
    await updateCitizen(newCitizen);
    setCitizenAccount(newCitizen);
    setSignedInAccount(newCitizen);
    displaySnackbar("Profile updated successfully.", "success");
    setEditProfileImage(false);
    setProfileImage("");
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
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <Box
        sx={{
          height: "80.136vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "62.435vw",
            height: "23.129vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "11.393vw",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "right",
            }}
          >
            {profileImage? (
              <Box sx={{ width: "17.25vh", height: "17.25vh",}}>
              <Avatar src={profileImage} sx={{ width: "17.25vh", height: "17.25vh" }} />
              <IconButton 
              onClick={()=>{setProfileImage(""); setEditProfileImage(false);}}
              onMouseOver={()=>{
                setEditProfileImage(true);
              }} 
              onMouseOut={()=>{ setEditProfileImage(false);}}
              sx={{ position: "absolute", marginTop: "-17.3vh", background: editProfileImage ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)"}}>
              <IconX stroke="2" color={ editProfileImage ? "white" : "transparent"}  size={"15vh"}  />

              </IconButton>
            
              <IconButton sx={{ marginTop: "-7.5vh",  marginLeft: "5.5vw",}} onClick={updateProfileImage}>
              <Box sx={{height: "5vh", width: "5vh",background: "#212121",borderRadius: "50%"}}>
              <IconCheck stroke="1" size={"5vh"} color="#66BB6A" />
              </Box>
              </IconButton>
            </Box>
            ):(
              <Box sx={{ width: "17.25vh", height: "17.25vh",}}>
                {signedInAccount.ctzn_profileimage ? (
                <Avatar
                  sx={{ width: "17.25vh", height: "17.25vh" }}
                  src={signedInAccount.ctzn_profileimage}
                />
              ) : (
                <Avatar sx={{ width: "17.25vh", height: "17.25vh" }} />
              )}
              
                <IconButton component="label"
                  role={undefined}  sx={{ marginTop: "-7.5vh",  marginLeft: "5.5vw",}} onChange={onChangeProfileImage}>
                  
                <IconCameraFilled stroke="1" size={"5vh"} color="#1d1d1d">
                  <IconCamera stroke="1" color="rgba(255,255,255,.7)" />
                </IconCameraFilled>
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={onChangeProfileImage}
                  />
                </IconButton>
              </Box>
            )}
            
          </Box>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: "regular",
              fontFamily: "Inter",
              marginTop: "1.5vh",
            }}
          >
            {signedInAccount.ctzn_firstname} {signedInAccount.ctzn_lastname}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "62.435vw",
            height: "29.252vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "#252525",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "55.729vw",
              height: "4.082vh",
              marginY: "2.4vh",
            }}
          >
            <Typography>PROFILE INFORMATION</Typography>
            <Box>
              {editProfile && (
                <Button
                  variant="outlined"
                  size="small"
                  color="info"
                  onClick={() => {
                    setEditProfile(!editProfile);
                    setCitizenAccount(signedInAccount);
                  }}
                  sx={{
                    width: "5.859vw",
                    marginRight: "1.5vh",
                  }}
                >
                  CANCEL
                </Button>
              )}
              <Button
                variant="contained"
                size="small"
                color="info"
                onClick={() => {
                  if (editProfile) handleEditProfile();
                  else setEditProfile(!editProfile);
                }}
                sx={{
                  width: "5.859vw",
                }}
              >
                {editProfile ? "SAVE" : "EDIT"}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "55.729vw",
              height: "5.442vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "calc(55.729vw - 25.911vw - 25.911vw)",
              marginBottom: "2.4vh",
            }}
          >
            <Box sx={{ height: "5.442vh" }}>
              <TextField
                variant="outlined"
                size="small"
                label="Firstname"
                name="ctzn_firstname"
                onChange={handleProfileChange}
                value={citizenAccount.ctzn_firstname}
                disabled={!editProfile}
                error={errorProfileText.ctzn_firstname !== ""}
                helperText={errorProfileText.ctzn_firstname}
                sx={{
                  width: "25.911vw",
                }}
              />
            </Box>
            <Box sx={{ height: "5.442vh" }}>
              <TextField
                variant="outlined"
                size="small"
                label="Username"
                name="ctzn_username"
                onChange={handleProfileChange}
                value={citizenAccount.ctzn_username}
                disabled={!editProfile}
                error={errorProfileText.ctzn_username !== ""}
                helperText={errorProfileText.ctzn_username}
                sx={{
                  width: "25.911vw",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "55.729vw",
              height: "5.442vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "calc(55.729vw - 25.911vw - 25.911vw)",
              marginY: "3.2vh",
            }}
          >
            <Box sx={{ height: "5.442vh" }}>
              <TextField
                variant="outlined"
                size="small"
                label="Lastname"
                name="ctzn_lastname"
                onChange={handleProfileChange}
                value={citizenAccount.ctzn_lastname}
                disabled={!editProfile}
                error={errorProfileText.ctzn_lastname !== ""}
                helperText={errorProfileText.ctzn_lastname}
                sx={{
                  width: "25.911vw",
                }}
              />
            </Box>
            <Box sx={{ height: "5.442vh" }}>
              <TextField
                variant="outlined"
                size="small"
                label="Email"
                name="ctzn_email"
                onChange={handleProfileChange}
                value={citizenAccount.ctzn_email}
                error={errorProfileText.ctzn_email !== ""}
                helperText={errorProfileText.ctzn_email}
                disabled={!editProfile || signedInAccount.ctzn_password === ""}
                sx={{
                  width: "25.911vw",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "62.435vw",
            height: "19.864vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "#252525",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "55.729vw",
              height: "4.082vh",
              marginY: "2.4vh",
            }}
          >
            <Typography>CHANGE PASSWORD</Typography>
            <Box>
              {changePassword && (
                <Button
                  variant="outlined"
                  size="small"
                  color="info"
                  onClick={() => {
                    setChangePassword(!changePassword);
                    setCitizenPassword({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setErrorPasswordText({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  sx={{
                    width: "5.859vw",
                    marginRight: "1.5vh",
                  }}
                >
                  CANCEL
                </Button>
              )}
              <Button
                variant={changePassword ? "contained" : "outlined"}
                size="small"
                color="info"
                sx={{
                  width: "5.859vw",
                }}
                onClick={() => {
                  if (changePassword) handlePasswordSubmit();
                  else setChangePassword(!changePassword);
                }}
              >
                {changePassword ? "SAVE" : "CHANGE"}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "55.729vw",
              height: "4.082vh",
              marginY: "2.4vh",
            }}
          >
            <Box sx={{ height: "5.442vh" }}>
              <TextField
                type="password"
                variant="outlined"
                size="small"
                label="Current Password"
                name="currentPassword"
                onChange={handlePasswordChange}
                value={citizenPassword.currentPassword}
                error={errorPasswordText.currentPassword !== ""}
                helperText={errorPasswordText.currentPassword}
                disabled={!changePassword || signedInAccount.ctzn_password === ""}
                sx={{
                  width: "17.6431vw",
                }}
              />
            </Box>

            <Box sx={{ height: "5.442vh" }}>
              <TextField
                type="password"
                variant="outlined"
                size="small"
                label="New Password"
                disabled={!changePassword}
                name="newPassword"
                onChange={handlePasswordChange}
                value={citizenPassword.newPassword}
                error={errorPasswordText.newPassword !== ""}
                helperText={errorPasswordText.newPassword}
                sx={{
                  width: "17.6431vw",
                }}
              />
            </Box>
            <Box sx={{ height: "5.442vh" }}>
              <TextField
                type="password"
                variant="outlined"
                size="small"
                label="Current Password"
                disabled={!changePassword}
                name="confirmPassword"
                onChange={handlePasswordChange}
                value={citizenPassword.confirmPassword}
                error={errorPasswordText.confirmPassword !== ""}
                helperText={errorPasswordText.confirmPassword}
                sx={{
                  width: "17.6431vw",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
