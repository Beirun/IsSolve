import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "@fontsource/inter";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { useCitizen } from "./library/citizen";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [registerClicked, setRegisterClicked] = useState(false);
  const [current, setCurrent] = useState("signin");
  const [forgotClicked, setForgotClicked] = useState(false);
  const [animation, setAnimation] = useState("");
  const [forgotAnimation, setForgotAnimation] = useState("");
  const [signInButtonAnimation, setSignInButtonAnimation] = useState("");
  const [registerButtonAnimation, setRegisterButtonAnimation] = useState("");
  const [googleProfileImage, setGoogleProfileImage] = useState("");
  const [timesClicked, setTimesClicked] = useState(0);
  const [signinFields, setSigninFields] = useState({
    username: "",
    password: "",
  });

  const [signUpFields, setSignUpFields] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

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
  const { getCitizens, citizens, createCitizen } = useCitizen();

  useEffect(() => {
    getCitizens();
  }, []);
  useEffect(() => {
    if (citizens) {
      console.log(citizens);
    }
  }, [citizens]);

  useEffect(() => {
    if (!isRegistered) {
      if (current !== "register") {
        if (current === "signin") {
          setAnimation("translateToRight 750ms ease-in-out");
          setSignInButtonAnimation("signInMoveRight 750ms ease-in-out");
          setRegisterButtonAnimation("registerMoveRight 750ms ease-in-out");
        } else {
          setAnimation("translateToBottomRight 750ms ease-in-out");
          setForgotAnimation("translateResetToBottom 750ms ease-in-out");
          setRegisterButtonAnimation("registerMoveBottom 750ms ease-in-out");
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
    setSignUpFields({
      ...signUpFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    if (signinFields.username === "" || signinFields.password === "") {
      alert("Please enter your username and password");
      return;
    }
    for (const citizen of citizens) {
      if (
        citizen.ctzn_username === signinFields.username.trim().toLowerCase() &&
        citizen.ctzn_password === signinFields.password
      ) {
        navigate("/dashboard");
        return;
      }
    }
  };

  const handleGoogleRegister = async () => {
    if (signUpFields.username.trim().toLowerCase() === "") {
      alert("Please Enter a username!");
      return;
    }
    const newPassword = generatePassword();
    const newCitizen = await createCitizen({ ...signUpFields, password: newPassword });
    console.log(newCitizen);
    navigate("/dashboard");
  };



  const handleRegister = async () => {
    if (
      signUpFields.username.trim().toLowerCase() === "" ||
      signUpFields.firstname.trim() === "" ||
      signUpFields.lastname.trim() === "" ||
      signUpFields.email.trim() === "" ||
      signUpFields.password === "" ||
      signUpFields.confirmpassword === ""
    ) {
      alert("Please fill in all the fields");
      return;
    }
    if (signUpFields.password !== signUpFields.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    for (const citizen of citizens) {
      if (
        citizen.ctzn_username === signUpFields.username.trim().toLowerCase()
      ) {
        alert("Username already exists");
        return;
      }
    }
    const newCitizen = await createCitizen(signUpFields);
    console.log(newCitizen);
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
          backgroundColor: "#F4F4F4",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "45vw",
          height: "100vh",
          background: "linear-gradient(to top, #3C6968, #53948D)",
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
            height: "7.5vh",
            marginTop: "2.5vh",
            paddingY: "2.5vh",
          }}
        >
          <Button
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
                  animation === "translateFurtherRight 750ms ease-in-out" ?
                  setAnimation("translateFurtherLeft 750ms ease-in-out"):
                  setAnimation("translateToLeft 750ms ease-in-out") 
                  setSignInButtonAnimation("signInMoveLeft 750ms ease-in-out");
                  setRegisterButtonAnimation(
                    "registerMoveLeft 750ms ease-in-out"
                  );
                } else {
                  setForgotAnimation(
                    "translateResetToBottom 750ms ease-in-out"
                  );
                  setAnimation("translateToBottom 750ms ease-in-out");
                  setSignInButtonAnimation(
                    "signInMoveBottom 750ms ease-in-out"
                  );
                }
                if (registerClicked) setRegisterClicked(false);
                if (forgotClicked) setForgotClicked(false);
                if (timesClicked === 0) setTimesClicked(timesClicked + 1);
                setCurrent("signin");
              }
            }}
            sx={{
              width: "20%",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                color: "white",
                position: "relative",
                zIndex: "1",
                fontFamily: "Inter",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Sign In
            </Typography>
            <Box
              sx={{
                position: "absolute",
                width: "10vw",
                height: "100%",
                backgroundColor: "#013C38",
                borderRadius: "20px",
                animation: `${signInButtonAnimation}`,
                animationFillMode: "forwards",
                "@keyframes signInMoveRight": {
                  "0%": {
                    transform: "translateX(0%)",
                  },
                  "100%": {
                    transform: "translateX(100%)",
                  },
                },

                "@keyframes signInMoveLeft": {
                  "0%": {
                    transform: "translateX(100%)",
                  },
                  "100%": {
                    transform: "translateX(0%)",
                  },
                },
                "@keyframes signInMoveTop": {
                  "0%": {
                    transform: "translateY(0%)",
                  },
                  "100%": {
                    transform: "translateY(-100%)",
                  },
                },

                "@keyframes signInMoveBottom": {
                  "0%": {
                    transform: "translateY(-100%)",
                  },
                  "100%": {
                    transform: "translateY(0%)",
                  },
                },
              }}
            />
          </Button>
          <Button
            onClick={() => {
              if (current !== "register") {
                setSignUpFields((signUpFields) => ({
                  ...signUpFields,
                  email: "",
                }))
                if (setIsRegistered) setIsRegistered(true);
                if (current === "signin") {
                  setAnimation("translateToRight 750ms ease-in-out");
                  setSignInButtonAnimation("signInMoveRight 750ms ease-in-out");
                  setRegisterButtonAnimation(
                    "registerMoveRight 750ms ease-in-out"
                  );
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
              width: "20%",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                color: "white",
                position: "relative",
                zIndex: "1",
                fontFamily: "Inter",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Register
            </Typography>
            <Box
              sx={{
                position: "absolute",
                width: "10vw",
                height: "100%",
                backgroundColor: "#013C38",
                borderRadius: "20px",
                transform: "translateX(-100%)",
                animation: `${registerButtonAnimation}`,
                animationFillMode: "forwards",
                "@keyframes registerMoveRight": {
                  "0%": {
                    transform: "translateX(-100%)",
                  },
                  "100%": {
                    transform: "translateX(0%)",
                  },
                },

                "@keyframes registerMoveLeft": {
                  "0%": {
                    transform: "translateX(0%)",
                  },
                  "100%": {
                    transform: "translateX(-100%)",
                  },
                },
                "@keyframes registerMoveTop": {
                  "0%": {
                    transform: "translateY(0%)",
                  },
                  "100%": {
                    transform: "translateY(-100%)",
                  },
                },

                "@keyframes registerMoveBottom": {
                  "0%": {
                    transform: "translateY(-100%)",
                  },
                  "100%": {
                    transform: "translateY(0%)",
                  },
                },
                
              }}
            />
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
                  transform: "translateX(-33%)",
                },
              },
              "@keyframes translateToLeft": {
                "0%": {
                  transform: "translateX(-33%)",
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
                  transform: "translate(-33%,-100%)",
                },
                "100%": {
                  transform: "translate(-33%,0)",
                },
              },
            "@keyframes translateFurtherRight": {
              "0%": {
                transform: "translateX(-33%)",
              },
              "100%": {
                transform: "translateX(-66%)",
              },
            },
            "@keyframes translateBackRight": {
              "0%": {
                transform: "translateX(-66%)",
              },
              "100%": {
                transform: "translateX(-33%)",
              },
            },
            "@keyframes translateFurtherLeft": {
              "0%": {
                transform: "translateX(-66%)",
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
                marginTop: "25vh",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  zIndex: 1,
                }}
              >
                Have an account?
              </Typography>
              <input
                type="text"
                name="username"
                onChange={handleInputLogin}
                value={signinFields.username}
                placeholder="Username"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginTop: "5vh",
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
                name="password"
                onChange={handleInputLogin}
                value={signinFields.password}
                placeholder="Password"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginTop: "5vh",
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
                      setRegisterButtonAnimation(
                        "registerMoveTop 750ms ease-in-out"
                      );
                    }
                    setForgotAnimation("translateResetToTop 750ms ease-in-out");
                    if (!forgotClicked) setForgotClicked(true);
                    setCurrent("forgot");
                  }
                }}
                sx={{
                  color: "white",
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  marginTop: "5vh",
                  zIndex: 1,
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot Password?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "55%",
                  marginTop: "5vh",
                }}
              >
                <GoogleLoginButton
                  signUpFields={signUpFields}
                  setSignUpFields={setSignUpFields}
                  setIsRegistered={setIsRegistered}
                  setGoogleProfileImage={setGoogleProfileImage}
                />
                <Button
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#013C38",
                    width: "50%",
                    borderRadius: "20px",
                    textTransform: "none",
                    height: "2.5rem",
                    fontSize: "1rem",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    color: "#E9F5DB",
                  }}
                >
                  Log In
                </Button>
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
                    justifyContent: "center",
                    width: "45vw",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      zIndex: 1,
                      marginBottom: "3.5vh",
                    }}
                  >
                    Create an Account
                  </Typography>
                  {/* <input
                type="text"
                name="username"
                onChange={handleInputRegister}
                value={signUpFields.username}
                placeholder="Username"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginBottom: "3.5vh",
                  borderRadius: "20px",
                  border: "none",
                  outline: "#013C38 solid 1px",
                  padding: "0.5rem",
                  paddingLeft: "1rem",
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  backgroundColor: "white",
                }}
              /> */}
                  {!isRegistered ? null : (
                    <input
                      type="text"
                      name="firstname"
                      onChange={handleInputRegister}
                      value={signUpFields.firstname}
                      placeholder="First Name"
                      style={{
                        width: "55%",
                        height: "1.5rem",
                        marginBottom: "3.5vh",
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
                  )}
                  {!isRegistered ? null : (
                    <input
                      type="text"
                      name="lastname"
                      onChange={handleInputRegister}
                      value={signUpFields.lastname}
                      placeholder="Last Name"
                      style={{
                        width: "55%",
                        height: "1.5rem",
                        marginBottom: "3.5vh",
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
                  )}
                  {/* <input
                type="password"
                name="password"
                onChange={handleInputRegister}
                value={signUpFields.password}
                placeholder="Password"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginBottom: "3.5vh",
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
                name="confirmpassword"
                onChange={handleInputRegister}
                value={signUpFields.confirmpassword}
                placeholder="Confirm Password"
                style={{
                  width: "55%",
                  height: "1.5rem",
                  marginBottom: "3.5vh",
                  borderRadius: "20px",
                  border: "none",
                  outline: "#013C38 solid 1px",
                  padding: "0.5rem",
                  paddingLeft: "1rem",
                  fontSize: "1rem",
                  fontFamily: "Inter",
                  backgroundColor: "white",
                }}
              /> */}
                  {!isRegistered ? null : (
                    <input
                      type="text"
                      name="email"
                      onChange={handleInputRegister}
                      value={signUpFields.email}
                      placeholder="Email"
                      style={{
                        width: "55%",
                        height: "1.5rem",
                        marginBottom: "3.5vh",
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
                  )}
                  <Box
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
                  </Box>
                  <Button
                    onClick={() => {
                      setAnimation("translateFurtherRight 750ms ease-in-out");
                    }}
                    sx={{
                      color: "white",
                      backgroundColor: "#013C38",
                      width: "57%",
                      height: "5vh",
                      borderRadius: "20px",
                      textTransform: "none",
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
              ) : (
                // Through Google
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "45vw",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      fontFamily: "Inter",
                      zIndex: 1,
                      marginBottom: "3.5vh",
                    }}
                  >
                    Create an Account
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      maxWidth: "55%",
                      padding: "0.5rem",
                      paddingLeft: "1rem",
                      height: "4vh",
                      marginBottom: "7.5vh",
                      borderRadius: "25px",
                      backgroundColor: "#2C6958",
                    }}
                  >
                    <img 
                      src="../src/resources/google.png" 
                      alt="google" 
                      width={"35"}
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
                        fontSize: "1rem",
                        fontWeight: "400",
                        fontFamily: "Inter",
                        marginLeft: ".5rem",
                        marginRight: "1rem",
                      
                      }}
                    >
                      {signUpFields.email}
                    </Typography>
                  </Box>
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputRegister}
                    value={signUpFields.username}
                    placeholder="Username"
                    style={{
                      width: "55%",
                      height: "1.5rem",
                      marginBottom: "7.5vh",
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
                    onClick={handleGoogleRegister}
                    sx={{
                      color: "white",
                      backgroundColor: "#013C38",
                      width: "57%",
                      height: "5vh",
                      borderRadius: "20px",
                      textTransform: "none",
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
              )}

              {/* Part 2 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45vw",
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    zIndex: 1,
                    marginBottom: "3.5vh",
                  }}
                >
                  Create an Account
                </Typography>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputRegister}
                  value={signUpFields.username}
                  placeholder="Username"
                  style={{
                    width: "55%",
                    height: "1.5rem",
                    marginBottom: "3.5vh",
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
                  name="password"
                  onChange={handleInputRegister}
                  value={signUpFields.password}
                  placeholder="Password"
                  style={{
                    width: "55%",
                    height: "1.5rem",
                    marginBottom: "3.5vh",
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
                  name="confirmpassword"
                  onChange={handleInputRegister}
                  value={signUpFields.confirmpassword}
                  placeholder="Confirm Password"
                  style={{
                    width: "55%",
                    height: "1.5rem",
                    marginBottom: "3.5vh",
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
                  onClick={handleRegister}
                  sx={{
                    color: "white",
                    backgroundColor: "#013C38",
                    width: "57%",
                    height: "5vh",
                    borderRadius: "20px",
                    textTransform: "none",
                  }}
                >
                  Confirm
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

        {/* Tirangle Image */}

        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            animation:
              registerClicked || forgotClicked
                ? "registerTransition 450ms ease-in-out"
                : timesClicked > 0
                ? "signinTransition 450ms ease-in-out"
                : "none",
            animationFillMode: "forwards",
            transition: "300ms",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "45%",
            height: "90vh",
            background: "url(src/resources/loginBg.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
            backgroundSize: "cover",
            clipPath: "polygon(0 100%, 100% 75%, 100% 100%)",

            "@keyframes registerTransition": {
              "0%": {
                clipPath: "polygon(0 100%, 100% 75%, 100% 100%)",
              },
              "100%": {
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%)",
              },
            },

            "@keyframes signinTransition": {
              "0%": {
                clipPath: "polygon(0 100%, 100% 100%, 100% 100%)",
              },
              "100%": {
                clipPath: "polygon(0 100%, 100% 75%, 100% 100%)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;
