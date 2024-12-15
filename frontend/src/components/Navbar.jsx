import {
  AppBar,
  Box,
  Avatar,
  Button,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  InputAdornment,
  Typography,
  Badge,
  Fab,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import {
  IconBell,
  IconSearch,
  IconArrowLeft,
  IconCheck,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCitizen } from "../library/citizen";
import { useNotification } from "../library/notification";
import { useCurrent } from "../library/current";

const Navbar = ({ logoRoute, isDashboard }) => {
  const displaySnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
  const {
    getCitizenNotifications,
    updateNotification,
    updateNotificationCommentReact,
  } = useNotification();
  const [citizenNotifications, setCitizenNotifications] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { signedInAccount, setSignedInAccount, setSignUpClicked, setIsAdmin } =
    useCurrent();
  const [notificationCount, setNotificationCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    async function fetchData() {
      const notifications = await getCitizenNotifications(
        signedInAccount.ctzn_id
      );
      setCitizenNotifications(notifications);
      setNotificationCount(
        notifications.filter(
          (notification) => notification.notification_status === "unread"
        ).length
      );
    }

    fetchData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const notificationOpen = Boolean(notificationAnchorEl);
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = async () => {
    setNotificationCount(0);
    setNotificationAnchorEl(null);
    for (let i = 0; i < citizenNotifications.length; i++) {
      if (citizenNotifications[i].notification_status === "unread") {
        if (
          citizenNotifications[i].notification_message.includes(
            "reacted to your comment."
          )
        ) {
          await updateNotificationCommentReact(
            citizenNotifications[i].notification_id,
            { notification_status: "read" }
          );
        } else {
          await updateNotification(citizenNotifications[i].notification_id, {
            notification_status: "read",
          });
        }
      }
    }
  };

  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/search/${search}`);
      setSearch("");
      searchInputRef.current.blur();
    }
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
      {isDashboard ? null : (
        <Fab
          variant="extended"
          color="info"
          size="large"
          onClick={() => navigate(-1)}
          sx={{
            position: "fixed",
            top: "14.5vh",
            transform: "translateX(-63%)",
            zIndex: "10",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "translateX(-23.33%)",
            },
          }}
        >
          <Typography fontWeight={"bold"}>&nbsp;&nbsp;&nbsp;Back</Typography>
          <IconArrowLeft />
        </Fab>
      )}
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
          src={
            logoRoute
              ? "../../src/resources/LOGO-WHITE.png"
              : "../src/resources/LOGO-WHITE.png"
          }
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
          onKeyDown={handleSearchKeyDown}
          onChange={handleSearchChange}
          value={search}
          ref={searchInputRef}
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

        {/* Notification Icon */}
        <IconButton
          onClick={handleNotificationClick}
          sx={{
            marginRight: "2vw",
          }}
        >
          {citizenNotifications.length === 0 ? (
            <IconBell size={40} stroke={1.5} />
          ) : (
            <Badge badgeContent={notificationCount} color="error">
              <IconBell size={40} stroke={1.5} />
            </Badge>
          )}
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={notificationAnchorEl}
          open={notificationOpen}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            "& .MuiMenu-paper": {
              maxHeight: "50vh",
            },
          }}
        >
          {citizenNotifications.length === 0 ? (
            <MenuItem key="no-notifications" disabled>
              <Typography
                variant="h5"
                sx={{
                  height: "20vh",
                  width: "15vw",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Notifications
              </Typography>
            </MenuItem>
          ) : (
            citizenNotifications.map((notification) => (
              <MenuItem
                key={notification.notification_id}
                sx={{
                  width: "25vw",
                  backgroundColor:
                    notification.notification_status === "unread"
                      ? "#3a3a3a"
                      : "#2e2e2e",
                }}
                onClick={() => {
                  handleNotificationClose();
                  navigate(`/report/${notification.rprt_id}`);
                }}
              >
                {notification.notification_sender === 0 ? (
                  <Avatar sx={{ backgroundColor: "#a1a1a1" }}>
                    <IconCheck size={30} stroke={2.5} color="green" />
                  </Avatar>
                ) : (
                  <Avatar src={notification.ctzn_profileimage} />
                )}
                
                <Typography
                  variant="caption"
                  color="inherit"
                  sx={{ marginLeft: "1vw", width: "25vw", height: "5vh", textWrap: "wrap", alignItems: "center", display: "flex" }}
                >
                  {notification.notification_message}
                </Typography>
                
              </MenuItem>
            ))
          )}
        </Menu>

        {/* Profile Icon */}
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {signedInAccount.ctzn_profileimage ? (
            <Avatar src={signedInAccount.ctzn_profileimage} />
          ) : (
            <Avatar />
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
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/profile`);
            }}
          >
            {signedInAccount.ctzn_profileimage ? (
              <Avatar src={signedInAccount.ctzn_profileimage} />
            ) : (
              <Avatar />
            )}
            <Typography
              sx={{ marginLeft: "1vw" }}
              fontFamily="Inter"
              variant="body2"
            >
              {signedInAccount.ctzn_firstname} {signedInAccount.ctzn_lastname}
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/login");
              setIsAdmin(false);
              setSignUpClicked(false);
              setSignedInAccount(null);
              displaySnackbar("Logged out successfully!", "success");
              return
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
