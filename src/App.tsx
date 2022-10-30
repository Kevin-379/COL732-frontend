import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
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
      <Drawer variant="permanent">
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box textAlign={"center"} alignItems={"center"} display="flex" justifyContent={"center"} sx={{ mt: 2 }}>
            <LightMode fontSize={"small"} />
            <Switch onChange={(e) => setDarkMode(e.target.checked)}></Switch>
            <DarkMode fontSize={"small"} />
          </Box>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <Login></Login>
              Sign in
            </ListItemIcon>
          </ListItemButton>
          <Divider sx={{ my: 2 }} />
          <ListItemButton component={Link} to="/signout">
            <ListItemIcon>
              <Logout></Logout>
              Sign out
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>

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