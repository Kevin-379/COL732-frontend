import {
    AppBar,
    MenuItem,
    Button,
    Toolbar,
  } from "@mui/material";
  import { Logout, Home } from "@mui/icons-material";

  import {Link} from 'react-router-dom'

function NavBar(){
    return (
        <AppBar position="static" >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
            { window.location.pathname !=='/Admin' &&
          <MenuItem component={Link} to="/Dashboard">
              <Home></Home>
              Home
          </MenuItem>
            }
          <MenuItem component={Link} to="/">
            <Button variant="outlined" color="info" onClick={()=>{window.sessionStorage.setItem('token','')}}>
              <Logout></Logout>
              Sign out
              </Button>
          </MenuItem>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;