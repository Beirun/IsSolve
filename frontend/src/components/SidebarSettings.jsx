import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  IconUserFilled,
  IconBellFilled,
  IconHelpCircleFilled,
  IconShieldCheckFilled,
} from "@tabler/icons-react";
import "@fontsource/inter";
import "@fontsource/inter/700.css";
import React, { useEffect, useState, useReducer } from "react";

const initialState = {
  activeButton: 1,
  buttons: [
    { id: 1, label: "Profile", icon: <IconUserFilled /> },
    { id: 2, label: "Notification Settings", icon: <IconBellFilled /> },
    { id: 3, label: "Help & Support", icon: <IconHelpCircleFilled /> },
    { id: 4, label: "Legal Policies", icon: <IconShieldCheckFilled /> },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CLICK_BUTTON":
      return {
        ...state,
        activeButton: action.buttonId,
      };
    default:
      return state;
  }
};
const SidebarSettings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [buttonLoaded, setButtonLoaded] = useState(false);

  const buttonStyle = {
    color: "#0e0e0e",
    fontSize: "1rem",
    fontWeight: "600",
    fontFamily: "Inter",
    textTransform: "none",
    borderRadius: "0px",
    width: "100%",
    height: "3.5rem",
    marginY: "0.5rem",
    textAlign: "left",

    transition: "250ms",
  };

  const buttonText = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.5rem",
    color: "#0e0e0e",
    fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)",
    fontWeight: "500",
    fontFamily: "Inter",
    textTransform: "none",
    borderRadius: "0px",
    width: "100%",
    zIndex: "2",
    marginLeft: "1.5rem",
  };
  const initialBoxStyle = {
    position: "absolute",
    left: "0",
    top: "0",
    height: "3.5rem",
    background: "#f4f4f4",
    width: "100%",
    zIndex: "1",
  };
  const boxStyle = {
    position: "absolute",
    left: "0",
    top: "0",
    height: "3.5rem",
    backgroundImage: "linear-gradient(to right, #009087, #F4F4F4)",
    width: "0%",
    animationPlayState: "paused",
    animation: "widen 0.25s ease-in-out",
    animationFillMode: "forwards",
    "@keyframes widen": {
      "0%": {
        width: "0%",
      },
      "100%": {
        width: "100%",
      },
    },
    "@keyframes shrink": {
      "0%": {
        width: "100%",
      },
      "100%": {
        width: "0%",
      },
    },
  };
  const handleClick = (buttonId) => {
    dispatch({ type: "CLICK_BUTTON", buttonId });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: "10vh",
        left: "0",
        width: "20vw",
        height: "90vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          top: "0",
          left: "0",
          width: "calc(20vw - 1px)",
          height: "85vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0e0e0e",
            fontSize: "clamp(0.75rem, 1.5vw, 1.25rem)",
            fontWeight: "700",
            fontFamily: "Inter",
            borderRadius: "0px",
            width: "100%",
            height: "3rem",
            marginY: "0.5rem",
            textAlign: "middle",
          }}
        >
          ACCOUNT SETTINGS
        </Typography>
        {state.buttons.map((button) => (
          <Button
            key={button.id}
            onMouseEnter={() => setButtonLoaded(true)}
            sx={{
              ...buttonStyle,
              backgroundImage:
                state.activeButton === button.id
                  ? "linear-gradient(to right, #009087, #F4F4F4)"
                  : "none",
              "&:hover > .gradient-box": state.activeButton !== button.id ? {
                animationPlayState: "running",
              } : {},
              "&:not(:hover) > .gradient-box": state.activeButton !== button.id ? {
                animation: "shrink 0.25s ease-in-out",
                animationFillMode: "forwards",
                animationPlayState: "running",
              } : {},
            }}
            onClick={() => handleClick(button.id)}
          >
            {buttonLoaded || state.activeButton === button.id ? "" : <Box sx={initialBoxStyle} />}

            <Box
              className="gradient-box"
              sx={{
                ...boxStyle,
                width: state.activeButton === button.id ? "100%" : "0%",
              }}
            />
            <Typography sx={buttonText}>
              {button.icon} {button.label}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarSettings;
