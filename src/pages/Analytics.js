import React from "react";
import { Bar, Pie, Line, Scatter } from "react-chartjs-2";
import { UserData } from "../utils/fakeData";
import { Chart as ChartJS } from "chart.js/auto";
import DashboardWrapper from "../Components/common/DashboardWrapper";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
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
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Projects Assigned",
        data: UserData.map((data) => data.userGain),
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
          <Grid item xs={6}>
            <Bar data={userData}></Bar>
          </Grid>
          <Grid item xs={6}>
            <Line data={userData}></Line>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: "50%", marginLeft: 10 }}>
              <Pie data={userData}></Pie>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Scatter data={userData}></Scatter>
          </Grid>
        </Grid>
      </Box>
    </DashboardWrapper>
  );
}

export default Analytics;
