import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Grid, IconButton, Paper, Typography, Button, Box, TextField, Stack} from "@mui/material";
import TaAssignmentBox from "../components/taAsBox";
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

type ast_entry = {
    asmt_id:string,
    start_time: number,
    end_time: number,
    vmid:number,
    pdf_link: string
}

function CoursePage(){
    const navigate = useNavigate();
    let location  = useLocation();
    const entry_no = location.state.entry_no;
    const course_id=location.state.course_id;
    const role = location.state.role;
    const [ast_ids, setAst_ids] = useState<ast_entry[]>([]) ;
    const [loadAsmt, setLoadAsmt] = useState(false);
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const fetched = useRef(false);

    

    useEffect(()=>{
        fetch('/getAllAss/'+course_id).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    //course_boxes=[];
                    let temp = []
                    for (let i = 0; i<val.length; i++) {
                        temp.push(val[i]);
                    }
                    setAst_ids(temp);
                    console.log('fetched asses',val,fetched.current);
                    fetched.current=true;
                }
            }
            
        )
        }
    ,[loadAsmt]);

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {//may take to another page where the template VM is set
        e.preventDefault();
        const target = e.target as typeof e.target & {
        asmt_id: {value: string};
        pdf_link: {value: string};
        };
        axios.post('/createAss',{course_id:course_id, asmt_id: target.asmt_id.value,
        start_time:startTime.unix(), end_time: endTime.unix(), pdf_link: target.pdf_link.value}
        ).then(res =>{console.log(res); setLoadAsmt(!loadAsmt); fetched.current=false;})
      };

    function CreateAssignment(course_id:string){
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
            </Box>
        );
    }
    function redirect(ast_id:string){
        navigate('/AssignmentPage',{state:{entry_no:entry_no, role:role, course_id:course_id,ast_id:ast_id}});
    }
    function astBox(ast:ast_entry){
        //TODO - this must appear horizontal
        let yo = dayjs.unix(ast.start_time);//way to convert time since epoch to dayjs
        return  (<IconButton key={ast.asmt_id} onClick={()=>redirect(ast.asmt_id)}>
                    <Paper sx={{width:"100%"}}>
                        <Typography variant='h6'>{ast.asmt_id}</Typography>
                        <Typography variant="body2">{dayjs.unix(ast.start_time).toISOString()}</Typography>
                        <Typography variant="body2">{dayjs.unix(ast.end_time).toISOString()}</Typography>
                    </Paper>
                </IconButton>);
    }
    const addStudents = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('add student triggered')
        const target = e.target as typeof e.target & {
            entry_no: {value:string};
        };
        fetch('/setCourses/'+target.entry_no.value+'/Student/'+course_id)
        .then(res =>{
                if(res.status===201){
                   //show successful message
                }else{
                    console.log(res);
                }
            }
        );
    }
    const addTA = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('add student triggered')
        const target = e.target as typeof e.target & {
            entry_no: {value:string};
        };
        fetch('/setCourses/'+target.entry_no.value+'/TA/'+course_id)
        .then(res =>{
                if(res.status===201){
                   //show successful message
                }else{
                    console.log(res);
                }
            }
        );
    }


    return (
        <>
            { role!=='Student' &&
            <Grid item xs={4}>
                <Paper elevation={6} sx={{width:200, height:200, padding:1}}>
                <Box component="form" onSubmit={addStudents} noValidate textAlign={"center"} >
                    <TextField margin="normal" required fullWidth
                        id="entry_no" label="Entry No." autoFocus />
                    <br></br>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Add Student
                    </Button>
                </Box>
                </Paper>
            </Grid>
            }
            {role ==='Instructor' &&
            <Grid item xs={4}>
                <Paper elevation={6} sx={{width:200, height:200, padding:1}}>
                <Box component="form" onSubmit={addTA} noValidate textAlign={"center"} >
                    <TextField margin="normal" required fullWidth
                        id="entry_no" label="Entry No." autoFocus />
                    <br></br>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Add TA
                    </Button>
                </Box>
                </Paper>
            </Grid>
            }
            <Stack spacing={2}>
            {/*fetched.current && course_boxes*/
                ast_ids.map((ast) =>(astBox(ast)))
            }
            </Stack>
            {role!=='Student' && CreateAssignment(course_id)}
        </>

    );
}

export default CoursePage;