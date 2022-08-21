import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SchemaIcon from "@mui/icons-material/Schema";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import SchoolIcon from "@mui/icons-material/School";
import PaidIcon from "@mui/icons-material/Paid";

import { useContext } from "react";
import { AppContext } from "../../context/Context";

import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

export default function DrawerComponent({
  isDrawerOpen = true,
  setDrawerOpen,
}) {
  const { t } = useTranslation();
  const schemes = t("Schemes");
  const projects = t("Projects");
  const coordinators = t("Coordinators");
  const transactions = t("Transaction");
  const analytics = t("Analytics");
  const heis = t("HEIs");
  const profile = t("Profile");
  const teams = t("Teams");
  const spoc = t("SPOC");
  const countries = t("Country");
  const states = t("State");
  const districts = t("District");
  const streams = t("Streams");
  const universities = t("University");
  const fundingAgency = t("Funding Agency");
  const ugcAdmin = t("University Admin");

  const faAdminOptions = [
    {
      id: 1,
      icon: <SchemaIcon />,
      title: schemes,
      link: "/dashboard/schemes",
    },
    {
      id: 2,
      icon: <AccountTreeIcon />,
      title: projects,
      link: "/dashboard/projects",
    },
    {
      id: 3,
      icon: <SchemaIcon />,
      title: coordinators,
      link: "/dashboard/coordinators",
    },
    {
      id: 4,
      icon: <ReceiptLongIcon />,
      title: transactions,
      link: "/dashboard/transactions",
    },
    {
      id: 5,
      icon: <ShowChartIcon />,
      title: analytics,
      link: "/dashboard/analytics",
    },
    {
      id: 6,
      icon: <WorkspacePremiumIcon />,
      title: heis,
      link: "/hei-list",
    },
    {
      id: 7,
      icon: <PersonIcon />,
      title: profile,
      link: "/profile",
    },
  ];

  const faCoordinatorOptions = [
    {
      id: 1,
      icon: <SchemaIcon />,
      title: schemes,
      link: "/dashboard/schemes",
    },
    {
      id: 2,
      icon: <AccountTreeIcon />,
      title: projects,
      link: "/dashboard/projects",
    },
    {
      id: 3,
      icon: <ReceiptLongIcon />,
      title: transactions,
      link: "/dashboard/transactions",
    },
    {
      id: 4,
      icon: <ShowChartIcon />,
      title: analytics,
      link: "/dashboard/analytics",
    },
    {
      id: 5,
      icon: <PersonIcon />,
      title: profile,
      link: "/profile",
    },
  ];

  const heiAdminOptions = [
    {
      id: 1,
      icon: <AccountTreeIcon />,
      title: projects,
      link: "/dashboard/projects",
    },
    {
      id: 2,
      icon: <AccountTreeIcon />,
      title: teams,
      link: "/dashboard/teams",
    },
    {
      id: 3,
      icon: <ReceiptLongIcon />,
      title: transactions,
      link: "/dashboard/transactions",
    },
    {
      id: 4,
      icon: <SchemaIcon />,
      title: coordinators,
      link: "/dashboard/coordinators",
    },
    {
      id: 5,
      icon: <SchemaIcon />,
      title: spoc,
      link: "/dashboard/spoc",
    },
    {
      id: 6,
      icon: <ShowChartIcon />,
      title: analytics,
      link: "/dashboard/analytics",
    },
    {
      id: 7,
      icon: <PersonIcon />,
      title: profile,
      link: "/dashboard/profile",
    },
  ];

  const heiCoordinatorOptions = [
    {
      id: 1,
      icon: <AccountTreeIcon />,
      title: projects,
      link: "/dashboard/projects",
    },
    {
      id: 2,
      icon: <AccountTreeIcon />,
      title: teams,
      link: "/dashboard/teams",
    },
    {
      id: 3,
      icon: <ReceiptLongIcon />,
      title: transactions,
      link: "/dashboard/transactions",
    },
    {
      id: 4,
      icon: <ShowChartIcon />,
      title: analytics,
      link: "/dashboard/analytics",
    },
    {
      id: 5,
      icon: <PersonIcon />,
      title: profile,
      link: "/profile",
    },
  ];

  const superAdminOptions = [
    {
      id: 1,
      icon: <PublicIcon />,
      title: countries,
      link: "/dashboard/countries",
    },
    {
      id: 2,
      icon: <LocationCityIcon />,
      title: states,
      link: "/dashboard/states",
    },
    {
      id: 3,
      icon: <HouseSidingIcon />,
      title: districts,
      link: "/dashboard/districts",
    },
    {
      id: 4,
      icon: <ViewStreamIcon />,
      title: streams,
      link: "/dashboard/streams",
    },
    {
      id: 5,
      icon: <SchoolIcon />,
      title: universities,
      link: "/dashboard/universities",
    },
    {
      id: 6,
      icon: <WorkspacePremiumIcon />,
      title: heis,
      link: "/admin/hei",
    },
    {
      id: 7,
      icon: <PaidIcon />,
      title: fundingAgency,
      link: "/admin/fa",
    },
    {
      id: 8,
      icon: <AccountTreeIcon />,
      title: projects,
      link: "/dashboard/projects",
    },
    {
      id: 9,
      icon: <ReceiptLongIcon />,
      title: transactions,
      link: "/dashboard/transactions",
    },
    {
      id: 10,
      icon: <SchemaIcon />,
      title: schemes,
      link: "/dashboard/schemes",
    },
    {
      id: 11,
      icon: <SchemaIcon />,
      title: coordinators,
      link: "/dashboard/coordinators",
    },
    {
      id: 12,
      icon: <ShowChartIcon />,
      title: analytics,
      link: "/dashboard/analytics",
    },
    {
      id: 13,
      icon: <SchemaIcon />,
      title: ugcAdmin,
      link: "/dashboard/ugc-admins",
    },
    {
      id: 14,
      icon: <PersonIcon />,
      title: profile,
      link: "/profile",
    },
  ];

  const teamMemberOptions = [
    {
      id: 1,
      icon: <AccountTreeIcon />,
      title: projects,
      link: "/dashboard/projects",
    },
    {
      id: 2,
      icon: <ShowChartIcon />,
      title: analytics,
      link: "/dashboard/analytics",
    },
    {
      id: 3,
      icon: <PersonIcon />,
      title: profile,
      link: "/project",
    },
  ];

  const ugcAdminOptions = [
    {
      id: 1,
      icon: <WorkspacePremiumIcon />,
      title: heis,
      link: "/admin/hei",
    },
    {
      id: 2,
      icon: <PaidIcon />,
      title: fundingAgency,
      link: "/admin/fa",
    },
    {
      id: 3,
      icon: <AccountTreeIcon />,
      title: projects,
      link: "/dashboard/projects",
    },
    {
      id: 4,
      icon: <ReceiptLongIcon />,
      title: transactions,
      link: "/dashboard/transactions",
    },
    {
      id: 5,
      icon: <SchemaIcon />,
      title: schemes,
      link: "/dashboard/schemes",
    },
    {
      id: 6,
      icon: <SchemaIcon />,
      title: coordinators,
      link: "/dashboard/coordinators",
    },
    {
      id: 7,
      icon: <ShowChartIcon />,
      title: analytics,
      link: "/dashboard/analytics",
    },
    {
      id: 8,
      icon: <PersonIcon />,
      title: profile,
      link: "/profile",
    },
  ];

  const navigate = useNavigate();
  const { role } = useContext(AppContext);
  const adminOptions =
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
      : superAdminOptions;

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
        {adminOptions.map((item) => (
          <ListItem button onClick={() => navigate(item.link)} key={item.title}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
