import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  MenuItem,
  Select,
  Alert
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../components/config";

export const SignIn = () => {
  const [role,setRole] = useState('Student');
  const [fail, setFail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('login clicked');
    try{
      const target = e.target as typeof e.target & {
        entry_no: { value: string };
        password: { value: string };
      };
      axios.post(base_url+'/user/login',{entry_no:target.entry_no.value, role: role,
        password:target.password.value}).then(res =>{
          if(res.status === 201){
            console.log("Login successful");
            window.sessionStorage.setItem('token', res.data.token);
            window.sessionStorage.setItem('name', res.data.name);
            //console.log(res)
            window.sessionStorage.setItem('entry_no', target.entry_no.value);
            window.sessionStorage.setItem('role', role);
            setFail('');
            if(role=== 'Admin'){
              navigate('/Admin');
            }else{
                navigate('/Dashboard',{state:{entry_no:target.entry_no.value, role:role}})
            }
          }else{
            setFail("Record not found");
          }
        }).catch( err => {
          setFail("Record not found");
        })
    }catch(error){
      let result = (error as Error).message;
      // we'll proceed, but let's report it
      //TODO - this needs to be matured the error message must differentiate different scenarios
      setFail("Record not found\nSignUp as student");
    };
      
    
  };

  return (
    <Container maxWidth="xs">
      <Box alignItems={"center"} display={"flex"} flexDirection={"column"} sx={{ mt: 10, boxShadow:2, padding: 3 }}>
        <Typography component="h1" variant="h5" sx={{my:2}}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate textAlign={"center"} >
          <Select required fullWidth id="role" label='role' value={role} onChange={(e) => {setRole(e.target.value);}}>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="TA">TA</MenuItem>
            <MenuItem value="Instructor">Instructor</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>

          <TextField
            margin="normal"
            required
            fullWidth
            id="entry_no"
            label="Entry Number"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
          />
          
          <br></br>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Button onClick={()=>{navigate('/SignUp')}} style={{textTransform: 'none'}}>
              {"Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
        {fail!=='' && <Alert severity="error">{fail}</Alert>}
      </Box>
    </Container>
  );
};