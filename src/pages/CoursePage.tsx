import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Paper, Button,  Table, TableContainer, TableHead, TableCell, TableBody, TableRow} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';

type ast_entry = {
    asmt_id:string,
    start_time: number,
    end_time: number,
    vmid:number,
    pdf_link: string
}

function CoursePage(){
    const navigate = useNavigate();
    let location  = useLocation();
    const entry_no = location.state.entry_no;
    const course_id=location.state.course_id;
    const role = location.state.role;
    const [ast_ids, setAst_ids] = useState<ast_entry[]>([]) ;
    const [loadAsmt, setLoadAsmt] = useState(false);
    const fetched = useRef(false);

    useEffect(()=>{
        fetch('/getAllAss/'+course_id).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    //course_boxes=[];
                    let temp = []
                    for (let i = 0; i<val.length; i++) {
                        temp.push(val[i]);
                    }
                    setAst_ids(temp);
                    console.log('fetched asses',val,fetched.current);
                    fetched.current=true;
                }
            }
        )
        }
    ,[loadAsmt]);

    function redirect(ast:ast_entry ){
        let now = dayjs().unix();
        if(ast.end_time>=now && now>=ast.start_time){
            navigate('/AssignmentPage',{state:{entry_no:entry_no, role:role, course_id:course_id,ast_id:ast.asmt_id}});
        }
    }
    function redirectCreateAsmt(){
        navigate('/CreateAsmt', {state:{entry_no:entry_no, course_id:course_id, role:role}})
    }

    function astBox(ast:ast_entry){
        //TODO - this must appear horizontal
        let yo = dayjs.unix(ast.start_time);//way to convert time since epoch to dayjs
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
            <Button variant='contained' onClick={()=>{navigate('/viewMembers',
             {state:{entry_no:entry_no, role:role, course_id:course_id}})}}>
                View Members
            </Button>
            <TableContainer component={Paper}>
            <Table sx={{ width: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Assignment</TableCell>
                    <TableCell align="center">PDF Link</TableCell>
                    <TableCell align="center">Start time</TableCell>
                    <TableCell align="center">End time</TableCell>
                    {role!=='Student' && <TableCell align="center">Edit button</TableCell>}
                </TableRow>
                </TableHead>
                <TableBody>
            {/*fetched.current && course_boxes*/
                ast_ids.map((ast) =>(astBox(ast)))
            }
                </TableBody>
            </Table>
            </TableContainer>
            {role!=='Student' && <Button onClick={redirectCreateAsmt}>Create new assignment</Button>}
        </>

    );
}

export default CoursePage;