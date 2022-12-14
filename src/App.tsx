import {
  CssBaseline,
  ThemeProvider,
  Switch, Box, Paper
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import  Admin from './pages/Admin';
import {HashRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import StudentAssignmentPage from "./pages/StudentAssignmentPage";
import CoursePage from "./pages/CoursePage";
import CreateAsmt from "./pages/CreateAsmt";
import ViewMembers from "./pages/ViewMembers";
import ManageAssignmentPage from "./pages/ManageAssignmentPage";
import ChangePassword from "./pages/ChangePassword";
import EditAsmt from "./pages/EditAssignment";
function App() {
  // currently the theme is not changing
  const [darkMode, setDarkMode] = useState(false);
  const theme = (darkMode ? darkTheme : lightTheme);
  
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <HashRouter>
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
          <Route path='/ChangePassword' element={<ChangePassword/>}/>
          <Route path='/EditAsmt' element={<EditAsmt/>}/>
        </Routes>
      </HashRouter>
      {
      <Paper sx={{m:2, height:'50px'}} elevation={0}>

      </Paper>
      }
      <Box sx={{position: 'fixed', bottom:'5px', left:'10px' , height:'50px', width:'150px'}}>
      <LightMode fontSize={"small"} />
          <Switch onChange={(e) => setDarkMode(e.target.checked)}></Switch>
      <DarkMode fontSize={"small"} />
      </Box>
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