import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import { setStorage } from "../utils/localstorage-utils";
import { AppContext } from "../context/Context";
import { loginUser } from "../api/services/auth";

const LoginBox = () => {
  const { setIsLoggedIn, setRole } = React.useContext(AppContext);
  const navigate = useNavigate();
  const paperStyle = {
    padding: 30,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = await loginUser(loginData);
    if (response.token) {
      setStorage("user_token", response.token);
      setIsLoggedIn(true);
      setRole(response.data.role);
      setStorage("role", response.data.role);
      setStorage("firstName", response.data.firstName);
      setStorage("lastName", response.data.lastName);
      navigate("/profile");
    }
  };
  return (
    <Paper elevation={10} style={paperStyle}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Email"
          name="email"
          fullWidth
          required
          variant="standard"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          variant="standard"
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" />}
          label="Remember me"
          color="#fff"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LoginBox;
