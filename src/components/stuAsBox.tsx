import React,{ useState, useEffect} from 'react';
//import axios from "axios";
import { Button, Typography, Paper, Grid, Box } from '@mui/material';
//import dayjs from 'dayjs';
import { base_url } from './config';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
type Props = {
    entry_no: string,
    course_id: string,
    asmt_id: string,
    iso:string,
    start_time:number,
    end_time:number,
    submitted:boolean,
    setSubmitted:(val: boolean) => void
}

function StudentAssignmentBox(props:Props){
    const navigate = useNavigate();
    const [VMID, setVMID] = useState(0);
    const [vm_state, setVm_state] = useState("PAUSED");
    ///const [ip, setIP] = useState("0.0.0.0");
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");
    const [password, setPassword] = useState("");
    const [remainingTime, setRemainingTime] = useState(props.end_time - dayjs().unix());
    const entry_no = String(window.sessionStorage.getItem('entry_no'));
    const token=window.sessionStorage.getItem('token');
    const role = window.sessionStorage.getItem('role');
    useEffect(()=>{
        fetch(base_url+'/getPrevVM/'+props.course_id+'/'+props.asmt_id+'/'+entry_no, 
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
        .then(res=>res.json())
        .then((val) => {
            if(val.message==='running'){
                setVMID(val.vmid);
                setPassword(val.password);
                setVm_state('RUNNING');
            }
            timeCheck();
        })
    },[])

    function timeCheck(){
        let now = dayjs().unix();
        if(now>props.end_time){
            navigate('/CoursePage',{state:{entry_no:props.entry_no, role:role, course_id:props.course_id}});
            return;
        }else{
            setRemainingTime(props.end_time - now);
            setTimeout(timeCheck, 1000);
        }
    }

    function resumeVM(){
        fetch(base_url+'/resumeVM/'+entry_no+'/'+props.course_id+'/'+props.asmt_id+'/'+props.iso,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}
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
            fetch(base_url+'/pauseVM/'+entry_no+'/'+props.course_id+'/'+props.asmt_id,
            {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}
            ).then(
                response =>response.json()
            ).then(
                (val) => {
                    //console.log(val)
                    if(val.message==='paused'){
                        setPassword('');
                        setVm_state("PAUSED");
                    }
                }
            );
        }
    }
    function startFresh(){
        fetch(base_url+'/startFresh/'+entry_no+'/'+props.course_id+'/'+props.asmt_id+'/'+props.iso,
            {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}
            ).then(
                response => response.json()
            ).then(
                (val) => {
                    if(val.message==='started'){
                        setPassword(val.password);
                        setVm_state("RUNNING");
                        setVMID(val.vmid);
                    }
                }
            );
    }
    function getVM(){
        if(vm_state==="RUNNING"){
            setInfo("vm is running");
        }else{
            //call backend to fork and return the ip
            fetch(base_url+'/startTemplate/'+entry_no+'/'+props.course_id+'/'+props.asmt_id+'/'+props.iso,
            {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}
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
        fetch(base_url+'/submitAsmt/'+props.course_id+'/'+props.asmt_id+'/'+entry_no+'/'+VMID,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}});
        props.setSubmitted(!props.submitted);
        props.setSubmitted(!props.submitted);
    }

    
    return (
        <Grid item xs={12}>
        <Paper elevation={3} sx={{m:1}}>
            <Box padding={1}>
        <Typography variant='h5' component='h2'><b>VM manager</b></Typography>
        <Typography variant='body1' sx={{m:1}}>
            Time remaining: {(remainingTime / 3600) >> 0}:{((remainingTime % 3600)/60)>>0}:{remainingTime%60}
        </Typography>
        <Box padding={1}>
        <Typography variant='h6' component='h3'>VM status: {vm_state}</Typography>
        <Button disabled={vm_state==="RUNNING"} onClick={startFresh} variant='contained' color='primary' sx={{m:1}} size="small">Start ISO</Button>
        <Button disabled={true || vm_state==="RUNNING"} onClick={getVM} variant='contained' color='primary' sx={{m:1}} size="small">Start template VM</Button>
        <Button disabled={true || vm_state==="PAUSED"} onClick={pauseVM} variant='contained' color='primary' sx={{m:1}} size="small">Stop VM</Button>
        <Button disabled={true || vm_state==="RUNNING"} onClick={resumeVM} variant='contained' color='primary' sx={{m:1}} size="small">Resume VM</Button>
        <Button disabled={false} onClick={submit} variant='contained' color='primary' sx={{m:1}} size="small">Submit</Button>
        {vm_state==="RUNNING" && 
        <div>
            <Typography variant='body1'>ssh into the dkstra using col732_all@dkstra.cse.iitd.ac.in, password: col732_all</Typography>
            <br></br>
            <Typography variant='body1'><b>Use command on dkstra :</b> ssh {entry_no}@192.168.{200+VMID}.2</Typography>
            {/*<Typography variant='body1'><b>IP address :</b> {ip}</Typography>*/}
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