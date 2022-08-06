import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { clearStorage } from "../../utils/localstorage-utils";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmationModal from "./ConfirmationModal";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBarComponent({ isDrawerOpen, setDrawerOpen }) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    clearStorage();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <AppBar position="absolute" open={isDrawerOpen}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            sx={{
              marginRight: "36px",
              ...(isDrawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => setShowLogoutDialog(true)}
            sx={{ ml: 3 }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ConfirmationModal
        open={showLogoutDialog}
        message="Are you sure you want to logout?"
        handleClose={() => setShowLogoutDialog(false)}
        handleSuccess={logoutUser}
      />
    </>
  );
}
