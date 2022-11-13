import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Paper, Button,  Table,
     TableContainer, TableHead, TableCell,
      TableBody, TableRow, Box, TextField, Typography} from "@mui/material";
import dayjs from 'dayjs';
import NavBar from "../components/NavBar";
import { base_url } from "../components/config";
import MarkBox from "../components/MarkBox";

type sub_entry = {
    course_id: string,
    asmt_id: string,
    entry_no: string,
    submission_time:number,
    auto_marks:number,
    plag_points: number,
    marks:number,
    remark: string
}

type mis_entry = {
    entry_no: string
}

function ManageAssignmentPage(){
    const [trigger, setTrigger] = useState(false);
    const [subList, setSubList] = useState<sub_entry[]>([]);
    const [misList, setMisList] = useState<mis_entry[]>([]);
    const fetched = useRef(false);
    let location = useLocation();
    const token = window.sessionStorage.getItem('token')
    const entry_no = location.state.entry_no;
    const role = location.state.role;
    const course_id = location.state.course_id;
    const asmt_id = location.state.asmt_id;
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    const [slist, setSlist] = useState<string[]>([]);
    //get the submission details of the student
    useEffect(()=>{
        fetch(base_url+'/getAllMarks/'+course_id+'/'+asmt_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    let temp = [];
                    for (let i = 0; i<val.submissions.length; i++) {
                        temp.push(val.submissions[i]);
                    }
                    let temp1 = [];
                    for (let i=0; i<val.missing.length; i++){
                        temp1.push(val.missing[i]);
                    }
                    temp = temp.sort((a, b) => a.submission_time - b.submission_time);
                    temp1 = temp1.sort((a, b) => (b.entry_no > a.entry ? -1: 1));
                    setMisList(temp1);
                    setSubList(temp);
                    fetched.current=true;
                }
            }
        )
    },[trigger]);
    //get submissions for all the students 

    //trying to upload the checker file
    const handleEdit = async(e: React.FormEvent<HTMLFormElement>, entry: string) => {
        e.preventDefault()
        try {
            const target = e.target as typeof e.target & {
                marks: {value: string}
                remark: { value: string };
            };
            axios.post(base_url+'/setMarks/'+course_id+'/'+asmt_id+'/'+entry,
            {marks: target.marks.value, remark: target.remark.value},
            {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
            .then((res) =>{
            })
        } catch(error) {
            console.log(error)
        }
    }
    
    function submissionBox(sub : sub_entry){
        if(sub.marks===undefined || sub.marks===null){
            sub.marks=0;
        }
        if(sub.remark===undefined || sub.remark===null){
            sub.remark='';
        }
        return(
        <TableRow key={sub.entry_no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{sub.entry_no}</TableCell>
            <TableCell align="center">
                {sub.submission_time===0 ? 'no submission' :
                    <>
                    {dayjs.unix(sub.submission_time).format('LT')}
                    <br></br>
                    {dayjs.unix(sub.submission_time).format('ll')}
                    </>
                }
            </TableCell>
            <TableCell align="center">
                <a href={base_url+'/downloadSubmission/'+course_id+'/'+asmt_id+'/'+sub.entry_no}>
                Download
                </a>
            </TableCell>
            <TableCell align="center">{sub.auto_marks}</TableCell>
            <TableCell align="center">{sub.plag_points}</TableCell>
            <MarkBox entry_no={sub.entry_no} course_id={course_id} asmt_id={asmt_id} marks={sub.marks} remark={sub.remark}/>
        </TableRow>
        );

    }

    function missingBox(mis : mis_entry){
        return (
        <TableRow key={mis.entry_no}>
            <TableCell>{mis.entry_no}</TableCell>
        </TableRow>)
    }

    function autoGrade(){
        fetch(base_url+'/runAutoGrader/'+course_id+'/'+asmt_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
    }

    return (
        <>
        <NavBar/>
            <Box sx={{m:2}}>
            <Typography variant="h5">Submissions</Typography>
            <br></br>
            <Button sx={{m:1}} variant='outlined' onClick={autoGrade}>Run auto grader for all</Button>
            <TableContainer component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Student entry num</TableCell>
                    <TableCell align="center">Submission time</TableCell>
                    <TableCell align="center">Download submission files</TableCell>
                    <TableCell align='center'>Auto grader marks</TableCell>
                    <TableCell align="center">Plag flag</TableCell>
                    <TableCell align="center">Set marks</TableCell>
                    <TableCell align="center">Remark</TableCell>
                    <TableCell align="center">Button</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {subList.length === 0 ? 
                <TableRow><TableCell align="center">No submissions yet</TableCell></TableRow>
                :
                <>
                {subList.map((mem) =>(submissionBox(mem)))}
                </>
                }
                </TableBody>
            </Table>
            </TableContainer>
            <br></br>
            <br></br>
            <Typography variant="h6" sx={{mx:4}}>Students without submission</Typography>
            <br></br>
            <TableContainer component={Paper} sx={{width:'220px', mx:4}}>
            <Table sx={{ width: '200px' }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Student entry num</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {misList.length===0 ? 
                <TableRow>
                <TableCell align="center">No missing entry</TableCell>
                </TableRow>
                :
                <>{misList.map((mem) => (missingBox(mem)))}</>
                }
                </TableBody>
            </Table>
            </TableContainer>
            </Box>
        </>

    );

}
export default ManageAssignmentPage;