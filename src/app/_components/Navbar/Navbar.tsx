"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
// import { Button } from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { store } from "@/lib/store";
import { loadUserFromStorage, logout } from "@/lib/authslice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// start Navbar function

export default function Navbar() {
  const router = useRouter();
  const userToken = useSelector(
    (state: ReturnType<typeof store.getState>) => state.auth.userToken
  );
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout()); // هنا هيتمسح الـ token من redux + localStorage
    router.push("/login");
  }

  // const [isLogged, setisLogged] = useState<string | null | undefined>(
  //   undefined
  // );

  // function logout() {
  //   localStorage.clear();
  //   // setisLogged(null);
  //   router.push("/login");
  // }

  // React.useEffect(() => {
  //   const token = userToken
  //   if (token) {
  //     // setisLogged(token);
  //   } else {
  //     // setisLogged(null);
  //     router.push("/login");
  //   }
  // }, []);
  React.useEffect(() => {
    if (!userToken) {
      const token = localStorage.getItem("userToken");
      if (token) {
        dispatch(loadUserFromStorage(token));
      }
    }
  }, [userToken, dispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link style={{ color: "#000", textDecoration: "none" }} href={"/profile"}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>

      <MenuItem onClick={handleLogout}>Logout</MenuItem>

    
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Home */}
      <Link style={{ color: "#000", textDecoration: "none" }} href={"/"}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <HomeIcon />
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </Link>

      {/* messages  */}
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      {/* Notifications */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // End Navbar function

  {
    /* ----------------------------------------------------------------------------*/
  }

  // start return of NAVBAR FUNCTION

  if (!userToken) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">My App</Typography>
            <Box>
              <Button color="inherit">
                <Link
                  href="/login"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  href="/register"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/*start icon button  */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/*end icon button  */}

          {/* ----------------------------------------------------------------------------*/}

          {/*start typography  */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link style={{ color: "#fff", textDecoration: "none" }} href={"/"}>
              Home
            </Link>
          </Typography>
          {/*end typography  */}

          {/* ----------------------------------------------------------------------------*/}

          {/*start search  */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/*end  search  */}

          {/* ----------------------------------------------------------------------------*/}

          <Box sx={{ flexGrow: 1 }} />

          {/* start large screens box  */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {/* <Button>
              <Link
                style={{ color: "#fff", textDecoration: "none" }}
                href={"/login"}
              >
                Login
              </Link>
            </Button>
            <Button>
              <Link
                style={{ color: "#fff", textDecoration: "none" }}
                href={"/register"}
              >
                Register
              </Link>
            </Button> */}
          </Box>
          {/* end large screens box  */}

          {/* ----------------------------------------------------------------------------*/}

          {/* start  mobile screens  */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {/* end  mobile screens  */}
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );

  // END return of NAVBAR FUNCTION
}
