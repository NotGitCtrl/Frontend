import { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";

// icons
import TableChartIcon from "@mui/icons-material/TableChart";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import SchoolIcon from "@mui/icons-material/School";

export const mainListItems = (
  <>
    <DropdownListButton
      icon={<TableChartIcon />}
      title="Base Tables"
      subMenus={[
        {
          id: 1,
          icon: <PublicIcon />,
          title: "Countries",
          link: "/dashboard/countries",
        },
        {
          id: 2,
          icon: <LocationCityIcon />,
          title: "States",
          link: "/dashboard/states",
        },
        {
          id: 3,
          icon: <HouseSidingIcon />,
          title: "Districts",
          link: "/dashboard/districts",
        },
        {
          id: 4,
          icon: <ViewStreamIcon />,
          title: "Streams",
          link: "/dashboard/streams",
        },
        {
          id: 5,
          icon: <SchoolIcon />,
          title: "Universities",
          link: "/dashboard/universities",
        },
      ]}
    />

    <ListButton icon={<DashboardIcon />} title="Dashboard" />
    <ListButton icon={<ShoppingCartIcon />} title="Orders" />
    <ListButton icon={<PeopleIcon />} title="Customers" />
    <ListButton icon={<BarChartIcon />} title="Reports" />
    <ListButton icon={<LayersIcon />} title="Integrations" />
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListButton icon={<AssignmentIcon />} title="Current month" />
    <ListButton icon={<AssignmentIcon />} title="Last quarter" />
    <ListButton icon={<AssignmentIcon />} title="Year-end sale" />
  </>
);

function ListButton({ icon, title }) {
  return (
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

function DropdownListButton({ icon, title, subMenus }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setOpen(!open);
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
      </ListItemButton>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        {subMenus.map((submenu) => (
          <List
            component="div"
            disablePadding
            key={submenu.id}
            onClick={() => navigate(submenu.link)}
          >
            <ListItemButton>
              <ListItemIcon>{submenu.icon}</ListItemIcon>
              <ListItemText primary={submenu.title} />
            </ListItemButton>
          </List>
        ))}
        <Divider sx={{ my: 1 }} />
      </Collapse>
    </>
  );
}
