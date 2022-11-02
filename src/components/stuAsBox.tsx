import React,{ useState, useEffect} from 'react';
import axios from "axios";
import { Button, Typography, Paper, Grid, Box } from '@mui/material';
import dayjs from 'dayjs';
type Props = {
    entry_no: string,
    course_id: string,
    asmt_id: string
}

function StudentAssignmentBox(props:Props){
    const [VMID, setVMID] = useState(-1);
    const [vm_state, setVm_state] = useState("UNKNOWN");
    const [ip, setIP] = useState("0.0.0.0");
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");
    const [password, setPassword] = useState("");
    const entry_no = String(window.sessionStorage.getItem('entry_no'));
    const token=window.sessionStorage.getItem('token');
    const role = window.sessionStorage.getItem('role');
    function resumeVM(){
        fetch('/resumeVM/'+entry_no+'/'+props.course_id+'/'+props.asmt_id,
        {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
        ).then(
            response =>response.json()
        ).then(
            (val) => {
                if(val.message==='resumed'){
                    setPassword(val.password);
                    setVm_state("RUNNING");
                }
            }
        );
    }
    
    function pauseVM(){
        if(vm_state === "PAUSED"){
            setInfo("VM is not running");
        }else{
            //call the backend to pause the VM and snapshot
            fetch('/pauseVM/'+entry_no+'/'+props.course_id+'/'+props.asmt_id,
            {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
            ).then(
                response =>response.json()
            ).then(
                (val) => {
                    console.log(val)
                    if(val.message==='paused'){
                        setPassword('');
                        setVm_state("PAUSED");
                    }
                }
            );
        }
    }
    function getVM(){
        if(vm_state==="RUNNING"){
            setInfo("vm is running");
        }else{
            //call backend to fork and return the ip
            fetch('/startTemplate/'+entry_no+'/'+props.course_id+'/'+props.asmt_id,
            {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
            ).then(
                response => response.json()
            ).then(
                (val) => {
                    if(val.message==='started'){
                        setPassword(val.password);
                        setVm_state("RUNNING");
                    }
                }
            );
        }
    }
    function submit(){
        console.log("On student submit ",props.asmt_id);
        axios.post('/studentSubmit',
        {entry_no:entry_no,course_id:props.course_id, asmt_id:props.asmt_id, time:dayjs().unix()},
        {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
        ).then((res) => {
            if(res.status!==201){
                console.log(res);
            }
        })
    }

    
    return (
        <Grid item xs={6}>
        <Paper elevation={3}>
            <Box padding={1}>
        <Typography variant='h5' component='h2'><b>Assignment details</b></Typography>
        <Box padding={1}>
        <Typography variant='h6' component='h3'>VM status: {vm_state}</Typography>
        <Button disabled={vm_state==="RUNNING"} onClick={getVM} variant='contained' color='primary' sx={{m:1}} size="small">Get VM</Button>
        <Button disabled={vm_state==="PAUSED"} onClick={pauseVM} variant='contained' color='primary' sx={{m:1}} size="small">Pause VM</Button>
        <Button disabled={vm_state==="RUNNING"} onClick={resumeVM} variant='contained' color='primary' sx={{m:1}} size="small">Resume VM</Button>
        <Button onClick={submit} variant='contained' color='primary' sx={{m:1}} size="small">Submit</Button>
        {vm_state==="RUNNING" && 
        <div>
            <Typography variant='body1'><b>Use command on the terminal :</b> ssh aqweqeqwqw</Typography>
            <Typography variant='body1'><b>IP address :</b> {ip}</Typography>
            <Typography variant='body1'><b>Password :</b> {password}</Typography>
        </div>
        }
        </Box>
        </Box>
        </Paper>
    </Grid>
    );
}
/*

        
        
*/
export default StudentAssignmentBox;