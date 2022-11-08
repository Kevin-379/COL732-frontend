import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Paper, Button,  Table,
     TableContainer, TableHead, TableCell,
      TableBody, TableRow, Box, TextField} from "@mui/material";
import dayjs from 'dayjs';
import NavBar from "../components/NavBar";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { base_url } from "../components/config";
import SubmissionBox from "../components/SubmissionBox";
type sub = {
    course_id: string,
    assignment_id: string,
    entry_no: string,
    submission_time:number,
    auto_marks:number,
    plag_points: number,
    marks:number,
    remark: string
}

function ManageAssignmentPage(){
    const [trigger, setTrigger] = useState(false);
    const [subList, setSubList] = useState<sub[]>([]);
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
        /*fetch(base_url+"/getAllSubmissions/"+course_id+'/'+asmt_id, 
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                console.log(val);
                if(!fetched.current){
                    let temp = []
                    for (let i = 0; i<val.submissions.length; i++) {
                        temp.push(val.submissions[i]);
                    }
                    setSubList(temp);
                    console.log('fetched submissions',val,fetched.current);
                    fetched.current=true;
                }
            }
        )*/

        fetch(base_url+'/getAllMembers/'+course_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    let temp = []
                    for (let i = 0; i<val.members.length; i++) {
                        if(val.members[i].role === 'Student'){
                            temp.push(val.members[i].entry_no);
                        }
                    }
                    setSlist(temp);
                    console.log('fetched mems',val,fetched.current);
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
            axios.post(base_url+'/setMarks/'+entry,
            {marks: target.marks.value, remark: target.remark.value},
            {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
            .then((res) =>{
                console.log(res.data)
            })
        } catch(error) {
            console.log(error)
        }
    }
    /*
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e!==null && e.target!==null && e.target.files!==null){
            setSelectedFile(e.target.files[0]); 
            console.log(e.target.files[0]);
        }
    }*/
    /*
    function submissionBox(ast: sub, stud_entry: string){
        return (
            <TableRow
              key={ast.entry_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{ast.entry_no}</TableCell>
                <TableCell align="center">{dayjs.unix(ast.submission_time).format('LT')}<br></br>{dayjs.unix(ast.submission_time).format('ll')}</TableCell>
                <TableCell align="center"><Button style={{textTransform: 'none'}}>Download</Button></TableCell>
                <TableCell align="center">{ast.auto_marks}</TableCell>
                <TableCell align="center">{ast.plag_points}</TableCell>
                <Box component='form' onSubmit={handleEdit}>
                    <TableCell align="center">
                    <TextField
                    id="marks"
                    label="marks"
                    defaultValue={ast.auto_marks}
                    margin="normal"
                    />
                        {ast.marks}
                    </TableCell>
                    <TableCell align="center">
                        <TextareaAutosize
                        id = 'remark'
                        minRows={2}
                        style={{ width: 200 }}
                        defaultValue={ast.remark}
                        />
                    </TableCell>
                    <TableCell>
                        <Button type='submit' variant='contained' size="small">
                            edit
                        </Button>
                    </TableCell>
                </Box>
            </TableRow>
        );
    }*/
    
    return (
        <>
        <NavBar/>
            {/*
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileSelect}/>
              <input type="submit" value="Upload checker script"/>
            </form>
            */}
            <Button>Run auto grader for all</Button>
            <TableContainer component={Paper}>
            <Table sx={{ width: 650 }} aria-label="simple table">
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
                {/*fetched.current && course_boxes*/
                slist.length === 0 ? "No students in the course" : slist.map((s_entry) => (
                    <SubmissionBox key={s_entry} entry_no={s_entry} course_id={course_id} asmt_id={asmt_id}/>
                ))
                }
                </TableBody>
            </Table>
            </TableContainer>
        </>

    );

}
export default ManageAssignmentPage;