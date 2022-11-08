import React from "react";
import {Typography, Box, TableCell, Button,
TextField, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, useRef, useEffect } from "react";


interface funcs {
    handleEdit: (e: React.FormEvent<HTMLFormElement>, entry: string) => void;
}
type Props = {
    entry_no: string,
    course_id: string,
    asmt_id: string
}
function SubmissionBox(props: Props, {handleEdit}: funcs){
    const entry_no = String(window.sessionStorage.getItem('entry_no'));
    const role = String(window.sessionStorage.getItem('role'));
    const token = window.sessionStorage.getItem('token');
    const [auto_marks, setAutoMarks] = useState(0);
    const [sub_time, setSubTime] = useState(0);
    const [plag_pts, setPlagPts] = useState(0);
    const [marks, setMarks] = useState(0);
    const [remark, setRemark] = useState('');
    const [reload, setReload] = useState(false);
    
    useEffect(()=>{
        fetch('/getSub/'+props.course_id+'/'+props.asmt_id+'/'+props.asmt_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}
        ).then(res=>res.json()).then((val) => {
            if(val.message === 'success'){
                setSubTime(val.submission_time);
                setAutoMarks(val.auto_marks);
                setPlagPts(val.plag_pts);
                setMarks(val.Marks);
                setRemark(val.remark);
            }
        });
    },[reload]);
    //fetch the details of submission for prop.entry_no, props.course_id, props.asmt_id
    //show the 
    function editWrapper(e: React.FormEvent<HTMLFormElement>){
        handleEdit(e, props.entry_no);
        setReload(!reload);
    }

    return (
        <TableRow
              key={props.entry_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{props.entry_no}</TableCell>
                <TableCell align="center">{dayjs.unix(sub_time).format('LT')}<br></br>{dayjs.unix(sub_time).format('ll')}</TableCell>
                <TableCell align="center"><Button style={{textTransform: 'none'}}>Download</Button></TableCell>
                <TableCell align="center">{auto_marks}</TableCell>
                <TableCell align="center">{plag_pts}</TableCell>
                <Box component='form' onSubmit={editWrapper}>
                    <TableCell align="center">
                    <TextField
                    id="marks"
                    label="marks"
                    defaultValue={marks}
                    margin="normal"
                    />
                    </TableCell>
                    <TableCell align="center">
                        <TextareaAutosize
                        id = 'remark'
                        minRows={2}
                        style={{ width: 200 }}
                        defaultValue={remark}
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
}

export default SubmissionBox;