import React, { useState } from 'react';
import CourseCard from "./CourseCard";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
    Card, 
    Paper,
  } from "@mui/material";


import courses from "../courses.json";

export const CoursePage  = () => {

    return (
        <Container>
            <Grid container spacing={5}>
            {courses.map((course) => (
                <CourseCard course={course} />
            ))}
            </Grid>
        </Container>
    );
};