import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    Grid,
    Container,
    TextField,
    TableHead,
    TableRow,
    Typography,
    TableContainer,
    Button,
    Paper
} from '@mui/material'
import NavBar from "../components/NavBar";
import { base_url } from "../components/config";

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
    const token = window.sessionStorage.getItem('token');

    function comp(a: member, b:member){
        if(a.role=== 'Instructor'){
            return 1;
        }
        if(b.role === 'Instructor'){
            return -1;
        }if(a.role=== 'TA'){
            return 1;
        }
        if(b.role === 'TA'){
            return -1;
        }
        if(a.entry_no<b.entry_no){
            return 1;
        }
        if(a.name < b.name){
            return 1;
        }
        return 0;
    }

    useEffect(()=>{
        fetch(base_url+'/getAllMembers/'+course_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    let temp = []
                    for (let i = 0; i<val.members.length; i++) {
                        temp.push(val.members[i]);
                    }
                    temp = temp.sort((a, b) => comp(b,a));
                    setMList(temp);
                    fetched.current=true;
                }
            }
        )
    },[trigger]);

    const addStudents = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            entry_no: {value:string};
        };
        fetch(base_url+'/setCourses/'+target.entry_no.value+'/Student/'+course_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
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
        const target = e.target as typeof e.target & {
            entry_no: {value:string};
        };
        fetch(base_url+'/setCourses/'+target.entry_no.value+'/TA/'+course_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
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
        fetch(base_url+'/removeMember/'+entry+'/'+Role+'/'+course_id,{headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
        .then((res) => { setTrigger(!trigger); fetched.current=false;})
    }
    
    function renderMember(mem:member){
        return (
            <TableRow
              key={mem.entry_no+mem.role}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{mem.name}</TableCell>
                <TableCell align="center">{mem.entry_no}</TableCell>
                <TableCell align="center">{mem.role}</TableCell>
                {(role==='Instructor' && mem.role!=='Instructor') &&
                <TableCell align="center">
                    <Button variant="outlined" size="small" color="error" onClick={()=>remove(mem.role,mem.entry_no)}>
                    Remove member
                    </Button>
                </TableCell>}
            </TableRow>
        );
    }

    return (
        <>
        <NavBar/>
        <Container>
            <Typography variant='h3' sx={{my:2}}>{course_id}</Typography>
        <TableContainer component={Paper} sx={{width: 800, my:3}}>
            <Table sx={{ width: '95%' }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center" sx={{fontWeight:'bold'}}>Name</TableCell>
                    <TableCell align="center" sx={{fontWeight:'bold'}}>Entry number</TableCell>
                    <TableCell align="center" sx={{fontWeight:'bold'}}>Role</TableCell>
                    {role==='Instructor' && <TableCell align="center" sx={{fontWeight:'bold'}}>Action</TableCell>}
                </TableRow>
                </TableHead>
                <TableBody>
            {/*fetched.current && course_boxes*/
                mList.map((mem) =>(renderMember(mem)))
            }
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container spacing={1}>
            <Grid item xs={3} sx={{m:3}}>
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
            </Grid>
            <Grid item xs={3} sx={{m:3}}>
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
            </Grid>
        </Grid>
        </Container>
        </>
    );
}
export default ViewMembers;