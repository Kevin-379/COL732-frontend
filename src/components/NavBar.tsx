import {
    AppBar,
    MenuItem,
    Button,
    Toolbar,
    Typography,
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
            <Button variant="outlined" color="inherit">
              <Home></Home>
              Home
            </Button>
          </MenuItem>
            }
          <MenuItem component={Link} to="/">
            <Button variant="outlined" color="inherit" onClick={()=>{window.sessionStorage.setItem('token','')}}>
              <Logout></Logout>
              <Typography> Sign Out </Typography>
              </Button>
          </MenuItem>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;