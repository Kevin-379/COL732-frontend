import React,{ useState} from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Box, Button, Select, FormControl, FormHelperText, InputLabel, MenuItem} from '@mui/material';
import {PlayArrow, FileUpload, Stop, Save, Done, RotateRight} from '@mui/icons-material';


type Props = {
    course_id:string,
    asmt_id:string,
    role:string,
    entry_no:string
}

function TaAssignmentBox(props:Props){
   const [VMID,setVMID] = useState(-1);
   const [VMstate, setVMstate] = useState('ASSIGNED');
   const [ISOFileName, setISO] = useState('');
   
    function saveVM(){
        if(VMID === -1){
            console.log('VM is not set to save');
        }else{
            //use http get request with
            //axios
            axios.post('/saveVM', {'VMID':VMID}).then(res =>{
                console.log(res);//check whether successful and setVMstate accordingly
            });
            setVMstate("SAVED");
        }
    }
    function startVM(){
        /*axios.post('/startVM', {'VMID':VMID}).then(res =>{
            console.log(res);//check whether successful and setVMstate accordingly
        });*/
        setVMstate("RUNNING")
    }
    function stopVM(){
        if(VMstate==="RUNNING"){
            /*axios.post('/stopVM', {'VMID':VMID}).then(res =>{
                console.log(res);//check whether successful and setVMstate accordingly
            });*/
            setVMstate("STOPPED");
        }else{
            //alert that vm was not running
        }
    }

    function selectISO(name: string){
        setISO(name);
        console.log(name);
        //also send it to the backend
    }
    const ISOnames = ['Ubuntu','Windows 10', 'Max OS X'];
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
            <Typography variant='h5' component='h2'><b>Setup template VM</b></Typography>
            <Box padding={1}>
            <br></br>
            <Typography variant='body1'>Select ISO image</Typography>

            <FormControl required sx={{ m: 1, hieght:10,minWidth: 100 }} size="small">
                <InputLabel id="ISO">ISO</InputLabel>
                <Select
                labelId="ISO"
                id="ISO"
                value={ISOFileName}
                label="ISOFileName"
                onChange={(e) => {selectISO(e.target.value)}}
                >
                {ISOvals}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
            
            <br></br>
            <Button disabled={VMstate!=="ASSIGNED" && VMstate!=="STOPPED"} variant='contained' color='primary' startIcon={<PlayArrow/>} onClick={startVM} sx={{m:1}} size="small">Start VM</Button>
            <Button disabled={VMstate!=="RUNNING"} variant='contained' color='primary' onClick={saveVM} startIcon={<Save/>} sx={{m:1}} size="small">Save VM</Button>
            <Button disabled={VMstate!=="SAVED" && VMstate!=="RUNNING"} variant='contained' color='primary' onClick={stopVM} startIcon={<Stop/>} sx={{m:1}} size="small">Stop VM</Button>
            </Box>
            </Box>
        </Paper>
        </Grid>
    )
}

export default TaAssignmentBox;