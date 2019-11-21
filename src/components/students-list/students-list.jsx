import React from 'react';
import StudentsListItem from './students-list-item';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
	},
}));


const StudentsList = ({ students }) => {
	const classes = useStyles();
	return (
			<List className={classes.list}>
				{
					students.map((student) => {
						const labelId = `checkbox-list-label-${student.id}`;
						return (
							<StudentsListItem key={student.id} student={student} labelId={labelId}/>
						)
					})
				}
			</List>
	)
}

export default StudentsList;