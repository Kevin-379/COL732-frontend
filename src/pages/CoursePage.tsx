import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Paper, Button,  Table, TableContainer, TableHead,
     TableCell, TableBody, TableRow, Typography, Container} from "@mui/material";
import dayjs from 'dayjs';
import NavBar from "../components/NavBar";
import { base_url } from "../components/config";

type ast_entry = {
    asmt_id:string,
    asmt_name: string,
    start_time: number,
    end_time: number,
    iso:string,
    pdf_link: string
}

function CoursePage(){
    const navigate = useNavigate();
    let location  = useLocation();
    const entry_no = location.state.entry_no;
    const course_id=location.state.course_id;
    const role = location.state.role;
    const token = window.sessionStorage.getItem('token');
    const [ast_ids, setAst_ids] = useState<ast_entry[]>([]) ;
    const [loadAsmt, setLoadAsmt] = useState(false);
    const fetched = useRef(false);

    useEffect(()=>{
        fetch(base_url+'/getAllAss/'+course_id,
         {headers:{token:`${token}`,entry:`${entry_no}`,role:`${role}`}}).then(
            response =>response.json()
        ).then(
            (val) => {
                if(!fetched.current){
                    //course_boxes=[];
                    let temp = []
                    for (let i = 0; i<val.asmts.length; i++) {
                        temp.push(val.asmts[i]);
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
        //let now = dayjs().unix();
        if(role !== 'Student'){
            navigate('/ManageAssignmentPage',{state:{entry_no:entry_no, role:role, course_id:course_id,asmt_id:ast.asmt_id}});
        }else{
            let now = dayjs().unix()
            if(ast.start_time <= now && now<=ast.end_time){
                navigate('/StudentAssignmentPage',{state:{entry_no:entry_no, role:role,
                     course_id:course_id,asmt_id:ast.asmt_id, iso:ast.iso, pdf_link:ast.pdf_link}});
            }else{
                if(ast.start_time>now){
                    window.alert('Assignment not yet started')
                }else{
                    window.alert('Assignment ended!')
                }
               
            }
        }
    }
    function redirectCreateAsmt(){
        navigate('/CreateAsmt', {state:{entry_no:entry_no, course_id:course_id, role:role}})
    }

    function editAsmt(asmt_id:string){
        navigate('/EditAsmt', {state:{course_id:course_id, asmt_id:asmt_id}})
    }

    function astBox(ast:ast_entry){
        //TODO - this must appear horizontal
        //let yo = dayjs.unix(ast.start_time);//way to convert time since epoch to dayjs
        return (
            <TableRow
              key={ast.asmt_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{ast.asmt_id}</TableCell>
                <TableCell align="center"><Button onClick={()=>redirect(ast)} style={{textTransform: 'none'}} variant='outlined'>{ast.asmt_name}</Button></TableCell>
                <TableCell align="center"><a target="_blank" href={ast.pdf_link}>link to the description</a></TableCell>
                <TableCell align="center">{dayjs.unix(ast.start_time).format('LT')}<br></br>{dayjs.unix(ast.start_time).format('ll')}</TableCell>
                <TableCell align="center">{dayjs.unix(ast.end_time).format('LT')}<br></br>{dayjs.unix(ast.end_time).format('ll')}</TableCell>
                {role!=='Student' && 
                    <TableCell align="center">
                        <Button onClick={() =>editAsmt(ast.asmt_id)} style={{textTransform: 'none'}}>
                            Edit assignment
                        </Button>
                    </TableCell>
                }
            </TableRow>
        );
    }
    
    return (
        <>
        <NavBar/>
        <Container>
            <Typography variant="h4" component="h1" sx={{my:2}}>Course {course_id}</Typography>
            <br></br>
            <Button variant='contained' onClick={()=>{navigate('/viewMembers',
             {state:{entry_no:entry_no, role:role, course_id:course_id}})}}>
                Members
            </Button>
            <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Assignment name</TableCell>
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
        </Container>
        </>

    );
}

export default CoursePage;