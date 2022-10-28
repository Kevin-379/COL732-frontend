import { Navigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import axios from "axios";
import TaAssignmentBox from "../components/taAsBox";

function CreateAsmt(){
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    let location = useLocation();
    const entry_no = location.state.entry_no;
    const course_id=location.state.course_id;
    const role = location.state.role;
    const created = useRef(false);
    const [asmt_id, setAsmt_id] = useState('');
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {//may take to another page where the template VM is set
        e.preventDefault();
        const target = e.target as typeof e.target & {
        asmt_id: {value: string};
        pdf_link: {value: string};
        };
        axios.post('/createAss',{course_id:course_id, asmt_id: target.asmt_id.value,
        start_time:startTime.unix(), end_time: endTime.unix(), pdf_link: target.pdf_link.value}
        ).then(res =>{console.log(res); setAsmt_id(target.asmt_id.value);})
        created.current = true;
      };


    return (
        <Box>
        <Typography component="h3" variant="h5">
            Create assignment
        </Typography>
        <Box component="form" onSubmit={handleCreate} noValidate textAlign={"center"} >
            <TextField margin="normal" required fullWidth id="asmt_id" label="Assignment id"/>
            <TextField margin="normal" required fullWidth id="pdf_link" label="pdf_link"/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(e) =>{if (e!==null) {setStartTime(e)}}}
                renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(e) =>{if (e!==null) {setEndTime(e)}}}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <br></br>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} >
            Create Assignment
            </Button>
        </Box>
        {created.current && <TaAssignmentBox course_id={course_id} entry_no={entry_no} role={role} asmt_id={asmt_id}/>}
        </Box>
        
    );

}
export default CreateAsmt;