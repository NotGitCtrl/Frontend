import { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";

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

export function ListButton({ icon, title }) {
  return (
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

export function DropdownListButton({ icon, title, subMenus }) {
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
      <Collapse in={open} timeout="auto" unmountOnExit>
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
