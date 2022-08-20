import SchemaIcon from "@mui/icons-material/Schema";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";

export default [
  {
    id: 1,
    icon: <SchemaIcon />,
    title: "Schemes",
    link: "/dashboard/schemes",
  },
  {
    id: 2,
    icon: <AccountTreeIcon />,
    title: "Projects",
    link: "/dashboard/projects",
  },
  {
    id: 3,
    icon: <SchemaIcon />,
    title: "Coordinators",
    link: "/dashboard/coordinators",
  },
  {
    id: 4,
    icon: <ReceiptLongIcon />,
    title: "Transactions",
    link: "/dashboard/transactions",
  },
  {
    id: 5,
    icon: <ShowChartIcon />,
    title: "Analytics",
    link: "/dashboard/analytics",
  },
  {
    id: 6,
    icon: <WorkspacePremiumIcon />,
    title: "HEI List",
    link: "/hei-list",
  },
  {
    id: 7,
    icon: <PersonIcon />,
    title: "Profile Page",
    link: "/profile",
  },
];
