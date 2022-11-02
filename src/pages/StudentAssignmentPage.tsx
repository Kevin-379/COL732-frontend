import React from "react";
import {Container,Grid} from '@mui/material/';
import { useLocation } from "react-router-dom";
import VersionTree from "../components/VersionTree";
import MessageBox from "../components/MessageBox"; 
import NavBar from "../components/NavBar";

function StudentAssignmentPage(){
    let location = useLocation();
    const entry_no=location.state.entry_no;
    const role=location.state.role;
    const course_id = location.state.course_id;
    const asmt_id = location.state.asmt_id;
    return (
    <>
    <NavBar/>
      <Container>
        <Grid container spacing={1}>
          <VersionTree entry_no={entry_no} role={role} course_id={course_id} asmt_id={asmt_id}/>
          <MessageBox entry_no={entry_no} role={role} course_id={course_id} asmt_id={asmt_id}/>
        </Grid>
      </Container>
    </>
    );
}
export default StudentAssignmentPage;