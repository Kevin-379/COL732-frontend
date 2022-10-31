import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Paper, Button,  Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import NavBar from "../components/NavBar";
type subs = {
    name:string,
    entry_no:string,
    role:string
}

function ManageAssignmentPage(){
    const [trigger, setTrigger] = useState(false);
    const [mList, setMList] = useState<subs[]>([]);
    const fetched = useRef(false);
    let location = useLocation();
    const token = window.sessionStorage.getItem('token')
    const entry_no = location.state.entry_no;
    const role = location.state.role;
    const course_id = location.state.course_id;
    const asmt_id = location.state.asmt_id;
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    useEffect(()=>{
        fetch("/getAllSubmissions/"+course_id+'/'+asmt_id, {headers:{token:`${token}`,entry_no:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                console.log(val);
                /*if(!fetched.current){
                    let temp = []
                    for (let i = 0; i<val.members.length; i++) {
                        if(val.members[i].role=='Student'){
                            temp.push(val.members[i]);
                        }
                    }
                    setMList(temp);
                    console.log('fetched mems',val,fetched.current);
                    fetched.current=true;
                }*/
            }
        )
    },[trigger]);
    //get submissions for all the students 

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
    /*
    function submissionBox(){
        return (
            <TableRow
              key={ast.asmt_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center"><Button onClick={()=>redirect(ast)}>{ast.asmt_id}</Button></TableCell>
                <TableCell align="center"><a href={ast.pdf_link}>{ast.pdf_link}</a></TableCell>
                <TableCell align="center">{dayjs.unix(ast.start_time).toISOString()}</TableCell>
                <TableCell align="center">{dayjs.unix(ast.end_time).toISOString()}</TableCell>
                {role!=='Student' && <TableCell align="center"><Button>"Edit assignment"</Button></TableCell>}
            </TableRow>
        );
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileSelect}/>
              <input type="submit" value="Upload checker script"/>
            </form>
            <TableContainer component={Paper}>
            <Table sx={{ width: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Student entry num</TableCell>
                    <TableCell align="center">Submission time</TableCell>
                    <TableCell align="center">Run autograder</TableCell>
                    <TableCell align="center">Get plag button</TableCell>
                    <TableCell align="center">Download submission files</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
            {
                ast_ids.map((ast) =>(astBox(ast)))
            }
                </TableBody>
            </Table>
            </TableContainer>
        </>

    );
    */
   return (<>
   <NavBar/>
   </>);
}
export default ManageAssignmentPage;