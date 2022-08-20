import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListPhases from "./ListPhases";
import ListReports from "./ListReports";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../api/services/projects";
import { useEffect, useState } from "react";
import DashboardWrapper from "../Components/common/DashboardWrapper";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProjectDetail() {
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [project, setProject] = useState({});

  const fetchProjectDetails = async (id) => {
    const response = await getProjectDetails(id);
    if (response.status === "success") {
      setProject(response.data);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchProjectDetails(id);
  }, [id]);

  return (
    <DashboardWrapper>
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          // orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Project Details" {...a11yProps(0)} />
          <Tab label="Phases" {...a11yProps(1)} />
          <Tab label="Reports" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {project.name && (
          <>
            <Typography variant="h4">Project Details:</Typography>
            <Typography variant={"h6"}>Name: {project.name}</Typography>
            <Typography variant={"h6"}>
              Description: {project.description}
            </Typography>
            <Typography variant={"h6"}>Category: {project.category}</Typography>
            <Typography variant={"h6"}>
              Scheme: {project.scheme.name}
            </Typography>
            <Typography variant={"h6"}>
              Funding Agency: {project.fundingAgency.name}
            </Typography>
            <Typography variant="h6">
              HEI: {project.hei.map((hei) => hei.name)}
            </Typography>
            <Typography variant={"h6"}>
              Created By:{" "}
              {project.createdBy.firstName + " " + project.createdBy.lastName}
            </Typography>
          </>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListPhases />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ListReports />
      </TabPanel>
    </Box>
    </DashboardWrapper>
  );
}
