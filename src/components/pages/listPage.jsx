import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { withStudentslistService } from '../hoc';
import { studentsLoaded } from '../../actions'

import StudentsList from '../students-list/students-list';
import AddStudentForm from '../add-student-form/add-student-form'
import { compose } from '../../utils';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
    justifyContent: 'space-between',
		width: '90%'
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
}));

const ListPage = ({
    students,
    studentslistService, 
    studentsLoaded
}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    studentsLoaded( studentslistService.getStudents() );
    setTimeout( () => {
      setIsLoading(false)
    }, 1000);
  }, [studentsLoaded, studentslistService]);

  if (students.length > 0)  studentslistService.saveToLocalStore(students);

  return (
    <Container className={classes.container}>
      {!isLoading&&
        <>
          <StudentsList students={students} />
          <AddStudentForm />
        </>
      }
      {isLoading&&
        <CircularProgress className={classes.loading} />
      }
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    selectedStudent: state.selectedStudent
  }
}

export default compose(
withStudentslistService(),
connect(
  mapStateToProps, 
  { 
    studentsLoaded,
  }
)
)(ListPage);