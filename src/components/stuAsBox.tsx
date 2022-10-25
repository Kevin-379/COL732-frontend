import React,{ useState, useEffect} from 'react';
import axios from "axios";
import { Button, Typography, Paper, Grid, Box } from '@mui/material';
type Props = {
    entry_no: string,
    course_id: string,
    ass_id: string
}

function StudentAssignmentBox(props:Props){
    const [VMID, setVMID] = useState(-1);
    const [vm_state, setVm_state] = useState("UNKNOWN");
    const [ip, setIP] = useState("0.0.0.0");
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");
    useEffect(() => {
        fetch('/members/'+props.entry_no+'/'+props.course_id+'/'+props.ass_id).then(
            response =>response.json()
        ).then(
            val=>{
            setVMID(val.VMID)
            
          }
        )
    },[]);//the list contains the vars that are triggers
    function resumeVM(){
        if(VMID === -1){
            setErr("No VM available for this assignment, Get a VM");
        }else if(vm_state==="RUNNING"){
            setInfo("VM is running");
        }else{
            //call the backend to launch the VM, and getIP
            let success = true;
            let IP = "1.1.1.1";
            if(success){
                setVm_state("RUNNING");
                setIP(IP);
            }
        }
    }
    
    function pauseVM(){
        if(vm_state === "PAUSED"){
            setInfo("VM is not running");
        }else{
            //call the backend to pause the VM and snapshot
            setVm_state("PAUSED");
            axios({method: "GET", url: "/members"})
        }
    }
    function getVM(){
        if(VMID !== -1){
            setInfo("VM already assigned");
        }else if(vm_state==="RUNNING"){
            setInfo("vm is running");
        }else{
            //call backend to fork and return the ip
            let success = true;
            let IP = "1.1.1.1";
            if(success){
                setVm_state("RUNNING");
                setIP(IP);
                setVMID(1);
            }
        }
    }
    function disableResumeVM(){
        if(VMID!==-1){
            if(vm_state==='UNKNOWN'){
                return false;
            }else if(vm_state==='PAUSED'){
                return false;
            }
        }
        return true;
    }
    return (
        <Grid item xs={6}>
        <Paper elevation={3}>
            <Box padding={1}>
        <Typography variant='h5' component='h2'><b>Assignment details</b></Typography>
        <Box padding={1}>
        <Typography variant='h6' component='h3'>VM status: {vm_state}</Typography>
        <Button disabled={VMID!==-1} onClick={getVM} variant='contained' color='primary' sx={{m:1}} size="small">Get VM</Button>
        <Button disabled={vm_state!=="RUNNING"} onClick={pauseVM} variant='contained' color='primary' sx={{m:1}} size="small">Pause VM</Button>
        <Button disabled={disableResumeVM()} onClick={resumeVM} variant='contained' color='primary' sx={{m:1}} size="small">Resume VM</Button>
        {vm_state==="RUNNING" && 
        <div>
            <Typography variant='body1'><b>Use command on the terminal :</b> ssh aqweqeqwqw</Typography>
            <Typography variant='body1'><b>IP address :</b> {ip}</Typography>
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