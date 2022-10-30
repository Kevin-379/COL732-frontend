import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  SwipeableDrawer,
  Switch,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { DarkMode, LightMode, Login, Logout } from "@mui/icons-material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import  Admin from './pages/Admin';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import StudentAssignmentPage from "./pages/StudentAssignmentPage";
import CoursePage from "./pages/CoursePage";
import CreateAsmt from "./pages/CreateAsmt";
import ViewMembers from "./pages/ViewMembers";
import ManageAssignmentPage from "./pages/ManageAssignmentPage";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = (darkMode ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
      <AppBar position="static" >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
 {/* textAlign={"center"} alignItems={"center"} display="flex" justifyContent={"center"} sx={{ mt: 2 }} */}
           <MenuItem>
            <LightMode fontSize={"small"} />
            <Switch onChange={(e) => setDarkMode(e.target.checked)}></Switch>
            <DarkMode fontSize={"small"} />
          </MenuItem>
          <MenuItem component={Link} to="/">
              <Login></Login>
              Sign in
          </MenuItem>
          <MenuItem component={Link} to="/signout">
              <Logout></Logout>
              Sign out
          </MenuItem>
        </Toolbar>
      </AppBar>

        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/StudentAssignmentPage' element={<StudentAssignmentPage/>}/>
          <Route path='/ManageAssignmentPage' element={<ManageAssignmentPage/>}/>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/CoursePage' element={<CoursePage />} />
          <Route path='/CreateAsmt' element={<CreateAsmt />} />
          <Route path='/viewMembers' element={<ViewMembers />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
/*

<ThemeProvider theme={theme}>
      <CssBaseline />
      <Box textAlign={"center"} alignItems={"center"} display="flex" justifyContent={"center"} sx={{ mt: 2 }}>
        <LightMode fontSize={"small"} />
        <Switch onChange={(e) => setDarkMode(e.target.checked)}></Switch>
        <DarkMode fontSize={"small"} />

        </Box>
      </ThemeProvider>
    
*/