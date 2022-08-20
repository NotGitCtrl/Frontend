import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DropdownListButton, ListButton } from "./ListItems";

// icons
import TableChartIcon from "@mui/icons-material/TableChart";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PaidIcon from "@mui/icons-material/Paid";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useContext } from "react";
import { AppContext } from "../../context/Context";

import superAdminOptions from "./superAdminOptions";
import ugcAdminOptions from "./ugcAdminOptions";
import faAdminOptions from "./faAdminOptions";
import faCoordinatorOptions from "./faCoordinatorOptions";
import heiAdminOptions from "./heiAdminOptions";
import heiCoordinatorOptions from "./heiCoordinatorOptions";
import teamMemberOptions from "./teamMemberOptions";
import { ListItemButton } from "@mui/material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function DrawerComponent({ isDrawerOpen, setDrawerOpen }) {
  const { role } = useContext(AppContext);

  const mainListItems = (
    <>
      <DropdownListButton
        icon={<TableChartIcon />}
        title="Base Tables"
        subMenus={
          role === "super-admin"
            ? superAdminOptions
            : role === "ugc-admin"
            ? ugcAdminOptions
            : role === "fa-admin"
            ? faAdminOptions
            : role === "fa-project-coordinator"
            ? faCoordinatorOptions
            : role === "hei-admin"
            ? heiAdminOptions
            : role === "hei-project-coordinator"
            ? heiCoordinatorOptions
            : role === "project-member"
            ? teamMemberOptions
            : role === "university-admin"
            ? heiAdminOptions
            : role === "hei-spoc"
            ? heiAdminOptions
            : superAdminOptions
        }
      />
    </>
  );

  return (
    <Drawer variant="permanent" open={isDrawerOpen}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={() => setDrawerOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  );
}
