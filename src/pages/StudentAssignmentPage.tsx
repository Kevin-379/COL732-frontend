import React from "react";
import {Container,Grid, Link} from '@mui/material/';
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
    const iso = location.state.iso;
    const pdf_link = location.state.pdf_link;
    return (
    <>
    <NavBar/>
      <Container>
        <Grid container spacing={1}>
          <VersionTree entry_no={entry_no} role={role} course_id={course_id} asmt_id={asmt_id} iso={iso}/>
          <MessageBox entry_no={entry_no} role={role} course_id={course_id} asmt_id={asmt_id}/>
          <Link href={pdf_link} target="_blank" sx={{mx:3}}>Link to assignment description</Link>
        </Grid>
      </Container>
    </>
    );
}
export default StudentAssignmentPage;