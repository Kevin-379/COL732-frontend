import React, { useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Paper,
	Link,
	TextField,
	Typography,
	createTheme,
	ThemeProvider
} from "@mui/material";

export default function CourseCard({ course }) {
	return (
		<Grid item xs={4} md={3}>
			<Paper elevation={3} className="paper">
				<Box
					sx={{
						paddingX: 2,
					}}
				>
				<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
					<Typography variant="subtitle1" component="h2">
						{course.code}
					</Typography>
				</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Typography variant="body2" component="p">
							{course.name}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
						marginTop={3}
					>
						<Link href={course.link} marginBottom={1}>
							<Button variant="contained" color="primary" component="p">
								Go to course
							</Button>
						</Link>
					</Box>

				</Box>
			</Paper>
		</Grid>
	);
};