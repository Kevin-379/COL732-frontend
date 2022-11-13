import React from "react";
import { useState, useRef, useEffect } from "react";
import { Paper,  Table,
     TableContainer, TableHead, TableCell,
      TableBody, TableRow, Box, Typography} from "@mui/material";
import dayjs from 'dayjs';
import { base_url } from "../components/config";


type Props = {
    course_id: string,
    asmt_id: string,
    show_all: boolean
}

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

function Leaderboard(props: Props){
    const [subList, setSubList] = useState<sub_entry[]>([]);
    const fetched = useRef(false);
    const token = window.sessionStorage.getItem('token')
    const entry_no = window.sessionStorage.getItem('entry_no')
    const role = window.sessionStorage.getItem('role')

    //get the submission details of the student
    useEffect(()=>{
        fetch(base_url+'/getAllMarks/'+props.course_id+'/'+props.asmt_id,
        {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    let temp = [];
                    for (let i = 0; i<val.submissions.length; i++) {
                        if(val.submissions[i].marks!==null){
                            temp.push(val.submissions[i]);
                        }
                    }
                    temp = temp.sort((a, b) => b.marks - a.marks);
                    setSubList(temp);
                    //console.log('fetched members',val,fetched.current);
                    fetched.current=true;
                }
            }
        )
    },[]);

    function subBox(en: sub_entry){
        return (
            <TableRow key={en.entry_no}>
                {props.show_all ? <TableCell>  {en.entry_no}</TableCell>
                :<TableCell>Anonymous</TableCell>}
                <TableCell>{en.auto_marks}</TableCell>
                <TableCell>{en.marks}</TableCell>
                <TableCell>
                    {<>
                    {dayjs.unix(en.submission_time).format('LT')}
                    <br></br>
                    {dayjs.unix(en.submission_time).format('ll')}
                    </>}
                </TableCell>
                
            </TableRow>
            );
    }

    return (
        <>
        <Typography variant="h5" sx={{m:2}}>Leaderboard</Typography>
            {subList.length===0 ? <Typography sx={{m:2}}>No entries</Typography>
            :
            <TableContainer component={Paper} sx={{width:'650px', mx:2}}>
            <Table sx={{ width: '650px' }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Entry number</TableCell>
                    <TableCell>Auto marks</TableCell>
                    <TableCell>Marks given</TableCell>
                    <TableCell>Submission time</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {/*fetched.current && course_boxes*/
                subList.map((mem) => (subBox(mem)))
                }
                </TableBody>
            </Table>
            </TableContainer>
            }
        </>
        //}
    )
}

export default Leaderboard;