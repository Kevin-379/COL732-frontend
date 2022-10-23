import { Box, CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { SignIn } from "./pages/SignIn";
import { CoursePage } from "./pages/CoursePage";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = (darkMode ? darkTheme : lightTheme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box textAlign={"center"} alignItems={"center"} display="flex" justifyContent={"center"} sx={{ mt: 2 }}>
          <LightMode fontSize={"small"} />
          <Switch onChange={(e) => setDarkMode(e.target.checked)}></Switch>
          <DarkMode fontSize={"small"} />
        </Box>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="*" element={<Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          ><h1>ERROR: Page Not Found</h1></Box>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
