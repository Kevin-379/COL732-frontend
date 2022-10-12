import { Box, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box bgcolor={"background.default"}>
          <Typography variant="h1">
            Hello, World2!
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
