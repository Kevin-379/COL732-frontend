import React from "react";
import { IconButton, Typography, Paper, Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

//to put inside The whole paper must be a button - 
type Props = {
    entry_no: string,
    course_id: string,
    role:string
}
function CourseBox(props: Props){
    const navigate = useNavigate();
    function redirect(){
        navigate('/CoursePage',{state:{entry_no:props.entry_no, role:props.role, course_id:props.course_id}})
    }
    return (
        <Grid item xs={4} key={props.course_id}> 
            <IconButton onClick={redirect}>
            <Paper elevation={6} sx={{width:200, height:200, padding:1}}>
                <Typography variant="h3" sx={{height:100}}>{props.course_id}</Typography>
            </Paper>
            </IconButton>
        </Grid>
    );
}

export default CourseBox;