import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import appLogo from "../assets/appbloglogo.svg";
import { useAuth } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };
  const handleDashBoard = () => {
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          flexGrow: 1,
          backgroundColor: "#046592",
          // "&:hover": {
          //   backgroundColor: "primary.dark",
          //   opacity: [0.9, 0.8, 0.7],
          // },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDashBoard}
          >
            <img className="header-logo" src={appLogo} alt="logo" />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            ----{" "}
            <span onClick={() => navigate("/")} className="navbar-header">
              {"<ARahim-S/>"}
            </span>{" "}
            BLOG ----
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle style={{ fontSize: "40px" }} />
            </IconButton>
            {currentUser?.email ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link className="header-link" to={"/profile"}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link className="header-link" to={"/new-blog"}>
                  <MenuItem onClick={handleClose}>New Blog</MenuItem>
                </Link>
                <Link className="header-link" to={"/"}>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link className="header-link" to={"/login"}>
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>
                <Link className="header-link" to={"/register"}>
                  <MenuItem onClick={handleClose}>Register</MenuItem>
                </Link>
              </Menu>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
