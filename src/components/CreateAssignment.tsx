import React,{ useState} from 'react';
import axios from "axios";
import { Typography, Box, Button, Container, TextField, FormControlLabel} from '@mui/material';
import { base_url } from './config';

type Props = {
    course_id:string
}
function CreateAssignment(props:Props){
  const [fail, setFail] = useState('');
  const course_id = props.course_id;
  const entry_no = window.sessionStorage.getItem('entry_no');
  const role = window.sessionStorage.getItem('role');
  const token = window.sessionStorage.getItem('token');
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
    asmt_id: {value: string};
    start_time: { value: number };
    end_time: {value:number};
    pdf_link: {value: string};
    };
    axios.post(base_url+'/createAss',{course_id:course_id, asmt_id: target.asmt_id.value,
    start_time:target.start_time.value, end_time: target.end_time.value, pdf_link: target.pdf_link.value},
    {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}
    ).then(res =>{console.log(res)})
  };

  return (
      <Box>
        <Typography component="h3" variant="h5">
          Create assignment
        </Typography>
        <Box component="form" onSubmit={handleCreate} noValidate textAlign={"center"} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="asmt_id"
            label="Assignment id"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="start_time"
            label="Start Time"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="end_time"
            label="End Time"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="pdf_link"
            label="pdf_link"
          />
          <br></br>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Assignment
          </Button>
        </Box>
      </Box>
  );
}

export default CreateAssignment;