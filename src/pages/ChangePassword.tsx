


import {
    Alert,
    Box,
    Button,
    Container,
    TextField,
    Typography
  } from "@mui/material";
  import axios from "axios";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
  

function ChangePassword(){
    const [fail, setFail] = useState('');
    const [success, setSuccess] = useState('');
    const entry_no = String(window.sessionStorage.getItem('entry_no'));
    const role = String(window.sessionStorage.getItem('role'));
    const token = window.sessionStorage.getItem('token')
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        prev_password: {value: string};
        password: { value: string };
        password2: { value: string };
      };
  
      if (target.password.value !== target.password2.value) {
        setFail('Password mismatch, retype password');
        setSuccess('');
        return;
      }
      
      axios.post('/user/changePassword', {
        entry_no: entry_no, role: role,
        prev_password: target.prev_password.value, new_password: target.password.value
      },{headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
      ).then(res => {
        console.log(res);
        if (res.status === 201) {
          setFail('');
          setSuccess('Change password successful');
        }else{
            setFail('Change password failed');
            setSuccess('');
        }
      }).catch(err => {
        console.log(err);
        setSuccess('');
        setFail('Sign up failed');
      });
    };
  
    return (
    <>
    <NavBar/>
      <Container maxWidth="xs">
        <Box alignItems={"center"} display={"flex"} flexDirection={"column"} sx={{ mt: 10 }}>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate textAlign={"center"} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="prev_password"
              label="Previos password"
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="new password"
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password2"
              label="retype new password"
              type="password"
            />
            <br></br>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change password
            </Button>
          </Box>
          
          {fail !== '' && <Alert severity="error">{fail}</Alert>}
          {success !== '' && <Alert severity="success">{success}</Alert>}
        </Box>
      </Container>
      </>
    );
}

export default ChangePassword;