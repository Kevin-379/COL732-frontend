import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Paper, Button,  Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from "@mui/material";
import dayjs from 'dayjs';
import NavBar from "../components/NavBar";
type sub = {
    course_id: string,
    assignment_id: string,
    entry_no: string,
    submission_time:number,
    marks:number,
    asmt_path:string,
    plag_path:string
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
    
    //get the submission details of the student
    useEffect(()=>{
        fetch("/getAllSubmissions/"+course_id+'/'+asmt_id, 
        {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}).then(
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
        )
    },[trigger]);
    //get submissions for all the students 

    //trying to upload the checker file
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(selectedFile!=null){
            const formData = new FormData();
            formData.append("selectedFile", selectedFile);
            try {
            const response = await axios({
                method: "post",
                url: "/api/upload/file",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            } catch(error) {
            console.log(error)
            }
        }
    }
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e!==null && e.target!==null && e.target.files!==null){
            setSelectedFile(e.target.files[0]); 
            console.log(e.target.files[0]);
        }
    }


    
    function submissionBox(ast: sub){
        return (
            <TableRow
              key={ast.entry_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{ast.entry_no}</TableCell>
                <TableCell align="center">{dayjs.unix(ast.submission_time).toISOString()}</TableCell>
                <TableCell align="center"><Button>Get report</Button></TableCell>
                <TableCell align="center"><Button>Download</Button></TableCell>
                <TableCell align="center"><Button>Set marks</Button></TableCell>
            </TableRow>
        );
    }
    
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
                    <TableCell align="center">Get report button</TableCell>
                    <TableCell align="center">Download submission files</TableCell>
                    <TableCell align="center">Set marks</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
            {
                subList.map((ast) =>(submissionBox(ast)))
            }
                </TableBody>
            </Table>
            </TableContainer>
        </>

    );

}
export default ManageAssignmentPage;