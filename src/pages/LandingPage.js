import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import UgcLogo from "../images/ugc_logo.png";
import EmblemLogo from "../images/MHRD_logo.png";
import MainBG from "../images/mainBG.png";
import Login from "./auth/Login";
import LoginBox from "./LoginBox";
import { Grid, Link, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const LandingPage = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" style={{ background: "#fff" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Box
                component="img"
                sx={{
                  height: 80,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={UgcLogo}
              />
            </Box>
            <Box>
              <Typography variant="h4" color="#000">
                Fund Management System
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                sx={{
                  height: 80,
                  width: 46,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="The house from the offer."
                src={EmblemLogo}
              />
            </Box>
          </Box>
          {/* </Toolbar> */}
        </Container>
      </AppBar>
      <Box
        maxWidth="xl"
        height={30}
        component="div"
        textAlign="center"
        sx={{
          background: "#000",
        }}
      >
        <Typography
          variant="p"
          color="#fff"
          marginRight={5}
          sx={{ cursor: "pointer" }}
        >
          About Us
        </Typography>
        <Typography
          variant="p"
          color="#fff"
          marginRight={5}
          sx={{ cursor: "pointer" }}
        >
          Organization
        </Typography>
        <Typography
          variant="p"
          color="#fff"
          marginRight={5}
          sx={{ cursor: "pointer" }}
        >
          UGC Bureaus
        </Typography>
        <Typography
          variant="p"
          color="#fff"
          marginRight={5}
          sx={{ cursor: "pointer" }}
        >
          Universities
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            component="img"
            sx={{ height: 605, width: 1519, backgroundSize: "cover" }}
            src={MainBG}
          ></Box>
        </Grid>
        <Grid item xs={4}>
          <LoginBox />
        </Grid>
      </Grid>
    </>
  );
};
export default LandingPage;
