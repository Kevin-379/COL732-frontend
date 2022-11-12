import React from "react";
import {Typography, Paper } from '@mui/material';
import dayjs from 'dayjs';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, useRef, useEffect } from "react";
import { base_url } from './config';

interface funcs {
    handleEdit: (e: React.FormEvent<HTMLFormElement>, entry: string) => void;
}
type Props = {
    entry_no: string,
    course_id: string,
    asmt_id: string,
    submitted: boolean
}
function RemarkBox(props: Props, {handleEdit}: funcs){
    const entry_no = String(window.sessionStorage.getItem('entry_no'));
    const role = String(window.sessionStorage.getItem('role'));
    const token = window.sessionStorage.getItem('token');
    const [auto_marks, setAutoMarks] = useState(0);
    const [sub_time, setSubTime] = useState(0);
    const [plag_points, setPlagPts] = useState(0);
    const [marks, setMarks] = useState(0);
    const [remark, setRemark] = useState('');
    const [present, setPresent] = useState(false);
    useEffect(()=>{
        fetch(base_url+'/getMarks/'+props.course_id+'/'+props.asmt_id+'/'+props.entry_no, 
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}})
        .then(res=>res.json())
        .then((val) => {
            if(val.message==='success'){
                setSubTime(val.data.submission_time);
                setAutoMarks(val.data.auto_marks);
                setPlagPts(val.data.plag_points);
                setMarks(val.data.marks);
                setRemark(val.data.remark);
                setPresent(true);
            }
        })
    },[props.submitted])


    return (
            <>
            {present ?
                <Paper sx={{m:2, width:"500px", p:1 }}>
                <Typography>
                    Submitted on :{' '}
                        <>
                        {dayjs.unix(sub_time).format('LT')},{' '}
                        {dayjs.unix(sub_time).format('ll')}
                        </>
                </Typography>
            
                {auto_marks!==null ? <Typography>Autograder marks : {auto_marks}</Typography>
                : <Typography>Not autograded</Typography>
                }
                {plag_points!==null && <Typography>Cheat label : {plag_points}</Typography>}
                {marks!==null ?
                <Typography>
                    Marks given : {marks}
                </Typography>
                : <Typography variant="body1">Not graded</Typography>
                }
                {remark!==null && <Typography>Remark : {remark}</Typography>}
                </Paper>
                : <Typography variant="body1" sx={{m:2}}>Not submitted</Typography>
            }
            </>
    );
}

export default RemarkBox;