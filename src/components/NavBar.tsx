import {
    AppBar,
    MenuItem,
    Button,
    Toolbar,
    Typography,
    Box
  } from "@mui/material";
  import { Logout, Home } from "@mui/icons-material";

  import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from "react";

function NavBar(){
  const navigate = useNavigate();
  useEffect(() => {
    if(window.sessionStorage.getItem('token') === ''){
      navigate('/')
    }
  })

  const entry_no = window.sessionStorage.getItem('entry_no');
  const role = window.sessionStorage.getItem('role');
  const name = window.sessionStorage.getItem('name');
  function clearSession(){
    window.sessionStorage.setItem('token','');
    window.sessionStorage.setItem('entry_no','');
    window.sessionStorage.setItem('role','');
    window.sessionStorage.setItem('name','')
  }
    return (
      <AppBar position="static" >
        
        <Toolbar
          sx={{
            display: 'flex'
          }}
        >
          <Box display='flex' flexGrow={1}>
          <Typography sx={{alignItems:'left'}}><b>Name : {name} &nbsp; &nbsp; Entry No : {entry_no}</b></Typography>
          </Box>
          
            { window.location.pathname !=='/Admin' &&
          <MenuItem component={Link} sx={{alignItems:'right'}} to="/Dashboard">
            <Button variant="outlined" color="inherit" style={{textTransform: 'none'}}>
              <Home></Home>
              <Typography margin={0.5}> Home </Typography>
            </Button>
          </MenuItem>
            }
          <MenuItem component={Link} to="/">
            <Button variant="outlined" style={{textTransform: 'none'}} color="inherit" onClick={clearSession}>
            <Logout></Logout>
            <Typography  margin={0.5}> Sign Out </Typography>
            </Button>
          </MenuItem>
          <MenuItem component={Link} to="/ChangePassword">
              Change password
          </MenuItem>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;