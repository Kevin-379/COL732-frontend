import { Box, CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import  Admin from './pages/Admin';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dash_board from './pages/dashboard';
import AssignmentPage from "./pages/AssignmentPage";
import AssignmentList from "./pages/coursePage";
import CoursePage from "./pages/coursePage";
import CreateAsmt from "./pages/createAsmt";
import ViewMembers from "./pages/viewMembers";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = (darkMode ? darkTheme: lightTheme);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/AssignmentPage' element={<AssignmentPage/>}/>
        <Route path='/Dash_board' element={<Dash_board/>}/>
        <Route path='/CoursePage' element={<CoursePage/>}/>
        <Route path='/CreateAsmt' element={<CreateAsmt/>}/>
        <Route path='/viewMembers' element={<ViewMembers/>}/>
      </Routes>
    </BrowserRouter>
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
      <SignIn />
    </ThemeProvider>
    */