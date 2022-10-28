import React from "react";
import axios from "axios";
import StudentAssignmentBox from "../components/stuAsBox";
import TaAssignmentBox from "../components/taAsBox";
import {Container,Grid} from '@mui/material/';
import { useLocation } from "react-router-dom";

function AssignmentPage(){
    let location = useLocation();
    const entry_no=location.state.entry_no;
    const role=location.state.role;
    return (
    <Container>
      <Grid container spacing={1}>
        {role === 'Student'
        ? <StudentAssignmentBox entry_no="" course_id='' ass_id=''/>
        : <></>
        }
      </Grid>
    </Container>);
}
export default AssignmentPage;