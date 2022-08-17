import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PaidIcon from "@mui/icons-material/Paid";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SchemaIcon from "@mui/icons-material/Schema";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";

export default [
  {
    id: 1,
    icon: <WorkspacePremiumIcon />,
    title: "HEI",
    link: "/admin/hei",
  },
  {
    id: 2,
    icon: <PaidIcon />,
    title: "Funding Agency",
    link: "/admin/fa",
  },
  {
    id: 3,
    icon: <AccountTreeIcon />,
    title: "Projects",
    link: "/dashboard/projects",
  },
  {
    id: 4,
    icon: <ReceiptLongIcon />,
    title: "Transactions",
    link: "/dashboard/transactions",
  },
  {
    id: 5,
    icon: <SchemaIcon />,
    title: "Schemes",
    link: "/dashboard/schemes",
  },
  {
    id: 6,
    icon: <SchemaIcon />,
    title: "Coordinators",
    link: "/dashboard/schemes",
  },
  {
    id: 7,
    icon: <ShowChartIcon />,
    title: "Analytics",
    link: "/dashboard/schemes",
  },
  {
    id: 8,
    icon: <PersonIcon />,
    title: "Profile Page",
    link: "/dashboard/schemes",
  },
];
