import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SchemaIcon from "@mui/icons-material/Schema";
import ShowChartIcon from "@mui/icons-material/ShowChart";
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
    icon: <AccountTreeIcon />,
    title: "Teams",
    link: "/dashboard/projects",
  },
  {
    id: 3,
    icon: <ReceiptLongIcon />,
    title: "Transactions",
    link: "/dashboard/transactions",
  },
  {
    id: 4,
    icon: <SchemaIcon />,
    title: "Coordinators",
    link: "/dashboard/schemes",
  },
  {
    id: 5,
    icon: <SchemaIcon />,
    title: "SPOCs",
    link: "/dashboard/schemes",
  },
  {
    id: 6,
    icon: <ShowChartIcon />,
    title: "Analytics",
    link: "/dashboard/schemes",
  },
  {
    id: 7,
    icon: <PersonIcon />,
    title: "Profile Page",
    link: "/dashboard/schemes",
  },
];
