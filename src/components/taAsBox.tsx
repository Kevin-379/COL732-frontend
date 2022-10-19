import React,{ useState} from 'react';
import axios from "axios";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Box, Button, Select, FormControl, FormHelperText, InputLabel, MenuItem} from '@mui/material';
import {PlayArrow, FileUpload, Stop, Save, Done, RotateRight} from '@mui/icons-material';
function TaAssignmentBox(){
    /*options to give
    upload assignment pdf
    select iso image - browse from the server computer itself
    run VM button will start the VM with the selected ISO image
    Save VM will take snapshot of the VM and store the template VMID in the assignment table
    Stop VM will stop the VM
    create assignment button that will commit the assignment
    This same box must be reusable for changing the assignment desc
    */
   const [VMID,setVMID] = useState(-1);
   const [VMstate, setVMstate] = useState('ASSIGNED');
   const [uploadState, setUploadState] = useState('NOT SELECTED');
   //const [pdfFile, setPdfFile] = useState({});
   const [ISOFileName, setISO] = useState('');
   const [pdfFile, setPdfFile] = useState<File | null>(null);
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
    function uploadAssPdf(){
        if( !pdfFile){
            console.log("pdf file null");
            return;
        }else{
            setUploadState('UPLOADING');
            const formData = new FormData();
            formData.append(
                'pdfFile',
                pdfFile,
                pdfFile.name
            );
            console.log('sending file')
            axios.post('/uploadAssPdf', formData).then(res =>{
                console.log(res.data);
                setUploadState('UPLOADED');
            });
            setPdfFile(null);
        }

    }
    function uploadIcon(){
        if(uploadState==='NOT SELECETED'){
            return <FileUpload/>
        }else if(uploadState==='SELECTED'){
            return <FileUpload/>
        }else if(uploadState==="UPLOADING"){
            return <RotateRight/>
        }else if(uploadState==='UPLOADED'){
            return <Done/>
        }
    }
    function choosePdf(e: React.ChangeEvent<HTMLInputElement>){
        if(e!==null && e.target!==null && e.target.files!==null){
            setPdfFile(e.target.files[0]); 
            console.log(e.target.files[0]);
            setUploadState('SELECTED');
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
            <Typography variant='h5' component='h2'><b>Create assignment page</b></Typography>
            <Box padding={1}>
            <Typography variant='body1'>Upload pdf</Typography>
            <br></br>
            <Button variant='contained' component='label' color='primary' sx={{m:1}}  size="small">
            <input type='file' name='pdfFile' onChange={(e)=>{choosePdf(e)}}/>
            </Button>
            
            <Button disabled={uploadState!=='SELECTED'} variant='contained' color='success' endIcon={uploadIcon()} onClick={uploadAssPdf} sx={{m:1}} size="small">Upload Pdf</Button>
            <br></br>
            <br></br>


            <Typography variant='body1'>Select ISO image</Typography>

            <FormControl required sx={{ m: 1, hieght:10,minWidth: 100 }} size="small">
                <InputLabel id="demo-simple-select-required-label">ISO</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
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