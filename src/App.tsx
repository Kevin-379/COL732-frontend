import { Box, CssBaseline, ThemeProvider, ToggleButton } from "@mui/material";
import { SignIn } from "./pages/SignIn";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [lightMode, setLightMode] = useState(true);
  const icon = lightMode ? <LightMode /> : <DarkMode />;
  const theme = (lightMode ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box textAlign={"center"} sx={{ mt: 2 }}>
        <ToggleButton value="Theme" onChange={() => setLightMode(!lightMode)}>
          {icon}
        </ToggleButton>
        <br />
        Toggle Theme
      </Box>
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
