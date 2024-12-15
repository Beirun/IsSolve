import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCitizen } from "../library/citizen";
import { useCurrent } from "../library/current";
import { useSnackbar } from "notistack";

const GoogleLoginButton = ({
  setIsRegistered,
  setSignUpFields,
  signUpFields,
  setGoogleProfileImage,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const displaySnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const navigate = useNavigate();
  const { setSignedInAccount, setIsAdmin } = useCurrent();
  const { getCitizenEmail } = useCitizen();

  return (
    <Button
      onClick={(e) => {
        setIsRegistered(true);
      }}
      variant="outlined"
      size="large"
      color="info"
      sx={{ width: "25vw" }}
    >
      <img src="../src/resources/google.png" alt="google" width={"20px"} />
      &nbsp;&nbsp;Sign in with google
      <Box
        sx={{
          opacity: "0",
          overflow: "hidden",
          position: "absolute",
          display: "flex",
        }}
      >
        <GoogleLogin
          buttonText="Login"
          theme="outline"
          width="400"
          onSuccess={async (credentialResponse) => {
            const decode = jwtDecode(credentialResponse.credential);
            const citizen = await getCitizenEmail(decode.email);
            if (citizen) {
              setSignedInAccount(citizen);
              displaySnackbar("Logged in successfully.", "success");
              if (citizen.ctzn_id === -1) {
                setIsAdmin(true);
                navigate("/admin");
              } else {
                setIsAdmin(false);
                navigate("/dashboard");
              }
            } else {
              setIsRegistered(false);
              setGoogleProfileImage(decode.picture);
              console.log(typeof decode.picture);
              const base64 = await fetch(decode.picture)
                .then((response) => response.blob())
                .then((blob) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(blob);
                  return new Promise((res) => {
                    reader.onloadend = () => {
                      res(reader.result);
                    };
                  });
                });

              setSignUpFields({
                ...signUpFields,
                email: decode.email,
                firstname: decode.given_name,
                lastname: decode.family_name,
                img: base64,
              });
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
    </Button>
  );
};

export default GoogleLoginButton;
