import React, { useEffect } from "react";
import {Typography, Box, TableCell, Button,
TextField, TableRow } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { base_url } from './config';
import { useState } from "react";
import axios from "axios";
interface funcs {
    handleEdit: (e: React.FormEvent<HTMLFormElement>, entry: string) => void;
}
type Props = {
    course_id: string,
    asmt_id:string,
    entry_no:string,
    marks: number,
    remark: string
}
function MarkBox(props: Props){
    const entry_no = String(window.sessionStorage.getItem('entry_no'));
    const role = String(window.sessionStorage.getItem('role'));
    const token = window.sessionStorage.getItem('token');
    const [marks, setMarks] = useState(Number(props.marks));
    const [remark, setRemark] = useState(props.remark);
    //fetch the details of submission for prop.entry_no, props.course_id, props.asmt_id
    //show the 
    function changeMarks(event: React.ChangeEvent<HTMLInputElement>) {
        setMarks(Number(event.target.value));
    }

    function changeRemark(event: React.ChangeEvent<HTMLInputElement>){
        setRemark(event.target.value);
    }

    function edit(){
        //post the marks and remark
        axios.post(base_url+'/setMarks/'+props.course_id+'/'+props.asmt_id+'/'+props.entry_no,
        {marks:marks, remark: remark},
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}).then(res => {console.log(res)})

    }

    return (
        <>
            <TableCell align="center">
            <input type="text" size={8} defaultValue={marks} onChange={changeMarks}/>
            </TableCell>
            <TableCell align="center">
                <TextareaAutosize id = 'remark' minRows={2} 
                style={{ width: 200 }} defaultValue={remark}
                onChange={ev => setRemark(ev.target.value)}/>
            </TableCell>
            <TableCell>
                <Button onClick={edit} variant='contained' size="small">
                    edit
                </Button>
            </TableCell>
        </>
    );
}

export default MarkBox;