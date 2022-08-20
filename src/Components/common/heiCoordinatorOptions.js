import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";

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
    link: "/dashboard/teams",
  },
  {
    id: 3,
    icon: <ReceiptLongIcon />,
    title: "Transactions",
    link: "/dashboard/transactions",
  },
  {
    id: 4,
    icon: <ShowChartIcon />,
    title: "Analytics",
    link: "/dashboard/analytics",
  },
  {
    id: 5,
    icon: <PersonIcon />,
    title: "Profile Page",
    link: "/profile",
  },
];
