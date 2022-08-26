import React from "react";
import { Bar, Pie, Line, Scatter } from "react-chartjs-2";
import { UserData, FaData, HeiData, Stream } from "../utils/fakeData";
import { Chart as ChartJS } from "chart.js/auto";
import DashboardWrapper from "../Components/common/DashboardWrapper";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Analytics() {
  const [userData, setUserData] = React.useState({
    labels: UserData.map((data) => data.state),
    datasets: [
      {
        label: "Projects done in various states",
        data: UserData.map((data) => data.noOfProjects),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#820000",
          "#31087B",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });
  const [faData, setFaData] = React.useState({
    labels: FaData.map((data) => data.funding_agency),
    datasets: [
      {
        label: "Total Amount provided by various funding agencies",
        data: FaData.map((data) => data.total_amount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#820000",
          "#31087B",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });
  const [heiData, setHeiData] = React.useState({
    labels: HeiData.map((data) => data.HEI),
    datasets: [
      {
        label: "Projects Done in Various HEI's",
        data: HeiData.map((data) => data.No_of_projects),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#820000",
          "#31087B",
          "#f3ba2f",
          "#2a71d0",
          "FF7F3F",
        ],
      },
    ],
  });

  const [streamData, setStreamData] = React.useState({
    labels: Stream.map((data) => data.stream),
    datasets: [
      {
        label: "Projects Done in Various Streams",
        data: Stream.map((data) => data.noofProjects),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#820000",
          "#31087B",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });
  
  return (
    <DashboardWrapper>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2}></Grid>
          <Grid marginBottom={5} item xs={8}>
            <Bar data={userData}></Bar>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid marginBottom={5} item xs={8}>
            <Line data={faData}></Line>
          </Grid>
          <Grid item xs={2}></Grid>
          
          <Grid item xs={4}></Grid>
          <Grid marginBottom={5} item xs={4}>
          <Typography variant="h6">Projects Done in Various HEI's</Typography>
            <Pie data={heiData}></Pie>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={2}></Grid>
          <Grid marginBottom={5} item xs={8}>
            <Bar data={streamData}></Bar>
          </Grid>
          
          {/* <Grid item xs={6}>
            <Line data={userData}></Line>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: "50%", marginLeft: 10 }}>
              <Pie data={userData}></Pie>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Scatter data={userData}></Scatter>
          </Grid> */}
        </Grid>
      </Box>
    </DashboardWrapper>
  );
}

export default Analytics;
