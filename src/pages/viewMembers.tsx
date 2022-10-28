import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Box, Table, TableBody,TableCell, Grid, TextField,
     TableHead, TableRow, TableContainer, Button, Paper} from '@mui/material'

type member = {
    name:string,
    entry_no:string,
    role:string
}

function ViewMembers(){
    const [mList, setMList] = useState<member[]>([]);
    const fetched = useRef(false);
    const [trigger, setTrigger] = useState(false);
    let location = useLocation();
    const course_id = location.state.course_id;
    const entry_no=location.state.entry_no;
    const role=location.state.role;

    useEffect(()=>{
        fetch('/getAllMembers/'+course_id).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    let temp = []
                    for (let i = 0; i<val.members.length; i++) {
                        temp.push(val.members[i]);
                    }
                    setMList(temp);
                    console.log('fetched mems',val,fetched.current);
                    fetched.current=true;
                }
            }
        )
    },[trigger]);

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
                   setTrigger(!trigger); fetched.current=false;
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
                   setTrigger(!trigger); fetched.current=false;
                }else{
                    console.log(res);
                }
            }
        );
    }

    function remove(Role:string,entry:string){
        fetch('/removeMember/'+entry+'/'+Role+'/'+course_id).then(
            (res) => {console.log(res); setTrigger(!trigger); fetched.current=false;})
    }
    
    function renderMember(mem:member){
        return (
            <TableRow
              key={mem.entry_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{mem.name}</TableCell>
                <TableCell align="center">{mem.entry_no}</TableCell>
                <TableCell align="center">{mem.role}</TableCell>
                {(role==='Instructor' && mem.role!=='Instructor') &&
                <TableCell align="center"><Button onClick={()=>remove(mem.role,mem.entry_no)}>Remove member</Button></TableCell>}
            </TableRow>
        );
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ width: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Entry number</TableCell>
                    <TableCell align="center">Role</TableCell>
                    {role==='Instructor' && <TableCell align="center">Action</TableCell>}
                </TableRow>
                </TableHead>
                <TableBody>
            {/*fetched.current && course_boxes*/
                mList.map((mem) =>(renderMember(mem)))
            }
                </TableBody>
            </Table>
        </TableContainer>
        { role!=='Student' &&
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
        }
        {role ==='Instructor' &&
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
        }
        </>
    );
}
export default ViewMembers;