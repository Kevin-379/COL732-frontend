/*
    Admin can add the instructor
*/
import axios from 'axios';
import {Container, Box, Typography, TextField, Button, Grid, Link, Alert} from '@mui/material';
import { useState } from 'react';
import NavBar from '../components/NavBar';

function Admin(){
    const [fail,setFail] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      const target = e.target as typeof e.target & {
        name: { value: string};
        entry_no: { value: string };
        password: { value: string};
        password2: { value: string};
      };
      if(target.password.value === target.password2.value){
        axios.post('/user/signup',{name:target.name.value, entry_no:target.entry_no.value, role: 'Instructor',
          password:target.password.value}).then(res =>{
            console.log(res);
            if(res.status === 201){
              setFail('');
              setSuccess('Sign up successful')
            }else{
              setFail('Sign up failed');
              setSuccess('');
            }
          }).catch(err => {console.log(err);
            setSuccess('');
            setFail('Sign up failed');
          });
      }else{
        setFail('Password mismatch retype password');
        setSuccess('');
      }
    };

    return (
      <>
      <NavBar/>
        <Container maxWidth="xs">
      <Box alignItems={"center"} display={"flex"} flexDirection={"column"} sx={{ mt: 10 }}>
        <Typography component="h1" variant="h5">
          Register Instructor
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate textAlign={"center"} >
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
            Create Entry
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link href="/" variant="body2">
              {"Go to sign in page"}
            </Link>
          </Grid>
        </Grid>

        {fail!=='' && <Alert severity="error">{fail}</Alert>}
        {success!=='' && <Alert severity="success">{success}</Alert>}
      </Box>
    </Container>
    </>
    );
}

export default Admin;