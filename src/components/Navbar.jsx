import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PostAddIcon from "@mui/icons-material/PostAdd";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ufo from "../assets/ufo.png";
import useAuthCall from "../hooks/useAuthCalls";

const textStyle = {
  display: {
    xs: "none",
    md: "block",
  },
};

const blogStyle = {
  mr: 2,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  cursor: "pointer",
};

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCall();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {
      title: "Dashboard",
      icon: <DashboardIcon fontSize="large" sx={{ color: "#787F9E" }} />,
      path: "/",
    },
    {
      title: "New Blog",
      icon: <PostAddIcon fontSize="large" sx={{ color: "#787F9E" }} />,
      path: "/newBlog",
    },
    {
      title: "About",
      icon: <InfoIcon fontSize="large" sx={{ color: "#787F9E" }} />,
      path: "/about",
    },
  ];

  const settings = [
    { title: "Profile", path: "/profile" },
    { title: "My Blog", path: "/myBlog" },
    { title: "Logout", path: "" },
    { title: "Login", path: "/auth" },
  ];

  return (
    <>
    <Box
    sx={{
      height: { xs: 'auto', sm: '100vh' },
      minHeight:{sm:"100vh"},
      width: { xs: '100%', sm: 80, md: 220 },
      display: 'flex',
      background: theme.palette.secondary.main,
      padding: { xs: "0.5rem", sm: "2rem 0.5rem" },
      flexDirection: { xs: "row", sm: "column" },
      borderRight: { xs: 'none', sm: "1px solid lightgray" },
      borderTop: { xs: "1px solid lightgray", sm: 'none' },
      justifyContent: { xs: "center", sm: "space-between" },
      position:'fixed',
      bottom: { xs: 0, sm: 'initial' },
      left: 0,
      right: { xs: 0, sm: 'initial' },
      zIndex: theme.zIndex.appBar,  
    }} 
    role="navigation"

    >
      <Box>
        <Stack direction={"row"} alignItems={"center"}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              m: { sx: 0, md: "0.5rem 1.5rem 0.5rem 0.9rem" },
            }}
          >
            <img style={{cursor:"pointer"}} onClick={() => navigate("/")} className="navbar-logo" src={ufo} alt="logo" width={40} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{ ...textStyle, ...blogStyle }}
            onClick={() => navigate("/")}
          >
            BLOG
          </Typography>
        </Stack>
        <Divider
          sx={{ margin: "1rem 0", display: { xs: "none", sm: "block" } }}
        />
        <List
          sx={{ display: "flex", flexDirection: { xs: "row", sm: "column" } }}
        >
          {pages.map((item) => (
            <ListItem
              onClick={() => navigate(item.path)}
              key={item.path}
              sx={{ mb: { xs: "0.5rem", sm: "1rem" }, display: "flex" }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ sx: textStyle }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          flexGrow: 0,
          paddingLeft: { xs: 0, md: "1rem" },
          mb: { xs: 0, sm: "5rem" },
          display: "flex",
        }}
      >
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Box
              sx={{
                mr: { xs: 0, md: "1rem" },
                ml: { sm: "0.8rem", md: "0" },
                mb: { xs: "0.8rem", sm: "0.5rem" },
              }}
            >
              {user && user.image ? (
                <img
                  src={user.image}
                  alt={user.username}
                  width={40}
                  className="h-8 w-8 rounded-full p-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <AccountCircleIcon sx={{ color: "#787F9E" }} fontSize="large" />
              )}
            </Box>
            <Typography color={"#657AB8"} fontWeight={"medium"} sx={textStyle}>
              {user ? `${user.firstName} ${user.lastName}` : ""}
            </Typography>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: 0, ml: "40px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {!user
            ? settings
                .slice(settings.length - 1, settings.length)
                .map((setting) => (
                  <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                    <Typography
                      onClick={() => navigate(setting.path)}
                      sx={{ textAlign: "center" }}
                    >
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))
            : settings.slice(0, settings.length - 1).map((setting) => (
                <MenuItem key={setting.path} onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={
                      setting.title === "Logout"
                        ? logout
                        : () => navigate(setting.path)
                    }
                    sx={{ textAlign: "center" }}
                  >
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
        </Menu>
      </Box>
    </Box>
    <Box
    sx={{
      height: { xs: 'auto', sm: '100vh' },
      minHeight:{sm:"100vh"},
      width: { xs: '100%', sm: 80, md: 220 },
      display: 'flex',
      background: theme.palette.secondary.main,
      padding: { xs: "0.5rem", sm: "2rem 0.5rem" },
      flexDirection: { xs: "row", sm: "column" },
      borderRight: { xs: 'none', sm: "1px solid lightgray" },
      borderTop: { xs: "1px solid lightgray", sm: 'none' },
      justifyContent: { xs: "center", sm: "space-between" },
      position:'sticky',
      bottom: { xs: 0, sm: 'initial' },
      left: 0,
      right: { xs: 0, sm: 'initial' },
      zIndex: -10,  
    }} 
    role="navigation"
    ></Box>
    </>
  );
}
