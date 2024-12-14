import {
  AppBar,
  Box,
  Avatar,
  Button,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  InputAdornment
} from "@mui/material";
import React from "react";
import {IconBell, IconSearch} from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCitizen } from "../library/citizen";
import { useCurrent } from "../library/current";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: "5vh",
      height: "5vh",
      fontSize: "2vh",
      fontWeight: "500",
      fontFamily: "Inter",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Navbar = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { signedInAccount, setSignedInAccount } = useCurrent();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        justifyContent: "flex-start",
        backgroundColor: "#252525",
        alignItems: "center",
        flexDirection: "row",
        width: "100vw",
        height: "10vh",
        zIndex: "10",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          width: "50vw",
          height: "100%",
        }}
      >
        <img
          src="../src/resources/LOGO-WHITE.png"
          alt="IsSolve"
          style={{ width: "12.5vh" }}
        />
        <Button
          size="large"
          variant="text"
          color="inherit"
          onClick={() => navigate("/dashboard")}
          sx={{
            width: "8vw",
          }}
        >
          HOME
        </Button>
        <Button
          size="large"
          variant="text"
          color="inherit"
          onClick={() => navigate("/myreports")}
          sx={{
            width: "8vw",
          }}
        >
          My reports
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          width: "50vw",
          height: "100%",
          paddingRight: "6.12vw",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search"
          size="medium"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: "31.5vw",
            marginRight: "1vw",
          }}
        />
        <IconButton
          sx={{
            marginRight: "2vw",
          }}
        >
          <IconBell size={40} stroke={1.5}/>
        </IconButton>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {signedInAccount.ctzn_profileimage ? (
            <Avatar src={signedInAccount.ctzn_profileimage}/>
          ) :
          (
            <Avatar {...stringAvatar("John Doe")} />
          )}
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
