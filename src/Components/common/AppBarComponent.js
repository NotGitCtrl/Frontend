import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { clearStorage, getStorage } from "../../utils/localstorage-utils";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmationModal from "./ConfirmationModal";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

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

const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "hi",
    name: "हिन्दी",
  },
];

export default function AppBarComponent({ isDrawerOpen, setDrawerOpen }) {
  const { t } = useTranslation();

  const currentLanguageCode = cookies.get("i18next") || "en";

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);

  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
    // i18next.changeLanguage();
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    handleLanguageMenuClose();
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const logoutUser = () => {
    clearStorage();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const profileMenuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      id={profileMenuId}
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
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>
        {getStorage("firstName") + " " + getStorage("lastName")}
      </MenuItem>
      <MenuItem onClick={() => setShowLogoutDialog(true)}>Logout</MenuItem>
    </Menu>
  );

  const languageMenuId = "primary-language-menu";
  const renderLanguageMenu = (
    <Menu
      anchorEl={languageAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={languageMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isLanguageMenuOpen}
      onClose={handleLanguageMenuClose}
    >
      {languages.map(({ code, name }) => (
        <MenuItem
          key={code}
          selected={currentLanguageCode === code}
          onClick={() => {
            setLanguageAnchorEl(null);
            i18next.changeLanguage(code);
          }}
        >
          {name}
        </MenuItem>
      ))}
    </Menu>
  );

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
            {t("Dashboard")}
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={languageMenuId}
              aria-haspopup="true"
              onClick={handleLanguageMenuOpen}
              color="inherit"
            >
              <LanguageIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
      {renderLanguageMenu}
      <ConfirmationModal
        open={showLogoutDialog}
        message="Are you sure you want to logout?"
        handleClose={() => setShowLogoutDialog(false)}
        handleSuccess={logoutUser}
      />
    </>
  );
}
