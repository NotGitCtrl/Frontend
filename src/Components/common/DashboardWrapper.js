import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import DrawerComponent from "./DrawerComponent";
import AppBarComponent from "./AppBarComponent";

const mdTheme = createTheme();

export default function DashboardWrapper({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        <DrawerComponent
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
