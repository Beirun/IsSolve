import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { useCitizen } from "./library/citizen";
import { useCurrent } from "./library/current";
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Login = () => {
  const { getCitizenEmail, getCitizenUsername, createCitizen } =
    useCitizen();
  const { setSignedInAccount } = useCurrent();
  const { enqueueSnackbar } = useSnackbar();
  const [isRegistered, setIsRegistered] = useState(true);
  const [registerClicked, setRegisterClicked] = useState(false);
  const [current, setCurrent] = useState("signin");
  const [forgotClicked, setForgotClicked] = useState(false);
  const [animation, setAnimation] = useState("");
  const [forgotAnimation, setForgotAnimation] = useState("");
  const [googleProfileImage, setGoogleProfileImage] = useState("");
  const [timesClicked, setTimesClicked] = useState(0);
  const [signinFields, setSigninFields] = useState({
    username: "",
    password: "",
  });

  const [errorUsernameText, setErrorUsernameText] = useState("");
  const [errorPasswordText, setErrorPasswordText] = useState("");

  const [errorSignUpText, setErrorSignUpText] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [signUpFields, setSignUpFields] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    img:'',
  });

  const textFieldStyle = {
    width: "25vw",
  };
  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    charset += "!@#$%^&*()";
    charset += "0123456789";
    charset += "abcdefghijklmnopqrstuvwxyz";
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 15; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return newPassword;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isRegistered) {
      if (current !== "register") {
        
        setErrorSignUpText({
          username: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
        if (current === "signin") {
          setAnimation("translateToRight 750ms ease-in-out");
        } else {
          setAnimation("translateToBottomRight 750ms ease-in-out");
          setForgotAnimation("translateResetToBottom 750ms ease-in-out");
        }
        if (!registerClicked) setRegisterClicked(true);
        if (forgotClicked) setForgotClicked(false);
        if (timesClicked === 0) setTimesClicked(timesClicked + 1);
        setCurrent("register");
      }
    }
  }, [isRegistered]);

  const handleInputLogin = (e) => {
    setSigninFields({
      ...signinFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputRegister = (e) => {
    const errorConfirmPasswordText ={...errorSignUpText}
    setSignUpFields({
      ...signUpFields,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "confirmpassword") {
      if (errorSignUpText[e.target.name] === "Passwords do not match") {
        errorConfirmPasswordText.password=''
      }
    }
    errorConfirmPasswordText[e.target.name]=''
    setErrorSignUpText(errorConfirmPasswordText);
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

  const handleLogin = async () => {
    if (signinFields.username === "" || signinFields.password === "") {
      if (signinFields.password === "") {
        setErrorPasswordText("Please enter password");
      }
      if (signinFields.username.trim() === "") {
        setErrorUsernameText("Please enter username");
      }
      return;
    }
    const citizen = await getCitizenUsername(
      signinFields.username.trim().toLowerCase()
    );
    if (citizen) {
      if (citizen.ctzn_password !== signinFields.password) {
        setErrorPasswordText("Incorrect Password");
        return;
      } else {
        setSignedInAccount(citizen);
        navigate("/dashboard");
        displaySnackbar("Logged in successfully.", "success");
        return;
      }
    }

    setErrorPasswordText(" ");
    setErrorUsernameText(" ");
    displaySnackbar("Account does not exist.", "error");
  };

  const handleGoogleRegister = async () => {
    const setErrorUsernameText = { ...errorSignUpText };
    if (signUpFields.username.trim().toLowerCase() === "") {
      setErrorUsernameText.username = "Please enter Username";
      setErrorSignUpText(setErrorUsernameText);
      return;
    }
    const citizen = await getCitizenUsername(
      signUpFields.username.trim().toLowerCase()
    );
    if (citizen) {
      setErrorUsernameText.username = "Username already exists";
      setErrorSignUpText(setErrorUsernameText);
      return;
    }
    const newPassword = generatePassword();
    const newCitizen = await createCitizen({
      ...signUpFields,
      password: newPassword,
    });
    console.log(newCitizen);
    setSignedInAccount(newCitizen);
    displaySnackbar("Registered successfully.", "success");
    navigate("/dashboard");
  };

  const handleContinueRegister = async () => {
    const firstErrorSignUpText = { ...errorSignUpText };
    const citizen = await getCitizenEmail(signUpFields.email);
    if (citizen) {
      firstErrorSignUpText.email = "Email already exists";
      setErrorSignUpText(firstErrorSignUpText);
    }
    if (
      signUpFields.firstname.trim() === "" ||
      signUpFields.lastname.trim() === "" ||
      signUpFields.email.trim() === ""
    ) {
      if (signUpFields.firstname.trim() === "") {
        firstErrorSignUpText.firstname = "Please enter Firstname";
      }
      if (signUpFields.lastname.trim() === "") {
        firstErrorSignUpText.lastname = "Please enter Lastname";
      }
      if (signUpFields.email.trim() === "") {
        firstErrorSignUpText.email = "Please enter Email";
      }
      setErrorSignUpText(firstErrorSignUpText);
      return;
    }
    if (citizen) return;

    setAnimation("translateFurtherRight 750ms ease-in-out");
  };

  const handleRegister = async () => {
    const secondErrorSignUpText = { ...errorSignUpText };
    if (
      signUpFields.username.trim().toLowerCase() === "" ||
      signUpFields.password === "" ||
      signUpFields.confirmpassword === ""
    ) {
      if (signUpFields.username.trim().toLowerCase() === "") {
        secondErrorSignUpText.username = "Please enter Username";
      }
      if (signUpFields.password === "") {
        secondErrorSignUpText.password = "Please enter Password";
      }
      if (signUpFields.confirmpassword === "") {
        secondErrorSignUpText.confirmpassword = "Please enter Confirm Password";
      }
      setErrorSignUpText(secondErrorSignUpText);
      return;
    }
    const citizen = await getCitizenUsername(
      signUpFields.username.trim().toLowerCase()
    )
    if (citizen) {
      secondErrorSignUpText.username = "Username already exists";
      setErrorSignUpText(secondErrorSignUpText);
      return;
    }
    if (signUpFields.password !== signUpFields.confirmpassword) {
      secondErrorSignUpText.password = " ";
      secondErrorSignUpText.confirmpassword = "Passwords do not match";
      setErrorSignUpText(secondErrorSignUpText);
      return;
    }
    const newCitizen = await createCitizen(signUpFields);
    console.log(newCitizen);
    setSignedInAccount(newCitizen);
    displaySnackbar("Registered successfully.", "success");
    navigate("/dashboard");
  };



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "55vw",
          height: "100vh",
          backgroundImage: "url(../src/resources/login-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            opacity: 0.8,
            backgroundColor: "#121212",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "45vw",
          height: "100vh",
          background: "#1d1d1d",
          flexDirection: "column",
        }}
      >
        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "4.8vh",
            marginTop: "8.75vh",
          }}
        >
          <Button
            variant={current === "signin" ? "contained" : "text"}
            size="small"
            color="info"
            onClick={() => {
              if (current !== "signin") {
                setSignUpFields((signUpFields) => ({
                  ...signUpFields,
                  username: "",
                  firstname: "",
                  lastname: "",
                  password: "",
                  confirmpassword: "",
                }));
                if (current === "register") {
                  animation === "translateFurtherRight 750ms ease-in-out"
                    ? setAnimation("translateFurtherLeft 750ms ease-in-out")
                    : setAnimation("translateToLeft 750ms ease-in-out");
                } else {
                  setForgotAnimation(
                    "translateResetToBottom 750ms ease-in-out"
                  );
                  setAnimation("translateToBottom 750ms ease-in-out");
                }
                if (registerClicked) setRegisterClicked(false);
                if (forgotClicked) setForgotClicked(false);
                if (timesClicked === 0) setTimesClicked(timesClicked + 1);
                setCurrent("signin");
              }
            }}
            sx={{
              width: "21.5%",
              overflow: "hidden",
            }}
          >
            Sign In
          </Button>
          <Button
            size="small"
            variant={current === "register" ? "contained" : "text"}
            color="info"
            onClick={() => {
              if (current !== "register") {
                setSignUpFields((signUpFields) => ({
                  ...signUpFields,
                  email: "",
                }));
                setErrorSignUpText({
                  username: "",
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  confirmpassword: "",
                });
                if (setIsRegistered) setIsRegistered(true);
                if (current === "signin") {
                  setAnimation("translateToRight 750ms ease-in-out");
                } else {
                  setAnimation("translateToBottomRight 750ms ease-in-out");
                  setForgotAnimation(
                    "translateResetToBottom 750ms ease-in-out"
                  );
                  setRegisterButtonAnimation(
                    "registerMoveBottom 750ms ease-in-out"
                  );
                }
                if (!registerClicked) setRegisterClicked(true);
                if (forgotClicked) setForgotClicked(false);
                if (timesClicked === 0) setTimesClicked(timesClicked + 1);
                setCurrent("register");
              }
            }}
            sx={{
              width: "21.5%",
              overflow: "hidden",
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "flex-start",
            width: "45vw",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* Sign In & Register */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              animation: `${animation}`,
              animationFillMode: "forwards",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "135vw",

              "@keyframes translateToRight": {
                "0%": {
                  transform: "translateX(0)",
                },
                "100%": {
                  transform: "translateX(-33.33%)",
                },
              },
              "@keyframes translateToLeft": {
                "0%": {
                  transform: "translateX(-33.33%)",
                },
                "100%": {
                  transform: "translateX(0)",
                },
              },

              "@keyframes translateToTop": {
                "0%": {
                  transform: "translateY(0)",
                },
                "100%": {
                  transform: "translateY(-100%)",
                },
              },
              "@keyframes translateToBottom": {
                "0%": {
                  transform: "translateY(-100%)",
                },
                "100%": {
                  transform: "translateY(0)",
                },
              },
              "@keyframes translateToBottomRight": {
                "0%": {
                  transform: "translate(0,-100%)",
                },
                "25%": {
                  transform: "translate(-33.33%,-100%)",
                },
                "100%": {
                  transform: "translate(-33.33%,0)",
                },
              },
              "@keyframes translateFurtherRight": {
                "0%": {
                  transform: "translateX(-33.33%)",
                },
                "100%": {
                  transform: "translateX(-66.33%)",
                },
              },
              "@keyframes translateBackRight": {
                "0%": {
                  transform: "translateX(-66.33%)",
                },
                "100%": {
                  transform: "translateX(-33.33%)",
                },
              },
              "@keyframes translateFurtherLeft": {
                "0%": {
                  transform: "translateX(-66.33%)",
                },
                "100%": {
                  transform: "translateX(0%)",
                },
              },
            }}
          >
            {/* Sign In */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "45vw",
                height: "100%",
                marginTop: "18vh",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.45rem",
                  fontWeight: "600",
                  fontFamily: "Inter",
                  zIndex: 1,
                }}
              >
                SIGN IN TO ISSOLVE
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  height: "10vh",
                  marginTop: "6.7vh",
                }}
              >
                <TextField
                  error={errorUsernameText !== ""}
                  variant="outlined"
                  name="username"
                  size="small"
                  label="Username"
                  onChange={(e) => {
                    handleInputLogin(e);
                    setErrorUsernameText("");
                  }}
                  value={signinFields.username}
                  sx={{ ...textFieldStyle }}
                  helperText={errorUsernameText}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  height: "10vh",
                }}
              >
                <TextField
                  error={errorPasswordText !== ""}
                  variant="outlined"
                  size="small"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleInputLogin(e);
                    setErrorPasswordText("");
                  }}
                  value={signinFields.password}
                  sx={{ ...textFieldStyle }}
                  helperText={errorPasswordText}
                />
              </Box>
              <Typography
                onClick={() => {
                  if (current !== "forgot") {
                    if (current === "signin") {
                      setAnimation("translateToTop 750ms ease-in-out");
                      setSignInButtonAnimation(
                        "signInMoveTop 750ms ease-in-out"
                      );
                    } else {
                      setAnimation("translateToTop 750ms ease-in-out");
                    }
                    setForgotAnimation("translateResetToTop 750ms ease-in-out");
                    if (!forgotClicked) setForgotClicked(true);
                    setCurrent("forgot");
                  }
                }}
                sx={{
                  color: "white",
                  fontSize: ".9rem",
                  fontFamily: "Inter",
                  marginLeft: "15vw",
                  zIndex: 1,
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
              >
                FORGOT PASSWORD?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "55%",
                  marginTop: "3vh",
                  rowGap: "5vh",
                }}
              >
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleLogin}
                  size="large"
                  sx={{
                    width: "25vw",
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  Sign In
                </Button>
                <Box sx={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                  <Box
                    sx={{
                      width: "10.75vw",
                      height: "1px",
                      backgroundColor: "white",
                    }}
                  />
                  OR
                  <Box
                    sx={{
                      width: "10.75vw",
                      height: "1px",
                      backgroundColor: "white",
                    }}
                  />
                </Box>
                <GoogleLoginButton
                  signUpFields={signUpFields}
                  setSignUpFields={setSignUpFields}
                  setIsRegistered={setIsRegistered}
                  setGoogleProfileImage={setGoogleProfileImage}
                />
              </Box>
            </Box>

            {/* Register */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "90vw",
                height: "100%",
              }}
            >
              {/* Part 1 */}

              {isRegistered ? (
                // Not Through Google
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "45vw",
                    height: "100%",
                    marginTop: "18vh",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.45rem",
                      fontWeight: "600",
                      fontFamily: "Inter",
                      zIndex: 1,
                      marginBottom: "7vh",
                    }}
                  >
                    CREATE AN ACCOUNT
                  </Typography>

                  {!isRegistered ? null : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                        height: "10.75vh",
                      }}
                    >
                      <TextField
                        error={errorSignUpText.firstname !== ""}
                        helperText={errorSignUpText.firstname}
                        size="small"
                        name="firstname"
                        onChange={handleInputRegister}
                        value={signUpFields.firstname}
                        label="Firstname"
                        style={{ ...textFieldStyle }}
                      />
                    </Box>
                  )}
                  {!isRegistered ? null : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                        height: "10.75vh",
                      }}
                    >
                      <TextField
                        error={errorSignUpText.lastname !== ""}
                        helperText={errorSignUpText.lastname}
                        size="small"
                        name="lastname"
                        onChange={handleInputRegister}
                        value={signUpFields.lastname}
                        label="Lastname"
                        style={{ ...textFieldStyle }}
                      />
                    </Box>
                  )}

                  {!isRegistered ? null : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "100%",
                        height: "10.75vh",
                      }}
                    >
                      <TextField
                        error={errorSignUpText.email !== ""}
                        helperText={errorSignUpText.email}
                        type="text"
                        name="email"
                        size="small"
                        onChange={handleInputRegister}
                        value={signUpFields.email}
                        label="Email"
                        style={{ ...textFieldStyle }}
                      />
                    </Box>
                  )}
                  {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "57%",
                      height: "1.5rem",
                      marginBottom: "3.5vh",
                      borderRadius: "20px",
                    }}
                  >
                    <input
                      type="text"
                      name="code"
                      onChange={handleInputRegister}
                      value={signUpFields.password}
                      placeholder="Code"
                      style={{
                        width: "50%",
                        height: "1.5rem",
                        borderRadius: "20px",
                        border: "none",
                        outline: "#013C38 solid 1px",
                        padding: "0.5rem",
                        paddingLeft: "1rem",
                        fontSize: "1rem",
                        fontFamily: "Inter",
                        backgroundColor: "white",
                        marginRight: "2.5%",
                      }}
                    />
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#013C38",
                        width: "50%",
                        height: "5vh",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                    >
                      Send Code
                    </Button>
                  </Box> */}
                  <Button
                    variant="contained"
                    color="info"
                    size="large"
                    onClick={handleContinueRegister}
                    sx={{
                      width: "25vw",
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              ) : (
                // Through Google
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "45vw",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.45rem",
                      fontWeight: "600",
                      fontFamily: "Inter",
                      zIndex: 1,
                      marginTop: "9.5vh",
                    }}
                  >
                    CREATE AN ACCOUNT
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "25vw",
                      padding: "0.5rem",
                      paddingLeft: "1rem",
                      height: "5.306vh",
                      marginTop: "8.5vh",
                      marginBottom: "8.5vh",
                      borderRadius: "25px",
                      border: "1px solid #515151",
                    }}
                  >
                    <img
                      src="../src/resources/google.png"
                      alt="google"
                      width={"25"}
                      style={{
                        marginLeft: "-.25vw",
                      }}
                    />

                    <img
                      src={googleProfileImage}
                      alt=""
                      width={30}
                      style={{
                        borderRadius: "50%",
                        marginLeft: ".9rem",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#F4F4F4",
                        fontSize: "1.2rem",
                        fontWeight: "300",
                        fontFamily: "Inter",
                        marginLeft: ".5rem",
                        marginRight: "1rem",
                      }}
                    >
                      {signUpFields.email}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "100%",
                      height: "10.75vh",
                    }}
                  >
                    <TextField
                      error={errorSignUpText.username !== ""}
                      helperText={errorSignUpText.username}
                      size="small"
                      name="username"
                      onChange={handleInputRegister}
                      value={signUpFields.username}
                      label="Username"
                      style={{ ...textFieldStyle }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    color="info"
                    size="large"
                    onClick={handleGoogleRegister}
                    sx={{
                      width: "25vw",
                    }}
                  >
                    SIGN UP
                  </Button>
                </Box>
              )}

              {/* Part 2 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "45vw",
                  height: "100%",
                  marginTop: "18vh",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1.45rem",
                    fontWeight: "600",
                    fontFamily: "Inter",
                    zIndex: 1,
                    marginBottom: "7vh",
                  }}
                >
                  CREATE AN ACCOUNT
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    height: "10.75vh",
                  }}
                >
                  <TextField
                    error={errorSignUpText.username !== ""}
                    helperText={errorSignUpText.username}
                    size="small"
                    name="username"
                    onChange={handleInputRegister}
                    value={signUpFields.username}
                    label="Username"
                    style={{ ...textFieldStyle }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    height: "10.75vh",
                  }}
                >
                  <TextField
                    type="password"
                    error={errorSignUpText.password !== ""}
                    helperText={errorSignUpText.password}
                    size="small"
                    name="password"
                    onChange={handleInputRegister}
                    value={signUpFields.password}
                    label="Password"
                    style={{ ...textFieldStyle }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    height: "10.75vh",
                  }}
                >
                  <TextField
                    error={errorSignUpText.confirmpassword !== ""}
                    helperText={errorSignUpText.confirmpassword}
                    type="password"
                    name="confirmpassword"
                    size="small"
                    onChange={handleInputRegister}
                    value={signUpFields.confirmpassword}
                    label="Confirm Password"
                    style={{ ...textFieldStyle }}
                  />
                </Box>

                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  onClick={handleRegister}
                  sx={{
                    width: "25vw",
                  }}
                >
                  SIGN UP
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            {/* Reset Password */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "45vw",
                height: "70vh",
                marginTop: "10vh",
                animation: `${forgotAnimation}`,
                animationFillMode: "forwards",
                "@keyframes translateResetToTop": {
                  "0%": {
                    transform: "translateY(0)",
                    marginTop: "10vh",
                  },
                  "100%": {
                    transform: "translateY(-100%)",
                    marginTop: "0vh",
                  },
                },
                "@keyframes translateResetToBottom": {
                  "0%": {
                    transform: "translateY(-100%)",
                    marginTop: "0vh",
                  },
                  "100%": {
                    transform: "translateY(0)",
                    marginTop: "10vh",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  zIndex: 1,
                  marginBottom: "5%",
                }}
              >
                RESET PASSWORD
              </Typography>
              <input
                type="text"
                placeholder="Email"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginBottom: "5%",
                  borderRadius: "20px",
                  border: "none",
                  outline: "#013C38 solid 1px",
                  padding: "0.5rem",
                  paddingLeft: "1rem",
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  backgroundColor: "white",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginBottom: "5%",
                  borderRadius: "20px",
                  border: "none",
                  outline: "#013C38 solid 1px",
                  padding: "0.5rem",
                  paddingLeft: "1rem",
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  backgroundColor: "white",
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginBottom: "5%",
                  borderRadius: "20px",
                  border: "none",
                  outline: "#013C38 solid 1px",
                  padding: "0.5rem",
                  paddingLeft: "1rem",
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  backgroundColor: "white",
                }}
              />
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "#013C38",
                  width: "25%",
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
