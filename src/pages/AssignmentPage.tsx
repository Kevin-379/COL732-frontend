import React from "react";
import axios from "axios";
import StudentAssignmentBox from "../components/stuAsBox";
import TaAssignmentBox from "../components/taAsBox";
import {Container,Grid} from '@mui/material/';

function AssignmentPage(){
    return (
    <Container>
      <Grid container spacing={1}>
        <StudentAssignmentBox entry_no="" course_id='' ass_id=''/>
        <TaAssignmentBox/>
      </Grid>
    </Container>);
}
export default AssignmentPage;