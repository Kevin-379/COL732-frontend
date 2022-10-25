import React from "react";
import { IconButton, Typography, Paper, Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

//to put inside The whole paper must be a button - 
type Props = {
    entry_no: string,
    course_id: string,
    role:string,
    ast_id:string
}

function AstBox(props: Props){
    const navigate = useNavigate();
    function redirect(){
        navigate('/AssignmentPage',{state:{entry_no:props.entry_no, role:props.role, course_id:props.course_id}})
    }

    return (
        <>
        {props.role==='Student' 
            ? 
        <IconButton onClick={redirect}><Paper><Typography>{props.ast_id}</Typography></Paper></IconButton>
            :
        <IconButton onClick={redirect}><Paper><Typography>{props.ast_id}</Typography></Paper></IconButton>
        }
        </>
    );
}

export default AstBox;