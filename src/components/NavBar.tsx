import {
    AppBar,
    MenuItem,
    Button,
    Toolbar,
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
  function clearSession(){
    window.sessionStorage.setItem('token','');
    window.sessionStorage.setItem('entry_no','');
    window.sessionStorage.setItem('role','');
  }
    return (
      <AppBar position="static" >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'right',
            justifyContent: 'right',
          }}
        >
            { window.location.pathname !=='/Admin' &&
          <MenuItem component={Link} to="/Dashboard">
              <Home></Home>
              Home
          </MenuItem>
            }
          <MenuItem component={Link} to="/">
            <Button variant="outlined" color="info" onClick={clearSession}>
            <Logout></Logout>
            Sign out
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