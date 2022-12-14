import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Link, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../components/config";

//TODO - differentiate the error types and provide detailed alert

export const SignUp = () => {
  const [fail, setFail] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState('Student');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      entry_no: { value: string };
      password: { value: string };
      password2: { value: string };
    };

    if (target.name.value === "") {
      setFail('Please enter name');
      setSuccess('');
      return;
    }

    if (target.entry_no.value === "") {
      setFail('Please enter entry no.');
      setSuccess('');
      return;
    }

    if (target.password.value !== target.password2.value) {
      setFail('Password mismatch retype password');
      setSuccess('');
      return;
    }

    axios.post(base_url+'/user/signup', {
      name: target.name.value, entry_no: target.entry_no.value, role: role,
      password: target.password.value
    }).then(res => {
      if (res.status === 201) {
        setFail('');
        setSuccess('Sign up successful')
        navigate('/', { state: { entry_no: target.entry_no.value, role: role } })
      }else{
        setFail('Sign up failed');
        setSuccess('');
      }
    }).catch(err => {
      console.log(err);
      setSuccess('');
      setFail('Sign up failed');
    });
  };

  return (
    <Container maxWidth="xs">
      <Box alignItems={"center"} display={"flex"} flexDirection={"column"} sx={{ mt: 10, boxShadow:2, padding:3 }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate textAlign={"center"} >
          <Select required fullWidth id="role" label='role' value={role} onChange={(e) => { setRole(e.target.value); }}>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="TA">TA</MenuItem>
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="entry_no"
            label="entry number"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password2"
            label="retype password"
            type="password"
          />
          <br></br>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Button onClick={()=>{navigate('/')}} style={{textTransform: 'none'}}>
              {"Go to sign in page"}
            </Button>
          </Grid>
        </Grid>
        {fail !== '' && <Alert severity="error">{fail}</Alert>}
        {success !== '' && <Alert severity="success">{success}</Alert>}
      </Box>
    </Container>
  );
};