import { Box, TextField, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import axios from "axios";

const OtpInput = () => {
  const { t } = useTranslation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const otpData = {
      userId: localStorage.getItem("userId"),
      otp: data.get("otp"),
    };
    // axios
    //   .post("http://localhost:5000/auth/verifyOTP", otpData)
    //   .then((response) => console.log(response))
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //   });
  };

  const handleResend = (event) => {
    event.preventDefault();
    const resendData = {
      userId: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
    };
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField required id="otp" label={t("Enter OTP")} name="otp" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t("Verify OTP")}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleResend}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("Resend OTP")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OtpInput;
