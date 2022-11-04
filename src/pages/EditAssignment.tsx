import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import TaAssignmentBox from "../components/taAsBox";
import NavBar from "../components/NavBar";


function EditAsmt(){
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [pdf, setPdf] = useState('');
    const [asmt_name, setAsmtName] = useState('');
    let location = useLocation();
    const course_id=location.state.course_id;
    const asmt_id = location.state.asmt_id;
    const role = String(window.sessionStorage.getItem('role'));
    const entry_no = String(window.sessionStorage.getItem('entry_no'));
    const fetched = useRef(false);
    const token = window.sessionStorage.getItem('token');

    //fetch the assignment details we wont allow the changing of assignment id

    useEffect(()=>{
        fetch('/getAss/'+course_id+'/'+asmt_id,
         {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    //course_boxes=[];
                    setStartTime(dayjs.unix(val.start_time));
                    setEndTime(dayjs.unix(val.end_time));
                    setPdf(val.pdf_link);
                    setAsmtName(val.asmt_name);
                    console.log('asmt_name', val.asmt_name);
                    console.log('fetched asmt',val,fetched.current);
                    fetched.current=true;
                }
            }
        )
        }
    ,[]);

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {//may take to another page where the template VM is set
        e.preventDefault();
        const target = e.target as typeof e.target & {
            asmt_name: {value: string};
            pdf_link: {value: string};
        };
        axios.post('/updateAss',{course_id:course_id, asmt_id: asmt_id,asmt_name:target.asmt_name.value,
        start_time:startTime.unix(), end_time: endTime.unix(), pdf_link: target.pdf_link.value}
        ,{headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
        ).then(res =>{console.log(res);})
      };


    return (
        <>
        <NavBar/>
        <Container>
        <Box>
        <Typography component="h3" variant="h4" sx={{my:1}}>
            <b>Edit assignment</b>
        </Typography>
        <Box component="form" onSubmit={handleEdit} noValidate textAlign={"left"} >
            <div key={pdf}>
            <TextField margin="normal" required fullWidth id="asmt_name" label="Assignment name" defaultValue={asmt_name}/>
            <TextField margin="normal" required fullWidth id="pdf_link" label="PDF Link" defaultValue={pdf}/>
            </div>
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
            Edit Entry
            </Button>
        </Box>
        {<TaAssignmentBox course_id={course_id} entry_no={entry_no} role={role} asmt_id={asmt_id}/>}
        </Box>
        </Container>
        </>
    );

}
export default EditAsmt;