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
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [project, setProject] = useState({});

  const fetchProjectDetails = async (id) => {
    const response = await getProjectDetails(id);
    if (response.status === "success") {
      setProject(response.data);
      console.log(response)
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
      <Box sx={{ width: "100%", bgcolor: "background.paper", padding: "20px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("Project Details")} {...a11yProps(0)} />
            <Tab label={t("Phase")} {...a11yProps(1)} />
            <Tab label={t("Report")} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {project.name && (
            <>
              <Grid width="50%" sm={8}>
                <Typography gutterBottom variant={"h4"}>
                  {" "}
                  {project.name}
                </Typography>
              </Grid>
              <Grid sm={4}>
                <Chip
                  label={project.category}
                  color="success"
                  variant="outlined"
                />
              </Grid>

              <Typography gutterBottom variant={"h6"}>
                Description
              </Typography>
              <Typography gutterBottom variant={"body1"}>
                {project.description}
              </Typography>
              
              
              <Typography variant="h6">
                HEI: {project.hei.name}
              </Typography>
              {/* <Typography variant={"h6"}>
                Created By:{" "}
                {project.createdBy.firstName + " " + project.createdBy.lastName}
              </Typography> */}
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
