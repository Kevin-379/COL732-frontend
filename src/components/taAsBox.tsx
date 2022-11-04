import React,{ useState, useRef, useEffect} from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Box, Button, Select, FormControl, FormHelperText, InputLabel, MenuItem} from '@mui/material';
import {PlayArrow, FileUpload, Stop, Save, RestartAlt} from '@mui/icons-material';

type Props = {
    course_id:string,
    asmt_id:string,
    role:string,
    entry_no:string
}

function TaAssignmentBox(props:Props){
   const [VMID,setVMID] = useState(-1);
   const [VMstate, setVMstate] = useState('ASSIGNED');
   const [ISO, setISO] = useState('');
   const [ISOs, setISOs] = useState<string[]>([]);
   const entry_no = String(window.sessionStorage.getItem('entry_no'));
   const role = String(window.sessionStorage.getItem('role'));
   const token = window.sessionStorage.getItem('token');
   const fetched = useRef(false);
   const [password, setPassword] = useState("");

   useEffect(() => {
    fetch('/getISOs', { headers: { token: `${token}`, entry_no: `${entry_no}`, role: `${role}` } }).then(
      response => response.json()
    ).then(
      (val) => {
        if (!fetched.current) {
          let temp = []
          for (let i = 0; i < val.length; i++) {
            temp.push(val[i].ISO);
          }
          setISOs(temp);
          fetched.current = true;
        }
      }

    )
  },[])

    function resumeTemplate(){
        fetch('/startTemplate/'+entry_no+'/'+props.course_id+'/'+props.asmt_id,
            {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
            ).then(
                response => response.json()
            ).then(
                (val) => {
                    if(val.message==='started'){
                        setPassword(val.password);
                        setVMstate("RUNNING");
                    }
                }
            );
    }
    function saveVM(){
        fetch('/saveTemplate/'+props.entry_no+'/'+props.course_id+'/'+props.asmt_id,
        {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
        ).then(
            response =>response.json()
        ).then(
            (val) => {
                console.log(val)
                if(val.message==='paused'){
                    setPassword('');
                    setVMstate("PAUSED");
                }
            }
        );
        setVMstate("SAVED");
    }

    function startFresh(){
        fetch('/startFresh/'+entry_no+'/'+props.course_id+'/'+props.asmt_id,
            {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}
            ).then(
                response => response.json()
            ).then(
                (val) => {
                    if(val.message==='started'){
                        setPassword(val.password);
                        setVMID(val.vmid);
                        setVMstate("RUNNING");
                    }
                }
            );        
    }

    function selectISO(name: string){
        setISO(name);
        //also send it to the backend
    }
    const ISOnames = ISOs;
    const ISOvals = []
    for (let i = 0; i < ISOnames.length; i++) {
        ISOvals.push(<MenuItem key={ISOnames[i]} value={ISOnames[i]}>{ISOnames[i]}</MenuItem>);
    }
    //let ISOFile = null;
    //variant is how the typography looks like
    //component is the actual tag that will be used Careful
    return (
        <Grid item xs={6}>
        <Paper elevation={3}>
            <Box padding={1}>
            <Typography variant='h5' component='h2'>Setup template VM</Typography>
            <Typography variant='body1'>This is optional, you can do this later also.</Typography>
            <Box padding={1}>
            <br></br>
            <Typography variant='body1'>Select ISO image</Typography>

            <FormControl required sx={{ m: 1, hieght:10,minWidth: 100 }} size="small">
                <InputLabel id="ISO">ISO</InputLabel>
                <Select
                labelId="ISO"
                id="ISO"
                value={ISO}
                label="ISO"
                onChange={(e) => {selectISO(e.target.value)}}
                >
                {ISOvals}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
            
            <br></br>
            <Button disabled={VMstate==='RUNNING' || ISO===''} variant='contained' color='primary' startIcon={<PlayArrow/>} onClick={startFresh} sx={{m:1}} size="small">
                Start ISO
            </Button>
            <Button disabled={VMstate==="RUNNING" || ISO===''} variant='contained' color='primary' onClick={resumeTemplate} startIcon={<RestartAlt/>} sx={{m:1}} size="small">
                Resume Template
            </Button>
            <Button disabled={VMstate==="PAUSED" || ISO===''} variant='contained' color='primary' onClick={saveVM} startIcon={<Save/>} sx={{m:1}} size="small">
                Save VM
            </Button>
            <br></br>
            {VMstate==='RUNNING' && 
                <>
                <Typography variant='body1'> Use command 'ssh {entry_no+'@192.168.'}{200+VMID}{'.2'}'</Typography>
                <br></br>
                <Typography variant='body1'>Password : {password}</Typography>
                </>
            }
            </Box>
            </Box>
        </Paper>
        </Grid>
    )
}

export default TaAssignmentBox;