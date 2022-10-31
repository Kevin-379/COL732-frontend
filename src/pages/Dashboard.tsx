import React, { useEffect, useRef, useState } from "react";
import { Typography, Paper, Grid, Box, Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import CourseBox from '../components/CourseBox';
import { useLocation } from "react-router-dom";
import NavBar from '../components/NavBar';
type courseData = {
  course_id: string
}
function Dashboard() {
  let location = useLocation();
  const entry_no = String(window.sessionStorage.getItem('entry_no'))//location.state.entry_no;
  const role = String(window.sessionStorage.getItem('role'))//location.state.role;
  const token = window.sessionStorage.getItem('token');
  const fetched = useRef(false);
  const [course_ids, setCourses] = useState<string[]>([]);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    fetch('/getCourses/' + entry_no + '/' + role, { headers: { token: `${token}`, entry_no: `${entry_no}`, role: `${role}` } }).then(
      response => response.json()
    ).then(
      (val) => {
        if (!fetched.current) {
          //course_boxes=[];
          let temp = []
          for (let i = 0; i < val.courses.length; i++) {
            temp.push(val.courses[i].course_id);
          }
          setCourses(temp);
          fetched.current = true;
        }
      }

    )
  }
    , [trigger])

  const handleAddCourse = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('add course triggered');
    e.preventDefault();
    const target = e.target as typeof e.target & {
      course_id: { value: string };
    };
    fetch('/setCourses/' + entry_no + '/' + role + '/' + target.course_id.value, { headers: { token: `${token}`, entry_no: `${entry_no}`, role: `${role}` } })
      .then(res => {
        if (res.status === 201) {
          //course_boxes.push(<CourseBox entry_no={entry_no} role={role} course_id={target.course_id.value}/>)
          fetched.current = false;
          setTrigger(!trigger);
        } else {
          console.log(res);
        }
      });
  }

  function addCourse() {
    if (role === 'Instructor') {
      return (
        
        <Grid item xs={4}>
          <Paper elevation={6} sx={{ width: 200, height: 200, padding: 1 }}>
            <Box component="form" onSubmit={handleAddCourse} noValidate textAlign={"center"} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="course_id"
                label="Course ID"
                autoFocus
              />
              <br></br>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add course
              </Button>
            </Box>
          </Paper>
        </Grid>
      )
    } else {
      return (<></>);
    }
  }

  return (
    <>
      <NavBar/>
    <Container>
      <Typography variant="h4" component='h1' sx={{ my: 3 }}>Courses</Typography>
      <Grid container spacing={1}>
        {addCourse()}
        {/*fetched.current && course_boxes*/
          course_ids.length === 0 ? "No Courses" : course_ids.map((course_id) => (
            <CourseBox key={course_id} entry_no={entry_no} role={role} course_id={course_id} />
          ))
        }
      </Grid>
    </Container>
    </>
  )

}

export default Dashboard;