import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  Button,
  Box,
  Menu
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../store/slices/authSlice";
import PersonIcon from '@mui/icons-material/Person';


import { useNavigate } from "react-router-dom";
import { } from "@mui/material";
import { setUser } from "../store/slices/authSlice";

// SearchBar styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "6px",
  backgroundColor: alpha(theme.palette.grey[300], 0.7),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[400], 0.9),
  },
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#666",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  fontSize: 14,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

export default function Navbar() {
  const dispatch = useDispatch(); // ← add this
  const user = useSelector(state => state.auth.user)
  const [city, setCity] = React.useState("Ratlam");

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "center", px: 2 }}>
        {/* Main container (like max-width: 1280px) */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1280px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left section: Logo + Search */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "red",
                textTransform: "uppercase",
              }}
            >
              BookMyShow
            </Typography>

            <Box sx={{ flex: 1, maxWidth: 600 }}>
              <Search sx={{ width: '100%' }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  sx={{ width: '100%' }}
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </Box>

          {/* Right section: City + Sign In + Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", color: "#000" }}>
              <LocationOnIcon sx={{ color: "red", mr: 0.5 }} />
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="standard"
                disableUnderline
                sx={{ fontWeight: 500 }}
              >
                <MenuItem value="Ratlam">Ratlam</MenuItem>
                <MenuItem value="Indore">Indore</MenuItem>
                <MenuItem value="Bhopal">Bhopal</MenuItem>
              </Select>
            </Box>

            {/* <Button variant="text" sx={{ color: "#007bff", fontWeight: 600 }}>
              SIGN IN
            </Button> */}


            {
              user?.name ?
                <UserInfo user={user} />
                :
                <><Button
                  variant="text"
                  sx={{ color: "#007bff", fontWeight: 600 }}
                  onClick={() => dispatch(openLoginModal())} // ← handle click here
                >
                  SIGN IN
                </Button>
                  <IconButton>
                    <MenuIcon />
                  </IconButton>
                </>
            }
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export const UserInfo = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    handleMenuClose();
    navigate("/");      
    window.location.reload(); 

  };

  const handleMyBookings = () => {
    navigate("/my-bookings");
    handleMenuClose();
  };

  return (
    <Box>
      <Box display='flex' sx={{alignItems:'center', cursor:'pointer'}} onClick={handleMenuOpen}>
        <IconButton >
          <PersonIcon />
        </IconButton>
        <Typography variant="body2" color="secondary">
          Hi {user.name.split(" ")[0]}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMyBookings}>My Bookings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
