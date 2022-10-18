import { Box, CssBaseline, Switch, ThemeProvider, ToggleButton } from "@mui/material";
import { SignIn } from "./pages/SignIn";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = (darkMode ? darkTheme: lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box textAlign={"center"} alignItems={"center"} display="flex" justifyContent={"center"} sx={{ mt: 2 }}>
        <LightMode fontSize={"small"} />
        <Switch onChange={(e) => setDarkMode(e.target.checked)}></Switch>
        <DarkMode fontSize={"small"} />
      </Box>
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
