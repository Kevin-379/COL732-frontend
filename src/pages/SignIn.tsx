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
  Alert
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

//TODO - make the role select instead of text

export const SignIn = () => {
  const [role,setRole] = useState('Student');
  const [fail, setFail] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const target = e.target as typeof e.target & {
        entry_no: { value: string };
        role: {value: string};
        password: { value: string };
      };
      //console.log(target.entry_no.value);
      axios.post('/user/login',{entry_no:target.entry_no.value, role: target.role.value,
        password:target.password.value}).then(res =>{
          if(res.status === 201){
            console.log("Login successful");
            //switchTab
            setFail('');
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
      <Box alignItems={"center"} display={"flex"} flexDirection={"column"} sx={{ mt: 10 }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate textAlign={"center"} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
          />
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
          <small>
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
          </small>
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
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        {fail!=='' && <Alert severity="error">{fail}</Alert>}
      </Box>
    </Container>
  );
};