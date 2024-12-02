import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCitizen } from "../library/citizen";

const GoogleLoginButton = ({setIsRegistered, setSignUpFields, signUpFields, setGoogleProfileImage}) => {

  const navigate = useNavigate();
  const { getCitizen } = useCitizen();
  return (
    <Button
      onClick={() => setIsRegistered(true)}
      sx={{
        color: "white",
        backgroundColor: "#013C38",
        width: "50%",
        marginRight: "1rem",
        borderRadius: "20px",
        textTransform: "none",
        height: "2.5rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="../src/resources/google.png" alt="google" width={"20px"} />
        <Typography
          sx={{
            fontSize: "1rem",
            marginLeft: ".5rem",
            fontFamily: "Inter",
            fontWeight: "bold",
            color: "#E9F5DB",
          }}
        >
          oogle Account
        </Typography>
      </Box>
      <Box
        sx={{
          opacity: "0",
          overflow: "hidden",
          position: "absolute",
        }}
      >
        <GoogleLogin
          buttonText="Login"
          theme="outline"
          onSuccess={async(credentialResponse) => {
            const decode = jwtDecode(credentialResponse.credential);
            const citizen = await getCitizen(decode.email);
            if(citizen){
              navigate("/dashboard");
            }else{
              setIsRegistered(false);
              setGoogleProfileImage(decode.picture);
              setSignUpFields({
                ...signUpFields,
                email: decode.email,
                firstname: decode.given_name,
                lastname: decode.family_name
              })
            }
            console.log(decode);
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
