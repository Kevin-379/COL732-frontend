import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, Button, Container
,FormControl, InputLabel, FormHelperText, MenuItem, Select, Alert } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import TaAssignmentBox from "../components/taAsBox";
import NavBar from "../components/NavBar";
import { base_url } from "../components/config";
function CreateAsmt(){
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    let location = useLocation();
    const entry_no = location.state.entry_no;
    const course_id=location.state.course_id;
    const role = location.state.role;
    const created = useRef(false);
    const token = window.sessionStorage.getItem('token');
    const [asmt_id, setAsmt_id] = useState('');
    const [ISO, setISO] = useState('');
    const [fail, setFail] = useState('');
    const [ISOs, setISOs] = useState<string[]>([]);
    const fetched = useRef(false);

    useEffect(() => {
        fetch(base_url+'/getISOs', { headers: { token: `${token}`, entry: `${entry_no}`, role: `${role}` } }).then(
          response => response.json()
        ).then(
          (val) => {
            if (!fetched.current) {
              let temp = []
              for (let i = 0; i < val.isos.length; i++) {
                temp.push(val.isos[i]);
              }
              setISOs(temp);
              fetched.current = true;
              console.log(ISOs);
            }
          }
    
        )
      },[])


    function selectISO(name: string){
        setISO(name);
        //also send it to the backend
    }
    const ISOnames = ISOs;
    const ISOvals = []
    for (let i = 0; i < ISOnames.length; i++) {
        ISOvals.push(<MenuItem key={ISOnames[i]} value={ISOnames[i]}>{ISOnames[i]}</MenuItem>);
    }

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {//may take to another page where the template VM is set
        e.preventDefault();
        const target = e.target as typeof e.target & {
        asmt_id: {value: string};
        asmt_name: {value: string};
        pdf_link: {value: string};
        };
        if(target.asmt_id.value === ''){
          setFail('Fill the assgnment id');
          return;
        }else if(target.asmt_name.value === ''){
          setFail('Fill the assignment name');
          return;
        }else if(target.pdf_link.value === ''){
          setFail('Fill the pdf_link');
          return;
        }else if(ISO===''){
          setFail('Pick an ISO');
          return;
        }
        axios.post(base_url+'/createAss',{course_id:course_id, asmt_id: target.asmt_id.value, asmt_name: target.asmt_name.value,
        start_time:startTime.unix(), end_time: endTime.unix(),iso:ISO, pdf_link: target.pdf_link.value}
        ,{headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}
        ).then(res =>{console.log(res); setAsmt_id(target.asmt_id.value); setFail('')})
        created.current = true;
      };


    return (
        <>
        <NavBar/>
        <Container>
        <Box>
        <Typography component="h3" variant="h4" sx={{my:1}}>
            <b>Create assignment</b>
        </Typography>
        <Box component="form" onSubmit={handleCreate} noValidate textAlign={"left"} >
            <TextField margin="normal" required fullWidth id="asmt_id" label="Assignment id"/>
            <TextField margin="normal" required fullWidth id="asmt_name" label="Assignment name"/>
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

            <Typography variant='body1'>Select ISO image</Typography>

                <FormControl required sx={{ m: 1, hieght:10,minWidth: 100 }} size="small">
                    <InputLabel id="ISO">ISO</InputLabel>
                    <Select labelId="ISO" id="ISO"
                    value={ISO} label="ISO"
                    onChange={(e) => {selectISO(e.target.value)}}>

                    {ISOvals}
                    
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
            <br></br>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} >
            Create Entry
            </Button>
            {fail!=='' && <Alert severity="error">{fail}</Alert>}
        </Box>
        {created.current && ISO!=='' &&
        <TaAssignmentBox course_id={course_id} entry_no={entry_no} role={role} asmt_id={asmt_id} iso={ISO}/>}
        </Box>
        </Container>
        </>
    );

}
export default CreateAsmt;