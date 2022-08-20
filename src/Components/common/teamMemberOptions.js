import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SchemaIcon from "@mui/icons-material/Schema";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonIcon from '@mui/icons-material/Person';

export default [
  {
    id: 1,
    icon: <AccountTreeIcon />,
    title: "Projects",
    link: "/dashboard/projects",
  },
  {
    id: 2,
    icon: <ShowChartIcon />,
    title: "Analytics",
    link: "/dashboard/analytics",
  },
  {
    id: 3,
    icon: <PersonIcon />,
    title: "Profile Page",
    link: "/project",
  },
];
