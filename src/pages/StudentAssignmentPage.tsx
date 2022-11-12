import React, { useEffect } from "react";
import {Container,Grid, Link} from '@mui/material/';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import VersionTree from "../components/VersionTree";
import MessageBox from "../components/MessageBox"; 
import NavBar from "../components/NavBar";
import Leaderboard from "../components/Leaderboard";
import dayjs from "dayjs";
import RemarkBox from "../components/RemarkBox";

function StudentAssignmentPage(){
    let location = useLocation();
    const entry_no=location.state.entry_no;
    const role=location.state.role;
    const course_id = location.state.course_id;
    const asmt_id = location.state.asmt_id;
    const iso = location.state.iso;
    const pdf_link = location.state.pdf_link;
    const start_time = location.state.start_time;
    const end_time = location.state.end_time;
    const [submitted, setSubmitted] = useState(false);
    const now = dayjs().unix();

    useEffect(()=>{console.log(submitted)},[submitted]);
    return (
    <>
    <NavBar/>
      <Container>
          {now<=end_time && now>=start_time &&
           <>
            <VersionTree entry_no={entry_no} role={role} course_id={course_id} asmt_id={asmt_id} iso={iso}
            start_time={start_time} end_time={end_time} submitted={submitted} setSubmitted={setSubmitted}/>
            <Link href={pdf_link} target="_blank" sx={{mx:3}}>Link to assignment description</Link>
          </>
           }
           <RemarkBox entry_no={entry_no} course_id={course_id} asmt_id={asmt_id} submitted={submitted}/>
          <Leaderboard course_id={course_id} asmt_id={asmt_id} show_all={now>end_time}/>
          
          <MessageBox entry_no={entry_no} role={role} course_id={course_id} asmt_id={asmt_id}/>
      </Container>
    </>
    );
}
export default StudentAssignmentPage;