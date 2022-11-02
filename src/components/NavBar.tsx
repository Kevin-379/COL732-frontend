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
            <Button variant="outlined" color="inherit" style={{textTransform: 'none'}}>
              <Home></Home>
              <Typography margin={0.5}> Home </Typography>
            </Button>
          </MenuItem>
            }
          <MenuItem component={Link} to="/">
            <Button variant="outlined" color="inherit" style={{textTransform: 'none'}} onClick={()=>{window.sessionStorage.setItem('token','')}}>
              <Logout></Logout>
              <Typography  margin={0.5}> Sign Out </Typography>
            </Button>
          </MenuItem>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar;