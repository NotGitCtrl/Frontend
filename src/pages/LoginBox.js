import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
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
      navigate("/dashboard/projects");
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
        <FormControl fullWidth size="small" sx={{ mt: 3 }}>
          <InputLabel id="demo-simple-select-label">{"Role"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
          >
            <MenuItem value={"super-admin"}>Super Admin</MenuItem>
            <MenuItem value={"ugc-admin"}>UGC Admin</MenuItem>
            <MenuItem value={"fa-admin"}>FA Admin</MenuItem>
            <MenuItem value={"hei-admin"}>HEI Admin</MenuItem>
            <MenuItem value={"hei-project-coordinator"}>
              HEI Project Coordinator
            </MenuItem>
            <MenuItem value={"fa-project-coordinator"}>
              FA Project Coordinator
            </MenuItem>
            <MenuItem value={"project-member"}>Project Member</MenuItem>
            <MenuItem value={"university-admin"}>University Admin</MenuItem>
            <MenuItem value={"hei-spoc"}>HEI SPOC</MenuItem>
          </Select>
        </FormControl>
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
          <Link href="#" to="forgot-password">
            Forgot password ?
          </Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="#" to="signup">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LoginBox;
