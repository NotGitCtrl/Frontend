import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../../context/Context";
import DashboardWrapper from "../common/DashboardWrapper";
import { showUser } from "../../api/services/auth";
import { formatDate } from "../../utils/common-utils";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Profile = () => {
  // const { isLoggedIn } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await showUser();
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <DashboardWrapper>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  // height: 300,
                }}
              >
                {!loading && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <AccountCircle sx={{ fontSize: "100px" }} />
                        <Typography variant="h2" marginLeft={5}>
                          Profile
                        </Typography>
                      </Box>
                      <p>
                        <span style={{ fontWeight: "bold" }}>First Name: </span>
                        {user.firstName}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Last Name: </span>
                        {user.lastName}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Email: </span>
                        {user.email}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Mobile: </span>
                        {user.mobile}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Date Of Birth:{" "}
                        </span>
                        {formatDate(user.dob)}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Gender: </span>
                        {user.gender}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Role: </span>
                        {user.role.name}
                      </p>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {/* <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                 <Deposits /> 
              </Paper> */}
            </Grid>
            <Grid item xs={12}>
              {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                 <Orders /> 
              </Paper> */}
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </DashboardWrapper>
  );
};

export default Profile;
